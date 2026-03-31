package com.example.kakeiboApp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.PieChartDTO;
import com.example.kakeiboApp.repository.GraphMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GraphServiceImplment implements GraphService {
	private final GraphMapper graphMapper;
	
	@Override
	public List<PieChartDTO> pieChartService(String username, LocalDate date) {
		List<PieChartDTO> dtoList = new ArrayList<PieChartDTO>();
		LocalDate end = date; 
		LocalDate start = date.minusMonths(1).plusDays(1);
		
		dtoList.addAll(graphMapper.pieChartMapper(username, start, end));

		return dtoList;
	}
}
