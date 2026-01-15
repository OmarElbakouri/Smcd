package com.smcd.congress.dto;

import com.smcd.congress.model.Speaker;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

/**
 * DTO pour la réponse d'un Speaker (vue admin - complète)
 * Inclut toutes les informations
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpeakerAdminResponseDTO {

    private Long id;
    private String titre;
    private String nom;
    private String prenom;
    private String nomComplet;
    private String specialite;
    private String institution;
    private String pays;
    private String ville;
    private String localisation;
    private String bioCourteFr;
    private String bioCompleteFr;
    private String bioCourteEn;
    private String bioCompleteEn;
    private String photoUrl;
    private String photoPublicId;
    private String cvUrl;
    private String cvPublicId;
    private String email;
    private String telephone;
    private String siteWeb;
    private String linkedinUrl;
    private String researchGateUrl;
    private Boolean featured;
    private Boolean isPresident;
    private String messagePresident;
    private Integer annee;
    private Integer ordre;
    private String dateAjout;
    private String dateModification;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public static SpeakerAdminResponseDTO fromEntity(Speaker speaker) {
        return SpeakerAdminResponseDTO.builder()
                .id(speaker.getId())
                .titre(speaker.getTitre())
                .nom(speaker.getNom())
                .prenom(speaker.getPrenom())
                .nomComplet(speaker.getNomComplet())
                .specialite(speaker.getSpecialite())
                .institution(speaker.getInstitution())
                .pays(speaker.getPays())
                .ville(speaker.getVille())
                .localisation(speaker.getLocalisation())
                .bioCourteFr(speaker.getBioCourteFr())
                .bioCompleteFr(speaker.getBioCompleteFr())
                .bioCourteEn(speaker.getBioCourteEn())
                .bioCompleteEn(speaker.getBioCompleteEn())
                .photoUrl(speaker.getPhotoUrl())
                .photoPublicId(speaker.getPhotoPublicId())
                .cvUrl(speaker.getCvUrl())
                .cvPublicId(speaker.getCvPublicId())
                .email(speaker.getEmail())
                .telephone(speaker.getTelephone())
                .siteWeb(speaker.getSiteWeb())
                .linkedinUrl(speaker.getLinkedinUrl())
                .researchGateUrl(speaker.getResearchGateUrl())
                .featured(speaker.getFeatured())
                .isPresident(speaker.getIsPresident())
                .messagePresident(speaker.getMessagePresident())
                .annee(speaker.getAnnee())
                .ordre(speaker.getOrdre())
                .dateAjout(speaker.getDateAjout() != null ? speaker.getDateAjout().format(FORMATTER) : null)
                .dateModification(speaker.getDateModification() != null ? speaker.getDateModification().format(FORMATTER) : null)
                .build();
    }
}
