package com.example.kakeiboApp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.BarChartDTO;
import com.example.kakeiboApp.DTO.PieChartDTO;
import com.example.kakeiboApp.repository.GraphMapper;
import com.example.kakeiboApp.repository.LineChartDTO;

import lombok.AllArgsConstructor;

@Service 
@AllArgsConstructor
public class GraphServiceImpl implements GraphService{
	private final GraphMapper mapper;

    // 円グラフ
    public List<PieChartDTO> getPieData(String username, String yearMonth) {
        String start = yearMonth + "-01";
        String end   = yearMonth + "-31";
        return mapper.selectPie(username, start, end);
    }

    public List<LineChartDTO> getLineData(String username) {
        return mapper.selectLine(username);
    }

    public List<BarChartDTO> getBarData(String username) {
        return mapper.selectBar(username);
    }
}
