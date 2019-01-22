package com.example.pos.repository;

import com.example.pos.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, String> {
    public Item findByItemName(String itemName);
}

