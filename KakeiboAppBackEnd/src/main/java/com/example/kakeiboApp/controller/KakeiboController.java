package com.example.kakeiboApp.controller;

import java.util.List;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kakeiboApp.DTO.KakeiboDTO;
import com.example.kakeiboApp.DTO.MonthlyResponseDTO;
import com.example.kakeiboApp.entity.Category;
import com.example.kakeiboApp.entity.Kakeibo;
import com.example.kakeiboApp.service.KakeiboService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/kakeibo")
public class KakeiboController{
	private final KakeiboService service;
	
	//ユーザー情報と入力日をもとに、
	@GetMapping("/{year}/{month}")
	public MonthlyResponseDTO kakeiboController(
			@PathVariable Integer year, 
			@PathVariable Integer month, 
			@AuthenticationPrincipal UserDetails details) {
		
		String username = details.getUsername();
		return service.getMonthlyDataService(year, month, username);
	}

	//カテゴリーパラメータ一覧を渡し、新規データ作成に利用する
	@GetMapping("/categoryParameter")
	public List<Category> returnCategoryService() {
		return service.getAllCategoryService();
	}
	
	//新規データセーブ
	@PostMapping("/save")
	@Transactional
	public void save(@Valid @RequestBody KakeiboDTO dto) {
		service.save(dto);
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
	public void deleteData(@PathVariable Integer id) {
		int deleteFlagNumber = 9;
		service.deleteService(id, deleteFlagNumber);
	}
	
	//既存データの更新コマンド
	@PutMapping("/update/{id}")
	@Transactional
	public void updateKakeibo(@PathVariable Integer id, 
			@RequestBody KakeiboDTO dto) {
		service.updateService(id, dto);
	}
}
