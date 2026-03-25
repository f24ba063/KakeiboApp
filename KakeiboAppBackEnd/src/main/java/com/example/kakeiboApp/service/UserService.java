package com.example.kakeiboApp.service;

import com.example.kakeiboApp.DTO.PaydayDTO;
import com.example.kakeiboApp.DTO.RegisterDTO;
import com.example.kakeiboApp.DTO.UserCallUpDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;

public interface UserService {
	//ユーザー名でユーザー呼出
	UserCallUpDTO findByNameService(String username, String pass);
	
	//新規ユーザー登録
	RegisterDTO userCreateService(UserCreateDTO dto) ;
	
	//ユーザー名重複チェック
	public void existsByUsernameService(String username);
	
	//ユーザー給料日取得
	int getPaydayService(String username);
	
	//ユーザー給料日情報更新
	PaydayDTO updatePaydayService(PaydayDTO dto);
}
