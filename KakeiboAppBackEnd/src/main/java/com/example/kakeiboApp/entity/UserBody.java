package com.example.kakeiboApp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBody {
	Long id;
	
	String username;
	
	String password;
	
	int payday;
	
	String roles = "ROLE_USER";
}
