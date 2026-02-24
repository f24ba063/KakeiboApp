package com.example.kakeiboApp;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Transactional
@RequestMapping("/index")
public class KakeiboController{

	public String indexController() {
		
	return "index";
	}
}
