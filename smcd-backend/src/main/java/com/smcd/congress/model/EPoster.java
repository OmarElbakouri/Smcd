package com.smcd.congress.model;

import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutEPoster;
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
 * Entité représentant un E-Poster soumis pour le congrès
 */
@Data
@Entity
@Table(name = "eposters")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EPoster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============ INFORMATIONS DE BASE ============
    
    @NotBlank(message = "Le nom de l'auteur est obligatoire")
    @Size(max = 150, message = "Le nom ne peut pas dépasser 150 caractères")
    @Column(nullable = false, length = 150)
    private String nomAuteur;

    @NotBlank(message = "Le prénom de l'auteur est obligatoire")
    @Size(max = 150, message = "Le prénom ne peut pas dépasser 150 caractères")
    @Column(nullable = false, length = 150)
    private String prenomAuteur;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    @Column(nullable = false)
    private String emailAuteur;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300, message = "Le titre ne peut pas dépasser 300 caractères")
    @Column(nullable = false, length = 300)
    private String titre;

    // ============ FICHIER ============
    
    @NotBlank(message = "L'URL du fichier est obligatoire")
    @Column(nullable = false, length = 500)
    private String fichierUrl;

    @Column(length = 300)
    private String fichierPublicId;

    @Column
    private Long tailleFichier;

    @Size(max = 255, message = "Le nom du fichier ne peut pas dépasser 255 caractères")
    @Column(length = 255)
    private String nomFichierOriginal;

    // ============ CATÉGORISATION ============
    
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Rubrique rubrique;

    @Builder.Default
    @Column(nullable = false)
    private Integer annee = 2026;

    // ============ VALIDATION ============
    
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatutEPoster statut = StatutEPoster.EN_ATTENTE;

    @Column(columnDefinition = "TEXT")
    private String commentairesAdmin;

    @Column
    private LocalDateTime dateValidation;

    // ============ STATISTIQUES ============
    
    @Builder.Default
    @Column(nullable = false)
    private Integer nombreTelechargements = 0;

    @Builder.Default
    @Column(nullable = false)
    private Integer nombreVues = 0;

    // ============ MÉTADONNÉES ============
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateUpload;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dateModification;

    // ============ MÉTHODES UTILITAIRES ============
    
    public String getNomCompletAuteur() {
        return String.format("%s %s", prenomAuteur, nomAuteur);
    }

    public String getTailleFichierFormatee() {
        if (tailleFichier == null) return "N/A";
        
        double sizeInKB = tailleFichier / 1024.0;
        if (sizeInKB < 1024) {
            return String.format("%.1f KB", sizeInKB);
        }
        double sizeInMB = sizeInKB / 1024.0;
        return String.format("%.1f MB", sizeInMB);
    }
}
