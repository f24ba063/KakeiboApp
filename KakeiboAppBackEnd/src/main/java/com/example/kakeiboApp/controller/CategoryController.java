package com.example.kakeiboApp.controller;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.service.CategoryService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/category")
public class CategoryController {
	CategoryService cat;
	
	@PostMapping("/{category}/{inOut}")
	@Transactional
	public String setNewCategory(@PathVariable String category, 
			@PathVariable String inOut) {
		return cat.categoryAppendService(category,inOut);
	}
}
