package com.smcd.congress.exception;

/**
 * Exception levée quand un email existe déjà lors de l'inscription
 */
public class EmailAlreadyExistsException extends RuntimeException {
    
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
