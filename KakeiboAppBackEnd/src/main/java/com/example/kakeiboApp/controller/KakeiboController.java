package com.example.kakeiboApp.controller;

import java.util.List;
import java.util.Map;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.MonthlyResponseDTO;
import com.example.kakeiboApp.entity.Category;
import com.example.kakeiboApp.service.KakeiboService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Transactional
@RequiredArgsConstructor
@RequestMapping("/index")
public class KakeiboController{
	private final KakeiboService service;
	
	//セーブ用に
	
	//指定した日の直前の11日から一か月の間（翌10日まで）の全データ取得
	@GetMapping("/{year}/{month}/{day}")
	public MonthlyResponseDTO indexController(@PathVariable Integer year, 
			@PathVariable Integer month, @PathVariable Integer day) {
		
		return service.getMonthlyDataService(year, month, day);
	}
	
	//家計簿のページをめくるたび、いま確認している月の収入を獲得する
	@GetMapping("/monthlyIncome/{year}/{month}/{day}")
	public Integer returnMonthlyIncome(@PathVariable Integer year, 
			@PathVariable Integer month, @PathVariable Integer day) {
		return service.getMonthlyTotalIncomeService(year, month, day);
	}
	
	//家計簿のページをめくるたび、いま確認している月の支出を確認する
	@GetMapping("/monthlyOutgo/{year}/{month}/{day}")
	public Integer returnMonthlyOutgo(@PathVariable Integer year, 
			@PathVariable Integer month, @PathVariable Integer day) {
		return service.getMonthlyTotalOutgoService(year,month, day);
	}

	//カテゴリーパラメータ一覧を渡し、新規データ作成に利用する
	@GetMapping("/categoryParameter")
	public List<Category> returnCategoryService() {
		return service.getAllCategoryService();
	}
	
	//新規データセーブ
	@PostMapping("/save")
	public Map<String, Object> save(@RequestBody Map<String, Object> data) {
		System.out.println(data);
		return data;
	}

}
