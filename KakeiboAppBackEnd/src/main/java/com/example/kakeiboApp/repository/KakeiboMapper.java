package com.example.kakeiboApp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.entity.Kakeibo;

@Mapper
public interface KakeiboMapper {
	
	//すべての要素を取得する
	public List<KakeiboDTO> getAll();
	
	//特定のidの取引だけを取得する
	public Kakeibo getById();
	
	//一か月分の収入トータル
	public Integer getMonthlyTotalIncome(
			@Param("year") Integer year, @Param("month")Integer month, @Param("day") Integer day);
	
	//一か月分の支出トータル計上
	public Integer getMonthlyTotalOutgo(
			@Param("year")Integer year, @Param("month")Integer month, @Param("day") Integer day); 
}
