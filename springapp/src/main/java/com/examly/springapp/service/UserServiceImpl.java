package com.examly.springapp.service;


import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistsException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public boolean loginUser(String username, String password) {
        User existingUser = userRepo.findByUsername(username);
        if (existingUser == null || !passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new InvalidCredentialsException("Invalid username or password");
        }
        return true;
    }
}
