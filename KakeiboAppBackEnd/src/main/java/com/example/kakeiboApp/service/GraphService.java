package com.example.kakeiboApp.service;

import java.time.LocalDate;
import java.util.List;

import com.example.kakeiboApp.DTO.AnalysisChartDTO;
import com.example.kakeiboApp.DTO.BarChartDTO;

public interface GraphService {
	//円グラフのためのサービス
	public List<AnalysisChartDTO> pieChartService(String username, LocalDate date);
	
	//カテゴリごと半年分の折れ線グラフのためのサービス
	public List<AnalysisChartDTO> lineChartService(String username, LocalDate date);
	
	//半年分の収支の棒グラフのためのサービス
	public List<BarChartDTO> barChartService(String username, LocalDate date);
}