package com.smcd.congress.model;

import com.smcd.congress.model.enums.TypeDocument;
import com.smcd.congress.model.enums.VisibiliteDocument;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entité représentant un document téléchargeable (PDF, DOCX, etc.)
 */
@Data
@Entity
@Table(name = "documents")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300)
    @Column(nullable = false, length = 300)
    private String titre;

    @Column(unique = true, length = 350)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Size(max = 300)
    @Column(length = 300)
    private String descriptionCourte;

    // ============ FICHIER ============

    @NotBlank(message = "L'URL du fichier est obligatoire")
    @Column(nullable = false)
    private String fichierUrl;

    private String fichierPublicId;

    private Long tailleFichier;

    private String nomFichierOriginal;

    @Size(max = 10)
    @Column(length = 10)
    private String formatFichier;

    // ============ CATÉGORISATION ============

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private TypeDocument type;

    @Builder.Default
    private Integer annee = 2026;

    @Size(max = 5)
    @Column(length = 5)
    @Builder.Default
    private String langue = "FR";

    // ============ VISIBILITÉ ============

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Builder.Default
    private VisibiliteDocument visibilite = VisibiliteDocument.PUBLIC;

    @Builder.Default
    private Boolean publie = true;

    // ============ ORGANISATION ============

    @Builder.Default
    private Integer ordre = 0;

    @Builder.Default
    private Boolean featured = false;

    // ============ STATISTIQUES ============

    @Builder.Default
    private Integer nombreTelechargements = 0;

    // ============ MÉTADONNÉES ============

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime datePublication;

    private LocalDateTime dateExpiration;

    @UpdateTimestamp
    private LocalDateTime dateModification;

    @PrePersist
    public void generateSlug() {
        if (this.slug == null && this.titre != null) {
            this.slug = this.titre.toLowerCase()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-")
                    .replaceAll("-+", "-");
        }
    }
}
