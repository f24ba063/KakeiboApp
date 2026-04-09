package com.example.kakeiboApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreateDTO {
	String category;
	String inOut;
	String message = "";
}
