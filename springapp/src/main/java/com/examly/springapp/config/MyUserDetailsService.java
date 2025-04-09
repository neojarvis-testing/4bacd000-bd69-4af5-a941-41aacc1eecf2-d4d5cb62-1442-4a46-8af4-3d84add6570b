package com.examly.springapp.config;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("testuser".equals(username)) {
            return new org.springframework.security.core.userdetails.User(
                    "testuser",
                    new BCryptPasswordEncoder().encode("password"),
                    new ArrayList<>()
            );
        }
        throw new UsernameNotFoundException("User not found");
    }
}

