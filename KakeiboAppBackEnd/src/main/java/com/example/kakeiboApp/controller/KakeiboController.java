package com.example.kakeiboApp.controller;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.service.KakeiboService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Transactional
@RequiredArgsConstructor
@RequestMapping("/index")
public class KakeiboController{
	private final KakeiboService service;
	@GetMapping
	public List<KakeiboDTO> indexController() {
		
	return service.getAllService();
	}
}
