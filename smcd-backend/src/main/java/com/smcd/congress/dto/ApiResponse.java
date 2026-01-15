package com.smcd.congress.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO générique pour les réponses API simples
 * Utilisé pour les messages de succès ou d'information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse {

    private String message;
    private boolean success;

    /**
     * Crée une réponse de succès avec un message
     */
    public static ApiResponse success(String message) {
        return ApiResponse.builder()
                .message(message)
                .success(true)
                .build();
    }

    /**
     * Crée une réponse d'erreur avec un message
     */
    public static ApiResponse error(String message) {
        return ApiResponse.builder()
                .message(message)
                .success(false)
                .build();
    }
}
