package com.example.kakeiboApp.controller;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.DTO.MonthlyResponseDTO;
import com.example.kakeiboApp.entity.Category;
import com.example.kakeiboApp.entity.Kakeibo;
import com.example.kakeiboApp.service.KakeiboService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/index")
public class KakeiboController{
	private final KakeiboService service;
	
	//指定した日の直前の11日から一か月の間（翌10日まで）の全データ取得
	//11日に入力した場合、「先月の11日から」ではなく、「当月の11日から」である
	@GetMapping("/{year}/{month}/{day}")
	public MonthlyResponseDTO indexController(@PathVariable Integer year, 
			@PathVariable Integer month, @PathVariable Integer day, @RequestParam String username) {
		
		return service.getMonthlyDataService(year, month, day, username);
	}

	//カテゴリーパラメータ一覧を渡し、新規データ作成に利用する
	@GetMapping("/categoryParameter")
	public List<Category> returnCategoryService() {
		return service.getAllCategoryService();
	}
	
	//新規データセーブ
	@PostMapping("/save")
	@Transactional
	public void save(@RequestBody Kakeibo kakeibo) {
		service.save(kakeibo);
	}
	
	//カード上の「褒める」ボタン押下で褒める変化、再計上
	@PutMapping("/homeru/{id}")
	@Transactional
	public void updateHomeru(@PathVariable Integer id,
	                         @RequestBody Kakeibo kakeibo) {
	    service.updateHomeru(id, kakeibo.getHomeru());
	}
	
	//既存データカードをクリックしたとき、
	//詳細・編集・削除ができる画面へ遷移
	@GetMapping("/showdata/{id}")
	public KakeiboDTO showKakeiboDetail(@PathVariable Integer id) {
		return service.getByIdService(id);
	}
	
	//削除コマンド
	@PutMapping("delete/{id}")
	@Transactional
	public void deleteData(@PathVariable Integer id,
							@RequestBody Kakeibo kakeibo) {
		service.deleteService(id, 9);
	}
	
	//既存データの更新コマンド
	@PutMapping("/update/{id}")
	public void updateKakeibo(@PathVariable Integer id, 
			@RequestBody KakeiboDTO dto) {
		service.updateService(id, dto);
	}
}
