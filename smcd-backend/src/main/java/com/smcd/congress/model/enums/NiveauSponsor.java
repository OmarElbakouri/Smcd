package com.smcd.congress.model.enums;

import lombok.Getter;

/**
 * Niveaux de sponsoring
 */
@Getter
public enum NiveauSponsor {
    PLATINE("Platine", "#E5E4E2", 1),
    OR("Or", "#FFD700", 2),
    ARGENT("Argent", "#C0C0C0", 3),
    BRONZE("Bronze", "#CD7F32", 4),
    PARTENAIRE("Partenaire", "#4A90E2", 5);

    private final String nom;
    private final String couleur;
    private final int priorite;

    NiveauSponsor(String nom, String couleur, int priorite) {
        this.nom = nom;
        this.couleur = couleur;
        this.priorite = priorite;
    }
}
