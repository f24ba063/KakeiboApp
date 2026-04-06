package com.example.kakeiboApp.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.LoginRequest;
import com.example.kakeiboApp.jwt.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
	
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	//ログイン制御
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		try {
			authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
					request.getUsername(), 
					request.getPassword()
				)
			);
			Authentication auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
					);
			String token = jwtUtil.generateToken(auth.getName());
			return ResponseEntity.ok(
				Map.of(
					"message", "ログイン成功",
					"token", token
				));
					
		}catch(BadCredentialsException e) {
			return ResponseEntity
					.status(401)
					.body(Map.of("message", "ユーザ名かパスワードが違います"));
		}
	}
}