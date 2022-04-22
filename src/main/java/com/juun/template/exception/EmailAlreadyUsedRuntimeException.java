package com.juun.template.exception;

public class EmailAlreadyUsedRuntimeException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public EmailAlreadyUsedRuntimeException() {
        super("Email is already in use!");
    }
}
