package com.smcd.congress.service;

import com.smcd.congress.dto.*;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.EPoster;
import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutEPoster;
import com.smcd.congress.repository.EPosterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Service pour la gestion des E-Posters
 */
@Service
@Transactional
public class EPosterService {

    private static final Logger logger = LoggerFactory.getLogger(EPosterService.class);

    // Types de fichiers PowerPoint autorisés
    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(".ppt", ".pptx");

    // Taille maximale : 50 MB
    private static final long MAX_FILE_SIZE = 50 * 1024 * 1024;

    @Autowired
    private EPosterRepository ePosterRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private EmailService emailService;

    /**
     * Upload un nouvel E-Poster
     */
    public EPoster uploadEPoster(MultipartFile file, EPosterUploadDTO dto) throws IOException {
        // Valider le fichier
        validateFile(file);

        // Upload vers Cloudinary
        Map<String, String> uploadResult = cloudinaryService.uploadFile(file, "eposters/2026");
        String fileUrl = uploadResult.get("url");
        String publicId = uploadResult.get("publicId");

        // Parser la rubrique si fournie
        Rubrique rubrique = null;
        if (dto.getRubrique() != null && !dto.getRubrique().isEmpty()) {
            try {
                rubrique = Rubrique.valueOf(dto.getRubrique());
            } catch (IllegalArgumentException e) {
                logger.warn("Rubrique invalide: {}", dto.getRubrique());
            }
        }

        // Créer l'entité
        EPoster ePoster = EPoster.builder()
                .nomAuteur(dto.getNomAuteur())
                .prenomAuteur(dto.getPrenomAuteur())
                .emailAuteur(dto.getEmailAuteur())
                .titre(dto.getTitre())
                .fichierUrl(fileUrl)
                .fichierPublicId(publicId)
                .tailleFichier(file.getSize())
                .nomFichierOriginal(file.getOriginalFilename())
                .rubrique(rubrique)
                .annee(2026)
                .statut(StatutEPoster.EN_ATTENTE)
                .nombreTelechargements(0)
                .nombreVues(0)
                .build();

        ePoster = ePosterRepository.save(ePoster);
        logger.info("E-Poster créé avec succès: ID={}, Titre={}", ePoster.getId(), ePoster.getTitre());

        // Envoyer email de confirmation
        try {
            emailService.sendEPosterConfirmation(ePoster);
        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi de l'email de confirmation: {}", e.getMessage());
        }

        return ePoster;
    }

