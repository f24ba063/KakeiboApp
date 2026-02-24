package com.example.kakeiboApp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {
	Integer id;
	
	String category;
	
	String inOut;
	
	Integer sortOrder;
}
