package com.git.myworkspace.photo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.git.myworkspace.lib.TextProcesser;

@RestController
public class PhotoController {
	
	private PhotoRepository repo;
	
	@Autowired
	public PhotoController(PhotoRepository repo) throws InterruptedException {
		this.repo = repo;
	}
	
	@GetMapping(value = "/photos")
	public List<Photo> getPhotos() throws InterruptedException {
		// 기본적으로 PK순정렬(asc, ascending) 되고 있는 상황
//		return repo.findAll();
		
		// return repo.findAll(Sort.by("id").descending()); // 역정렬
		// return repo.findAll(Sort.by("id").ascending()); // 순정렬		
		return repo.findAll(Sort.by("id").descending());		
	}
	// 예시
	// 한페이지 2개, 1번쨰 페이지
	// GET /photos/paging?page=0&size=2
	@GetMapping("/photos/paging")
	public Page<Photo> getPhotosPaging(@RequestParam int page, int size) {
		// findAll(Pageable page)
		// findAll(PageRequest.of(page, isze
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}
	
	
	@PostMapping(value = "/photos")
	public Photo addPhoto(@RequestBody Photo photo, HttpServletResponse res) throws InterruptedException {
		
		Thread.sleep(1000);	// 임시
		
		// 타이틀이 빈값
		if(TextProcesser.isEmpyText(photo.getTitle())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// 파일URL이 빈값
		if(TextProcesser.isEmpyText(photo.getPhotoUrl())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
	
		
		// 객체 생성
		Photo photoItem = Photo.builder()
									.title(photo.getTitle())
									.description(TextProcesser.getPlainText(photo.getDescription()))
									.photoUrl(photo.getPhotoUrl())
									.fileType(photo.getFileType())
									.fileName(photo.getFileType())
									.createdTime(new Date().getTime())
								.build();
		repo.save(photoItem);
		
		// 리소스 생성됨
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		
		// 추가된 객체를 반환
		return photoItem;
	}
	
	@DeleteMapping(value="/photos/{id}")
	public boolean removePhotos(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
		
		// id에 해당하는 객체가 없으면
		// Optional null-safe, 자바 1.8 나온방식
		Optional<Photo> photo = repo.findById(Long.valueOf(id));
		if(photo.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		
		// 삭제 수행
		repo.deleteById(id);
		
		return true;
	}
	
	@PutMapping(value="/photos/{id}")	
	public Photo modifyPhotos(@PathVariable long id, @RequestBody Photo photo, HttpServletResponse res)throws InterruptedException {

		// id에 해당하는 객체가 없으면
		Optional<Photo> photoItem = repo.findById(Long.valueOf(id));
		if(photoItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
		
		// 타이틀이 빈값
		if(TextProcesser.isEmpyText(photo.getTitle())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// 파일URL이 빈값
		if(TextProcesser.isEmpyText(photo.getPhotoUrl())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		Photo photoToSave = photoItem.get();
		
		photoItem.get().setTitle(photo.getTitle());
		photoItem.get().setDescription(TextProcesser.getPlainText(photo.getDescription()));
		photoItem.get().setPhotoUrl(photo.getPhotoUrl());
		photoItem.get().setFileType(photo.getFileType());
		photoItem.get().setFileName(photo.getFileType());
		
		// id 가 있으면 UPDATE, 없으면 INSERT
		Photo photoSaved = repo.save(photoToSave);
		
		return photoSaved;
	}
}

