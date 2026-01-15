package com.smcd.congress.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création/modification d'une Room
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 200, message = "Le nom ne peut pas dépasser 200 caractères")
    private String nom;

    @Size(max = 50, message = "Le nom court ne peut pas dépasser 50 caractères")
    private String nomCourt;

    @NotBlank(message = "La description est obligatoire")
    private String description;

    @Size(max = 300, message = "La description courte ne peut pas dépasser 300 caractères")
    private String descriptionCourte;

    @Size(max = 7, message = "Le code couleur doit être au format #XXXXXX")
    private String couleur;

    @Size(max = 50, message = "Le nom d'icône ne peut pas dépasser 50 caractères")
    private String icone;

    @Builder.Default
    private Integer annee = 2026;

    @Builder.Default
    private Boolean active = true;
}
