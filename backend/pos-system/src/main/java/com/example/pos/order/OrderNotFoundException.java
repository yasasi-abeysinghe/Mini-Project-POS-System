package com.example.pos.order;

public class OrderNotFoundException extends RuntimeException {

    OrderNotFoundException(String orderNo) {
        super("Could not find the order " + orderNo);
    }
}
