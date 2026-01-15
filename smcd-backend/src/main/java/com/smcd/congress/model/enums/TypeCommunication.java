package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Types de communication possibles pour un abstract
 */
@Getter
public enum TypeCommunication {
    EPOSTER("E-Poster"),
    COMMUNICATION_ORALE("Communication orale"),
    PRESENTATION_VIDEO("Présentation vidéo");

    private final String label;

    TypeCommunication(String label) {
        this.label = label;
    }
}
