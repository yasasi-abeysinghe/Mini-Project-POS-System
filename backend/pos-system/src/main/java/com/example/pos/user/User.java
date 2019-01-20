package com.example.pos.user;

import org.springframework.data.annotation.Id;


public class User {

    @Id
    public String id;

    public String firstName;
    public String lastName;

    public String password;

    public User() {}

    public User(String firstName, String lastName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format(
                "Customer[id=%s, firstName='%s', lastName='%s', password='%s']",
                id, firstName, lastName, password);
    }

}