    /**
     * Valide le fichier uploadé
     */
    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est obligatoire");
        }

        // Vérifier la taille
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Le fichier ne doit pas dépasser 50 MB");
        }

        // Vérifier le type MIME
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            // Vérifier aussi l'extension
            String filename = file.getOriginalFilename();
            if (filename == null) {
                throw new IllegalArgumentException("Seuls les fichiers PowerPoint (.ppt, .pptx) sont autorisés");
            }
            String extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
            if (!ALLOWED_EXTENSIONS.contains(extension)) {
                throw new IllegalArgumentException("Seuls les fichiers PowerPoint (.ppt, .pptx) sont autorisés");
            }
        }
    }

    /**
     * Approuve un E-Poster
     */
    public EPoster approuverEPoster(Long id, String commentaires) {
        EPoster ePoster = getEPosterById(id);
        
        ePoster.setStatut(StatutEPoster.APPROUVE);
        ePoster.setCommentairesAdmin(commentaires);
        ePoster.setDateValidation(LocalDateTime.now());
        
        ePoster = ePosterRepository.save(ePoster);
        logger.info("E-Poster approuvé: ID={}", id);

        // Envoyer email de notification
        try {
            emailService.sendEPosterApproval(ePoster);
        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi de l'email d'approbation: {}", e.getMessage());
        }

        return ePoster;
    }

    /**
     * Rejette un E-Poster
     */
    public EPoster rejeterEPoster(Long id, String raison) {
        EPoster ePoster = getEPosterById(id);
        
        ePoster.setStatut(StatutEPoster.REJETE);
        ePoster.setCommentairesAdmin(raison);
        ePoster.setDateValidation(LocalDateTime.now());
        
        ePoster = ePosterRepository.save(ePoster);
        logger.info("E-Poster rejeté: ID={}", id);

        // Envoyer email de notification
        try {
            emailService.sendEPosterRejection(ePoster);
        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi de l'email de rejet: {}", e.getMessage());
        }

        return ePoster;
    }

    /**
     * Supprime un E-Poster et son fichier Cloudinary
     */
    public void supprimerEPoster(Long id) {
        EPoster ePoster = getEPosterById(id);
        
        // Supprimer le fichier de Cloudinary
        if (ePoster.getFichierPublicId() != null) {
            try {
                cloudinaryService.deleteFile(ePoster.getFichierPublicId());
            } catch (Exception e) {
                logger.error("Erreur lors de la suppression du fichier Cloudinary: {}", e.getMessage());
            }
        }
        
        ePosterRepository.delete(ePoster);
        logger.info("E-Poster supprimé: ID={}", id);
    }

    /**
     * Incrémente le compteur de vues
     */
    @Transactional
    public void incrementerVues(Long id) {
        ePosterRepository.incrementerVues(id);
    }

    /**
     * Incrémente le compteur de téléchargements
     */
    @Transactional
    public void incrementerTelechargements(Long id) {
        ePosterRepository.incrementerTelechargements(id);
    }

    /**
     * Récupère les E-Posters publics (approuvés uniquement)
     */
    @Transactional(readOnly = true)
    public List<EPosterResponseDTO> getEPostersPublics(Integer annee, String rubriqueStr) {
        Rubrique rubrique = null;
        if (rubriqueStr != null && !rubriqueStr.isEmpty()) {
            try {
                rubrique = Rubrique.valueOf(rubriqueStr);
            } catch (IllegalArgumentException e) {
                // Ignorer
            }
        }

        List<EPoster> ePosters;
        if (annee != null && rubrique != null) {
            ePosters = ePosterRepository.findWithFilters(StatutEPoster.APPROUVE, annee, rubrique);
        } else if (annee != null) {
            ePosters = ePosterRepository.findByStatutAndAnneeOrderByDateUploadDesc(StatutEPoster.APPROUVE, annee);
        } else if (rubrique != null) {
            ePosters = ePosterRepository.findByRubriqueAndStatut(rubrique, StatutEPoster.APPROUVE);
        } else {
            ePosters = ePosterRepository.findByStatutOrderByDateUploadDesc(StatutEPoster.APPROUVE);
        }

        return ePosters.stream()
                .map(EPosterResponseDTO::fromEntity)
                .toList();
    }

    /**
     * Récupère tous les E-Posters (admin)
     */
    @Transactional(readOnly = true)
    public List<EPosterAdminResponseDTO> getEPostersAdmin(String statutStr, Integer annee, String rubriqueStr) {
        StatutEPoster statut = null;
        if (statutStr != null && !statutStr.isEmpty()) {
            try {
                statut = StatutEPoster.valueOf(statutStr);
            } catch (IllegalArgumentException e) {
                // Ignorer
            }
        }

        Rubrique rubrique = null;
        if (rubriqueStr != null && !rubriqueStr.isEmpty()) {
            try {
                rubrique = Rubrique.valueOf(rubriqueStr);
            } catch (IllegalArgumentException e) {
                // Ignorer
            }
        }

        List<EPoster> ePosters = ePosterRepository.findWithFilters(statut, annee, rubrique);

        return ePosters.stream()
                .map(EPosterAdminResponseDTO::fromEntity)
                .toList();
    }

    /**
     * Récupère un E-Poster par ID
     */
    @Transactional(readOnly = true)
    public EPoster getEPosterById(Long id) {
        return ePosterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("E-Poster non trouvé: " + id));
    }

    /**
     * Récupère les statistiques des E-Posters
     */
    @Transactional(readOnly = true)
    public EPosterStatsDTO getStats() {
        Long total = ePosterRepository.count();
        Long enAttente = ePosterRepository.countByStatut(StatutEPoster.EN_ATTENTE);
        Long approuves = ePosterRepository.countByStatut(StatutEPoster.APPROUVE);
        Long rejetes = ePosterRepository.countByStatut(StatutEPoster.REJETE);

        // Par année
        Map<Integer, Long> parAnnee = new LinkedHashMap<>();
        List<Integer> annees = ePosterRepository.findDistinctAnnees();
        for (Integer annee : annees) {
            parAnnee.put(annee, ePosterRepository.countByAnnee(annee));
        }

        // Par rubrique
        Map<String, Long> parRubrique = new LinkedHashMap<>();
        for (Rubrique rubrique : Rubrique.values()) {
            Long count = ePosterRepository.countByRubriqueAndStatut(rubrique, StatutEPoster.APPROUVE);
            if (count > 0) {
                parRubrique.put(rubrique.getLabel(), count);
            }
        }

        // Taille totale
        Long tailleTotale = ePosterRepository.getTailleTotale();
        String tailleTotaleStr = formatTaille(tailleTotale);

        return EPosterStatsDTO.builder()
                .total(total)
                .enAttente(enAttente)
                .approuves(approuves)
                .rejetes(rejetes)
                .parAnnee(parAnnee)
                .parRubrique(parRubrique)
                .tailleTotale(tailleTotaleStr)
                .build();
    }

    private String formatTaille(Long bytes) {
        if (bytes == null || bytes == 0) return "0 B";
        
        double kb = bytes / 1024.0;
        if (kb < 1024) return String.format("%.1f KB", kb);
        
        double mb = kb / 1024.0;
        if (mb < 1024) return String.format("%.1f MB", mb);
        
        double gb = mb / 1024.0;
        return String.format("%.2f GB", gb);
    }
}
