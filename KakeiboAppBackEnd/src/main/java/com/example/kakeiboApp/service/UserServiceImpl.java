package com.example.kakeiboApp.service;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.RegisterDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;
import com.example.kakeiboApp.entity.UserBody;
import com.example.kakeiboApp.repository.UserMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
	private final UserMapper mapper;
	private final BCryptPasswordEncoder passwordEncoder = new
			BCryptPasswordEncoder();
	
	//新規ユーザー登録
	@Override
	public RegisterDTO userCreateService(UserCreateDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		RegisterDTO rd = new RegisterDTO();
		String hashed = new BCryptPasswordEncoder().encode(dto.getPassword());
		int rtn ;
		try{
			UserBody user = new UserBody();
			
			user.setUsername(dto.getUsername());
			user.setPassword(hashed);
			user.setPayday(dto.getPayday());
			rtn = mapper.registerUser(user);
			rd.setResistered(rtn == 1);
		}catch(Exception e) {
		    rd.setResistered(false);
		    rd.setMessage(e.getMessage());
		}
		return rd;
	}

	//ユーザー情報更新
	@Override
	public RegisterDTO userUpdateService(UserCreateDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

}
