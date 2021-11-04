package com.git.myworkspace.opendata.exchange;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
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
	private final String SearchDate = "20180102";
	
	private ExChangeRepository repo;
	
//	@Autowired
	public ExChangeService(ExChangeRepository repo) {
		this.repo = repo;
	}
	// 스케쥴 시간마다 실행 
	@Scheduled(fixedRate = 1000000)
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
		
		List<ExChangeResponse> list = 
			mapper.readValue(data, new TypeReference<List<ExChangeResponse>>(){});
		
		for(ExChangeResponse res : list) {
			System.out.println(res.getCur_nm() + "/" + res.getCur_unit() + "/" + res.getDeal_bas_r());
		}
		
		// 응답 객체 -> 엔티티
		List<ExChange> item = new ArrayList<ExChange>();
		for(ExChangeResponse res : list) {
			ExChange record = ExChange.builder().result(res.getResult()).curUnit(res.getCur_unit()).ttb(res.getTtb()).tts(res.getTts())
						.dealBasR(res.getDeal_bas_r()).bkpr(res.getBkpr()).yyEfeeR(res.getYy_efee_r())
						.tenDdEfeeR(res.getTen_dd_efee_r()).kftcDkpr(res.getKftc_bkpr()).kftcDealDasR(res.getKftc_deal_bas_r())
						.build();
			item.add(record);
		}
		for(ExChangeResponse rates : list) {
			System.out.println(rates);
		}
		
		repo.saveAll(item);
	}
}
