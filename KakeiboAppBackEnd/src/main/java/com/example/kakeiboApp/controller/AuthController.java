package com.example.kakeiboApp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.LoginRequest;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
	
	private final AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request){
		try{
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getUsername(),
						request.getPassword()
				)
			);
			
			Map<String,String> result = new HashMap<>();
			result.put("message", "ログイン完了しました");
			result.put("username",  request.getUsername());
			
			return ResponseEntity.ok(result);
		}catch(Exception e) {
			Map<String,String> error = new HashMap<>();
			error.put("message","ログインに失敗しました");
			
			return ResponseEntity.status(401).body(error);
		}
	}
}
