package com.example.kakeiboApp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.example.kakeiboApp.DTO.LoginDTO;
import com.example.kakeiboApp.DTO.ResisterDTO;
import com.example.kakeiboApp.entity.UserBody;

@Mapper
public interface UserMapper {
	//ログイン処理。名前をもとにユーザーの名前とパスを取得
	public LoginDTO getUser(String username);
	
	//新規ユーザー登録処理
	public ResisterDTO resisterUser(UserBody userBody);
}
