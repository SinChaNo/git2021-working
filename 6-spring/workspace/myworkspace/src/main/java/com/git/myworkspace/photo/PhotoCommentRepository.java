package com.git.myworkspace.photo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


// 테이블 저장하고 기능하는
public interface PhotoCommentRepository extends JpaRepository<PhotoComment, Long> {
    List<PhotoComment> findByPhotoId(long photoId);
}
