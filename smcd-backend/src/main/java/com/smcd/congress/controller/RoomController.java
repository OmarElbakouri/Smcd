package com.smcd.congress.controller;

import com.smcd.congress.dto.ApiResponse;
import com.smcd.congress.dto.RoomDTO;
import com.smcd.congress.dto.RoomResponseDTO;
import com.smcd.congress.model.Room;
import com.smcd.congress.service.RoomService;
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
 * Contrôleur REST pour la gestion des salles (rooms)
 * Les salles sont le premier niveau de la hiérarchie vidéo
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RoomController {

    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);

    @Autowired
    private RoomService roomService;

    /**
     * Récupère toutes les salles actives pour une année
     * GET /api/public/rooms?annee=2026
     */
    @GetMapping("/public/rooms")
    public ResponseEntity<?> getPublicRooms(
            @RequestParam(defaultValue = "2026") Integer annee) {
        try {
            List<RoomResponseDTO> rooms = roomService.getRoomsPubliques(annee);
            return ResponseEntity.ok(rooms);
        } catch (Exception e) {
            logger.error("Erreur récupération salles publiques: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la récupération des salles"));
        }
    }

    /**
     * Récupère une salle par son slug (avec chapitres)
     * GET /api/public/rooms/{slug}
     */
    @GetMapping("/public/rooms/{slug}")
    public ResponseEntity<?> getPublicRoomBySlug(@PathVariable String slug) {
        try {
            RoomResponseDTO room = roomService.getRoomBySlug(slug);
            return ResponseEntity.ok(room);
        } catch (Exception e) {
            logger.error("Erreur récupération salle {}: {}", slug, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Salle non trouvée"));
        }
    }

    // ================= ENDPOINTS ADMIN =================

    /**
     * Récupère toutes les salles (actives et inactives)
     * GET /api/admin/rooms?annee=2026
     */
    @GetMapping("/admin/rooms")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getAllRooms(
            @RequestParam(defaultValue = "2026") Integer annee) {
        try {
            List<RoomResponseDTO> rooms = roomService.getAllRooms(annee);
            return ResponseEntity.ok(rooms);
        } catch (Exception e) {
            logger.error("Erreur récupération salles admin: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la récupération des salles"));
        }
    }

    /**
     * Récupère une salle par son ID
     * GET /api/admin/rooms/{id}
     */
    @GetMapping("/admin/rooms/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getRoomById(@PathVariable Long id) {
        try {
            RoomResponseDTO room = roomService.getRoomById(id);
            return ResponseEntity.ok(room);
        } catch (Exception e) {
            logger.error("Erreur récupération salle {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Salle non trouvée"));
        }
    }

    /**
     * Crée une nouvelle salle
     * POST /api/admin/rooms
     */
    @PostMapping(value = "/admin/rooms", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> createRoom(
            @RequestParam("nom") String nom,
            @RequestParam(value = "nomCourt", required = false) String nomCourt,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "descriptionCourte", required = false) String descriptionCourte,
            @RequestParam(value = "couleur", required = false) String couleur,
            @RequestParam(value = "icone", required = false) String icone,
            @RequestParam(value = "annee", defaultValue = "2026") Integer annee,
            @RequestParam(value = "active", defaultValue = "true") Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            RoomDTO dto = new RoomDTO();
            dto.setNom(nom);
            dto.setNomCourt(nomCourt);
            dto.setDescription(description);
            dto.setDescriptionCourte(descriptionCourte);
            dto.setCouleur(couleur);
            dto.setIcone(icone);
            dto.setAnnee(annee);
            dto.setActive(active);

            Room room = roomService.creerRoom(dto, image);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(RoomResponseDTO.fromRoom(room));
        } catch (Exception e) {
            logger.error("Erreur création salle: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la création de la salle: " + e.getMessage()));
        }
    }

    /**
     * Met à jour une salle
     * PUT /api/admin/rooms/{id}
     */
    @PutMapping(value = "/admin/rooms/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> updateRoom(
            @PathVariable Long id,
            @RequestParam("nom") String nom,
            @RequestParam(value = "nomCourt", required = false) String nomCourt,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "descriptionCourte", required = false) String descriptionCourte,
            @RequestParam(value = "couleur", required = false) String couleur,
            @RequestParam(value = "icone", required = false) String icone,
            @RequestParam(value = "annee", defaultValue = "2026") Integer annee,
            @RequestParam(value = "active", defaultValue = "true") Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            RoomDTO dto = new RoomDTO();
            dto.setNom(nom);
            dto.setNomCourt(nomCourt);
            dto.setDescription(description);
            dto.setDescriptionCourte(descriptionCourte);
            dto.setCouleur(couleur);
            dto.setIcone(icone);
            dto.setAnnee(annee);
            dto.setActive(active);

            Room room = roomService.modifierRoom(id, dto, image);
            return ResponseEntity.ok(RoomResponseDTO.fromRoom(room));
        } catch (Exception e) {
            logger.error("Erreur mise à jour salle {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la mise à jour de la salle: " + e.getMessage()));
        }
    }

    /**
     * Supprime une salle
     * DELETE /api/admin/rooms/{id}
     */
    @DeleteMapping("/admin/rooms/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        try {
            roomService.supprimerRoom(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erreur suppression salle {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors de la suppression de la salle: " + e.getMessage()));
        }
    }

    /**
     * Active/désactive une salle
     * PATCH /api/admin/rooms/{id}/toggle
     */
    @PatchMapping("/admin/rooms/{id}/toggle")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> toggleRoom(@PathVariable Long id) {
        try {
            Room room = roomService.toggleActive(id);
            if (room == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Salle non trouvée"));
            }
            return ResponseEntity.ok(RoomResponseDTO.fromRoom(room));
        } catch (Exception e) {
            logger.error("Erreur toggle salle {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors du changement d'état de la salle"));
        }
    }

    /**
     * Réordonne les salles
     * PUT /api/admin/rooms/reorder
     */
    @PutMapping("/admin/rooms/reorder")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> reorderRooms(@RequestBody List<Long> roomIds) {
        try {
            roomService.reordonnerRooms(roomIds);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erreur réordonnancement salles: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Erreur lors du réordonnancement des salles"));
        }
    }
}
