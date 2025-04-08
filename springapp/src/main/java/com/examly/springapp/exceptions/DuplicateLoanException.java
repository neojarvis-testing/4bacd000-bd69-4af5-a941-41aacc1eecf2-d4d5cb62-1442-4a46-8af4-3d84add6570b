package com.examly.springapp.exceptions;

public class DuplicateLoanException extends RuntimeException{
    public DuplicateLoanException(){
        super();
    }
    public DuplicateLoanException(String message){
        super(message);
    }
}
