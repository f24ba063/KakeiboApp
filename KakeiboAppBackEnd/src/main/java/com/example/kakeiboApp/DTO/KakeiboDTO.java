package com.example.kakeiboApp.DTO;

import java.time.LocalDateTime;
import java.util.Date;

public class KakeiboDTO {
	//家計簿DTOはカテゴリのIDとカテゴリ名を両方所有している
	Integer id;
	
	Date tradeDate;
	
	Integer amount;
	
	Integer homeru = 0;
	
	LocalDateTime createdAt;
	
	LocalDateTime updatedAt;
	
	Integer softDelete = 0;
}
