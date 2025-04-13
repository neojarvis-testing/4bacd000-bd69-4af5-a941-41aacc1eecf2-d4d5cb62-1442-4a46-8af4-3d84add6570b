package com.examly.springapp.controller;

import com.examly.springapp.dto.LoginDTO;
import com.examly.springapp.dto.LoginResponseDTO;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.config.*;

import java.util.*;

@RestController
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/api/authenticate")
    public ResponseEntity<String> authenticate(@RequestParam String username) {
        String token = jwtUtils.generateToken(username);
        return ResponseEntity.ok(token);
    }

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
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            boolean isLoggedIn = userService.loginUser(loginDTO);
            if (isLoggedIn) {
                String token = jwtUtils.generateToken(loginDTO.getUsername());
                User user = userService.getUserByUsername(loginDTO.getUsername());
                return ResponseEntity.ok(new LoginResponseDTO(user.getUserId(), loginDTO.getUsername(), token, user.getUserRole()));
            } else {
                return ResponseEntity.status(401).body(new LoginResponseDTO(null, null, "Invalid credentials", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new LoginResponseDTO(null, null, "Bad Request", null));
        }
    }

    @PostMapping("/api/validateUser")
    public ResponseEntity<?> validateUser(@RequestBody User user) {
        Map<String, String> validationErrors = userService.validateUserData(user);

        if (!validationErrors.isEmpty()) {
            return ResponseEntity.badRequest().body(validationErrors);
        }

        return ResponseEntity.ok().build();
    }
}

