package com.example.kakeiboApp.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.kakeiboApp.DTO.LoginDTO;
import com.example.kakeiboApp.DTO.ResisterDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;
import com.example.kakeiboApp.repository.UserMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	private final UserMapper mapper;
	private final BCryptPasswordEncoder passwordEncoder = new
			BCryptPasswordEncoder();
	
	//新規ユーザー登録
	@Override
	public ResisterDTO userCreateService(UserCreateDTO dto) {
		// TODO 自動生成されたメソッド・スタブ

	}

	//ログイン処理
	@Override
	public ResisterDTO loginService(LoginDTO dto) {
		// TODO 自動生成されたメソッド・スタブ
		var result = mapper.getUser(dto.getUsername());
		try {
		if(result == null || result.getUsername() == null){
			return new ResisterDTO(false, "データ取得に失敗しました");
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
