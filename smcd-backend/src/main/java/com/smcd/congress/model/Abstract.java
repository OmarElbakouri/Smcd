package com.smcd.congress.model;

import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutSoumission;
import com.smcd.congress.model.enums.TypeCommunication;
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
 * Entité représentant un abstract scientifique soumis pour le congrès
 */
@Data
@Entity
@Table(name = "abstracts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Abstract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============ INFORMATIONS PERSONNELLES ============
    
    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    @Column(nullable = false, length = 100)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères")
    @Column(nullable = false, length = 100)
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    @Column(nullable = false)
    private String email;

    @Size(max = 20, message = "Le téléphone ne peut pas dépasser 20 caractères")
    @Column(length = 20)
    private String telephone;

    // ============ INFORMATIONS SCIENTIFIQUES ============
    
    @NotBlank(message = "Les auteurs sont obligatoires")
    @Size(max = 500, message = "La liste des auteurs ne peut pas dépasser 500 caractères")
    @Column(nullable = false, length = 500)
    private String auteurs;

    @NotBlank(message = "L'affiliation est obligatoire")
    @Size(max = 300, message = "L'affiliation ne peut pas dépasser 300 caractères")
    @Column(nullable = false, length = 300)
    private String affiliation;

    // ============ TYPE ET CATÉGORIE ============
    
    @NotNull(message = "Le type de communication est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TypeCommunication type;

    @Column(length = 500)
    private String urlVideo;

    @NotNull(message = "La rubrique est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Rubrique rubrique;

    // ============ CONTENU SCIENTIFIQUE ============
    
    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300, message = "Le titre ne peut pas dépasser 300 caractères")
    @Column(nullable = false, length = 300)
    private String titre;

    @Size(max = 500, message = "Les mots-clés ne peuvent pas dépasser 500 caractères")
    @Column(length = 500)
    private String motsCles;

    @NotBlank(message = "L'introduction est obligatoire")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String introduction;

    @NotBlank(message = "Le matériel et méthodes est obligatoire")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String materielMethodes;

    @NotBlank(message = "Les résultats sont obligatoires")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String resultats;

    @NotBlank(message = "La discussion est obligatoire")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String discussion;

    @NotBlank(message = "La conclusion est obligatoire")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String conclusion;

    @Column(name = "bibliography", columnDefinition = "TEXT")
    private String references;

    // ============ MÉTADONNÉES ============
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Builder.Default
    private StatutSoumission statut = StatutSoumission.EN_ATTENTE;

    @Column(unique = true, length = 20)
    private String numeroReference;

    @Column(length = 500)
    private String wordFileUrl;

    @Column(columnDefinition = "TEXT")
    private String commentairesComite;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dateSoumission;

    @UpdateTimestamp
    private LocalDateTime dateRevision;

    @Builder.Default
    private Boolean deleted = false;
}
