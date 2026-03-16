package com.example.kakeiboApp.entity;

import jakarta.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBody {
	@NotNull
	String userName;
	
	@NotNull
	String password;
	
	@Range(max=28, min=1, message= "{min}日～{max}日の間しか指定できません")
	Integer payday;
}
