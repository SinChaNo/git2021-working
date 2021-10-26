package com.git.myworkspace.opendata.exchange;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class ExChangeService {
	private final String AuthKey = "coZvPjTmHHugazuTqHYxjKaYG3JKVMHs";
	
	private ExChangeRepository repo;
	
	@Autowired
	public ExChangeService(ExChangeRepository repo) {
		this.repo = repo;
	}
	
	@CacheEvict(value = "exchange-current", allEntries = true)
	@SuppressWarnings("deprecation")
	public void requestExChange() throws IOException{
		System.out.println(new Date().toLocaleString());
		StringBuilder builder = new StringBuilder();
		builder.append("https://www.koreaexim.go.kr/");
		builder.append("site/program/financial/exchangeJSON");
		builder.append("?authkey=" + AuthKey);
		builder.append("&searchdate=20180102");
		builder.append("&data=AP01");
		
		System.out.println(builder.toString());
		
		URL url = new URL(builder.toString());
		
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		
		byte[] result = con.getInputStream().readAllBytes();
		
		String data = new String(result);
		System.out.println(data);
		
		String json = XML.toJSONObject(data).toString(2);
		System.out.println(json);
		
		ExChangeResponse response = new Gson().fromJson(json, ExChangeResponse.class);
		System.out.println(response);
		
		List<ExChange> list = new ArrayList<ExChange>();
		
	}
}
