package com.example.kakeiboApp.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	//DTOバリデーションエラー
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex){
		
		Map<String, String> errors = new HashMap<>();
		
		ex.getBindingResult().getFieldErrors().forEach(err ->
			errors.put(err.getField(), err.getDefaultMessage())
		);
		
		return ResponseEntity.badRequest().body(errors);
	}
	
	//DBで発生した重複違反エラー
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<?> handleDuplicate(DataIntegrityViolationException ex) {

	    Map<String, String> error = new HashMap<>();

	    Throwable cause = ex.getRootCause();
	    String msg = cause != null ? cause.getMessage() : "";

	    if (msg.contains("duplicate key")) {
	        error.put("username", "そのユーザー名は既に使われています");
	    } else {
	        error.put("message", "DBエラー");
	    }
	    return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
	}
	
	@ExceptionHandler(Throwable.class)
	public ResponseEntity<?> handleAll(Throwable ex) {
	    ex.printStackTrace();
	    return ResponseEntity.badRequest().body("error");
	}
}
