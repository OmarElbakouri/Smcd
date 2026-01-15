package com.smcd.congress.model.enums;

/**
 * Enum définissant les niveaux de visibilité des vidéos
 */
public enum VisibiliteVideo {
    PUBLIC("Accessible à tous", "green"),
    INSCRITS("Réservé aux participants inscrits", "blue"),
    PREMIUM("Réservé aux membres premium", "gold");

    private final String label;
    private final String color;

    VisibiliteVideo(String label, String color) {
        this.label = label;
        this.color = color;
    }

    public String getLabel() {
        return label;
    }

    public String getColor() {
        return color;
    }
}
