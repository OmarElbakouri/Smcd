package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Types de documents disponibles
 */
@Getter
public enum TypeDocument {
    PROGRAMME("Programme du congrès"),
    BROCHURE("Brochure"),
    LIVRE_RESUMES("Livre des résumés"),
    FORMULAIRE("Formulaire"),
    REGLEMENT("Règlement intérieur"),
    CERTIFICAT("Certificat"),
    RAPPORT("Rapport"),
    AUTRE("Autre");

    private final String label;

    TypeDocument(String label) {
        this.label = label;
    }
}
