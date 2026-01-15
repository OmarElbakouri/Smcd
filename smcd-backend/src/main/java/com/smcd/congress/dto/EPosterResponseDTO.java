package com.smcd.congress.dto;

import com.smcd.congress.model.EPoster;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

/**
 * DTO pour la réponse d'un E-Poster (vue publique)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EPosterResponseDTO {

    private Long id;
    private String titre;
    private String nomCompletAuteur;
    private String fichierUrl;
    private String nomFichierOriginal;
    private String rubrique;
    private String rubriqueLabel;
    private Integer annee;
    private String dateUpload;
    private Integer nombreTelechargements;
    private Integer nombreVues;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static EPosterResponseDTO fromEntity(EPoster ePoster) {
        return EPosterResponseDTO.builder()
                .id(ePoster.getId())
                .titre(ePoster.getTitre())
                .nomCompletAuteur(ePoster.getNomCompletAuteur())
                .fichierUrl(ePoster.getFichierUrl())
                .nomFichierOriginal(ePoster.getNomFichierOriginal())
                .rubrique(ePoster.getRubrique() != null ? ePoster.getRubrique().name() : null)
                .rubriqueLabel(ePoster.getRubrique() != null ? ePoster.getRubrique().getLabel() : null)
                .annee(ePoster.getAnnee())
                .dateUpload(ePoster.getDateUpload() != null ? ePoster.getDateUpload().format(FORMATTER) : null)
                .nombreTelechargements(ePoster.getNombreTelechargements())
                .nombreVues(ePoster.getNombreVues())
                .build();
    }
}
