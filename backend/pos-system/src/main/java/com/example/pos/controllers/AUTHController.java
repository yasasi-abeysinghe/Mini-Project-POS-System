package com.example.pos.controllers;


import com.example.pos.repository.UserRepository;
import com.example.pos.security.jwt.JwtTokenProvider;
import com.example.pos.security.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600,allowCredentials="true")
@RestController
@RequestMapping("/api/auth")
public class AUTHController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtTokenProvider;


    @PostMapping("/log_in")
    @ResponseBody
    public ResponseEntity<?> userAuthentication(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateJwtToken(authentication);

        Cookie authenticationCookie = new Cookie("AuthenticationCookie", jwt);
        authenticationCookie.setHttpOnly(true);
        authenticationCookie.setPath("/api");
        response.addCookie(authenticationCookie);

        return ResponseEntity.ok("Log in Successfully");
    }


    @PostMapping("/log_out")
    @ResponseBody
    public ResponseEntity<?> userLogOut( HttpServletResponse response) {
        Cookie authenticationCookie = new Cookie("AuthenticationCookie", null);
        authenticationCookie.setHttpOnly(true);
        authenticationCookie.setPath("/api");
        response.addCookie(authenticationCookie);
        return ResponseEntity.ok("Log out Successfully");
    }
}
