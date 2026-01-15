package com.smcd.congress.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entité pour les abonnés à la newsletter
 */
@Data
@Entity
@Table(name = "newsletter_subscribers")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsletterSubscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    @Column(unique = true, nullable = false)
    private String email;

    @Size(max = 100)
    @Column(length = 100)
    private String nom;

    @Size(max = 100)
    @Column(length = 100)
    private String prenom;

    @Builder.Default
    private Boolean actif = true;

    @Size(max = 50)
    @Column(length = 50)
    private String origine;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dateInscription;

    private LocalDateTime dateDesinscription;

    @Column(unique = true, length = 100)
    private String tokenDesinscription;

    @PrePersist
    public void generateToken() {
        if (this.tokenDesinscription == null) {
            this.tokenDesinscription = UUID.randomUUID().toString();
        }
    }
}
