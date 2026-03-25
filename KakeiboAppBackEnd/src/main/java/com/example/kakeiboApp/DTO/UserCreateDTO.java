package com.example.kakeiboApp.DTO;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserCreateDTO {
	
	@NotBlank(message = "ユーザー名は必須です")
	@Size(max =20, message ="ユーザー名は{max}文字以下です")
	private String username;
	
	@NotBlank(message = "パスワードは必須です")
	@Size(max =60, message ="パスワードは{max}文字以下です")
	private String password;
	
	@Max(value =28, message ="給料日は{value}日以前を設定してください")
	@Min(value =1, message ="給料日は{value}日以降を設定してください")
	private Integer payday;
	
	//rolesだけはユーザーとしての登録のみを想定しています
	private String roles ="ROLE_USER";
}
