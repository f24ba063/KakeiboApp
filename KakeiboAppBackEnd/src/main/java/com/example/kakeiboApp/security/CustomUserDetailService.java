package com.example.kakeiboApp.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.kakeiboApp.entity.UserBody;
import com.example.kakeiboApp.repository.UserMapper;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@AllArgsConstructor
@Data
public class CustomUserDetailService implements UserDetailsService {
	private final UserMapper mapper;
	
	@Override
	public UserDetails loadUserByUsername(String username)
	throws UsernameNotFoundException {
		
		UserBody user = mapper.findByName(username)
				.orElseThrow(() -> new UsernameNotFoundException("ユーザーが見つかりません"));
		
		return new CustomUserDetails(user);
	}	
}
