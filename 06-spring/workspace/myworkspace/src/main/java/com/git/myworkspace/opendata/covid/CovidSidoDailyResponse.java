package com.git.myworkspace.opendata.covid;

import java.util.List;
import lombok.Data;

@Data
public class CovidSidoDailyResponse {
	private Response response;
	
	@Data
	public class Response {
		private Header header;
		private Body body;
	}
	
	@Data
	public class Header {
		private String resultCode;
		private String resultMsg;
	}
	
	@Data
	public class Body {
		private Items items;
	}
	
	@Data
	public class Items {
		private List<Item> item;
	}
	
	@Data
	public class Item {
		// 기준일시
		private String stdDay;
		// 시도명(한글)
		private String gubun;
		// 전일대비 증감 수
		private String incDec;
		// 확진자 수
		private String defCnt;
		// 격리중 환자수
		private String isolIngCnt;
		// 해외유입 수
		private String overFlowCnt;
		// 지역발생 수
		private String localOccCnt;
		
	}
	
	
	
}
