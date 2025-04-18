package com.examly.springapp.service;

import com.examly.springapp.dto.LoginDTO;
import com.examly.springapp.dto.UserProfileDTO;
import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            throw new UserAlreadyExistsException("Email already exists");
        }
        if (userRepo.findByMobileNumber(user.getMobileNumber()) != null) {
            throw new UserAlreadyExistsException("Mobile number already exists");
        }
        if (userRepo.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistsException("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public boolean loginUser(LoginDTO loginDTO) {
        User existingUser = userRepo.findByUsername(loginDTO.getUsername());
        if (existingUser == null || !passwordEncoder.matches(loginDTO.getPassword(), existingUser.getPassword())) {
            throw new InvalidCredentialsException("Invalid username or password");
        }
        return true;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public Map<String, String> validateUserData(User user) {
        Map<String, String> errors = new HashMap<>();

        if (userRepo.findByEmail(user.getEmail()) != null) {
            errors.put("email", "Email already exists");
        }

        if (userRepo.findByMobileNumber(user.getMobileNumber()) != null) {
            errors.put("mobileNumber", "Mobile number already exists");
        }

        if (userRepo.findByUsername(user.getUsername()) != null) {
            errors.put("username", "Username already exists");
        }

        return errors;
    }

    @Override
    public User getUserProfile(Long userId) {
        Optional<User> userProfile = userRepo.findById(userId);
        return userProfile.get();
    }

    @Override
    public UserProfileDTO getUserProfileDTO(Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        return convertToUserProfileDTO(user);
    }

    private UserProfileDTO convertToUserProfileDTO(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setMobileNumber(user.getMobileNumber());
        return dto;
    }
    
}
