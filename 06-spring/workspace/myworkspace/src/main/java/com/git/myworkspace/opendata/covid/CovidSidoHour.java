package com.git.myworkspace.opendata.covid;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(name = "idx_covid_sido_hour_1", columnList = "gubun"))
@IdClass(CovidSidoHourId.class)
public class CovidSidoHour {
	// 기준일시
	@Id
	private String stdDay;
	// 시도명(한글)
	@Id
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
