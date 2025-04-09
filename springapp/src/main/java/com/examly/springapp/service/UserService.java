package com.examly.springapp.service;

import com.examly.springapp.model.User;

public interface UserService {
    User createUser(User user);
    boolean loginUser(String username, String password);
}
