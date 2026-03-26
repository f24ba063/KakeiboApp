package com.example.kakeiboApp.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class KakeiboDTO {
	//家計簿DTOはカテゴリのIDとカテゴリ名を両方所有している
	Integer id;
	
	String username;
	
	Integer categoryId;
	
	String category;
	
	LocalDate tradeDate;
	
	@Max(value = 9_999_999, message="1千万円以上の数値は入力できません")
	@Min(value = 0, message="マイナス金額は入力できません")
	Integer amount;
	
	String inOut = "IN";
	
	Integer homeru = 0;
	
	@Size(max=200, min=0,message="メモは{max}文字までしか入力できません")
	String memo = " ";
	
	LocalDateTime createdAt;
	
	LocalDateTime updatedAt;
	
	Integer softDelete = 0;
}
