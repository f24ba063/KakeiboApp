package com.example.kakeiboApp.DTO;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
//一か月分の家計簿データを取得しつつ、家計簿データ探索状況によって
//「今月はなんの記述もなかった」、「最古以前・最新以後のデータを
//探そうとしている」場合にメッセージを持っていく仕事
public class MonthlyResponseDTO {
	private List<KakeiboDTO> data;
	private String status = "OK";
}
