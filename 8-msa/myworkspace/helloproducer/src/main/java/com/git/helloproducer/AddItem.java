package com.git.helloproducer;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddItem {
	// 매물 ID
	private int itemId;
	// 유저 아이디
	private String hostName;
	// 가지고있는 국가
	private String cntHave;
	// 가지고있는 돈
	private int crcHave;
	// 원하는환전 국가
	private String cntWant;
	// 원하는환전 액
	private int crcWant;
	// 거래일자
	private String dDay;
	// 본문
	private String content;
	// 거래상태
	private boolean status;
}
