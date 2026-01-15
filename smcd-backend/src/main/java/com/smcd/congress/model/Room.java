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
import java.util.ArrayList;
import java.util.List;

/**
 * Entité représentant une Salle (Room) du congrès
 * Premier niveau de la hiérarchie : Room → Chapter → Video
 */
@Data
@Entity
@Table(name = "rooms")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============ INFORMATIONS DE BASE ============
    
    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 200, message = "Le nom ne peut pas dépasser 200 caractères")
    @Column(nullable = false, length = 200)
    private String nom;

    @Size(max = 50, message = "Le nom court ne peut pas dépasser 50 caractères")
    @Column(length = 50)
    private String nomCourt;

    @NotBlank(message = "Le slug est obligatoire")
    @Size(max = 100, message = "Le slug ne peut pas dépasser 100 caractères")
    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    // ============ DESCRIPTION ============
    
    @NotBlank(message = "La description est obligatoire")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Size(max = 300, message = "La description courte ne peut pas dépasser 300 caractères")
    @Column(length = 300)
    private String descriptionCourte;

    // ============ DESIGN ============
    
    @Column(length = 500)
    private String imageUrl;

    @Column(length = 300)
    private String imagePublicId;

    @Size(max = 7, message = "Le code couleur doit être au format #XXXXXX")
    @Column(length = 7)
    private String couleur; // Ex: "#3498db"

    @Size(max = 50, message = "Le nom d'icône ne peut pas dépasser 50 caractères")
    @Column(length = 50)
    private String icone; // Ex: "fa-liver"

    // ============ ORGANISATION ============
    
    @Builder.Default
    @Column(name = "ordre_affichage", nullable = false)
    private Integer ordre = 0;

    @Builder.Default
    @Column(nullable = false)
    private Integer annee = 2026;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    // ============ MÉTADONNÉES ============
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dateModification;

    // ============ RELATIONS ============
    
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Chapter> chapters = new ArrayList<>();

    // ============ MÉTHODES UTILITAIRES ============
    
    public int getNombreChapitres() {
        return chapters != null ? chapters.size() : 0;
    }

    public int getNombreVideos() {
        if (chapters == null) return 0;
        return chapters.stream()
                .mapToInt(c -> c.getVideos() != null ? c.getVideos().size() : 0)
                .sum();
    }

    public int getDureeTotaleMinutes() {
        if (chapters == null) return 0;
        return chapters.stream()
                .mapToInt(Chapter::getDureeTotaleMinutes)
                .sum();
    }

    public String getDureeTotaleFormatee() {
        int totalMinutes = getDureeTotaleMinutes();
        int heures = totalMinutes / 60;
        int minutes = totalMinutes % 60;
        if (heures > 0) {
            return String.format("%dh %02dmin", heures, minutes);
        }
        return String.format("%d min", minutes);
    }

    public void addChapter(Chapter chapter) {
        chapters.add(chapter);
        chapter.setRoom(this);
    }

    public void removeChapter(Chapter chapter) {
        chapters.remove(chapter);
        chapter.setRoom(null);
    }
}
