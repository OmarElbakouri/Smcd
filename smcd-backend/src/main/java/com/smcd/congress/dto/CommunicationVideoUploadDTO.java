package com.smcd.congress.dto;

import com.smcd.congress.model.enums.Rubrique;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour l'upload d'une communication vidéo
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunicationVideoUploadDTO {

    @NotBlank(message = "Le nom de l'auteur est obligatoire")
    @Size(max = 100)
    private String nomAuteur;

    @NotBlank(message = "Le prénom de l'auteur est obligatoire")
    @Size(max = 100)
    private String prenomAuteur;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Email invalide")
    private String emailAuteur;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300)
    private String titre;

    private String description;

    private Rubrique rubrique;

    // Pour la soumission via URL Bunny
    private String videoUrl;
}
