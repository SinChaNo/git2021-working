package com.git.myworkspace.opendata.exchange;


import javax.persistence.Entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class ExChangeResponse {
	@Id
	private String cur_unit;
	private String ttb;
	private String tts;
	private String deal_bas_r;
	private String bkpr;
	private String yy_efee_r;
	private String ten_dd_efee_r;
	private String kftc_bkpr;
	private String kftc_deal_bas_r;
	private String cur_nm;
	private int result;
	
//	public int getResult() {
//		return result;
//	}
//	
//	public void setResult(int result) {
//		this.result = result;
//	}
//	
//	public String getCur_unit() {
//		return cur_unit;
//	}
//	
//	public void setCur_unit(String cur_unit) {
//		this.cur_unit = cur_unit;
//	}
//	
//	public String getTtb() {
//		return ttb;
//	}
//	
//	public void setTtb(String ttb) {
//		this.ttb = ttb;
//	}	
//	
//	public String getTts() {
//		return tts;
//	}
//	
//	public void setTts(String tts) {
//		this.tts = tts;
//	}
//	
//	public String getDeal_bas_r() {
//		return deal_bas_r;
//	}
//	
//	public void setDeal_bas_r(String deal_bas_r) {
//		this.deal_bas_r = deal_bas_r;
//	}
//	
//	public String getBkpr() {
//		return bkpr;
//	}
//	
//	public void setBkpr(String bkpr) {
//		this.bkpr = bkpr;
//	}
//	
//	public String getYy_efee_r() {
//		return yy_efee_r;
//	}
//	
//	public void setYy_efee_r(String yy_efee_r) {
//		this.yy_efee_r = yy_efee_r;
//	}
//	
//	public String getTen_dd_efee_r() {
//		return ten_dd_efee_r;
//	}
//	
//	public void setTen_dd_efee_r(String ten_dd_efee_r) {
//		this.ten_dd_efee_r = ten_dd_efee_r;
//	}
//	
//	public String getKftc_bkpr() {
//		return kftc_bkpr;
//	}
//	
//	public void setKftc_bkpr(String kftc_bkpr) {
//		this.kftc_bkpr = kftc_bkpr;
//	}
//	
//	public String getKftc_deal_bas_r() {
//		return kftc_deal_bas_r;
//	}
//	
//	public void setKftc_deal_bas_r(String kftc_deal_bas_r) {
//		this.kftc_deal_bas_r = kftc_deal_bas_r;
//	}
//	
//	public String getCur_nm() {
//		return cur_nm;
//	}
//	
//	public void setCur_nm(String cur_nm) {
//		this.cur_nm = cur_nm;
//	}
}
