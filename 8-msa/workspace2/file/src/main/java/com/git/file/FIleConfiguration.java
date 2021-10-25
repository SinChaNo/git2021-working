package com.git.file;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FIleConfiguration {

    // s3에 접속하는 클라이언트를 싱글턴을 생성
    // Spring에서 의존 주입해주는 객체로 사용하겠다.
    @Bean
    public AmazonS3 getS3Client() {
        AWSCredentials credentials

        return null;
    }
}
