package com.example.kakeiboApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResisterDTO {
	private boolean resistered;
	private String message = "";
}
