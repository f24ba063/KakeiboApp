package com.example.kakeiboApp.service;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.CategoryCreateDTO;
import com.example.kakeiboApp.repository.CategoryMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategorySeriviceImplment implements CategoryService {
	private final CategoryMapper mapper;
	
	@Override
	public CategoryCreateDTO  categoryAppendService(String category, String inOut) {
		var dto = new CategoryCreateDTO(category, inOut,"");
		try {
			int response = mapper.appendCategory(category, inOut);
			if(response == 1) {
			dto.setMessage("新カテゴリーの登録に成功しました");
			
			}
		}catch(Exception e) {
			dto.setMessage("新カテゴリーの登録に失敗しました:" + e);
		}
		
		return dto;
	}

}
