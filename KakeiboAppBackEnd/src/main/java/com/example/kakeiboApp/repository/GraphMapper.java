package com.example.kakeiboApp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.kakeiboApp.DTO.BarChartDTO;
import com.example.kakeiboApp.DTO.PieChartDTO;

@Mapper
public interface GraphMapper {
	//グラフ作成のために、月ごとの収支の集計を取得する

    List<PieChartDTO> selectPie(
        @Param("username") String username,
        @Param("start") String start,
        @Param("end") String end
    );

    List<LineChartDTO> selectLine(
        @Param("username") String username
    );

    List<BarChartDTO> selectBar(
        @Param("username") String username
    );
}
