package com.example.kakeiboApp.service;

import java.util.List;

import com.example.kakeiboApp.DTO.DataRangeDTO;
import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.DTO.MonthlyResponseDTO;
import com.example.kakeiboApp.entity.Category;

public interface KakeiboService {
	//全ての要素を取得する
	public List<KakeiboDTO> getAllService();
	
	//一つ気分の要素を取得する
	public MonthlyResponseDTO getMonthlyDataService(Integer year, Integer month, Integer day);
		
	//今から一か月前までの間の総収入を取得する
	public Integer getMonthlyTotalIncomeService(Integer year, Integer month, Integer day);
	
	//今から一か月前までの間の総支出を取得する
	public Integer getMonthlyTotalOutgoService(Integer year, Integer month, Integer day);
	
	//データに何月のものが存在するかを解析する
	public List<String> getExistingMonthService();
	
	//最新、最古のデータの日付を調べる
	public DataRangeDTO getDataRangeService();
	
	//入力画面で、カテゴリー要素の選択肢を返す
	public List<Category> getAllCategoryService();
}
