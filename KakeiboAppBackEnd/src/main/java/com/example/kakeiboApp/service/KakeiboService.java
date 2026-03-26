package com.example.kakeiboApp.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.kakeiboApp.DTO.DataRangeDTO;
import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.DTO.MonthlyResponseDTO;
import com.example.kakeiboApp.entity.Category;

public interface KakeiboService {
	//全ての要素を取得する
	public List<KakeiboDTO> getAllService();
	
	//更新時に特定idのデータを取得する
	public KakeiboDTO getByIdService(@Param("id") Integer id);
	
	//一月分の要素を取得する
	public MonthlyResponseDTO getMonthlyDataService(
			Integer year, Integer month, Integer day, String username);
		
	
	//データに何月のものが存在するかを解析する
	public List<String> getExistingMonthService();
	
	//最新、最古のデータの日付を調べる
	public DataRangeDTO getDataRangeService();
	
	//入力画面で、カテゴリー要素の選択肢を返す
	public List<Category> getAllCategoryService();
	
	//新規登録画面でデータセーブする
	public void save(KakeiboDTO dto);
	
	//カード上のハート押下でhomeruを変更、データ更新
	public void updateHomeru(Integer id, Integer homeru);
	
	//ID指定して削除する
	public void deleteService(Integer id, Integer delete);
	
	//ID指定でデータを更新する
	public void updateService(Integer Id, KakeiboDTO dto);
}
