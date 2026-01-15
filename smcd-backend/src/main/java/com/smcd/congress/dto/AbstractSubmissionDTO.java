package com.smcd.congress.dto;

import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.TypeCommunication;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la soumission d'un abstract
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AbstractSubmissionDTO {

    // Informations personnelles
    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100)
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    private String email;

    @Size(max = 20)
    private String telephone;

    // Informations scientifiques
    @NotBlank(message = "Les auteurs sont obligatoires")
    @Size(max = 500)
    private String auteurs;

    @NotBlank(message = "L'affiliation est obligatoire")
    @Size(max = 300)
    private String affiliation;

    // Type et catégorie
    @NotNull(message = "Le type de communication est obligatoire")
    private TypeCommunication type;

    private String urlVideo;

    @NotNull(message = "La rubrique est obligatoire")
    private Rubrique rubrique;

    // Contenu scientifique
    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300)
    private String titre;

    @Size(max = 500)
    private String motsCles;

    @NotBlank(message = "L'introduction est obligatoire")
    @Size(min = 50, message = "L'introduction doit contenir au moins 50 caractères")
    private String introduction;

    @NotBlank(message = "Le matériel et méthodes est obligatoire")
    @Size(min = 50, message = "Le matériel et méthodes doit contenir au moins 50 caractères")
    private String materielMethodes;

    @NotBlank(message = "Les résultats sont obligatoires")
    @Size(min = 50, message = "Les résultats doivent contenir au moins 50 caractères")
    private String resultats;

    @NotBlank(message = "La discussion est obligatoire")
    @Size(min = 50, message = "La discussion doit contenir au moins 50 caractères")
    private String discussion;

    @NotBlank(message = "La conclusion est obligatoire")
    @Size(min = 50, message = "La conclusion doit contenir au moins 50 caractères")
    private String conclusion;

    private String references;
}
