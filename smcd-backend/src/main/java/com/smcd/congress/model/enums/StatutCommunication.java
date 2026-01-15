package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Statuts possibles pour une Communication Vidéo
 */
@Getter
public enum StatutCommunication {
    EN_ATTENTE("En attente de validation"),
    APPROUVE("Approuvé"),
    REJETE("Rejeté");

    private final String label;

    StatutCommunication(String label) {
        this.label = label;
    }
}
