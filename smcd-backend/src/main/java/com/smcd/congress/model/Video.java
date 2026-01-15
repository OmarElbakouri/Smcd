package com.smcd.congress.model;

import com.smcd.congress.model.enums.VisibiliteVideo;
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
 * Entité représentant une Vidéo de technique chirurgicale
 * Troisième niveau de la hiérarchie : Room → Chapter → Video
 */
@Data
@Entity
@Table(name = "videos")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============ INFORMATIONS DE BASE ============
    
    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300, message = "Le titre ne peut pas dépasser 300 caractères")
    @Column(nullable = false, length = 300)
    private String titre;

    @NotBlank(message = "Le slug est obligatoire")
    @Size(max = 150, message = "Le slug ne peut pas dépasser 150 caractères")
    @Column(nullable = false, length = 150)
    private String slug;

    // ============ DESCRIPTION ============
    
    @Column(columnDefinition = "TEXT")
    private String description;

    @Size(max = 300, message = "La description courte ne peut pas dépasser 300 caractères")
    @Column(length = 300)
    private String descriptionCourte;

    // ============ INTERVENANT ============
    
    @Size(max = 200, message = "L'intervenant ne peut pas dépasser 200 caractères")
    @Column(length = 200)
    private String intervenant;

    @Size(max = 500, message = "Les co-intervenants ne peuvent pas dépasser 500 caractères")
    @Column(length = 500)
    private String coIntervenants;

    // ============ FICHIER VIDÉO ============
    
    @NotBlank(message = "L'URL de la vidéo est obligatoire")
    @Column(nullable = false, length = 500)
    private String videoUrl;

    @Column(length = 300)
    private String videoPublicId;

    @Column(length = 500)
    private String thumbnailUrl;

    @Column(length = 300)
    private String thumbnailPublicId;

    // ============ MÉTADONNÉES VIDÉO ============
    
    @Column
    private Integer duree; // en secondes

    @Size(max = 10)
    @Column(length = 10)
    private String dureeFr; // format "15:30"

    @Size(max = 20)
    @Column(length = 20)
    private String format; // MP4, MOV, etc.

    @Size(max = 20)
    @Column(length = 20)
    private String resolution; // 1080p, 720p, 4K

    @Column
    private Long tailleFichier; // bytes

    // ============ CONTENU ============
    
    @Size(max = 500, message = "Les tags ne peuvent pas dépasser 500 caractères")
    @Column(length = 500)
    private String tags;

    @Size(max = 5)
    @Column(length = 5)
    @Builder.Default
    private String langue = "FR";

    @Column(length = 500)
    private String sousTitresUrl;

    // ============ VISIBILITÉ & ACCÈS ============
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private VisibiliteVideo visibilite = VisibiliteVideo.PUBLIC;

    @Builder.Default
    @Column(nullable = false)
    private Boolean publie = false; // Brouillon par défaut

    // ============ ORGANISATION ============
    
    @Builder.Default
    @Column(name = "ordre_affichage", nullable = false)
    private Integer ordre = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chapter_id", nullable = false)
    private Chapter chapter;

    // ============ STATISTIQUES ============
    
    @Builder.Default
    @Column(nullable = false)
    private Integer nombreVues = 0;

    @Builder.Default
    @Column(nullable = false)
    private Integer nombreLikes = 0;

    @Column
    private Integer tempsVisionageMoyen; // en secondes

    // ============ MÉTADONNÉES ============
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateUpload;

    @Column
    private LocalDateTime datePublication;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dateModification;

    // ============ MÉTHODES UTILITAIRES ============
    
    /**
     * Génère la durée formatée à partir des secondes
     */
    public String getDureeFormatee() {
        if (duree == null) return "00:00";
        int heures = duree / 3600;
        int minutes = (duree % 3600) / 60;
        int secondes = duree % 60;
        
        if (heures > 0) {
            return String.format("%d:%02d:%02d", heures, minutes, secondes);
        }
        return String.format("%02d:%02d", minutes, secondes);
    }

    /**
     * Formate la taille du fichier en format lisible
     */
    public String getTailleFormatee() {
        if (tailleFichier == null) return "N/A";
        
        double size = tailleFichier;
        String[] units = {"B", "KB", "MB", "GB"};
        int unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return String.format("%.1f %s", size, units[unitIndex]);
    }

    /**
     * Retourne la liste des tags comme tableau
     */
    public String[] getTagsArray() {
        if (tags == null || tags.isEmpty()) return new String[0];
        return tags.split(",");
    }

    /**
     * Retourne l'URL de streaming optimisée Cloudinary
     */
    public String getStreamingUrl() {
        if (videoUrl == null) return null;
        // Cloudinary streaming avec transformation auto
        if (videoUrl.contains("cloudinary.com")) {
            return videoUrl.replace("/upload/", "/upload/q_auto,f_auto/");
        }
        return videoUrl;
    }

    /**
     * Incrémente le compteur de vues
     */
    public void incrementerVues() {
        this.nombreVues++;
    }

    /**
     * Publie la vidéo
     */
    public void publier() {
        this.publie = true;
        this.datePublication = LocalDateTime.now();
    }

    /**
     * Dépublie la vidéo
     */
    public void depublier() {
        this.publie = false;
    }

    /**
     * Met à jour la durée formatée
     */
    @PrePersist
    @PreUpdate
    public void updateDureeFr() {
        this.dureeFr = getDureeFormatee();
    }
}
