package com.examly.springapp.model;

import lombok.Data;

@Data
public class OtpRequest {
    private String email;
    private String otp;
}