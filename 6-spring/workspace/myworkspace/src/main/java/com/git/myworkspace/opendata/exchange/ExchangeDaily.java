package com.git.myworkspace.opendata.exchange;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ExchangeDaily {
	private final static String authKey = "coZvPjTmHHugazuTqHYxjKaYG3JKVMHs";
	public static void main(String[] args) {
		BufferedReader br = null;
		try {
			String urlStr = "https://www.koreaexim.go.kr/"
							+"site/program/financial/exchangeJSON"
							+"?authkey=" + authKey
							+"&searchdate=20180102"
							+ "&data=AP01";
			URL url = new URL(urlStr);
			HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();
			urlconnection.setRequestMethod("GET");
			br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream(),"UTF-8"));
			String result = "";
			String line;
			while((line = br.readLine()) != null) {
				result = result + line + "\n";
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
