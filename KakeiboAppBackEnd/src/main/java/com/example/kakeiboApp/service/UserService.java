package com.example.kakeiboApp.service;

import com.example.kakeiboApp.DTO.LoginDTO;
import com.example.kakeiboApp.DTO.ResisterDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;

public interface UserService {
	//新規ユーザー登録
	public ResisterDTO userCreateService(UserCreateDTO dto) ;
	
	//ログイン
	public ResisterDTO loginService(LoginDTO dto);
	
	//ユーザー情報更新
	public ResisterDTO userUpdateService(UserCreateDTO dto);
}
