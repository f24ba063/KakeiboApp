package com.example.kakeiboApp.jwt;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.kakeiboApp.security.CustomUserDetailsService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	
	CustomUserDetailsService userDetailsService; 
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
							HttpServletResponse response,
							FilterChain filterChain)throws IOException,
							jakarta.servlet.ServletException{
		
		String authHeader = request.getHeader("Authorization");
		
		try {
			if(authHeader != null && authHeader.startsWith("Bearer ")) {
				String token = authHeader.substring(7);
			
				if(!jwtUtil.validateToken(token)) {
					SecurityContextHolder.clearContext();
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().write("無効なトークンです");
					return;
				}
				
				String username = jwtUtil.getUsername(token);
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				
				if(userDetails == null) {
					SecurityContextHolder.clearContext();
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().write("ユーザーが存在しません");
					return;
				}
				
				UsernamePasswordAuthenticationToken auth = 
						new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
			
			filterChain.doFilter(request,  response);
		}catch(Exception e) {
			SecurityContextHolder.clearContext();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.getWriter().write("サーバーエラーが発生しました");
			
		}
	}
}
						
						
					