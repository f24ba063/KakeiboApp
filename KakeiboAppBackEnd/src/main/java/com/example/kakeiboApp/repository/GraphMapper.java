package com.example.kakeiboApp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.kakeiboApp.DTO.PieChartDTO;

@Mapper
public interface GraphMapper {
	
	public List<PieChartDTO> pieChartMapper(
			String username, String start, String end);
}
