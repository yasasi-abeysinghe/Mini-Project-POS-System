package com.example.pos.exceptionHandlers;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String username) {
        super("Could not find userService " + username);
    }
}
