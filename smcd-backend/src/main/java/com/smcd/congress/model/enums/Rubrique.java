package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Rubriques scientifiques disponibles pour les abstracts
 */
@Getter
public enum Rubrique {
    CHIRURGIE_HEPATO_BILIAIRE("Chirurgie hépato-biliaire"),
    CHIRURGIE_PANCREATIQUE("Chirurgie pancréatique"),
    CHIRURGIE_COLORECTALE("Chirurgie colorectale"),
    CHIRURGIE_OESO_GASTRIQUE("Chirurgie œso-gastrique"),
    CHIRURGIE_BARIATRIQUE("Chirurgie bariatrique"),
    CHIRURGIE_ROBOTIQUE("Chirurgie robotique"),
    CHIRURGIE_PARIETALE("Chirurgie pariétale"),
    CHIRURGIE_ENDOCRINIENNE("Chirurgie endocrinienne"),
    URGENCES_VISCERALES("Urgences viscérales et digestives"),
    CHIRURGIE_PROCTOLOGIQUE("Chirurgie proctologique");

    private final String label;

    Rubrique(String label) {
        this.label = label;
    }
}
