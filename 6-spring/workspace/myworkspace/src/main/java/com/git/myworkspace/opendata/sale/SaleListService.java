package com.git.myworkspace.opendata.sale;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaleListService {
	
	private RabbitTemplate rabbit;
	
	private SaleListRepository salelistRepository;
	
	@Autowired
	public SaleListService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}
	
	public void sendMessage(byte[] message) {
//		rabbit.send("test.hello.1", new Message(message));
		rabbit.send("service.lobby", new Message(message));
//		rabbit.send("test.hello.3", new Message(message));
	}
}
