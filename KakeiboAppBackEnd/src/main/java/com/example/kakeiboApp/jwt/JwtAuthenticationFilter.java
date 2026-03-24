package com.example.kakeiboApp.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.kakeiboApp.security.CustomUserDetailsService;

import io.jsonwebtoken.io.IOException;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private final JwtUtil jwtUtil;
	
	@Autowired
	CustomUserDetailsService userDetailsService; 
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
							HttpServletResponse response,
							FilterChain filterChain)throws IOException,
							jakarta.servlet.ServletException{
		String authHeader = request.getHeader("Authorization");
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7);
			if(jwtUtil.validateToken(token)) {
				String username = jwtUtil.getUsername(token);
				UserDetails userDetails = userDetailsService
						.loadUserByUsername(username);
				
				UsernamePasswordAuthenticationToken auth = 
						new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));;
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}
	
		try {
			filterChain.doFilter(request,  response);
		} catch (java.io.IOException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
			System.out.println("ファイルの書き込みに失敗しました");
		} catch (ServletException e) {
			e.printStackTrace();
			System.out.println("リクエストに失敗しました");
		}
	}
}
