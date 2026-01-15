package com.smcd.congress.dto;

import com.smcd.congress.model.EPoster;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

/**
 * DTO pour la réponse d'un E-Poster (vue admin - complète)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EPosterAdminResponseDTO {

    private Long id;
    private String nomAuteur;
    private String prenomAuteur;
    private String emailAuteur;
    private String titre;
    private String fichierUrl;
    private String fichierPublicId;
    private Long tailleFichier;
    private String tailleFichierFormatee;
    private String nomFichierOriginal;
    private String rubrique;
    private String rubriqueLabel;
    private Integer annee;
    private String statut;
    private String statutLabel;
    private String commentairesAdmin;
    private String dateValidation;
    private Integer nombreTelechargements;
    private Integer nombreVues;
    private String dateUpload;
    private String dateModification;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public static EPosterAdminResponseDTO fromEntity(EPoster ePoster) {
        return EPosterAdminResponseDTO.builder()
                .id(ePoster.getId())
                .nomAuteur(ePoster.getNomAuteur())
                .prenomAuteur(ePoster.getPrenomAuteur())
                .emailAuteur(ePoster.getEmailAuteur())
                .titre(ePoster.getTitre())
                .fichierUrl(ePoster.getFichierUrl())
                .fichierPublicId(ePoster.getFichierPublicId())
                .tailleFichier(ePoster.getTailleFichier())
                .tailleFichierFormatee(ePoster.getTailleFichierFormatee())
                .nomFichierOriginal(ePoster.getNomFichierOriginal())
                .rubrique(ePoster.getRubrique() != null ? ePoster.getRubrique().name() : null)
                .rubriqueLabel(ePoster.getRubrique() != null ? ePoster.getRubrique().getLabel() : null)
                .annee(ePoster.getAnnee())
                .statut(ePoster.getStatut().name())
                .statutLabel(ePoster.getStatut().getLabel())
                .commentairesAdmin(ePoster.getCommentairesAdmin())
                .dateValidation(ePoster.getDateValidation() != null ? ePoster.getDateValidation().format(FORMATTER) : null)
                .nombreTelechargements(ePoster.getNombreTelechargements())
                .nombreVues(ePoster.getNombreVues())
                .dateUpload(ePoster.getDateUpload() != null ? ePoster.getDateUpload().format(FORMATTER) : null)
                .dateModification(ePoster.getDateModification() != null ? ePoster.getDateModification().format(FORMATTER) : null)
                .build();
    }
}
