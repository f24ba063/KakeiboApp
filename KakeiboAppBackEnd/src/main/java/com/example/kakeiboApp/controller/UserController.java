package com.example.kakeiboApp.controller;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.LoginDTO;
import com.example.kakeiboApp.DTO.ResisterDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;
import com.example.kakeiboApp.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequiredArgsConstructor
@Transactional
@RequestMapping("/resister")
public class UserController {
	private final UserService service;
	
	//新規ユーザー登録
	@PostMapping("/newUser")
	public ResisterDTO resisterNewUser(@RequestBody UserCreateDTO dto) {
		return service.userCreateService(dto);
		
	}
	
	//ログイン処理
	@GetMapping("/login")
	public ResisterDTO loginResponse(@RequestBody LoginDTO dto) {
		return service.loginService(dto);
	}
}
