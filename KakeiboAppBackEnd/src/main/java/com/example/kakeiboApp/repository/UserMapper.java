package com.example.kakeiboApp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.example.kakeiboApp.DTO.LoginDTO;

@Mapper
public interface UserMapper {
	//ログイン処理。名前をもとにユーザーの名前とパスを取得
	public LoginDTO getUser(String username);
	
	
}
