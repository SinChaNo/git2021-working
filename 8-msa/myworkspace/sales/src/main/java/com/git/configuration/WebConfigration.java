package com.git.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfigration implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:3000", "http://127.0.0.1:5500/",
				"http://ec2-54-180-135-245.ap-northeast-2.compute.amazonaws.com/").allowedMethods("*");
	}
}
