package com.example.pos.item;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ItemRepository extends MongoRepository<Item, String> {
    public Item findByItemName(String itemName);
}

