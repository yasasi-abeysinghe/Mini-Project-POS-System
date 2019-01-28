package com.example.pos;

import com.example.pos.model.UserRole;
import com.example.pos.model.User;
import com.example.pos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;


@SpringBootApplication
public class PosApplication{ // implements CommandLineRunner {


    public static void main(String[] args) {
        SpringApplication.run(PosApplication.class, args);
    }

//    @Autowired
//    public UserRepository repository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    @Override
//    public void run(String... args) throws Exception {
//
//
//        repository.deleteAll();
//
//        // save a couple of Users
//        User newUser1 = new User("David", "Parker", "davidp", passwordEncoder.encode("abc123"));
//        Set<UserRole> userRoles = new HashSet<UserRole>();
//        userRoles.add(UserRole.ADMIN);
//        newUser1.setUserRoles(userRoles);
//        repository.save(newUser1);
//
//    }


}