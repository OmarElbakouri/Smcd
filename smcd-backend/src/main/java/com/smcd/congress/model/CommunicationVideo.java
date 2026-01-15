package com.smcd.congress.model;

import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutCommunication;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entité représentant une Communication Vidéo soumise pour le congrès
 * Similaire aux E-Posters mais pour les vidéos
 */
@Data
@Entity
@Table(name = "communications_videos")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunicationVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============ INFORMATIONS AUTEUR ============
    
    @NotBlank(message = "Le nom de l'auteur est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    @Column(nullable = false, length = 100)
    private String nomAuteur;

    @NotBlank(message = "Le prénom de l'auteur est obligatoire")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères")
    @Column(nullable = false, length = 100)
    private String prenomAuteur;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    @Size(max = 255)
    @Column(nullable = false)
    private String emailAuteur;

    // ============ INFORMATIONS COMMUNICATION ============
    
    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300, message = "Le titre ne peut pas dépasser 300 caractères")
    @Column(nullable = false, length = 300)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Rubrique rubrique;

    // ============ FICHIER VIDÉO (Cloudinary) ============
    
    @NotBlank(message = "L'URL de la vidéo est obligatoire")
    @Column(nullable = false, length = 500)
    private String videoUrl;

    @Column(length = 300)
    private String videoPublicId;

    @Column
    private Long tailleFichier; // bytes

    @Size(max = 20)
    @Column(length = 20)
    private String format; // MP4, AVI, MOV, etc.

    @Column
    private Integer duree; // en secondes

    // ============ STATUT ============
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private StatutCommunication statut = StatutCommunication.EN_ATTENTE;

    @Column(columnDefinition = "TEXT")
    private String commentairesAdmin;

    // ============ METADATA ============
    
    @Column(nullable = false)
    @Builder.Default
    private Integer annee = 2026;

    @Column(nullable = false)
    @Builder.Default
    private Boolean actif = true;

    @Column(nullable = false)
    @Builder.Default
    private Integer nombreVues = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer nombreTelechargements = 0;

    // ============ TIMESTAMPS ============
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateUpload;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dateModification;

    @Column
    private LocalDateTime dateValidation;

    // ============ MÉTHODES UTILITAIRES ============
    
    /**
     * Retourne le nom complet de l'auteur
     */
    public String getNomCompletAuteur() {
        return prenomAuteur + " " + nomAuteur;
    }

    /**
     * Incrémente le nombre de vues
     */
    public void incrementerVues() {
        this.nombreVues++;
    }

    /**
     * Incrémente le nombre de téléchargements
     */
    public void incrementerTelechargements() {
        this.nombreTelechargements++;
    }
}
