package com.examly.springapp.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class OtpRequest implements Serializable{
    private String email;
    private String otp;
}