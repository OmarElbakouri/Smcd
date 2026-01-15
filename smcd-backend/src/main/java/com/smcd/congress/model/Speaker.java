package com.smcd.congress.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entité représentant un invité/conférencier du congrès
 */
@Data
@Entity
@Table(name = "speakers")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Speaker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============ INFORMATIONS DE BASE ============
    
    @Size(max = 20, message = "Le titre ne peut pas dépasser 20 caractères")
    @Column(length = 20)
    private String titre; // Dr., Pr., Prof.

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    @Column(nullable = false, length = 100)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères")
    @Column(nullable = false, length = 100)
    private String prenom;

    // ============ PROFESSIONNEL ============
    
    @Size(max = 200, message = "La spécialité ne peut pas dépasser 200 caractères")
    @Column(length = 200)
    private String specialite;

    @Size(max = 300, message = "L'institution ne peut pas dépasser 300 caractères")
    @Column(length = 300)
    private String institution;

    @Size(max = 100, message = "Le pays ne peut pas dépasser 100 caractères")
    @Column(length = 100)
    private String pays;

    @Size(max = 100, message = "La ville ne peut pas dépasser 100 caractères")
    @Column(length = 100)
    private String ville;

    // ============ CONTENU ============
    
    @Size(max = 500, message = "La bio courte ne peut pas dépasser 500 caractères")
    @Column(length = 500)
    private String bioCourteFr;

    @Column(columnDefinition = "TEXT")
    private String bioCompleteFr;

    @Size(max = 500, message = "La bio courte (EN) ne peut pas dépasser 500 caractères")
    @Column(length = 500)
    private String bioCourteEn;

    @Column(columnDefinition = "TEXT")
    private String bioCompleteEn;

    // ============ MÉDIAS ============
    
    @NotBlank(message = "L'URL de la photo est obligatoire")
    @Column(nullable = false, length = 500)
    private String photoUrl;

    @Column(length = 300)
    private String photoPublicId;

    @Column(length = 500)
    private String cvUrl;

    @Column(length = 300)
    private String cvPublicId;

    // ============ CONTACT (privé admin) ============
    
    @Email(message = "L'email doit être valide")
    @Column(length = 150)
    private String email;

    @Size(max = 30, message = "Le téléphone ne peut pas dépasser 30 caractères")
    @Column(length = 30)
    private String telephone;

    // ============ SOCIAL (public) ============
    
    @Size(max = 255, message = "L'URL du site web ne peut pas dépasser 255 caractères")
    @Column(length = 255)
    private String siteWeb;

    @Size(max = 255, message = "L'URL LinkedIn ne peut pas dépasser 255 caractères")
    @Column(length = 255)
    private String linkedinUrl;

    @Size(max = 255, message = "L'URL ResearchGate ne peut pas dépasser 255 caractères")
    @Column(length = 255)
    private String researchGateUrl;

    // ============ ORGANISATION ============
    
    @Builder.Default
    @Column(name = "ordre_affichage", nullable = false)
    private Integer ordre = 0;

    @Builder.Default
    @Column(nullable = false)
    private Boolean featured = false;

    @Builder.Default
    @Column(name = "is_president", nullable = false)
    private Boolean isPresident = false;

    @Column(name = "message_president", columnDefinition = "TEXT")
    private String messagePresident;

    @Builder.Default
    @Column(nullable = false)
    private Integer annee = 2026;

    // ============ MÉTADONNÉES ============
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateAjout;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dateModification;

    // ============ MÉTHODES UTILITAIRES ============
    
    public String getNomComplet() {
        StringBuilder sb = new StringBuilder();
        if (titre != null && !titre.isEmpty()) {
            sb.append(titre).append(" ");
        }
        sb.append(prenom).append(" ").append(nom);
        return sb.toString().trim();
    }

    public String getLocalisation() {
        StringBuilder sb = new StringBuilder();
        if (ville != null && !ville.isEmpty()) {
            sb.append(ville);
        }
        if (pays != null && !pays.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(pays);
        }
        return sb.toString();
    }
}
