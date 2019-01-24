package com.example.pos.repository;

import com.example.pos.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ItemRepository extends MongoRepository<Item, String> {
    public Item findByItemName(String itemName);
    public List<Item> findByOrderNo(String orderNo);
}

