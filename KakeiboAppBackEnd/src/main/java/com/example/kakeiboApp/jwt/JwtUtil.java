package com.example.kakeiboApp.jwt;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

//JWTトークンの生成、検証を行うクラス
@Component
public class JwtUtil {
	private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	private final long expirationMs = 1000 * 60 * 60;
	
	//トークン生成
	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expirationMs))
				.signWith(key)
				.compact();
	}
	
	//トークン検証
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build()
			.parseClaimsJws(token);
			return true;
		}catch(JwtException e) {
			return false;
		}
	}
	
	//ユーザー名取得
	public String getUsername(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
}
