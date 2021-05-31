package com.example.pos.security.jwt;

import com.example.pos.security.userService.UserDetailsImplementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${grokonez.app.jwtSecret}")
    private String jwtSecret;


    public String generateJwtToken(Authentication authentication) {

        UserDetailsImplementation userPrincipal = (UserDetailsImplementation) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }


    String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (IllegalArgumentException err) {
            logger.error("Invalid arguments : ", err);
        } catch (SignatureException err) {
            logger.error("Invalid signature : ", err);
        } catch (ExpiredJwtException err) {
            logger.error("Expired token : ", err);
        } catch (UnsupportedJwtException err) {
            logger.error("Token does not support", err);
        }

        return false;
    }
}
