package com.example.kakeiboApp.converter;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.entity.Kakeibo;

public class DtoConverter {
	public static Kakeibo convertToKakeibo(KakeiboDTO dto) {
		Kakeibo k = new Kakeibo();
		k.setUsername(dto.getUsername());
		k.setId(dto.getId());
		k.setTradeDate(dto.getTradeDate());
		k.setCategoryId(dto.getCategoryId());
		k.setAmount(dto.getAmount());
		k.setHomeru(dto.getHomeru());
		k.setMemo(dto.getMemo());
		k.setCreatedAt(dto.getCreatedAt());
		k.setUpdatedAt(dto.getUpdatedAt());
		return k;
	}
}
