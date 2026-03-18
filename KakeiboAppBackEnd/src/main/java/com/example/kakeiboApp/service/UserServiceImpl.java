package com.example.kakeiboApp.service;


import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.RegisterDTO;
import com.example.kakeiboApp.DTO.UserCallUpDTO;
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
	private final PasswordEncoder encoder;
	
	//usernameでユーザー呼出
	@Override
	public UserCallUpDTO findByNameService(String username, String pass) {
		UserCallUpDTO dto = new UserCallUpDTO();
		Optional<UserBody> body = mapper.findByName(username);
		
		if(body == null) {
			dto.setMessage("認証に失敗しました");
			return dto;
		}
		
		UserBody userBody = body.get();
		
		if(encoder.matches(pass, userBody.getPassword())) {
			dto.setUsername(username);
			dto.setId(userBody.getId());
			dto.setRoles(userBody.getRoles());
			dto.setPayday(userBody.getPayday());
			return dto;
		}else {
			dto.setMessage("認証に失敗しました");
			return dto;
		}
	}
	
	//新規ユーザー登録
	@Override
	public RegisterDTO userCreateService(UserCreateDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		RegisterDTO rd = new RegisterDTO();
		String hashed = encoder.encode(dto.getPassword());
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

	//ユーザー給料日情報更新
	@Override
	public RegisterDTO paydayUpdateService(UserCreateDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

}
