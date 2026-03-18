package com.example.kakeiboApp.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserCallUpDTO {
	Long id;
	
	String username;
	
	int payday;
	
	String roles;
	
	String message = "";
}
