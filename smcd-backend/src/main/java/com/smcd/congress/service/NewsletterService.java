package com.smcd.congress.service;

import com.smcd.congress.dto.NewsletterDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.NewsletterSubscriber;
import com.smcd.congress.repository.NewsletterSubscriberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class NewsletterService {

    private final NewsletterSubscriberRepository subscriberRepository;
    private final EmailService emailService;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Transactional
    public NewsletterSubscriber inscrire(NewsletterDTO dto) {
        // Vérifier si déjà inscrit
        if (subscriberRepository.existsByEmail(dto.getEmail())) {
            NewsletterSubscriber existing = subscriberRepository.findByEmail(dto.getEmail())
                    .orElseThrow();
            
            if (!existing.getActif()) {
                existing.setActif(true);
                existing.setDateDesinscription(null);
                return subscriberRepository.save(existing);
            }
            
            throw new IllegalArgumentException("Cet email est déjà inscrit à la newsletter");
        }

        NewsletterSubscriber subscriber = NewsletterSubscriber.builder()
                .email(dto.getEmail())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .origine(dto.getOrigine())
                .actif(true)
                .build();

        subscriber = subscriberRepository.save(subscriber);
        log.info("Nouvel abonné newsletter: {}", dto.getEmail());

        // Envoyer email de confirmation
        try {
            sendConfirmationEmail(subscriber);
        } catch (Exception e) {
            log.error("Erreur envoi email confirmation newsletter", e);
        }

        return subscriber;
    }

    @Transactional
    public void desinscrire(String token) {
        NewsletterSubscriber subscriber = subscriberRepository.findByTokenDesinscription(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token invalide"));

        subscriber.setActif(false);
        subscriber.setDateDesinscription(LocalDateTime.now());
        subscriberRepository.save(subscriber);

        log.info("Désinscription newsletter: {}", subscriber.getEmail());
    }

    public List<NewsletterSubscriber> getAbonnesActifs() {
        return subscriberRepository.findByActifTrueOrderByDateInscriptionDesc();
    }

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalActifs", subscriberRepository.countByActifTrue());
        stats.put("nouveauxCetteSemaine", subscriberRepository.countNewSubscribersSince(
                LocalDateTime.now().minusDays(7)));
        return stats;
    }

    private void sendConfirmationEmail(NewsletterSubscriber subscriber) {
        String unsubscribeUrl = frontendUrl + "/newsletter/unsubscribe?token=" + subscriber.getTokenDesinscription();
        
        String htmlContent = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1E40AF, #0D9488); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                    .btn { display: inline-block; padding: 12px 24px; background: #1E40AF; color: white; text-decoration: none; border-radius: 8px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin:0;">SMCD 2026</h1>
                        <p style="margin:10px 0 0 0;">Newsletter</p>
                    </div>
                    <div class="content">
                        <h2>Bienvenue !</h2>
                        <p>Merci de vous être inscrit(e) à la newsletter du Congrès SMCD 2026 !</p>
                        <p>Vous recevrez nos actualités et informations importantes concernant le congrès :</p>
                        <ul>
                            <li>Dates et programme</li>
                            <li>Appel à abstracts</li>
                            <li>Conférenciers invités</li>
                            <li>Informations pratiques</li>
                        </ul>
                        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                            Si vous souhaitez vous désinscrire : <a href="%s">Cliquez ici</a>
                        </p>
                    </div>
                    <div class="footer">
                        <p>© 2026 Société Marocaine de Chirurgie Digestive</p>
                    </div>
                </div>
            </body>
            </html>
            """, unsubscribeUrl);

        emailService.sendHtmlEmail(
                subscriber.getEmail(),
                "Bienvenue à la newsletter SMCD 2026",
                htmlContent
        );
    }
}
