package com.example.kakeiboApp.service;

import com.example.kakeiboApp.DTO.RegisterDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;

public interface UserService {
	//新規ユーザー登録
	public RegisterDTO userCreateService(UserCreateDTO dto) ;
	
	//ユーザー情報更新
	public RegisterDTO userUpdateService(UserCreateDTO dto);
	
	
}
