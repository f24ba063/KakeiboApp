package com.example.kakeiboApp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.AnalysisChartDTO;
import com.example.kakeiboApp.DTO.BarChartDTO;
import com.example.kakeiboApp.repository.GraphMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GraphServiceImplment implements GraphService {
	private final GraphMapper graphMapper;
	
	@Override
	public List<AnalysisChartDTO> pieChartService(String username, LocalDate date) {
		List<AnalysisChartDTO> dtoList = new ArrayList<AnalysisChartDTO>();
		 
		//アクセス日の前の月の1日～月末の集計をする
		LocalDate start = date.minusMonths(1).withDayOfMonth(1);
		LocalDate end = start.plusMonths(1).minusDays(1);
		
		dtoList.addAll(graphMapper.analysisChartMapper(username, start, end));
		return dtoList;
	}
	
	public List<AnalysisChartDTO> lineChartService(String username, LocalDate date){
		List<AnalysisChartDTO> dtoList = new ArrayList<AnalysisChartDTO>();
		 
		//アクセス日の当月の初日を取得
		LocalDate start = date.withDayOfMonth(1);
		LocalDate end;
		
		//その月を終点に6か月分の、毎月1日～月末までのデータを取得
		int halfYear = 6;
		for(int i = 0; i < halfYear; i++) {
			start = start.minusMonths(1);
			end = start.plusMonths(1).minusDays(1);
			dtoList.addAll(graphMapper.analysisChartMapper(username, start, end));
		}
		
		return dtoList;
	}
	
	public List<BarChartDTO> barChartService(String username, LocalDate date){
		List<BarChartDTO> dtoList = new ArrayList<BarChartDTO>();
		 
		//アクセス日を基準とした前の月から6か月分の、
		//月ごとの収支を取得
		LocalDate end = date.withDayOfMonth(1).minusDays(1);
		LocalDate start = end.withDayOfMonth(1).minusMonths(5);
		
		dtoList.addAll(graphMapper.barChartMapper(username, start, end));
		
		return dtoList;
	}
}
