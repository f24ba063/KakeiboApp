package com.example.kakeiboApp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.DataRangeDTO;
import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.DTO.MonthlyResponseDTO;
import com.example.kakeiboApp.repository.KakeiboMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Data
public class KakeiboServiceImpl implements KakeiboService {
	private final KakeiboMapper mapper;
	DataRangeDTO dataRangeDto;
	
	//全データを取得する
	public List<KakeiboDTO> getAllService(){
		return mapper.getAll();
	};
	
	//もし最古・最新の外側を探索していたら、エラー文を返して
	//一月分の要素を取得する
	@Override
	public MonthlyResponseDTO getMonthlyDataService(Integer year, Integer month, Integer day) {
		
		//本データでは11日を給料日として制定している
		Integer salaryDate = 11;
		//給料日を締めとした一か月を調べている。つまり11～翌10日なので
		//問い合わせた日の日付しだいで調べる範囲が1月分ずれこむ
		month = day < salaryDate ? month - 1 : month;
		year = month == 0 ? year -1 : year;
		month = month == 0 ? 12 : month;
		day = salaryDate;
		
		//全データを探査して、最新・最古のデータの日付を納めている
		var dateRange = mapper.getDataRange();
		
//		LocalDate target = LocalDate.of(year, month, day);
		MonthlyResponseDTO res = new MonthlyResponseDTO();
		LocalDate start = LocalDate.of(year, month, 11);
		LocalDate end   = start.plusMonths(1).minusDays(1);
		
		//最新、最古よりも外側の範囲を調べようとしたら、元ページに差し戻される
		if(end.isBefore(dateRange.getOldestData())) {
			res.setStatus("BEFORE_OLDEST");
			res.setData(mapper.getMonthly(year, ++month, day));
			return res;
			
		}else if(start.isAfter(dateRange.getNewestData())) {
			res.setStatus("AFTER_NEWEST");
			res.setData(mapper.getMonthly(year, --month, day));
			return res;
		}
		
		List<KakeiboDTO> monthlyData = mapper.getMonthly(year, month, day);
		res.setStatus(monthlyData.isEmpty() ? "EMPTY" : "OK");
		res.setData(monthlyData);
		return res;
	}

	//直前の11日から翌月の10日までの総収入を取得する
	@Override
	public Integer getMonthlyTotalIncomeService(Integer year, Integer month, Integer day) {
		//引き受けた日取りを直前の給料日（11日)に変換する
		Integer salaryDate = 11;
		month = day < salaryDate ? month - 1 : month;
		year = month == 0 ? year -1 : year;
		month = month == 0 ? 12 : month;
		day = 11;
		
		return mapper.getMonthlyTotalIncome(year, month, day);
	}
	
	//直前の11日から翌月10日までの総支出を取得する
	@Override
	public Integer getMonthlyTotalOutgoService(Integer year, Integer month, Integer day) {
		//引き受けた日取りを直前の給料日（11日)に変換する
		Integer salaryDate = 11;
		month = day < salaryDate ? month - 1 : month;
		year = month == 0 ? year -1 : year;
		month = month == 0 ? 12 : month;
		day = 11;
		
		return mapper.getMonthlyTotalOutgo(year, month, day);
	}
	
	//データに何月のものが存在するかを解析する
	@Override
	public List<String> getExistingMonthService() {;
		return mapper.getExistingMonth();
	}
	
	//最新、最古のデータの日付を調べる
	@Override
	public DataRangeDTO getDataRangeService() {
		var allData = mapper.getAll();
		LocalDate first = allData.get(0).getTradeDate();
		LocalDate last = allData.get(allData.size() -1).getTradeDate();
		dataRangeDto.setOldestData(first);
		dataRangeDto.setNewestData(last);
		
		return dataRangeDto;
	}
}
