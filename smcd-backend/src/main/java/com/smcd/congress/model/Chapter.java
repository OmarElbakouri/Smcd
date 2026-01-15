package com.smcd.congress.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entité représentant un Chapitre (Chapter) d'une salle
 * Deuxième niveau de la hiérarchie : Room → Chapter → Video
 */
@Data
@Entity
@Table(name = "chapters")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Chapter {

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

    // ============ SESSION ============
    
    @Size(max = 150, message = "Le modérateur ne peut pas dépasser 150 caractères")
    @Column(length = 150)
    private String moderateur;

    @Column
    private LocalDate dateSession;

    @Column
    private LocalTime heureDebut;

    @Column
    private LocalTime heureFin;

    // ============ ORGANISATION ============
    
    @Builder.Default
    @Column(name = "ordre_affichage", nullable = false)
    private Integer ordre = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    // ============ MÉTADONNÉES ============
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dateModification;

    // ============ RELATIONS ============
    
    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Video> videos = new ArrayList<>();

    // ============ MÉTHODES UTILITAIRES ============
    
    public int getNombreVideos() {
        return videos != null ? videos.size() : 0;
    }

    public int getNombreVideosPubliees() {
        if (videos == null) return 0;
        return (int) videos.stream()
                .filter(v -> v.getPublie() != null && v.getPublie())
                .count();
    }

    public int getDureeTotaleMinutes() {
        if (videos == null) return 0;
        int totalSecondes = videos.stream()
                .filter(v -> v.getDuree() != null)
                .mapToInt(Video::getDuree)
                .sum();
        return totalSecondes / 60;
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

    public String getHoraireSession() {
        if (heureDebut == null && heureFin == null) return null;
        StringBuilder sb = new StringBuilder();
        if (heureDebut != null) {
            sb.append(heureDebut.toString());
        }
        if (heureFin != null) {
            sb.append(" - ").append(heureFin.toString());
        }
        return sb.toString();
    }

    public void addVideo(Video video) {
        videos.add(video);
        video.setChapter(this);
    }

    public void removeVideo(Video video) {
        videos.remove(video);
        video.setChapter(null);
    }
}
