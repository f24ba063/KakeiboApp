package com.example.kakeiboApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.AnalysisChartDTO;
import com.example.kakeiboApp.DTO.BarChartDTO;
import com.example.kakeiboApp.DTO.ChartRequestDTO;
import com.example.kakeiboApp.service.GraphService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/graph")
public class GraphController {
	private final GraphService graph;
	
	//円グラフ用のコントローラ
	@PostMapping("/pie")
	public ResponseEntity<List<AnalysisChartDTO>> pieChartController(
				Authentication auth,
				@RequestBody ChartRequestDTO dto
			){
		
		String username = auth.getName();
		var result = graph.pieChartService(username, dto.getDate());
		return ResponseEntity.ok(result);
	}

	//折れ線グラフ用コントローラ
	@PostMapping("/line")
	public ResponseEntity<List<AnalysisChartDTO>> lineChartController(
				Authentication auth,
				@RequestBody ChartRequestDTO dto
			){
		
		String username = auth.getName();
		var result = graph.lineChartService(username, dto.getDate());
		return ResponseEntity.ok(result);
	}
	
	//棒グラフ用コントローラ
	@PostMapping("/bar")
	public ResponseEntity<List<BarChartDTO>> barChartController(
				Authentication auth,
				@RequestBody ChartRequestDTO dto
			){
		
		String username = auth.getName();
		var result = graph.barChartService(username, dto.getDate());
		return ResponseEntity.ok(result);
	}
}
