package com.example.kakeiboApp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kakeiboApp.DTO.BarChartDTO;
import com.example.kakeiboApp.DTO.PieChartDTO;
import com.example.kakeiboApp.repository.LineChartDTO;

@Service
public interface GraphService {

    // 円グラフ
    public List<PieChartDTO> getPieData(String username, String yearMonth);
    
    	public List<LineChartDTO> getLineData(String username) ;

    public List<BarChartDTO> getBarData(String username) ;
}
