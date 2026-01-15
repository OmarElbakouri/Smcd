package com.smcd.congress.model;

import com.smcd.congress.model.enums.NiveauSponsor;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entité représentant un sponsor/partenaire du congrès
 */
@Data
@Entity
@Table(name = "sponsors")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Sponsor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    private String nom;

    @Size(max = 100)
    @Column(length = 100)
    private String nomCourt;

    @Column(unique = true, length = 250)
    private String slug;

    // ============ LOGO ============

    @NotBlank(message = "L'URL du logo est obligatoire")
    @Column(nullable = false)
    private String logoUrl;

    private String logoPublicId;

    // ============ DESCRIPTION ============

    @Column(columnDefinition = "TEXT")
    private String description;

    @Size(max = 300)
    @Column(length = 300)
    private String descriptionCourte;

    // ============ CATÉGORISATION ============

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NiveauSponsor niveau;

    @Size(max = 100)
    @Column(length = 100)
    private String categorie;

    @Builder.Default
    private Integer annee = 2026;

    // ============ CONTACT ============

    private String siteWeb;

    @Email
    private String email;

    @Size(max = 30)
    @Column(length = 30)
    private String telephone;

    // ============ ORGANISATION ============

    @Builder.Default
    private Integer ordre = 0;

    @Builder.Default
    private Boolean active = true;

    // ============ STATISTIQUES ============

    @Builder.Default
    private Integer nombreClics = 0;

    // ============ MÉTADONNÉES ============

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime datePartenariat;

    @UpdateTimestamp
    private LocalDateTime dateModification;

    @PrePersist
    public void generateSlug() {
        if (this.slug == null && this.nom != null) {
            this.slug = this.nom.toLowerCase()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-")
                    .replaceAll("-+", "-");
        }
    }
}
