package com.example.kakeiboApp.repository;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.example.kakeiboApp.DTO.PaydaySetDTO;
import com.example.kakeiboApp.entity.UserBody;

@Mapper
public interface UserMapper {
	//ログイン処理。名前をもとにユーザーの名前とパスを取得
	public Optional<UserBody> findByName(String username);
	
	//新規ユーザー登録処理
	//intで返すのは追加されたら１，失敗したら0を返すから
	public int registerUser(UserBody userBody);
	
	//給料日変更
	public int updatePayday(PaydaySetDTO dto);
}
