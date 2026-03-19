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
			@Param("year")Integer year, @Param("month")Integer month, 
			@Param("day") Integer day, @Param("username") String username);
	
	//特定のidの取引だけを取得する
	public KakeiboDTO getById(Integer id);
	
	//DBに存在するデータか、存在する月一覧を取得する
	public List<String> getExistingMonth();
	
	//データがどの期間から過去（未来）には存在しないかを調査する
	public DataRangeDTO getDataRange();
	
	//プルダウンメニュー要素として、カテゴリ一覧を取得
	public List<Category> getAllCategory();
	
	//新規作成データをkakeiboテーブルへinsert、indexページへ移動
	public void saveNewFile(Kakeibo kakeibo);
	
	//homeruをクリックして褒めたり外したりする
	public void updateHomeru(@Param("id")Integer id, @Param("homeru")Integer homeru);
	
	//既存データの更新
	public void update(@Param("id")Integer id, Kakeibo kakeibo);
	
	//削除キー
	public void deleteData(Integer id, Integer delete);
	
	//ユーザーごとのpaydayを取得する
	public int getPayday(String username);
	
}
