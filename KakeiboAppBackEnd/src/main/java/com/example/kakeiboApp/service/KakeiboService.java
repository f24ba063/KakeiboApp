package com.example.kakeiboApp.service;

import java.util.List;

import com.example.kakeiboApp.DTO.KakeiboDTO;

public interface KakeiboService {
	
	public List<KakeiboDTO>getAllService();
		
	public Integer getMonthlyTotalIncomeService(Integer year, Integer month, Integer day);
	
	public Integer getMonthlyTotalOutgoService(Integer year, Integer month, Integer day);
}
