package com.example.kakeiboApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.PieChartDTO;
import com.example.kakeiboApp.DTO.PieChartRequestDTO;
import com.example.kakeiboApp.service.GraphService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/graph")
public class GraphController {
	private final GraphService graph;
	
//	@PostMapping("/pie")
//	public List<PieChartDTO> pieChartController(
//				Authentication auth,
//				@RequestBody PieChartRequestDTO dto
//			){
//		System.out.println("DTO date: " + dto.getDate());
//		String username = auth.getName();
////		System.out.println("Username: " + username);
//		
//		var result = graph.pieChartService(username, dto.getDate());
//		
////		result.forEach(r -> System.out.println(r.getCategory() + ": " + r.getTotal()));
//		
//		return result;
//	}
	
	@PostMapping("/pie")
	public ResponseEntity<List<PieChartDTO>> pieChartController(
				Authentication auth,
				@RequestBody PieChartRequestDTO dto
			){
		System.out.println("DTO date: " + dto.getDate());
		String username = auth.getName();
//		System.out.println("Username: " + username);
		
		var result = graph.pieChartService(username, dto.getDate());
		
		result.forEach(r -> System.out.println(r.getCategory() + ": " + r.getTotal()));
		
		return ResponseEntity.ok(result);
	}
	
}
