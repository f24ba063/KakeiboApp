package com.example.kakeiboApp.DTO;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KakeiboDTO {
	//家計簿DTOはカテゴリのIDとカテゴリ名を両方所有している
	Integer id;
	
	String category;
	
	Date tradeDate;
	
	Integer amount;
	
	Integer homeru = 0;
	
	String memo;
	
	LocalDateTime createdAt;
	
	LocalDateTime updatedAt;
	
	Integer softDelete = 0;
}
