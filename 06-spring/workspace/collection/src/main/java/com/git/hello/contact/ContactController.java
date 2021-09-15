package com.git.hello.contact;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
//	public ConcurrentSkipListMap<Long, Contact> contacts = new ConcurrentSkipListMap<Long, Contact>();
	private SortedMap<Long, Contact> contacts = Collections
			.synchronizedSortedMap(new TreeMap<Long, Contact>(Collections.reverseOrder()));

//	public AtomicLong maxId = new AtomicLong();
	private AtomicLong maxId = new AtomicLong();

	// Get
	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() {
		// 맵 데이터 역정렬
		return new ArrayList<Contact>(contacts.values());
	}

	// Post
	@PostMapping(value = "/contacts")
	public Contact postContact(@RequestBody Contact contact, HttpServletResponse res) {
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
		Long currentId = maxId.incrementAndGet();

		// 입력받은 객체로 Contact객체 생성
		Contact contactItem = Contact.builder().id(currentId)
				.name(contact.getName().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.phone(contact.getPhone().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.email(contact.getEmail().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.memo(contact.getMemo().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.createdTime(new Date().getTime()).build();
		contacts.put(currentId, contactItem);
		return contactItem;
	}

	// Delete
	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) {
		Contact contact = contacts.get(Long.valueOf(id));
		if (contact == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		contacts.remove(Long.valueOf(id));
		return true;
	}

	// Put
	@PutMapping(value = "/contacts/{id}")
	public Contact editContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) {
		Contact findItem = contacts.get(Long.valueOf(id));
		if (findItem == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
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

		findItem.setName(contact.getName());
		findItem.setPhone(contact.getPhone());
		findItem.setEmail(contact.getEmail());
		findItem.setMemo(contact.getMemo());

		return findItem;
	}
}
