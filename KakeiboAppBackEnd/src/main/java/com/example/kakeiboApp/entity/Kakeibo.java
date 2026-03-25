package com.example.kakeiboApp.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Kakeibo{
	Integer id;
	
	String username;
	
	LocalDate tradeDate;
	
	Integer categoryId;
	
	Integer amount;
	
	String memo;
	
	Integer homeru = 0;
	
	LocalDateTime createdAt;
	
	LocalDateTime updatedAt;
	
	Integer softDelete = 1;
}
