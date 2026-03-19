package com.example.kakeiboApp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.PaydaySetDTO;
import com.example.kakeiboApp.DTO.RegisterDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;
import com.example.kakeiboApp.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/register")
public class UserController {
	private final UserService service;
	
	//新規ユーザー登録
	@PostMapping("/registerUser")
	public RegisterDTO resisterNewUser(@RequestBody UserCreateDTO dto) {
		return service.userCreateService(dto);
	}
	
	//ユーザー給料日更新
	@PutMapping("/setPayday")
	public RegisterDTO updatePayday(@RequestBody PaydaySetDTO dto) {
		return service.updatePaydayService(dto);
	}
}
