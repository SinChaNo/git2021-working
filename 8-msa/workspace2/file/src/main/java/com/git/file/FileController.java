package com.git.file;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.util.Date;

@RestController
public class FileController {

    private final String BUCKET_NAME = "git2021-bucket";
    private AmazonS3 client;

    @Autowired
    public FileController(AmazonS3 client){
        this.client = client;
    }

    @PostMapping("/files")
    public String uploadFile(@RequestPart("file")MultipartFile file) {
        System.out.println(file.getOriginalFilename());

        // 1.파일메타 데이터 생성
        // S3에 올라가는 메타데이터를 설정해줌
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType()); // image/jpeg
        metadata.setContentLength(file.getSize());// 50kb

        String objectKey = "";

        return "";
    }

    private String getObjectKey(String filename) {
        String secret = "git2021";
        long timestamp = new Date().getTime();

        return sha256Hex(data: secret + filename + timestamp);
    }
}
