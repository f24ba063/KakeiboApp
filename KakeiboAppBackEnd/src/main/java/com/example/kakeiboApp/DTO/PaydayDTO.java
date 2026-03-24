package com.example.kakeiboApp.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaydayDTO {
	String username;
	int payday;
	String message = "";
}
