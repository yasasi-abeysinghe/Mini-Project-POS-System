package com.example.pos.exceptionHandlers;

public class ItemNotFoundException  extends RuntimeException {

    public ItemNotFoundException(String id) {
        super("Could not find the item " + id);
    }
}
