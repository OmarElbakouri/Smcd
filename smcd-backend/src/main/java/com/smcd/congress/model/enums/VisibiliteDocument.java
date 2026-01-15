package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Niveaux de visibilité des documents
 */
@Getter
public enum VisibiliteDocument {
    PUBLIC("Accessible à tous"),
    INSCRITS("Réservé aux inscrits"),
    ADMIN("Réservé aux admins");

    private final String label;

    VisibiliteDocument(String label) {
        this.label = label;
    }
}
