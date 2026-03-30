package com.example.kakeiboApp.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.PieChartDTO;
import com.example.kakeiboApp.service.GraphService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/graph")
public class GraphController {
	private final GraphService graph;
	
	@PostMapping("/pie")
	public List<PieChartDTO> pieChartController(
				Authentication auth,
				@RequestBody LocalDate date
			){
		String username = auth.getName();
		return graph.pieChartService(username, date);
	}
	
}
