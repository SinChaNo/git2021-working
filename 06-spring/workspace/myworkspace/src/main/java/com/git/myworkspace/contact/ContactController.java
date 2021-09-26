package com.git.myworkspace.contact;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
////	public ConcurrentSkipListMap<Long, Contact> contacts = new ConcurrentSkipListMap<Long, Contact>();
//	private SortedMap<Long, Contact> contacts = Collections
//			.synchronizedSortedMap(new TreeMap<Long, Contact>(Collections.reverseOrder()));
//
////	public AtomicLong maxId = new AtomicLong();
//	private AtomicLong maxId = new AtomicLong();
	
	private ContactRepository repo;
	
	@Autowired
	public ContactController(ContactRepository repo) {
		this.repo = repo;
	}

	// Get
	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() {
		// 맵 데이터 역정렬
		return repo.findAll();
	}

	// Post
	@PostMapping(value = "/contacts")
	public Contact postContact(@RequestBody Contact contact, HttpServletResponse res) {
		System.out.println(contact);
		// Error
		if (contact.getName() == null || contact.getName().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}
		if (contact.getPhone() == null || contact.getPhone().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}
		if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}
		
		// create Id
//		Long currentId = maxId.incrementAndGet();

		// 입력받은 객체로 Contact객체 생성
		Contact contactItem = Contact.builder()
				.name(contact.getName().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.phone(contact.getPhone().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.email(contact.getEmail().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.createdTime(new Date().getTime())
				.build();
		repo.save(contactItem);
		
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		return contactItem;
	}

	// Delete
	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) {
		Optional<Contact> contact = repo.findById(Long.valueOf(id));
		if (contact.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		repo.deleteById(id);
		return true;
	}

	// Put
	@PutMapping(value = "/contacts/{id}")
	public Contact editContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) {
		Optional<Contact> contactItem = repo.findById(Long.valueOf(id));
		if (contactItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
//		// Error
//		if (contactItem.isEmpty()) {
//			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//
//			return null;
//		}
//		if (contact.getPhone() == null || contact.getPhone().isEmpty()) {
//			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//
//			return null;
//		}
//		if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
//			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//
//			return null;
//		}
		
		Contact contactToSave = contactItem.get();

		contactItem.get().setName(contact.getName());
		contactItem.get().setPhone(contact.getPhone());
		contactItem.get().setEmail(contact.getEmail());
		
		Contact contactSaved = repo.save(contactToSave);

		return contactSaved;
	}
}
