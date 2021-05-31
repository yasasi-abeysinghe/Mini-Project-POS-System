package com.example.pos.exceptionHandlers;

public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(String orderNo) {
        super("Could not find the order " + orderNo);
    }
}
