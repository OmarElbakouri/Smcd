package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Statuts possibles pour une soumission d'abstract
 */
@Getter
public enum StatutSoumission {
    EN_ATTENTE("En attente de révision"),
    EN_REVISION("En cours de révision"),
    ACCEPTE("Accepté"),
    REFUSE("Refusé");

    private final String label;

    StatutSoumission(String label) {
        this.label = label;
    }
}
