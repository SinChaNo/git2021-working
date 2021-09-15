package com.git.hello;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
//@SpringBootConfiguration: ������ ������ �� �� �ֵ��� ��, ��ü�����ڸ� ����(IoC �����̳�)
//@EnableAutoConfiguration: ����ϴ� �������� ���� �ڵ����� ȯ���� ������
//	-> spring-boot-starter-web: embede Tomcat �������� ������, 8080��Ʈ ���� ���
//@ComponentScan: ������Ʈ���� �˻��Ͽ�(mainŬ���� ����/���� ��Ű���鿡��) �̱������� ��ü���� ��
//	-> Spring Framework ������Ʈ (ex: @Controller) ������̼��� �ִ� Ŭ�������� �˻���
//	-> Spring Framework �̱������� ��ü�� ������

@SpringBootApplication
public class HelloApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelloApplication.class, args);
	}

}
