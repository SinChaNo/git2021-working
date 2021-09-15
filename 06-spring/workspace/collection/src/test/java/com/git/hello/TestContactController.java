package com.git.hello;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.git.hello.contact.Contact;
import com.git.hello.contact.ContactController;

@SpringBootTest
public class TestContactController {

	@Test
	void addContact() {
		ContactController controller = new ContactController();
		Contact expected = Contact.builder().name("Test").phone("010-1234-1234").email("email@email.com").memo("Test")
				.build();

		controller.postContact(expected, new MockHttpServletResponse());

		List<Contact> contacts = controller.getContacts();
		Contact actual = contacts.get(0);

		assertEquals(1, actual.getId());
		assertEquals(expected.getName(), actual.getName());
		assertEquals(expected.getPhone(), actual.getPhone());
		assertEquals(expected.getEmail(), actual.getEmail());
		assertEquals(expected.getMemo(), actual.getMemo());
	}

	void removeContact() {
		ContactController controller = new ContactController();
		Contact testItem = Contact.builder().name("Test").phone("010-1234-1234").email("email@email.com").memo("Test")
				.build();
		controller.postContact(testItem, new MockHttpServletResponse());

		List<Contact> beforeContacts = controller.getContacts();
		assertEquals(1, beforeContacts.size());
		controller.removeContact(1, new MockHttpServletResponse());

		List<Contact> afterContacts = controller.getContacts();
		assertEquals(0, afterContacts.size());
	}

	void editContact() {
		ContactController controller = new ContactController();

		Contact testItem = Contact.builder().name("Test").phone("010-1234-1234").email("email@email.com").memo("Test")
				.build();
		controller.postContact(testItem, new MockHttpServletResponse());

		String editName = "Edit Name";
		String editPhone = "Edit Phone";
		String editEmail = "Edit Email";
		String editMemo = "Edit Memo";
		Contact editData = Contact.builder().name(editName).phone(editPhone).email(editEmail).memo(editMemo).build();

		HttpServletResponse res = new MockHttpServletResponse();

		controller.editContact(1, editData, res);
		List<Contact> contacts = controller.getContacts();
		assertEquals(editName, contacts.get(0).getPhone());
		assertEquals(editPhone, contacts.get(0).getEmail());
		assertEquals(editEmail, contacts.get(0).getName());
		assertEquals(editMemo, contacts.get(0).getMemo());

		Contact resultContactId = controller.editContact(2, editData, res);
		assertNull(resultContactId);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, res.getStatus());

		Contact resultContactItemNull = controller.editContact(1, new Contact(), res);
		assertNull(resultContactItemNull);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

		Contact resultContactItemEmpty = controller.editContact(1,
				Contact.builder().name("").phone("").email("").memo("").build(), res);
		assertNull(resultContactItemEmpty);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());
	}
}
