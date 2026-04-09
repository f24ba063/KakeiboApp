package com.example.kakeiboApp.controller;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.CategoryCreateDTO;
import com.example.kakeiboApp.service.CategoryService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Reactからアクセス可)
public class CategoryController {
	CategoryService cat;
	
	@PostMapping
	@Transactional
	public CategoryCreateDTO  setNewCategory(@RequestBody CategoryCreateDTO dto) {
		String category = dto.getCategory();
		String inOut = dto.getInOut();
		return cat.categoryAppendService(category,inOut);
	}
}
