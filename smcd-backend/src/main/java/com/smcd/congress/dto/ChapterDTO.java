package com.smcd.congress.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO pour la création/modification d'un Chapter
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChapterDTO {

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300, message = "Le titre ne peut pas dépasser 300 caractères")
    private String titre;

    private String description;

    @Size(max = 300, message = "La description courte ne peut pas dépasser 300 caractères")
    private String descriptionCourte;

    @Size(max = 150, message = "Le modérateur ne peut pas dépasser 150 caractères")
    private String moderateur;

    private LocalDate dateSession;
    
    private LocalTime heureDebut;
    
    private LocalTime heureFin;

    @NotNull(message = "L'ID de la room est obligatoire")
    private Long roomId;
}
