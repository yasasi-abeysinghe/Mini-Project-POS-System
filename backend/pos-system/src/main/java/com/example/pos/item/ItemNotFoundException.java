package com.example.pos.item;

public class ItemNotFoundException  extends RuntimeException {

    ItemNotFoundException(String id) {
        super("Could not find the item " + id);
    }
}
