package com.juun.template.exception;

public class InvalidPasswordRuntimeException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InvalidPasswordRuntimeException() {
        super("Incorrect password");
    }
}
