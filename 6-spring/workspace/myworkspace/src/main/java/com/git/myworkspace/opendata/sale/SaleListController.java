package com.git.myworkspace.opendata.sale;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.git.myworkspace.opendata.exchange.ExChange;

@RestController
public class SaleListController {
	private SaleListRepository repo;
	private SaleListService service;
	
	@Autowired
	public SaleListController(SaleListRepository repo, SaleListService service) throws InterruptedException{
		this.repo = repo;
		this.service = service;
	}
	
	// Get
	@GetMapping(value = "/saleItemList")
	public List<SaleList> getsale() {
		return repo.findAll();
	}
	
	
	//post
	@PostMapping(value = "/saleItemList")
	public SaleList postsale(@RequestBody SaleList salelist, HttpServletResponse res ) throws InterruptedException, IOException {
		// 세일 리스트에 객체 넣기
		SaleList saleListItem = SaleList.builder()
				.hostName(salelist.getHostName())
				.cntHave(salelist.getCntHave())
				.crcHave(salelist.getCrcHave())
				.cntWant(salelist.getCntWant())
				.crcWant(salelist.getCrcWant())
				.dDay(salelist.getDDay())
				.content(salelist.getContent())
				.status(true)
				.build();
		// DB에 매물정보 저장
		repo.save(saleListItem);
		
		// saleLIstItem은 Stirng 배열
		ObjectMapper mapper = new ObjectMapper();
		// String array -> json
		String jsonString = mapper.writeValueAsString(saleListItem);
		System.out.println(jsonString);
		
		// byte 배열 메세지 생성
		// saleListItem을 massage byte배열에 저장
		byte[] message = jsonString.getBytes();

		// 변환한 byte[] 확인
		System.out.println(message);
		// rabbitmq 로 메세지 전송
		service.sendMessage(message);
		// 완료시 http 코드 보냄
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		return saleListItem;
	}
	
	// 메세지 통신 테스트용 매핑
	@PostMapping(value = "/send-message")
	public boolean sendMessage(@RequestBody String message, HttpServletRequest req) {
		System.out.println(req.getHeader("content-type"));

		System.out.println(message);
		service.sendMessage(message.getBytes());
		
		return true;
	}
	
//	@GetMapping(value = "/saleItemList/latest")
//	public List<SaleList>getSaleListLatestCurrnet(@PathVariable int itemId) {
//		Pageable page = PageRequest.of(0, 3, Sort.by("itemId").descending());
//		return repo.findFirst10ByitemId(page, itemId);
//	}
	
	// 최근 3건만 조회하는 페이징
	@GetMapping(value = "/saleItemList/latest")
	public Page<SaleList> getsalelatest(){
		Pageable limit = PageRequest.of(0, 3, Sort.by("itemId").descending());
		return repo.findAll(limit);
	}
	
}
