package com.example.kakeiboApp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.DataRangeDTO;
import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.DTO.MonthlyResponseDTO;
import com.example.kakeiboApp.converter.DtoConverter;
import com.example.kakeiboApp.entity.Category;
import com.example.kakeiboApp.entity.Kakeibo;
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
	
	//更新時に特定idのデータを取得する
	public KakeiboDTO getByIdService(Integer id) {
		return mapper.getById(id);
	};
	
	//もし最古・最新の外側を探索していたら、エラー文を返して
	//一月分の要素を取得する
	@Override
	public MonthlyResponseDTO getMonthlyDataService(Integer year, 
			Integer month, String username) {
		
		//全データを探査して、最新・最古のデータの日付を納めている
		var dateRange = mapper.getDataRange();
		
		//LocalDate target = LocalDate.of(year, month, day);
		
		LocalDate start = LocalDate.of(year, month, 1);
		LocalDate end   = start.plusMonths(1).minusDays(1);
		MonthlyResponseDTO res = new MonthlyResponseDTO();
		
		//アクセスした人物がひとつでもデータを登録しているかの確認
		boolean existsDataOfUser = mapper.countDataByUser(username) > 0;	
		if(!existsDataOfUser) {
			res.setStatus("NEW_USER");
			res.setData(mapper.getMonthly(year, month, username));
			return res;
		}
		
		//最新、最古よりも外側の範囲を調べようとしたら、元ページに差し戻される
		if(end.isBefore(dateRange.getOldestData())) {
			res.setStatus("BEFORE_OLDEST");
			res.setData(mapper.getMonthly(year, ++month,username));
			return res;
			
		}else if(start.isAfter(dateRange.getNewestData())) {
			res.setStatus("AFTER_NEWEST");
			res.setData(mapper.getMonthly(year, --month, username));
			return res;
		}
		
		List<KakeiboDTO> monthlyData = mapper.getMonthly(year, month, username);
		res.setStatus(monthlyData.isEmpty() ? "EMPTY" : "OK");
		res.setData(monthlyData);
		return res;
	}

	
	//データに何月のものが存在するかを解析する
	@Override
	public List<String> getExistingMonthService() {;
		return mapper.getExistingMonth();
	}
	
	//最新、最古のデータの日付を調べる
	@Override
	public DataRangeDTO getDataRangeService() {
		DataRangeDTO dataRangeDto = new DataRangeDTO();
		var allData = mapper.getAll();
		LocalDate first = allData.get(0).getTradeDate();
		LocalDate last = allData.get(allData.size() -1).getTradeDate();
		dataRangeDto.setOldestData(first);
		dataRangeDto.setNewestData(last);
		
		return dataRangeDto;
	}
	
	
	//カテゴリー選択肢情報を返す
	@Override
	public List<Category> getAllCategoryService() {
		return mapper.getAllCategory();
	};
	
	//新規データ登録作業
	@Override
	public void save(KakeiboDTO dto) {
		//メモ欄が空っぽだとスタイルが崩れるので、スペースを入れています
		Kakeibo kakeibo = DtoConverter.convertToKakeibo(dto);
		if(kakeibo.getMemo()== null ||kakeibo.getMemo().equals("")) {
			kakeibo.setMemo(" ");
		}
		mapper.saveNewFile(kakeibo);
	};
	
	//カードのハートを押下で、homeruをトグル、更新
	@Override
	public void updateHomeru(Integer id, Integer homeru) {
	    mapper.updateHomeru(id, homeru);
	}

	//ID指定して削除するサービス
	public void deleteService(Integer id, Integer delete) {
		mapper.deleteData(id, delete);
	};
	
	public void updateService(Integer Id, KakeiboDTO dto) {
		Kakeibo kakeibo = DtoConverter.convertToKakeibo(dto);
		mapper.update(Id, kakeibo);
	};
}
