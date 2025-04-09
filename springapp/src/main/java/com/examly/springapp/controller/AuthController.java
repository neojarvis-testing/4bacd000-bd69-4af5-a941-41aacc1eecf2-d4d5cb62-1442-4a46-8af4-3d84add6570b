package com.examly.springapp.controller;

import com.examly.springapp.exception.UserAlreadyExistsException;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    public class AuthController {
    
        @Autowired
        private UserService userService;
    
        @PostMapping("/api/register")
        public ResponseEntity<?> createUser(@RequestBody User user) {
            try {
                User createdUser = userService.createUser(user);
                return ResponseEntity.status(201).body(createdUser);
            } catch (UserAlreadyExistsException e) {
                return ResponseEntity.status(409).body("User already exists");
            } catch (Exception e) {
                return ResponseEntity.status(400).body("Bad Request");
            }
        }
    
        @PostMapping("/api/login")
        public ResponseEntity<?> loginUser(@RequestBody User user) {
            try {
                boolean isLoggedIn = userService.loginUser(user.getUsername(), user.getPassword());
                if (isLoggedIn) {
                    return ResponseEntity.status(201).body("Login successful");
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials");
                }
            } catch (Exception e) {
                return ResponseEntity.status(400).body("Bad Request");
            }
        }
    }
}
