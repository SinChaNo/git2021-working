package com.git.myworkspace.photo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// photo ���̺��� �����ϴ� ��ü
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long>{
	
}