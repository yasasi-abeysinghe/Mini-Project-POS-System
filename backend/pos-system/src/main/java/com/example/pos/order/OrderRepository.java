package com.example.pos.order;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
    public Order findByOrderNo(String orderNo);
}
