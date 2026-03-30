package com.example.kakeiboApp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.PieChartDTO;
import com.example.kakeiboApp.repository.GraphMapper;
import com.example.kakeiboApp.repository.KakeiboMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GraphServiceImplment implements GraphService {
	private final KakeiboMapper kakeibo;
	private final GraphMapper graph;
	
	@Override
	public List<PieChartDTO> pieChartService(String username, LocalDate date) {
		List<PieChartDTO> dtoList = new ArrayList<PieChartDTO>();
		String start = date.toString().split("T")[0];
		String end = date.plusMonths(1).minusDays(1).toString().split("T")[0];
		dtoList.addAll(graph.pieChartMapper(username, start, end));
		return dtoList;
	}
}
