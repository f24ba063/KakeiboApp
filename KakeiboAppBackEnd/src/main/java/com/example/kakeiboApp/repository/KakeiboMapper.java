package com.example.kakeiboApp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.entity.Kakeibo;

@Mapper
public interface KakeiboMapper {
	
	//すべての要素を取得する
	public List<KakeiboDTO> getAll();
	
	//特定のidの取引だけを取得する
	public Kakeibo getById();
	
	
}
