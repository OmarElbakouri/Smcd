package com.smcd.congress.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entité pour les archives des congrès passés
 */
@Data
@Entity
@Table(name = "archives")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Archive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "L'année est obligatoire")
    @Column(unique = true, nullable = false)
    private Integer annee;

    @Size(max = 300)
    @Column(length = 300)
    private String theme;

    @Size(max = 200)
    @Column(length = 200)
    private String lieu;

    private LocalDate dateDebut;

    private LocalDate dateFin;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    private String imagePublicId;

    private String urlExterne;

    private Integer nombreParticipants;

    private Integer nombreAbstracts;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    private LocalDateTime dateModification;
}
