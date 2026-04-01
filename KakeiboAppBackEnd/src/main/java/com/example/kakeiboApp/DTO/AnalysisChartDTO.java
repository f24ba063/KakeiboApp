package com.example.kakeiboApp.DTO;

import java.time.LocalDate;

import lombok.Data;

//円グラフ、折れ線グラフのためのDTO
//現状では円グラフにおいてdate欄は冗長となる
@Data
public class AnalysisChartDTO {
	String category;
	Integer total;
	LocalDate yearMonth = LocalDate.now();
}
