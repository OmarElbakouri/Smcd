package com.smcd.congress.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création/modification d'un Speaker
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpeakerDTO {

    // Informations de base
    @Size(max = 20, message = "Le titre ne peut pas dépasser 20 caractères")
    private String titre; // Dr., Pr., Prof.

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères")
    private String prenom;

    // Professionnel
    @Size(max = 200, message = "La spécialité ne peut pas dépasser 200 caractères")
    private String specialite;

    @Size(max = 300, message = "L'institution ne peut pas dépasser 300 caractères")
    private String institution;

    @Size(max = 100, message = "Le pays ne peut pas dépasser 100 caractères")
    private String pays;

    @Size(max = 100, message = "La ville ne peut pas dépasser 100 caractères")
    private String ville;

    // Contenu
    @Size(max = 500, message = "La bio courte ne peut pas dépasser 500 caractères")
    private String bioCourteFr;

    private String bioCompleteFr;

    @Size(max = 500, message = "La bio courte (EN) ne peut pas dépasser 500 caractères")
    private String bioCourteEn;

    private String bioCompleteEn;

    // Contact (privé admin)
    @Email(message = "L'email doit être valide")
    private String email;

    @Size(max = 30, message = "Le téléphone ne peut pas dépasser 30 caractères")
    private String telephone;

    // Social (public)
    @Size(max = 255, message = "L'URL du site web ne peut pas dépasser 255 caractères")
    private String siteWeb;

    @Size(max = 255, message = "L'URL LinkedIn ne peut pas dépasser 255 caractères")
    private String linkedinUrl;

    @Size(max = 255, message = "L'URL ResearchGate ne peut pas dépasser 255 caractères")
    private String researchGateUrl;

    // Organisation
    private Boolean featured;
    private Integer annee;
}
