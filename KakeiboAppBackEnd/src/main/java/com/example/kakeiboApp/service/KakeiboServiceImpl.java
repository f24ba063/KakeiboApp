package com.example.kakeiboApp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.repository.KakeiboMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Data
public class KakeiboServiceImpl implements KakeiboService {
	private final KakeiboMapper mapper;
	
	//全ての要素を取得する
	@Override
	public List<KakeiboDTO> getAllService() {
		// TODO 自動生成されたメソッド・スタブ
		return mapper.getAll();
	}

	//今から一か月前までの間の総収入を取得する
	@Override
	public Integer getMonthlyTotalIncomeService(Integer year, Integer month, Integer day) {
		return mapper.getMonthlyTotalIncome(year, month, day);
	}
	
	//今から一か月前までの間の総支出を取得する
	@Override
	public Integer getMonthlyTotalOutgoService(Integer year, Integer month, Integer day) {
		return mapper.getMonthlyTotalOutgo(year, month, day);
	}
	
	//データに何月のものが存在するかを解析する
	@Override
	public List<String> getExistingMonthService() {;
		return mapper.getExistingMonth();
	}
}
