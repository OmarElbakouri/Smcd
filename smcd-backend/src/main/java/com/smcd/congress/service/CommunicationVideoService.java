package com.smcd.congress.service;

import com.smcd.congress.dto.CommunicationVideoUploadDTO;
import com.smcd.congress.model.CommunicationVideo;
import com.smcd.congress.model.enums.StatutCommunication;
import com.smcd.congress.repository.CommunicationVideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Service pour la gestion des Communications Vidéo
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CommunicationVideoService {

    private final CommunicationVideoRepository repository;
    private final CloudinaryService cloudinaryService;

    // Formats vidéo autorisés
    private static final Set<String> ALLOWED_VIDEO_FORMATS = Set.of(
            "video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv",
            "video/x-flv", "video/webm", "video/mpeg"
    );

    // Taille max : 500 MB
    private static final long MAX_VIDEO_SIZE = 500L * 1024 * 1024;

    /**
     * Upload une nouvelle communication vidéo
     */
    @Transactional
    public CommunicationVideo uploadVideo(MultipartFile file, CommunicationVideoUploadDTO dto) throws IOException {
        log.info("Upload d'une communication vidéo: {}", dto.getTitre());

        // Validation du fichier
        validateVideoFile(file);

        // Upload vers Cloudinary
        Map<String, String> uploadResult = cloudinaryService.uploadFile(file, "communications-videos/2026");
        String videoUrl = uploadResult.get("url");
        String publicId = uploadResult.get("publicId");

        // Créer l'entité
        CommunicationVideo video = CommunicationVideo.builder()
                .nomAuteur(dto.getNomAuteur())
                .prenomAuteur(dto.getPrenomAuteur())
                .emailAuteur(dto.getEmailAuteur())
                .titre(dto.getTitre())
                .description(dto.getDescription())
                .rubrique(dto.getRubrique())
                .videoUrl(videoUrl)
                .videoPublicId(publicId)
                .tailleFichier(file.getSize())
                .format(getFormatFromContentType(file.getContentType()))
                .statut(StatutCommunication.EN_ATTENTE)
                .annee(2026)
                .actif(true)
                .nombreVues(0)
                .nombreTelechargements(0)
                .build();

        CommunicationVideo saved = repository.save(video);
        log.info("Communication vidéo uploadée avec succès, ID: {}", saved.getId());

        return saved;
    }

    /**
     * Soumettre une vidéo via URL Bunny
     */
    @Transactional
    public CommunicationVideo uploadVideoUrl(CommunicationVideoUploadDTO dto) {
        log.info("Soumission d'une communication vidéo via URL: {}", dto.getTitre());

        // Validation de l'URL
        if (dto.getVideoUrl() == null || dto.getVideoUrl().trim().isEmpty()) {
            throw new IllegalArgumentException("L'URL de la vidéo est requise");
        }

        // Extraire le format depuis l'URL (ex: .mp4, .mov, etc.)
        String format = extractFormatFromUrl(dto.getVideoUrl());

        // Créer l'entité
        CommunicationVideo video = CommunicationVideo.builder()
                .nomAuteur(dto.getNomAuteur())
                .prenomAuteur(dto.getPrenomAuteur())
                .emailAuteur(dto.getEmailAuteur())
                .titre(dto.getTitre())
                .description(dto.getDescription())
                .rubrique(dto.getRubrique())
                .videoUrl(dto.getVideoUrl())
                .videoPublicId(null) // Pas de publicId pour Bunny
                .tailleFichier(0L) // Taille inconnue
                .format(format)
                .statut(StatutCommunication.EN_ATTENTE)
                .annee(2026)
                .actif(true)
                .nombreVues(0)
                .nombreTelechargements(0)
                .build();

        CommunicationVideo saved = repository.save(video);
        log.info("Communication vidéo soumise avec succès via URL, ID: {}", saved.getId());

        return saved;
    }

    /**
     * Récupère toutes les vidéos approuvées (publiques)
     */
    public List<CommunicationVideo> getVideosApprouvees(Integer annee) {
        if (annee != null) {
            return repository.findByStatutAndAnneeOrderByDateUploadDesc(StatutCommunication.APPROUVE, annee);
        }
        return repository.findByStatutOrderByDateUploadDesc(StatutCommunication.APPROUVE);
    }

    /**
     * Récupère toutes les vidéos (ADMIN)
     */
    public List<CommunicationVideo> getAllVideos() {
        return repository.findAll();
    }

    /**
     * Récupère une vidéo par ID
     */
    public CommunicationVideo getVideoById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vidéo non trouvée"));
    }

    /**
     * Incrémente le nombre de vues
     */
    @Transactional
    public void incrementerVues(Long id) {
        repository.findById(id).ifPresent(video -> {
            video.incrementerVues();
            repository.save(video);
        });
    }

    /**
     * Incrémente le nombre de téléchargements
     */
    @Transactional
    public void incrementerTelechargements(Long id) {
        repository.findById(id).ifPresent(video -> {
            video.incrementerTelechargements();
            repository.save(video);
        });
    }

    /**
     * Approuve une vidéo (ADMIN)
     */
    @Transactional
    public CommunicationVideo approuver(Long id, String commentaires) {
        CommunicationVideo video = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vidéo non trouvée"));
        
        video.setStatut(StatutCommunication.APPROUVE);
        video.setDateValidation(LocalDateTime.now());
        video.setCommentairesAdmin(commentaires);
        
        return repository.save(video);
    }

    /**
     * Rejette une vidéo (ADMIN)
     */
    @Transactional
    public CommunicationVideo rejeter(Long id, String commentaires) {
        CommunicationVideo video = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vidéo non trouvée"));
        
        video.setStatut(StatutCommunication.REJETE);
        video.setDateValidation(LocalDateTime.now());
        video.setCommentairesAdmin(commentaires);
        
        return repository.save(video);
    }

    /**
     * Supprime une vidéo et son fichier Cloudinary
     */
    @Transactional
    public void supprimer(Long id) {
        CommunicationVideo video = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vidéo non trouvée"));

        // Supprimer de Cloudinary
        if (video.getVideoPublicId() != null) {
            try {
                cloudinaryService.deleteFile(video.getVideoPublicId());
            } catch (Exception e) {
                log.error("Erreur lors de la suppression du fichier Cloudinary: {}", e.getMessage());
            }
        }

        repository.delete(video);
        log.info("Communication vidéo supprimée: ID {}", id);
    }

    /**
     * Valide le format d'un fichier vidéo
     */
    private void validateVideoFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier vidéo est obligatoire");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_VIDEO_FORMATS.contains(contentType)) {
            throw new IllegalArgumentException(
                "Format vidéo non supporté. Formats acceptés : MP4, MOV, AVI, WMV, FLV"
            );
        }

        if (file.getSize() > MAX_VIDEO_SIZE) {
            throw new IllegalArgumentException("La taille du fichier dépasse la limite de 500 MB");
        }
    }

    /**
     * Détermine le format à partir du content type
     */
    private String getFormatFromContentType(String contentType) {
        if (contentType == null) return "UNKNOWN";
        return switch (contentType) {
            case "video/mp4" -> "MP4";
            case "video/quicktime" -> "MOV";
            case "video/x-msvideo" -> "AVI";
            case "video/x-ms-wmv" -> "WMV";
            case "video/x-flv" -> "FLV";
            case "video/webm" -> "WebM";
            case "video/mpeg" -> "MPEG";
            default -> "UNKNOWN";
        };
    }

    /**
     * Extrait le format depuis l'URL de la vidéo
     */
    private String extractFormatFromUrl(String url) {
        if (url == null || url.isEmpty()) {
            return "UNKNOWN";
        }

        String lowerUrl = url.toLowerCase();
        if (lowerUrl.endsWith(".mp4")) return "MP4";
        if (lowerUrl.endsWith(".mov")) return "MOV";
        if (lowerUrl.endsWith(".avi")) return "AVI";
        if (lowerUrl.endsWith(".wmv")) return "WMV";
        if (lowerUrl.endsWith(".flv")) return "FLV";
        if (lowerUrl.endsWith(".webm")) return "WebM";
        if (lowerUrl.endsWith(".mpeg") || lowerUrl.endsWith(".mpg")) return "MPEG";

        return "MP4"; // Par défaut, supposer MP4 pour Bunny
    }
}
