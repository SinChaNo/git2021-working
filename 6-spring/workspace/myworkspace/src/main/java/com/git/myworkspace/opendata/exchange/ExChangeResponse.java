package com.git.myworkspace.opendata.exchange;


import javax.persistence.Entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class ExChangeResponse {
	private int result;
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
	
}
