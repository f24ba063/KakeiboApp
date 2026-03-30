package com.example.kakeiboApp.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataRangeDTO {
	private String username;
	private LocalDate oldestData;
	private LocalDate newestData;
}
