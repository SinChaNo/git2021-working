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
	// 의존주입
	private PhotoRepository repo;
	private PhotoCommentRepository cmtRepo;
	
	@Autowired
	public PhotoController(PhotoRepository repo) throws InterruptedException {
		this.repo = repo;
	}
	
	@GetMapping(value = "/photos")
	public List<Photo> getPhotos() throws InterruptedException {
		// �⺻������ PK������(asc, ascending) �ǰ� �ִ� ��Ȳ
//		return repo.findAll();
		
		// return repo.findAll(Sort.by("id").descending()); // ������
		// return repo.findAll(Sort.by("id").ascending()); // ������		
		return repo.findAll(Sort.by("id").descending());		
	}
	// ����
	// �������� 2��, 1���� ������
	// GET /photos/paging?page=0&size=2
	@GetMapping("/photos/paging")
	public Page<Photo> getPhotosPaging(@RequestParam int page, int size) {
		// findAll(Pageable page)
		// findAll(PageRequest.of(page, isze
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}
	
	
	@PostMapping(value = "/photos")
	public Photo addPhoto(@RequestBody Photo photo, HttpServletResponse res) throws InterruptedException {
		
		Thread.sleep(1000);	// �ӽ�
		
		// Ÿ��Ʋ�� ��
		if(TextProcesser.isEmpyText(photo.getTitle())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// ����URL�� ��
		if(TextProcesser.isEmpyText(photo.getPhotoUrl())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
	
		
		// ��ü ����
		Photo photoItem = Photo.builder()
									.title(photo.getTitle())
									.description(TextProcesser.getPlainText(photo.getDescription()))
									.photoUrl(photo.getPhotoUrl())
									.fileType(photo.getFileType())
									.fileName(photo.getFileType())
									.createdTime(new Date().getTime())
								.build();
		repo.save(photoItem);
		
		// ���ҽ� ������
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		
		// �߰��� ��ü�� ��ȯ
		return photoItem;
	}
	
	@DeleteMapping(value="/photos/{id}")
	public boolean removePhotos(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
		
		// id�� �ش��ϴ� ��ü�� ������
		// Optional null-safe, �ڹ� 1.8 ���¹��
		Optional<Photo> photo = repo.findById(Long.valueOf(id));
		if(photo.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		
		// ���� ����
		repo.deleteById(id);
		
		return true;
	}
	
	@PutMapping(value="/photos/{id}")	
	public Photo modifyPhotos(@PathVariable long id, @RequestBody Photo photo, HttpServletResponse res)throws InterruptedException {

		// id�� �ش��ϴ� ��ü�� ������
		Optional<Photo> photoItem = repo.findById(Long.valueOf(id));
		if(photoItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
		
		// Ÿ��Ʋ�� ��
		if(TextProcesser.isEmpyText(photo.getTitle())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// ����URL�� ��
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
		
		// id �� ������ UPDATE, ������ INSERT
		Photo photoSaved = repo.save(photoToSave);
		
		return photoSaved;
	}

	@PostMapping(value = "/photos/{photoId}/comments")
	public PhotoComment addPhotoComment(@PathVariable long photoId, @RequestBody PhotoComment comment) {
		comment.setPhotoId(photoId);
		comment.setCreatedTime((new Date().getTime()));

		return cmtRepo.save(comment);
	}

	@GetMapping(value = "/photos/{photoId}/comments")
	public List<PhotoComment> getComments(@PathVariable long photoId){
		return cmtRepo.findByPhotoId(photoId);
	}

}

