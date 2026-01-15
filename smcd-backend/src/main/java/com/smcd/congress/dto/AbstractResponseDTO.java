package com.smcd.congress.dto;

import com.smcd.congress.model.Abstract;
import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutSoumission;
import com.smcd.congress.model.enums.TypeCommunication;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour les réponses contenant un abstract
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AbstractResponseDTO {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String auteurs;
    private String affiliation;
    private TypeCommunication type;
    private String typeLabel;
    private String urlVideo;
    private Rubrique rubrique;
    private String rubriqueLabel;
    private String titre;
    private String motsCles;
    private String introduction;
    private String materielMethodes;
    private String resultats;
    private String discussion;
    private String conclusion;
    private String references;
    private StatutSoumission statut;
    private String statutLabel;
    private String numeroReference;
    private String wordFileUrl;
    private String commentairesComite;
    private LocalDateTime dateSoumission;
    private LocalDateTime dateRevision;

    /**
     * Convertit une entité Abstract en DTO de réponse
     */
    public static AbstractResponseDTO fromEntity(Abstract entity) {
        return AbstractResponseDTO.builder()
                .id(entity.getId())
                .nom(entity.getNom())
                .prenom(entity.getPrenom())
                .email(entity.getEmail())
                .telephone(entity.getTelephone())
                .auteurs(entity.getAuteurs())
                .affiliation(entity.getAffiliation())
                .type(entity.getType())
                .typeLabel(entity.getType() != null ? entity.getType().getLabel() : null)
                .urlVideo(entity.getUrlVideo())
                .rubrique(entity.getRubrique())
                .rubriqueLabel(entity.getRubrique() != null ? entity.getRubrique().getLabel() : null)
                .titre(entity.getTitre())
                .motsCles(entity.getMotsCles())
                .introduction(entity.getIntroduction())
                .materielMethodes(entity.getMaterielMethodes())
                .resultats(entity.getResultats())
                .discussion(entity.getDiscussion())
                .conclusion(entity.getConclusion())
                .references(entity.getReferences())
                .statut(entity.getStatut())
                .statutLabel(entity.getStatut() != null ? entity.getStatut().getLabel() : null)
                .numeroReference(entity.getNumeroReference())
                .wordFileUrl(entity.getWordFileUrl())
                .commentairesComite(entity.getCommentairesComite())
                .dateSoumission(entity.getDateSoumission())
                .dateRevision(entity.getDateRevision())
                .build();
    }
}
