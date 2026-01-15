package com.smcd.congress.controller;

import com.smcd.congress.dto.ApiResponse;
import com.smcd.congress.service.EmailService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur pour les endpoints publics
 * Accessible sans authentification
 */
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private EmailService emailService;

    /**
     * GET /api/public/info
     * Retourne les informations publiques du congrès
     * 
     * @return Informations sur le congrès
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getCongressInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("nom", "Congrès National de Chirurgie Digestive 2026");
        info.put("organisateur", "Société Marocaine de Chirurgie Digestive (SMCD)");
        info.put("lieu", "Casablanca, Maroc");
        info.put("dates", "À confirmer");
        info.put("annee", 2026);
        info.put("contact", "contact@smcd.ma");
        info.put("soumissionsOuvertes", true);
        
        return ResponseEntity.ok(info);
    }

    /**
     * POST /api/public/contact
     * Envoie un message de contact
     * 
     * @param nom Le nom de l'expéditeur
     * @param email L'email de l'expéditeur
     * @param sujet Le sujet du message
     * @param message Le contenu du message
     * @return Confirmation de l'envoi
     */
    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> sendContactMessage(
            @RequestParam @NotBlank(message = "Le nom est obligatoire") String nom,
            @RequestParam @Email(message = "Email invalide") @NotBlank String email,
            @RequestParam @NotBlank(message = "Le sujet est obligatoire") String sujet,
            @RequestParam @NotBlank(message = "Le message est obligatoire") String message) {
        
        try {
            // Construire le corps de l'email pour l'équipe SMCD
            String emailBody = String.format(
                    """
                    Nouveau message de contact reçu:
                    
                    Nom: %s
                    Email: %s
                    Sujet: %s
                    
                    Message:
                    %s
                    
                    ---
                    Ce message a été envoyé via le formulaire de contact du site SMCD Congress.
                    """,
                    nom, email, sujet, message
            );

            // Envoyer l'email à l'équipe (vous pouvez configurer l'email de destination)
            emailService.sendSimpleEmail("contact@smcd.ma", 
                    "[Contact SMCD] " + sujet, 
                    emailBody);

            // Envoyer une confirmation à l'expéditeur
            String confirmationBody = String.format(
                    """
                    Bonjour %s,
                    
                    Nous avons bien reçu votre message concernant: "%s"
                    
                    Notre équipe vous répondra dans les meilleurs délais.
                    
                    Cordialement,
                    L'équipe SMCD Congrès
                    
                    ---
                    Société Marocaine de Chirurgie Digestive
                    """,
                    nom, sujet
            );
            
            emailService.sendSimpleEmail(email, 
                    "Confirmation de réception - SMCD Congrès", 
                    confirmationBody);

            return ResponseEntity.ok(ApiResponse.success(
                    "Votre message a été envoyé avec succès. Nous vous répondrons rapidement."));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Erreur lors de l'envoi du message. Veuillez réessayer."));
        }
    }
}
