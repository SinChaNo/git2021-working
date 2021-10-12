package com.git;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
	private ProductService service;
	
	public ProductController(ProductService service) {
		this.service = service;
	}
	@PostMapping(value = "/products")
	public Product addProduct(@RequestBody Product product) {
		// 데이터 검증
		
		// DB에 저장
		
		// (event)외부 시스템에 추가된 데이터 보내기
		
		return null;
	}
}
