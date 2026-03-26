package com.example.kakeiboApp.service;


import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.kakeiboApp.DTO.PaydayDTO;
import com.example.kakeiboApp.DTO.RegisterDTO;
import com.example.kakeiboApp.DTO.UserCallUpDTO;
import com.example.kakeiboApp.DTO.UserCreateDTO;
import com.example.kakeiboApp.entity.UserBody;
import com.example.kakeiboApp.repository.UserMapper;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
	private final UserMapper mapper;
	private final PasswordEncoder encoder;
	
	//usernameでユーザー呼出
	@Override
	public UserCallUpDTO findByNameService(String username, String pass) {
		UserCallUpDTO dto = new UserCallUpDTO();
		Optional<UserBody> body = mapper.findByName(username);
		
		if(body == null) {
			dto.setMessage("認証に失敗しました");
			return dto;
		}
		
		UserBody userBody = body.get();
		
		if(encoder.matches(pass, userBody.getPassword())) {
			dto.setUsername(username);
			dto.setId(userBody.getId());
			dto.setRoles(userBody.getRoles());
			dto.setPayday(userBody.getPayday());
			return dto;
		}else {
			dto.setMessage("認証に失敗しました");
			return dto;
		}
	}
	
	//新規ユーザー登録
	@Override
	@Transactional
	public RegisterDTO userCreateService(UserCreateDTO dto) {
		RegisterDTO rd = new RegisterDTO();
		String hashed = encoder.encode(dto.getPassword());
		
		UserBody user = new UserBody();
		
		user.setUsername(dto.getUsername());
		user.setPassword(hashed);
		user.setPayday(dto.getPayday());
		user.setRoles(dto.getRoles());
	
		int rtn = mapper.registerUser(user);
		rd.setRegistered(rtn == 1);
		rd.setMessage(rtn == 1 ? "ユーザー登録成功" : "登録に失敗しました");
		
		return rd;
	}
	
	//ユーザー名重複チェック
	public void existsByUsernameService(String username) {
		if(mapper.existsByUsername(username) > 0) {
			throw new ResponseStatusException(
					HttpStatus.BAD_REQUEST,
					"そのユーザー名はすでに使われています");
		}
	};
	
	//ユーザー給料日情報取得
	public int getPaydayService(String username) {
		return mapper.getPayday(username);
	}

	//ユーザー給料日情報更新
	@Override
	public PaydayDTO updatePaydayService(PaydayDTO dto) {
		
		String username = dto.getUsername();
		int payday = dto.getPayday();
		var returnDto = new PaydayDTO();
		try {
			mapper.updatePayday(username, payday);
			returnDto.setPayday(payday);
			returnDto.setMessage("給料日を更新しました");
		}catch(Exception e) {
			returnDto.setPayday(dto.getPayday());
			returnDto.setMessage("給料日の更新に失敗しました");
		}
		
		return returnDto;
	}

}
