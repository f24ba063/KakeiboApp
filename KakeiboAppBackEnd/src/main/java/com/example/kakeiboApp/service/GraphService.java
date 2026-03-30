package com.example.kakeiboApp.service;

import java.time.LocalDate;
import java.util.List;

import com.example.kakeiboApp.DTO.PieChartDTO;

public interface GraphService {
	
	public List<PieChartDTO> pieChartService(String username, LocalDate date);
}