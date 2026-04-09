package com.example.kakeiboApp.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CategoryMapper {
	public int appendCategory(String category, String inOut);
}
