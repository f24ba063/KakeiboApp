package com.example.kakeiboApp.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.kakeiboApp.security.CustomUserDetailService;

//SpringSecurityがある状態だと、ここで明示的にCorsを提示しないと
//コントローラでCorsを設定してもだめ
//逆にここで設定すればコントローラで書かなくても問題ない
@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http,
    		CustomUserDetailService userDetailsService,
    		PasswordEncoder encoder) throws Exception{
		http
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.csrf(csrf->csrf.disable())
			.authorizeHttpRequests(auth -> auth
					.requestMatchers("/**").permitAll()
					.anyRequest().permitAll()
				)
			.authenticationProvider(authenticationProvider(userDetailsService, encoder));;
		
		return http.build();
	}

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOriginPatterns(List.of("http://localhost:5173"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT","DELETE", "OPTIONS"));
		config.setAllowCredentials(true);
		config.setAllowedHeaders(List.of("*", "Content-Type"));
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
    
    @Bean
    public AuthenticationProvider authenticationProvider(
    		CustomUserDetailService userDetailsService,
    		PasswordEncoder encoder) {
    	DaoAuthenticationProvider provider =
    			new DaoAuthenticationProvider(userDetailsService);
    	
    	provider.setPasswordEncoder(encoder);
    	
    	return provider;
    }
}
