package com.example.kakeiboApp.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.kakeiboApp.DTO.AnalysisChartDTO;
import com.example.kakeiboApp.DTO.BarChartDTO;

@Mapper
public interface GraphMapper {
	
	//円グラフ、折れ線グラフのために月ごとの支出カテゴリ別集計を渡すマッパー
	public List<AnalysisChartDTO> analysisChartMapper(
			String username, LocalDate start, LocalDate end);
	
	//棒グラフのために月ごとの支出・収入総計を取得する
	public List<BarChartDTO> barChartMapper(
			String username, LocalDate start, LocalDate end);
}
