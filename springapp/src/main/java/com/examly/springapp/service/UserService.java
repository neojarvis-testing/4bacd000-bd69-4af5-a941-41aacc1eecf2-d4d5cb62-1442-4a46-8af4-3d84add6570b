package com.examly.springapp.service;

import com.examly.springapp.dto.LoginDTO;
import com.examly.springapp.model.User;

import java.util.Map;

public interface UserService {
    User createUser(User user);
    boolean loginUser(LoginDTO loginDTO);
    User getUserByUsername(String username);
    Map<String, String> validateUserData(User user);
}
