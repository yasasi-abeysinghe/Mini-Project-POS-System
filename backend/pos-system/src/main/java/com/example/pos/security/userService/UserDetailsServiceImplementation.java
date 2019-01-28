package com.example.pos.security.userService;

import com.example.pos.exceptionHandlers.UserNotFoundException;
import com.example.pos.model.User;
import com.example.pos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserDetailsServiceImplementation implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UserNotFoundException {

        User user = userRepository.findByUsername(username);

        return UserDetailsImplementation.build(user);
    }
}