package com.smcd.congress.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entité pour le contenu statique éditable (mot du président, à propos, etc.)
 */
@Data
@Entity
@Table(name = "contenu_statique")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContenuStatique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La clé est obligatoire")
    @Column(unique = true, nullable = false, length = 100)
    private String cle;

    @Size(max = 200)
    @Column(length = 200)
    private String titreFr;

    @Size(max = 200)
    @Column(length = 200)
    private String titreEn;

    @Column(columnDefinition = "TEXT")
    private String contenuFr;

    @Column(columnDefinition = "TEXT")
    private String contenuEn;

    private String imageUrl;

    private String imagePublicId;

    @UpdateTimestamp
    private LocalDateTime dateModification;

    private String modifiePar;
}
