package com.examly.springapp.repository;

import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
    public User findByEmail(String email);
    public User findByMobileNumber(String mobileNumber);
    public User findByUsername(String username);
    
}
