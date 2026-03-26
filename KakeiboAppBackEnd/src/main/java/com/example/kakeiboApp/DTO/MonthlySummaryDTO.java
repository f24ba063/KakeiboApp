package com.example.kakeiboApp.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MonthlySummaryDTO {
	private String month;
	private int income;
	private int outGo;
}
