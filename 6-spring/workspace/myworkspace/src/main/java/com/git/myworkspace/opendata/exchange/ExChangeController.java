package com.git.myworkspace.opendata.exchange;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component("ExChangeController")
@RestController
@RequestMapping(value = "/lobby")
public class ExChangeController {
	private ExChangeRepository repo;
	
	@Autowired
	public ExChangeController(ExChangeRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping(value = "/test")
	public String test() {
		System.out.println("--service 2--");
		return "this lobby service";
	}
	
	@GetMapping(value = "/rate")
	public List<ExChange>getExChangeCurrent(){
		return repo.findAll();
	}
	
	@GetMapping(value = "/rate/{curUnit}")
	public List<ExChange>getExChangeCurrent(@PathVariable String curUnit){
		Pageable page = PageRequest.of(0, 32, Sort.by("curUnit").descending());
		return repo.findByCurUnit(page, curUnit);
	}
	
}
