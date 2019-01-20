package com.example.pos.user;

public class UserNotFoundException extends RuntimeException {

    UserNotFoundException(String id) {
        super("Could not find user " + id);
    }
}
