package com.git.myworkspace.opendata.covid;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class CovidService {
	
	private final String SERVICE_KEY = "HfulIbzTzvC%2FpEtI37wWaIUwpJmlbfzDP8Go1s%2BZLUAbWzi%2FpyRUqxYjGujtnaQn%2F3lMr3vIXiu3IFg1wd26Kw%3D%3D";
	
	private CovidSidoHourRepository repo;
	
	@Autowired
	public CovidService(CovidSidoHourRepository repo) {
		this.repo = repo;
	}
	
	@Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	@SuppressWarnings("deprecation")
	public void requestCovidSidoHour() throws IOException {
		System.out.println(new Date().toLocaleString());
		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi");
		builder.append("/service/rest");
		builder.append("/Covid19/getCovid19SidoInfStateJson");
		builder.append("?serviceKey=" + SERVICE_KEY);
//		builder.append("&pageNo=1&numOfRows=10&startCreateDt=20200410&endCreateDt=20200410");
		
		System.out.println(builder.toString());
		
		URL url = new URL(builder.toString());
		
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		
		byte[] result = con.getInputStream().readAllBytes();
		
		String data = new String(result);
		System.out.println(data);
		
		String json = XML.toJSONObject(data).toString(2);
		System.out.println(json);
		
		CovidSidoHourResponse response = new Gson().fromJson(json, CovidSidoHourResponse.class);
		System.out.println(response);
		
		List<CovidSidoHour> list = new ArrayList<CovidSidoHour>();
		for (CovidSidoHourResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			CovidSidoHour record = CovidSidoHour.builder().stdDay(item.getStdDay()).gubun(item.getGubun())
					.incDec(item.getIncDec()).defCnt(item.getDefCnt()).isolIngCnt(item.getIsolIngCnt()).overFlowCnt(item.getOverFlowCnt())
					.localOccCnt(item.getLocalOccCnt()).build();
			
			list.add(record);
		}
		repo.saveAll(list);
	}
}














