package com.example.kakeiboApp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.kakeiboApp.DTO.DataRangeDTO;
import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.entity.Category;
import com.example.kakeiboApp.entity.Kakeibo;

@Mapper
public interface KakeiboMapper {
	//すべてのデータを取得する
	public List<KakeiboDTO> getAll();
	
	//一か月分すべての要素を取得する
	public List<KakeiboDTO> getMonthly(
			@Param("year")Integer year, @Param("month")Integer month, @Param("day") Integer day);
	
	//特定のidの取引だけを取得する
	public Kakeibo getById();
	
	//一か月分の収入トータル
	public Integer getMonthlyTotalIncome(
			@Param("year")Integer year, @Param("month")Integer month, @Param("day") Integer day);
	
	//一か月分の支出トータル計上
	public Integer getMonthlyTotalOutgo(
			@Param("year")Integer year, @Param("month")Integer month, @Param("day") Integer day); 

	//DBに存在するデータか、存在する月一覧を取得する
	public List<String> getExistingMonth();
	
	//データがどの期間から過去（未来）には存在しないかを調査する
	public DataRangeDTO getDataRange();
	
	//プルダウンメニュー要素として、カテゴリ一覧を取得
	public List<Category> getAllCategory();
	
	//新規作成データをkakeiboテーブルへinsert、indexページへ移動
	public String saveNewFile();
	
}
