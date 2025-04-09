package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class LoginDTO {
    // to be removed
    @Id
    private Long loginId;
}
