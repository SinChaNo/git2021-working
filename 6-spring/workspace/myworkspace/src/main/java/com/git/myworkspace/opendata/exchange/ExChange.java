package com.git.myworkspace.opendata.exchange;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ExChange {
	@Id
	private String curUnit;
	private String ttb;
	private String tts;
	private String dealBasR;
	private String bkpr;
	private String yyEfeeR;
	private String tenDdEfeeR;
	private String kftcDkpr;
	private String kftcDealDasR;
	private String curNm;
	private int result;
}
