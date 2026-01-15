package com.smcd.congress.controller;

import com.smcd.congress.dto.CommunicationVideoUploadDTO;
import com.smcd.congress.model.CommunicationVideo;
import com.smcd.congress.service.CommunicationVideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur pour la gestion des Communications Vidéo
 */
@Slf4j
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CommunicationVideoController {

    private final CommunicationVideoService service;

    /**
     * POST /api/videos/upload
     * Upload une nouvelle communication vidéo (public)
     */
    @PostMapping(value = "/videos/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nomAuteur") String nomAuteur,
            @RequestParam("prenomAuteur") String prenomAuteur,
            @RequestParam("emailAuteur") String emailAuteur,
            @RequestParam("titre") String titre,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "rubrique", required = false) String rubrique
    ) {
        try {
            CommunicationVideoUploadDTO dto = CommunicationVideoUploadDTO.builder()
                    .nomAuteur(nomAuteur)
                    .prenomAuteur(prenomAuteur)
                    .emailAuteur(emailAuteur)
                    .titre(titre)
                    .description(description)
                    .rubrique(rubrique != null ? com.smcd.congress.model.enums.Rubrique.valueOf(rubrique) : null)
                    .build();

            CommunicationVideo video = service.uploadVideo(file, dto);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "message", "Vidéo uploadée avec succès. Vous recevrez un email de confirmation.",
                    "id", video.getId()
            ));

        } catch (IllegalArgumentException e) {
            log.warn("Erreur de validation lors de l'upload: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            log.error("Erreur lors de l'upload de la vidéo: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de l'upload de la vidéo"
            ));
        }
    }

    /**
     * POST /api/videos/upload-url
     * Soumettre une vidéo via URL Bunny (public)
     */
    @PostMapping(value = "/videos/upload-url", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadVideoUrl(@RequestBody CommunicationVideoUploadDTO dto) {
        try {
            if (dto.getVideoUrl() == null || dto.getVideoUrl().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "success", false,
                        "message", "L'URL de la vidéo est requise"
                ));
            }

            CommunicationVideo video = service.uploadVideoUrl(dto);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "message", "Vidéo soumise avec succès. Vous recevrez un email de confirmation.",
                    "id", video.getId()
            ));

        } catch (IllegalArgumentException e) {
            log.warn("Erreur de validation lors de la soumission: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            log.error("Erreur lors de la soumission de la vidéo: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de la soumission de la vidéo"
            ));
        }
    }

    /**
     * GET /api/videos/public
     * Récupère toutes les vidéos approuvées
     */
    @GetMapping("/videos/public")
    public ResponseEntity<?> getPublicVideos(@RequestParam(required = false) Integer annee) {
        try {
            List<CommunicationVideo> videos = service.getVideosApprouvees(annee);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            log.error("Erreur récupération vidéos: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de la récupération des vidéos"
            ));
        }
    }

    /**
     * POST /api/videos/{id}/incrementer-vues
     * Incrémente le nombre de vues
     */
    @PostMapping("/videos/{id}/incrementer-vues")
    public ResponseEntity<?> incrementerVues(@PathVariable Long id) {
        try {
            service.incrementerVues(id);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            log.error("Erreur incrémentation vues: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur"
            ));
        }
    }

    /**
     * POST /api/videos/{id}/incrementer-telechargements
     * Incrémente le nombre de téléchargements
     */
    @PostMapping("/videos/{id}/incrementer-telechargements")
    public ResponseEntity<?> incrementerTelechargements(@PathVariable Long id) {
        try {
            service.incrementerTelechargements(id);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            log.error("Erreur incrémentation téléchargements: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur"
            ));
        }
    }

    // ================= ENDPOINTS ADMIN =================

    /**
     * GET /api/admin/communications-videos
     * Récupère toutes les vidéos (ADMIN)
     */
    @GetMapping("/videos/admin/all")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getAllVideosAdmin() {
        try {
            List<CommunicationVideo> videos = service.getAllVideos();
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            log.error("Erreur récupération vidéos admin: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de la récupération des vidéos"
            ));
        }
    }

    /**
     * GET /api/admin/communications-videos/{id}
     * Récupère une vidéo par ID (ADMIN)
     */
    @GetMapping("/videos/admin/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getVideoByIdAdmin(@PathVariable Long id) {
        try {
            CommunicationVideo video = service.getVideoById(id);
            return ResponseEntity.ok(video);
        } catch (Exception e) {
            log.error("Erreur récupération vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Vidéo non trouvée"
            ));
        }
    }

    /**
     * POST /api/admin/communications-videos/{id}/approuver
     * Approuve une vidéo (ADMIN)
     */
    @PostMapping("/videos/admin/{id}/approuver")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> approuverVideo(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body
    ) {
        try {
            String commentaires = body != null ? body.get("commentaires") : null;
            CommunicationVideo video = service.approuver(id, commentaires);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Vidéo approuvée avec succès",
                    "video", video
            ));
        } catch (Exception e) {
            log.error("Erreur approbation vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de l'approbation"
            ));
        }
    }

    /**
     * POST /api/admin/communications-videos/{id}/rejeter
     * Rejette une vidéo (ADMIN)
     */
    @PostMapping("/videos/admin/{id}/rejeter")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> rejeterVideo(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body
    ) {
        try {
            String commentaires = body != null ? body.get("commentaires") : null;
            CommunicationVideo video = service.rejeter(id, commentaires);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Vidéo rejetée",
                    "video", video
            ));
        } catch (Exception e) {
            log.error("Erreur rejet vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors du rejet"
            ));
        }
    }

    /**
     * DELETE /api/admin/communications-videos/{id}
     * Supprime une vidéo (ADMIN)
     */
    @DeleteMapping("/videos/admin/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> supprimerVideo(@PathVariable Long id) {
        try {
            service.supprimer(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Vidéo supprimée avec succès"
            ));
        } catch (Exception e) {
            log.error("Erreur suppression vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de la suppression"
            ));
        }
    }
}
