package com.example.kakeiboApp.repository;

import java.util.List;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.entity.Kakeibo;

public interface KakeiboMapper {
	
	//すべての要素を取得する
	public List<KakeiboDTO> getAll();
	
	//特定のidの取引だけを取得する
	public Kakeibo getById();
	
	
}
