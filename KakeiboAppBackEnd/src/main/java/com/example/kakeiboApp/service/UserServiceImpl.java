package com.example.kakeiboApp.service;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.LoginDTO;
import com.example.kakeiboApp.DTO.ResisterDTO;
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
	public ResisterDTO userCreateService(UserCreateDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		ResisterDTO rd = new ResisterDTO();
		String hashed = new BCryptPasswordEncoder().encode(dto.getPassword());
		int rtn ;
		try{
			UserBody user = new UserBody();
			
			user.setUserName(dto.getUsername());
			user.setPassword(hashed);
			user.setPayday(dto.getPayday());
			rtn = mapper.resisterUser(user);
			rd.setResistered(rtn == 1);
		}catch(Exception e) {
		    rd.setResistered(false);
		    rd.setMessage(e.getMessage());
		}
		return rd;
	}

	//ログイン処理
	@Override
	public ResisterDTO loginService(LoginDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		var result = mapper.getUser(dto.getUsername());
		try {
		if(result == null || result.getUsername() == null){
			return new LoginDTO(false, "データ取得に失敗しました");
		}else if(!passwordEncoder.matches(dto.getPassword(), result.getPassword())) {
			return new ResisterDTO(false, "パスワードかユーザー名が間違っています");
		}
			return new ResisterDTO(true, "");
		
		}catch(Exception e) {
			return new ResisterDTO(false, "通信エラーが発生しました");
		}
	}

	//ユーザー情報更新
	@Override
	public ResisterDTO userUpdateService(UserCreateDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

}
