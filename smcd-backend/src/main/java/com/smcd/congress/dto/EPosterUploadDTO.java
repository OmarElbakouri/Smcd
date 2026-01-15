package com.smcd.congress.dto;

import com.smcd.congress.model.enums.Rubrique;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour l'upload d'un E-Poster
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EPosterUploadDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 150, message = "Le nom ne peut pas dépasser 150 caractères")
    private String nomAuteur;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 150, message = "Le prénom ne peut pas dépasser 150 caractères")
    private String prenomAuteur;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    private String emailAuteur;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300, message = "Le titre ne peut pas dépasser 300 caractères")
    private String titre;

    private String rubrique; // Optionnel
}
