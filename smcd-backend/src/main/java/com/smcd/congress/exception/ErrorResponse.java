package com.smcd.congress.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Structure de réponse d'erreur standardisée
 * Utilisée par GlobalExceptionHandler pour formater les erreurs
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
    
    private String error;
    private String message;
    private int status;
    private LocalDateTime timestamp;
    private String path;
}
