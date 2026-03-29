package com.example.kakeiboApp.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.BarChartDTO;
import com.example.kakeiboApp.DTO.PieChartDTO;
import com.example.kakeiboApp.repository.LineChartDTO;
import com.example.kakeiboApp.service.GraphService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("graph")
public class GraphController {
    private final GraphService service;


    @GetMapping("/pie")
    public List<PieChartDTO> getPie(
        Authentication auth,
        @RequestParam String yearMonth
    ) {
        return service.getPieData(auth.getName(), yearMonth);
    }

    @GetMapping("/line")
    public List<LineChartDTO> getLine(Authentication auth) {
        return service.getLineData(auth.getName());
    }

    @GetMapping("/bar")
    public List<BarChartDTO> getBar(Authentication auth) {
        return service.getBarData(auth.getName());
    }
}
