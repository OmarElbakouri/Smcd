package com.smcd.congress.controller;

import com.smcd.congress.dto.ApiResponse;
import com.smcd.congress.dto.VideoDTO;
import com.smcd.congress.dto.VideoResponseDTO;
import com.smcd.congress.dto.VideoStatsDTO;
import com.smcd.congress.model.Video;
import com.smcd.congress.model.enums.VisibiliteVideo;
import com.smcd.congress.service.ChapterService;
import com.smcd.congress.service.VideoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des vidéos
 * Les vidéos sont le troisième niveau de la hiérarchie vidéo
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class VideoController {

    private static final Logger logger = LoggerFactory.getLogger(VideoController.class);

    @Autowired
    private VideoService videoService;

    @Autowired
    private ChapterService chapterService;

    // ================= ENDPOINTS PUBLICS =================

    /**
     * Récupère toutes les vidéos publiées d'un chapitre
     * GET /api/public/chapters/{chapterSlug}/videos
     */
    @GetMapping("/public/chapters/{chapterSlug}/videos")
    public ResponseEntity<?> getPublicVideos(
            @PathVariable String chapterSlug) {
        try {
            List<VideoResponseDTO> videos = videoService.getVideosByChapter(chapterSlug);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            logger.error("Erreur récupération vidéos: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Erreur lors de la récupération des vidéos"));
        }
    }

    /**
     * Récupère une vidéo par son slug
     * GET /api/public/videos/{slug}
     */
    @GetMapping("/public/videos/{slug}")
    public ResponseEntity<?> getPublicVideoBySlug(@PathVariable String slug) {
        try {
            VideoResponseDTO video = videoService.getVideoBySlug(slug);
            return ResponseEntity.ok(video);
        } catch (Exception e) {
            logger.error("Erreur récupération vidéo {}: {}", slug, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Vidéo non trouvée"));
        }
    }

    /**
     * Incrémente le nombre de vues d'une vidéo
     * POST /api/public/videos/{id}/view
     */
    @PostMapping("/public/videos/{id}/view")
    public ResponseEntity<?> incrementViews(@PathVariable Long id) {
        try {
            videoService.incrementerVues(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erreur incrémentation vues {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de l'enregistrement de la vue"));
        }
    }

    /**
     * Récupère les vidéos les plus vues
     * GET /api/public/videos/popular
     */
    @GetMapping("/public/videos/popular")
    public ResponseEntity<?> getPopularVideos() {
        try {
            List<VideoResponseDTO> videos = videoService.getVideosLesPlusVues(10);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            logger.error("Erreur récupération vidéos populaires: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la récupération des vidéos populaires"));
        }
    }

    /**
     * Recherche de vidéos
     * GET /api/public/videos/search?q=keyword
     */
    @GetMapping("/public/videos/search")
    public ResponseEntity<?> searchVideos(
            @RequestParam("q") String query) {
        try {
            List<VideoResponseDTO> videos = videoService.chercherVideos(query);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            logger.error("Erreur recherche vidéos: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la recherche"));
        }
    }

    // ================= ENDPOINTS ADMIN =================

    /**
     * Récupère toutes les vidéos d'un chapitre (admin)
     * GET /api/admin/chapters/{chapterId}/videos
     */
    @GetMapping("/admin/chapters/{chapterId}/videos")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getVideosByChapter(@PathVariable Long chapterId) {
        try {
            List<VideoResponseDTO> videos = videoService.getVideosParChapitreId(chapterId);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            logger.error("Erreur récupération vidéos chapter {}: {}", chapterId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la récupération des vidéos"));
        }
    }

    /**
     * Récupère une vidéo par son ID
     * GET /api/admin/videos/{id}
     */
    @GetMapping("/admin/videos/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getVideoById(@PathVariable Long id) {
        try {
            VideoResponseDTO video = videoService.getVideoById(id);
            return ResponseEntity.ok(video);
        } catch (Exception e) {
            logger.error("Erreur récupération vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Vidéo non trouvée"));
        }
    }

    /**
     * Upload une nouvelle vidéo
     * POST /api/admin/videos
     */
    @PostMapping(value = "/admin/videos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> uploadVideo(
            @RequestParam("chapterId") Long chapterId,
            @RequestParam("titre") String titre,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "intervenant", required = false) String intervenant,
            @RequestParam(value = "coIntervenants", required = false) String coIntervenants,
            @RequestParam(value = "tags", required = false) String tags,
            @RequestParam(value = "langue", defaultValue = "FR") String langue,
            @RequestParam(value = "visibilite", defaultValue = "PUBLIC") String visibilite,
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) {
        try {
            if (videoFile == null || videoFile.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Le fichier vidéo est requis"));
            }

            VideoDTO dto = new VideoDTO();
            dto.setChapterId(chapterId);
            dto.setTitre(titre);
            dto.setDescription(description);
            dto.setIntervenant(intervenant);
            dto.setCoIntervenants(coIntervenants);
            dto.setTags(tags);
            dto.setLangue(langue);
            dto.setVisibilite(VisibiliteVideo.valueOf(visibilite));

            Video video = videoService.uploadVideo(videoFile, thumbnail, dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(VideoResponseDTO.fromVideo(video));
        } catch (Exception e) {
            logger.error("Erreur upload vidéo: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de l'upload de la vidéo: " + e.getMessage()));
        }
    }

    /**
     * Met à jour les métadonnées d'une vidéo
     * PUT /api/admin/videos/{id}
     */
    @PutMapping("/admin/videos/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> updateVideo(
            @PathVariable Long id,
            @RequestBody VideoDTO dto) {
        try {
            Video video = videoService.modifierVideo(id, dto, null);
            return ResponseEntity.ok(VideoResponseDTO.fromVideo(video));
        } catch (Exception e) {
            logger.error("Erreur mise à jour vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la mise à jour de la vidéo: " + e.getMessage()));
        }
    }

    /**
     * Met à jour le thumbnail d'une vidéo
     * PUT /api/admin/videos/{id}/thumbnail
     */
    @PutMapping(value = "/admin/videos/{id}/thumbnail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> updateThumbnail(
            @PathVariable Long id,
            @RequestParam("thumbnail") MultipartFile thumbnail) {
        try {
            VideoDTO dto = new VideoDTO();
            Video video = videoService.modifierVideo(id, dto, thumbnail);
            return ResponseEntity.ok(VideoResponseDTO.fromVideo(video));
        } catch (Exception e) {
            logger.error("Erreur mise à jour thumbnail {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la mise à jour du thumbnail"));
        }
    }

    /**
     * Publie une vidéo
     * PATCH /api/admin/videos/{id}/publish
     */
    @PatchMapping("/admin/videos/{id}/publish")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> publishVideo(@PathVariable Long id) {
        try {
            Video video = videoService.publierVideo(id);
            return ResponseEntity.ok(VideoResponseDTO.fromVideo(video));
        } catch (Exception e) {
            logger.error("Erreur publication vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la publication de la vidéo"));
        }
    }

    /**
     * Dépublie une vidéo
     * PATCH /api/admin/videos/{id}/unpublish
     */
    @PatchMapping("/admin/videos/{id}/unpublish")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> unpublishVideo(@PathVariable Long id) {
        try {
            Video video = videoService.depublierVideo(id);
            return ResponseEntity.ok(VideoResponseDTO.fromVideo(video));
        } catch (Exception e) {
            logger.error("Erreur dépublication vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la dépublication de la vidéo"));
        }
    }

    /**
     * Supprime une vidéo
     * DELETE /api/admin/videos/{id}
     */
    @DeleteMapping("/admin/videos/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) {
        try {
            videoService.supprimerVideo(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erreur suppression vidéo {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la suppression de la vidéo: " + e.getMessage()));
        }
    }

    /**
     * Réordonne les vidéos d'un chapitre
     * PUT /api/admin/chapters/{chapterId}/videos/reorder
     */
    @PutMapping("/admin/chapters/{chapterId}/videos/reorder")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> reorderVideos(
            @PathVariable Long chapterId,
            @RequestBody List<Long> videoIds) {
        try {
            videoService.reordonnerVideos(chapterId, videoIds);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erreur réordonnancement vidéos: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors du réordonnancement des vidéos"));
        }
    }

    /**
     * Récupère les statistiques des vidéos
     * GET /api/admin/videos/stats
     */
    @GetMapping("/admin/videos/stats")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getVideoStats() {
        try {
            VideoStatsDTO stats = videoService.getStatistiques();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            logger.error("Erreur récupération stats vidéos: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la récupération des statistiques"));
        }
    }
}
