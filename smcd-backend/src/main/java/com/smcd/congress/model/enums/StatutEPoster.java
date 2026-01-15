package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Statuts possibles pour un E-Poster
 */
@Getter
public enum StatutEPoster {
    EN_ATTENTE("En attente de validation"),
    APPROUVE("Approuvé"),
    REJETE("Rejeté");

    private final String label;

    StatutEPoster(String label) {
        this.label = label;
    }
}
