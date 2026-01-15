package com.smcd.congress.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

/**
 * Service pour l'envoi d'emails
 * Utilise Spring Mail avec configuration Gmail SMTP
 */
@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private static final String SENDER_NAME = "SMCD Congrès";

    /**
     * Envoie un email simple (texte brut)
     * 
     * @param to L'adresse email du destinataire
     * @param subject Le sujet de l'email
     * @param body Le contenu de l'email
     */
    public void sendSimpleEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(String.format("%s <%s>", SENDER_NAME, fromEmail));
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            logger.info("Email envoyé avec succès à: {}", to);

        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi de l'email à {}: {}", to, e.getMessage());
            throw new RuntimeException("Impossible d'envoyer l'email", e);
        }
    }

    /**
     * Envoie un email HTML
     * 
     * @param to L'adresse email du destinataire
     * @param subject Le sujet de l'email
     * @param htmlContent Le contenu HTML de l'email
     */
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, SENDER_NAME);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true = isHtml

            mailSender.send(message);

            logger.info("Email HTML envoyé avec succès à: {}", to);

        } catch (MessagingException e) {
            logger.error("Erreur lors de l'envoi de l'email HTML à {}: {}", to, e.getMessage());
            throw new RuntimeException("Impossible d'envoyer l'email HTML", e);
        } catch (Exception e) {
            logger.error("Erreur inattendue lors de l'envoi de l'email: {}", e.getMessage());
            throw new RuntimeException("Erreur lors de l'envoi de l'email", e);
        }
    }

    /**
     * Envoie un email de bienvenue pour un nouveau compte admin
     * 
     * @param to L'adresse email du nouvel admin
     * @param nom Le nom de l'admin
     * @param prenom Le prénom de l'admin
     */
    public void sendWelcomeEmail(String to, String nom, String prenom) {
        String subject = "Bienvenue sur la plateforme SMCD Congrès";
        String body = String.format(
                """
                Bonjour %s %s,
                
                Votre compte administrateur sur la plateforme du Congrès SMCD a été créé avec succès.
                
                Vous pouvez maintenant vous connecter à l'espace d'administration pour gérer :
                - Les abstracts soumis
                - Les e-posters
                - Les vidéos chirurgicales
                - Les invités et conférenciers
                
                Cordialement,
                L'équipe SMCD Congrès
                
                ---
                Société Marocaine de Chirurgie Digestive
                """,
                prenom, nom
        );

        sendSimpleEmail(to, subject, body);
    }

    /**
     * Envoie un email de confirmation de soumission d'abstract
     * 
     * @param to L'adresse email de l'auteur
     * @param titre Le titre de l'abstract
     * @param reference La référence de soumission
     */
    public void sendAbstractSubmissionConfirmation(String to, String titre, String reference) {
        String subject = "Confirmation de soumission - SMCD Congrès 2026";
        String body = String.format(
                """
                Bonjour,
                
                Nous avons bien reçu votre abstract intitulé :
                "%s"
                
                Référence de soumission : %s
                
                Votre soumission sera examinée par le comité scientifique.
                Vous serez informé(e) de la décision par email.
                
                Cordialement,
                Le comité scientifique SMCD
                
                ---
                Société Marocaine de Chirurgie Digestive
                Congrès National 2026
                """,
                titre, reference
        );

        sendSimpleEmail(to, subject, body);
    }

    /**
     * Envoie un email de confirmation de soumission d'abstract avec détails complets
     * 
     * @param abstractEntity L'abstract soumis
     */
    public void sendAbstractConfirmation(com.smcd.congress.model.Abstract abstractEntity) {
        String subject = String.format("Confirmation de soumission - Réf. %s", abstractEntity.getNumeroReference());
        
        String dateSoumission = abstractEntity.getDateSoumission() != null 
                ? abstractEntity.getDateSoumission().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy à HH:mm"))
                : "N/A";

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
                    .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .details-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
                    .label { font-weight: bold; color: #6b7280; width: 150px; }
                    .value { color: #111827; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                    .reference { font-size: 24px; font-weight: bold; color: #1E40AF; text-align: center; padding: 20px; background: #EFF6FF; border-radius: 8px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin:0;">SMCD 2026</h1>
                        <p style="margin:10px 0 0 0;">Congrès National de Chirurgie Digestive</p>
                    </div>
                    <div class="content">
                        <h2>Cher(e) Dr. %s %s,</h2>
                        <p>Nous accusons réception de votre soumission pour le Congrès National de Chirurgie Digestive 2026.</p>
                        
                        <div class="reference">
                            Numéro de référence : %s
                        </div>
                        
                        <div class="details">
                            <h3 style="margin-top:0;">Détails de votre soumission</h3>
                            <p><strong>Titre :</strong> %s</p>
                            <p><strong>Rubrique :</strong> %s</p>
                            <p><strong>Type :</strong> %s</p>
                            <p><strong>Date de soumission :</strong> %s</p>
                        </div>
                        
                        <p>Votre soumission sera examinée par le comité scientifique dans un délai de <strong>4 semaines</strong>. Vous recevrez une notification par email concernant la décision.</p>
                        
                        <p>Cordialement,<br>
                        <strong>Le Comité d'Organisation</strong><br>
                        SMCD 2026</p>
                    </div>
                    <div class="footer">
                        <p>Cet email est envoyé automatiquement, merci de ne pas y répondre.</p>
                        <p>© 2026 Société Marocaine de Chirurgie Digestive</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            abstractEntity.getNom(),
            abstractEntity.getPrenom(),
            abstractEntity.getNumeroReference(),
            abstractEntity.getTitre(),
            abstractEntity.getRubrique().getLabel(),
            abstractEntity.getType().getLabel(),
            dateSoumission
        );

        sendHtmlEmail(abstractEntity.getEmail(), subject, htmlContent);
    }

    /**
     * Envoie un email de notification de changement de statut
     * 
     * @param abstractEntity L'abstract concerné
     * @param ancienStatut L'ancien statut
     */
    public void sendStatusNotification(com.smcd.congress.model.Abstract abstractEntity, 
                                       com.smcd.congress.model.enums.StatutSoumission ancienStatut) {
        String subject = String.format("Mise à jour de votre soumission - Réf. %s", abstractEntity.getNumeroReference());
        
        String statutText;
        String statutColor;
        String message;
        
        switch (abstractEntity.getStatut()) {
            case ACCEPTE:
                statutText = "ACCEPTÉ";
                statutColor = "#10B981";
                message = "Félicitations ! Votre abstract a été accepté par le comité scientifique. Vous recevrez prochainement les informations concernant la présentation.";
                break;
            case REFUSE:
                statutText = "REFUSÉ";
                statutColor = "#EF4444";
                message = "Nous regrettons de vous informer que votre abstract n'a pas été retenu par le comité scientifique.";
                break;
            case EN_REVISION:
                statutText = "En cours de révision";
                statutColor = "#F59E0B";
                message = "Votre abstract est actuellement en cours d'examen par le comité scientifique.";
                break;
            default:
                statutText = "En attente";
                statutColor = "#6B7280";
                message = "Votre abstract est en attente de révision.";
        }

        String commentaires = "";
        if (abstractEntity.getCommentairesComite() != null && !abstractEntity.getCommentairesComite().isEmpty()) {
            commentaires = String.format("""
                <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
                    <strong>Commentaires du comité :</strong><br>
                    %s
                </div>
                """, abstractEntity.getCommentairesComite());
        }

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
                    .status { font-size: 24px; font-weight: bold; text-align: center; padding: 20px; background: white; border-radius: 8px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin:0;">SMCD 2026</h1>
                        <p style="margin:10px 0 0 0;">Mise à jour de votre soumission</p>
                    </div>
                    <div class="content">
                        <h2>Cher(e) Dr. %s %s,</h2>
                        
                        <p>Le statut de votre soumission <strong>%s</strong> a été mis à jour.</p>
                        
                        <div class="status" style="color: %s;">
                            %s
                        </div>
                        
                        <p><strong>Titre :</strong> %s</p>
                        
                        <p>%s</p>
                        
                        %s
                        
                        <p>Cordialement,<br>
                        <strong>Le Comité Scientifique</strong><br>
                        SMCD 2026</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 Société Marocaine de Chirurgie Digestive</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            abstractEntity.getNom(),
            abstractEntity.getPrenom(),
            abstractEntity.getNumeroReference(),
            statutColor,
            statutText,
            abstractEntity.getTitre(),
            message,
            commentaires
        );

        sendHtmlEmail(abstractEntity.getEmail(), subject, htmlContent);
    }

    // ============ EMAILS E-POSTERS ============

    /**
     * Envoie un email de confirmation d'upload d'e-poster
     */
    public void sendEPosterConfirmation(com.smcd.congress.model.EPoster ePoster) {
        String subject = "Confirmation d'upload - E-Poster SMCD 2026";
        
        String dateUpload = ePoster.getDateUpload() != null 
                ? ePoster.getDateUpload().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy à HH:mm"))
                : "N/A";

        String htmlContent = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #8B5CF6, #6366F1); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                    .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B5CF6; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                    .icon { font-size: 48px; margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="icon">📊</div>
                        <h1 style="margin:0;">E-Poster Reçu</h1>
                        <p style="margin:10px 0 0 0;">SMCD 2026</p>
                    </div>
                    <div class="content">
                        <h2>Cher(e) %s %s,</h2>
                        <p>Nous accusons réception de votre e-poster pour le Congrès SMCD 2026.</p>
                        
                        <div class="details">
                            <p><strong>Titre :</strong> %s</p>
                            <p><strong>Date d'upload :</strong> %s</p>
                            <p><strong>Fichier :</strong> %s</p>
                        </div>
                        
                        <p>Votre e-poster sera examiné par l'équipe d'organisation et vous recevrez une notification <strong>sous 48h</strong>.</p>
                        
                        <p>Cordialement,<br>
                        <strong>L'équipe SMCD</strong></p>
                    </div>
                    <div class="footer">
                        <p>© 2026 Société Marocaine de Chirurgie Digestive</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            ePoster.getPrenomAuteur(),
            ePoster.getNomAuteur(),
            ePoster.getTitre(),
            dateUpload,
            ePoster.getNomFichierOriginal()
        );

        sendHtmlEmail(ePoster.getEmailAuteur(), subject, htmlContent);
    }

    /**
     * Envoie un email d'approbation d'e-poster
     */
    public void sendEPosterApproval(com.smcd.congress.model.EPoster ePoster) {
        String subject = "E-Poster approuvé - SMCD 2026";

        String htmlContent = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #10B981, #059669); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                    .success-badge { background: #D1FAE5; color: #065F46; padding: 15px 25px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                    .icon { font-size: 48px; margin-bottom: 10px; }
                    .btn { display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="icon">🎉</div>
                        <h1 style="margin:0;">Félicitations !</h1>
                        <p style="margin:10px 0 0 0;">Votre E-Poster a été approuvé</p>
                    </div>
                    <div class="content">
                        <h2>Cher(e) %s %s,</h2>
                        
                        <div class="success-badge">
                            ✅ E-POSTER APPROUVÉ
                        </div>
                        
                        <p>Votre e-poster intitulé <strong>"%s"</strong> a été approuvé pour le Congrès SMCD 2026.</p>
                        
                        <p>Il est maintenant visible publiquement sur notre plateforme dans la galerie des e-posters.</p>
                        
                        <p style="text-align: center;">
                            <a href="https://smcd.ma/eposters" class="btn">Voir la galerie</a>
                        </p>
                        
                        <p>Cordialement,<br>
                        <strong>L'équipe SMCD</strong></p>
                    </div>
                    <div class="footer">
                        <p>© 2026 Société Marocaine de Chirurgie Digestive</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            ePoster.getPrenomAuteur(),
            ePoster.getNomAuteur(),
            ePoster.getTitre()
        );

        sendHtmlEmail(ePoster.getEmailAuteur(), subject, htmlContent);
    }

    /**
     * Envoie un email de rejet d'e-poster
     */
    public void sendEPosterRejection(com.smcd.congress.model.EPoster ePoster) {
        String subject = "E-Poster non retenu - SMCD 2026";
        
        String raison = ePoster.getCommentairesAdmin() != null && !ePoster.getCommentairesAdmin().isEmpty()
                ? ePoster.getCommentairesAdmin()
                : "Non spécifiée";

        String htmlContent = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #6B7280, #4B5563); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                    .reason-box { background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin:0;">E-Poster non retenu</h1>
                        <p style="margin:10px 0 0 0;">SMCD 2026</p>
                    </div>
                    <div class="content">
                        <h2>Cher(e) %s %s,</h2>
                        
                        <p>Nous vous remercions pour votre soumission. Malheureusement, votre e-poster intitulé <strong>"%s"</strong> ne peut être retenu pour le congrès.</p>
                        
                        <div class="reason-box">
                            <strong>Raison :</strong><br>
                            %s
                        </div>
                        
                        <p>Nous vous encourageons à soumettre une nouvelle version si vous le souhaitez.</p>
                        
                        <p>Cordialement,<br>
                        <strong>L'équipe SMCD</strong></p>
                    </div>
                    <div class="footer">
                        <p>© 2026 Société Marocaine de Chirurgie Digestive</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            ePoster.getPrenomAuteur(),
            ePoster.getNomAuteur(),
            ePoster.getTitre(),
            raison
        );

        sendHtmlEmail(ePoster.getEmailAuteur(), subject, htmlContent);
    }
}

