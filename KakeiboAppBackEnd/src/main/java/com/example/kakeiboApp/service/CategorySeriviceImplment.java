package com.example.kakeiboApp.service;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.repository.CategoryMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategorySeriviceImplment implements CategoryService {
	CategoryMapper mapper;
	
	@Override
	public String categoryAppendService(String category, String inOut) {
		// TODO 自動生成されたメソッド・スタブ
		try {
			String response = mapper.appendCategory(category, inOut);
			return response;
		}catch(Exception e) {
			return new String("だめでした");
		}
	}

}
