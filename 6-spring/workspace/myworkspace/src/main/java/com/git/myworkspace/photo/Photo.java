package com.git.myworkspace.photo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

// Spring Data JPA(Java Persistence API, 자바 영속화 API)
//			자바 객체(RAM) -> 테이블 레코드

// ORM(Object Reational Mapping)
// : 객체를 테이블과 맵핑한 것
// : 객체 지향으로 개발 할 수 있게함(소프트웨어공학)
// : 특정 DB에 종속되지 않게함

// @Entity: 테이블과 클래스를 맵핑함
// 기본방법은 Photo(pascal-case) -> photo(snake-case)

@Entity
public class Photo {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String title;
	@Column(columnDefinition = "VARCHAR(1000)")
	private String description;
	@Column(columnDefinition = "TEXT")
	private String photoUrl;
	private String fileType;
	private String fileName;
	private long createdTime;
}
