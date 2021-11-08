package com.git.myworkspace.opendata.exchange;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//import org.springframework.beans.fa/ctory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ExChangeService {
	
	private final String AuthKey = "coZvPjTmHHugazuTqHYxjKaYG3JKVMHs";
	private final String SearchDate = "20211105";
	
	private ExChangeRepository repo;
	
//	@Autowired
	public ExChangeService(ExChangeRepository repo) {
		this.repo = repo;
	}
	// 스케쥴 시간마다 실행 
	@Scheduled(cron = "0 0 0/1 * * *")
	@SuppressWarnings("deprecation")
	public void requestExChange() throws IOException{
		System.out.println(new Date().toLocaleString());
		StringBuilder builder = new StringBuilder();
		builder.append("https://www.koreaexim.go.kr/");
		builder.append("site/program/financial/exchangeJSON");
		builder.append("?authkey=" + AuthKey);
		builder.append("&searchdate=" + SearchDate);
		builder.append("&data=AP01");
		
		System.out.println(builder.toString());
		
		// URL 객체 생성 
		URL url = new URL(builder.toString());
		
		// http 접속 생성 
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		
		// byte 배열로 데이터를 읽어옴 
		byte[] result = con.getInputStream().readAllBytes();
		
		// 읽어온 데이터가 JSON이기 때문에 바로 DATA로 대입 
		String data = new String(result);
		System.out.println(data);
		
		// mapper 선언
		ObjectMapper mapper = new ObjectMapper();
		
		// mapper를 이용하여 JSon을 JAVA LIST객체화
		List<ExChangeResponse> list = 
			mapper.readValue(data, new TypeReference<List<ExChangeResponse>>(){});
		
		for(ExChangeResponse res : list) {
			System.out.println(res.getCur_nm() + "/" + res.getCur_unit() + "/" + res.getDeal_bas_r());
		}
		
		// 응답 객체 -> 엔티티
		// 데이터 현재 문자형 매매기준율 : "1,000.12"
		// String -> double (','를 제거하기 위해 .replaceAll 사용
		List<ExChange> item = new ArrayList<ExChange>();
		for(ExChangeResponse res : list) {
			ExChange record = ExChange.builder().curUnit(res.getCur_unit()).ttb(Double.parseDouble(res.getTtb().replaceAll(",", "")))
					.tts(Double.parseDouble(res.getTts().replaceAll(",", ""))).dealBasR(Double.parseDouble(res.getDeal_bas_r().replaceAll(",", ""))).curNm(res.getCur_nm())
					.build();
			item.add(record);
		}
		// 엔티티 객체 -> 리포지터리로 저장 
		repo.saveAll(item);
	}
}
