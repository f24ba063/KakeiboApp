package com.example.kakeiboApp.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.kakeiboApp.jwt.JwtAuthenticationFilter;
import com.example.kakeiboApp.jwt.JwtUtil;
import com.example.kakeiboApp.security.CustomUserDetailsService;

import lombok.AllArgsConstructor;

//SpringSecurityがある状態だと、ここで明示的にCorsを提示しないと
//コントローラでCorsを設定してもだめ
@Configuration
@AllArgsConstructor
public class SecurityConfig {

	private final JwtUtil jwtUtil;
	
	private final CustomUserDetailsService userDetailsService;
	//SpringSecurityを設定した上でのCorsの設定
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http)
    		throws Exception{
		http
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.csrf(csrf->csrf.disable())
			.authorizeHttpRequests(auth -> auth
			.requestMatchers("/auth/login").permitAll()
			.requestMatchers("/register/**").permitAll()
			.anyRequest().authenticated())
			.addFilterBefore(new JwtAuthenticationFilter(jwtUtil, userDetailsService),
					 UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

    //Cors設定の中身
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOriginPatterns(List.of("http://localhost:5173"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT","DELETE", "OPTIONS"));
		config.setAllowCredentials(true);
		config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Authorization"));
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}    
    
    @Bean
    AuthenticationManager authenticationManager(
    		AuthenticationConfiguration  config)throws Exception {
    	return config.getAuthenticationManager();
    }
}
