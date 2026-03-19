package com.example.kakeiboApp.jwt;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	private final String SECRET_KEY = "secret";
	
	//トークン生成
	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
				.signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
				.compact();
	}
	
	//username取得
	public String extractUsername(String token) {
		return extractClaims(token).getSubject();
	}
	
	//検証
	public boolean validateToken(String token, String username) {
		return extractUsername(token).equals(username)
				&& !isTokenExpired(token);
	}
	
	private Claims extractClaims(String token) {
		return Jwts.parserBuilder()
					.setSigningKey(SECRET_KEY.getBytes())
					.build()
					.parseClaimsJws(token)
					.getBody();
	}
	
	private boolean isTokenExpired(String token) {
		return extractClaims(token).getExpiration().before(new Date());
	}
}
