package com.example.kakeiboApp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.repository.KakeiboMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Data
public class KakeiboServiceImpl implements KakeiboService {
	private final KakeiboMapper mapper;
	@Override
	public List<KakeiboDTO> getAllService() {
		// TODO 自動生成されたメソッド・スタブ
		return mapper.getAll();
	}

}
