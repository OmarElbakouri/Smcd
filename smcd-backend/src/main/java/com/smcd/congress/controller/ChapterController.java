package com.smcd.congress.controller;

import com.smcd.congress.dto.ApiResponse;
import com.smcd.congress.dto.ChapterDTO;
import com.smcd.congress.dto.ChapterResponseDTO;
import com.smcd.congress.dto.RoomResponseDTO;
import com.smcd.congress.model.Chapter;
import com.smcd.congress.model.Room;
import com.smcd.congress.service.ChapterService;
import com.smcd.congress.service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des chapitres
 * Les chapitres sont le deuxième niveau de la hiérarchie vidéo
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChapterController {

    private static final Logger logger = LoggerFactory.getLogger(ChapterController.class);

    @Autowired
    private ChapterService chapterService;

    @Autowired
    private RoomService roomService;

    // ================= ENDPOINTS PUBLICS =================

    /**
     * Récupère tous les chapitres d'une salle
     * GET /api/public/rooms/{roomSlug}/chapters
     */
    @GetMapping("/public/rooms/{roomSlug}/chapters")
    public ResponseEntity<?> getPublicChapters(
            @PathVariable String roomSlug) {
        try {
            RoomResponseDTO room = roomService.getRoomBySlug(roomSlug);
            List<ChapterResponseDTO> chapters = chapterService.getChaptersByRoom(room.getId());
            return ResponseEntity.ok(chapters);
        } catch (Exception e) {
            logger.error("Erreur récupération chapitres: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Erreur lors de la récupération des chapitres"));
        }
    }

    /**
     * Récupère un chapitre par son slug (avec vidéos)
     * GET /api/public/chapters/{slug}
     */
    @GetMapping("/public/chapters/{slug}")
    public ResponseEntity<?> getPublicChapterBySlug(@PathVariable String slug) {
        try {
            ChapterResponseDTO chapter = chapterService.getChapterBySlug(slug);
            return ResponseEntity.ok(chapter);
        } catch (Exception e) {
            logger.error("Erreur récupération chapitre {}: {}", slug, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Chapitre non trouvé"));
        }
    }

    // ================= ENDPOINTS ADMIN =================

    /**
     * Récupère tous les chapitres d'une salle (admin)
     * GET /api/admin/rooms/{roomId}/chapters
     */
    @GetMapping("/admin/rooms/{roomId}/chapters")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getChaptersByRoom(@PathVariable Long roomId) {
        try {
            List<ChapterResponseDTO> chapters = chapterService.getChaptersByRoomWithVideos(roomId);
            return ResponseEntity.ok(chapters);
        } catch (Exception e) {
            logger.error("Erreur récupération chapitres room {}: {}", roomId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la récupération des chapitres"));
        }
    }

    /**
     * Récupère un chapitre par son ID
     * GET /api/admin/chapters/{id}
     */
    @GetMapping("/admin/chapters/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getChapterById(@PathVariable Long id) {
        try {
            ChapterResponseDTO chapter = chapterService.getChapterById(id);
            return ResponseEntity.ok(chapter);
        } catch (Exception e) {
            logger.error("Erreur récupération chapitre {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Chapitre non trouvé"));
        }
    }

    /**
     * Crée un nouveau chapitre
     * POST /api/admin/chapters
     */
    @PostMapping("/admin/chapters")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> createChapter(@RequestBody ChapterDTO dto) {
        try {
            Chapter chapter = chapterService.creerChapter(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ChapterResponseDTO.fromChapter(chapter));
        } catch (Exception e) {
            logger.error("Erreur création chapitre: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la création du chapitre: " + e.getMessage()));
        }
    }

    /**
     * Met à jour un chapitre
     * PUT /api/admin/chapters/{id}
     */
    @PutMapping("/admin/chapters/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> updateChapter(
            @PathVariable Long id,
            @RequestBody ChapterDTO dto) {
        try {
            Chapter chapter = chapterService.modifierChapter(id, dto);
            return ResponseEntity.ok(ChapterResponseDTO.fromChapter(chapter));
        } catch (Exception e) {
            logger.error("Erreur mise à jour chapitre {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la mise à jour du chapitre: " + e.getMessage()));
        }
    }

    /**
     * Supprime un chapitre
     * DELETE /api/admin/chapters/{id}
     */
    @DeleteMapping("/admin/chapters/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> deleteChapter(@PathVariable Long id) {
        try {
            chapterService.supprimerChapter(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erreur suppression chapitre {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la suppression du chapitre: " + e.getMessage()));
        }
    }

    /**
     * Déplace un chapitre vers une autre salle
     * PATCH /api/admin/chapters/{id}/move
     */
    @PatchMapping("/admin/chapters/{id}/move")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> moveChapter(
            @PathVariable Long id,
            @RequestParam Long newRoomId) {
        try {
            Chapter chapter = chapterService.deplacerChapter(id, newRoomId);
            return ResponseEntity.ok(ChapterResponseDTO.fromChapter(chapter));
        } catch (Exception e) {
            logger.error("Erreur déplacement chapitre {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors du déplacement du chapitre"));
        }
    }

    /**
     * Réordonne les chapitres d'une salle
     * PUT /api/admin/rooms/{roomId}/chapters/reorder
     */
    @PutMapping("/admin/rooms/{roomId}/chapters/reorder")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> reorderChapters(
            @PathVariable Long roomId,
            @RequestBody List<Long> chapterIds) {
        try {
            chapterService.reordonnerChapters(roomId, chapterIds);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erreur réordonnancement chapitres: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors du réordonnancement des chapitres"));
        }
    }
}
