package com.example.pos.repository;

import com.example.pos.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    public Order findByOrderNo(String orderNo);
    public List<Order> findByStatus(String status);
}
