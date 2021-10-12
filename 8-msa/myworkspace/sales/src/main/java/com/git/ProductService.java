package com.git;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	private RabbitTemplate rabbit;
	
	private ProductService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}
	
	private void sendProduct(Product product) {
		rabbit.convertAndSend("sales.product.create",product);
	}
}
