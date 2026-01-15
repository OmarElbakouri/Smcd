package com.smcd.congress.exception;

/**
 * Exception levée quand les credentials de connexion sont invalides
 */
public class InvalidCredentialsException extends RuntimeException {
    
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
