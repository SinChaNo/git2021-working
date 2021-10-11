package com.git.myworkspace.opendata.covid;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(indexes = @Index(name = "idx_covid_sido_daily_1", columnList = "gubun"))
@IdClass(CovidSidoDailyId.class)
public class CovidSidoDaily {
	// 기준일시
	@Id
	private String stdDay;
	// 시도명(한글)
	@Id
	@Column(columnDefinition = "varchar(20) collate \"ko_KR.utf8\"")
	private String gubun;
	
	// 전일대비 증감 수
	private Integer incDec;
	// 확진자 수
	private Integer defCnt;
	// 격리중 환자수
	private Integer isolIngCnt;
	// 해외유입 수
	private Integer overFlowCnt;
	// 지역발생 수
	private Integer localOccCnt;
}
