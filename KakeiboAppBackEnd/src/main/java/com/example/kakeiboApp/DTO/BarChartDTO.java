package com.example.kakeiboApp.DTO;

import lombok.Data;

//棒グラフのために月、支出総計、収入総計を収める
@Data
public class BarChartDTO {
    String month;
    Integer income;
    Integer outGo;
}
