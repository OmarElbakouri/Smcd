package com.smcd.congress.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArchiveDTO {

    @NotNull(message = "L'année est obligatoire")
    private Integer annee;

    @Size(max = 300)
    private String theme;

    @Size(max = 200)
    private String lieu;

    private LocalDate dateDebut;

    private LocalDate dateFin;

    private String description;

    private String urlExterne;

    private Integer nombreParticipants;

    private Integer nombreAbstracts;
}
