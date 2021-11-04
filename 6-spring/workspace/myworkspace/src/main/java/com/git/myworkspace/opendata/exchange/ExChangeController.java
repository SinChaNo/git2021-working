package com.git.myworkspace.opendata.exchange;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExChangeController {
	private ExChangeRepository repo;
	
	@Autowired
	public ExChangeController(ExChangeRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping(value = "/exchange/rate")
	public List<ExChange>getExChangeCurrent(){
		return repo.findAll();
	}
	
}
