package com.git.hello.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	// CORS(cross origin resource sharing)�� ����
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
				// ���� ��å�� ������ ���ҽ�
				.addMapping("/**") // -> ��ü ���ҽ��� ���(/todos, /contacts...)
				// ������å�� ����� ������ ���
				// origin: html ������ ������ ������ �ּ�
				//
				.allowedOrigins("http://localhost:3000",
						"http://ec2-54-180-135-245.ap-northeast-2.compute.amazonaws.com/")
				// ������å���� ���� HTTP�޼���
				.allowedMethods("*"); // ��ü�޼��带 ���(GET, POST, PUT ... )
	}
}