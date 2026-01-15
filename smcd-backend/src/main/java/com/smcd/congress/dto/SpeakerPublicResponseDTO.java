package com.smcd.congress.dto;

import com.smcd.congress.model.Speaker;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la réponse d'un Speaker (vue publique)
 * Exclut les informations privées (email, téléphone)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpeakerPublicResponseDTO {

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
    private String cvUrl;
    private String siteWeb;
    private String linkedinUrl;
    private String researchGateUrl;
    private Boolean featured;
    private Boolean isPresident;
    private String messagePresident;
    private Integer annee;
    private Integer ordre;

    public static SpeakerPublicResponseDTO fromEntity(Speaker speaker) {
        return SpeakerPublicResponseDTO.builder()
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
                .cvUrl(speaker.getCvUrl())
                .siteWeb(speaker.getSiteWeb())
                .linkedinUrl(speaker.getLinkedinUrl())
                .researchGateUrl(speaker.getResearchGateUrl())
                .featured(speaker.getFeatured())
                .isPresident(speaker.getIsPresident())
                .messagePresident(speaker.getMessagePresident())
                .annee(speaker.getAnnee())
                .ordre(speaker.getOrdre())
                .build();
    }
}
