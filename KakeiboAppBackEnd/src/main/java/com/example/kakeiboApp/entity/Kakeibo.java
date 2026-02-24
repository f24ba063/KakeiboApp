package com.example.kakeiboApp.entity;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Kakeibo{
	Integer id;
	
	Date tradeDate;
	
	Integer categoryId;
	
	@NotNull
	@Min(value = 0, message="マイナスの数値は入力できません")
	Integer amount;
	
	String memo;
	
	@NotNull
	Integer homeru = 0;
	
	LocalDateTime createdAt;
	
	LocalDateTime updatedAt;
	
	Integer softDelete = 0;
}
