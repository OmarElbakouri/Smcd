package com.smcd.congress.controller;

import com.smcd.congress.dto.*;
import com.smcd.congress.model.EPoster;
import com.smcd.congress.service.EPosterService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur pour la gestion des E-Posters
 */
@RestController
@RequestMapping("/api/eposters")
public class EPosterController {

    private static final Logger logger = LoggerFactory.getLogger(EPosterController.class);

    @Autowired
    private EPosterService ePosterService;

    // ============ ENDPOINTS PUBLICS ============

    /**
     * POST /api/eposters/upload
     * Upload un nouvel e-poster (public)
     */
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadEPoster(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nomAuteur") String nomAuteur,
            @RequestParam("prenomAuteur") String prenomAuteur,
            @RequestParam("emailAuteur") String emailAuteur,
            @RequestParam("titre") String titre,
            @RequestParam(value = "rubrique", required = false) String rubrique
    ) {
        try {
            EPosterUploadDTO dto = EPosterUploadDTO.builder()
                    .nomAuteur(nomAuteur)
                    .prenomAuteur(prenomAuteur)
                    .emailAuteur(emailAuteur)
                    .titre(titre)
                    .rubrique(rubrique)
                    .build();

            EPoster ePoster = ePosterService.uploadEPoster(file, dto);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "ePosterId", ePoster.getId(),
                    "message", "E-poster uploadé avec succès. Vous recevrez un email de confirmation."
            ));

        } catch (IllegalArgumentException e) {
            logger.warn("Erreur de validation lors de l'upload: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (IOException e) {
            logger.error("Erreur lors de l'upload du fichier: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de l'upload du fichier"
            ));
        }
    }

    /**
     * GET /api/eposters/public
     * Liste les e-posters approuvés (public)
     */
    @GetMapping("/public")
    public ResponseEntity<List<EPosterResponseDTO>> getEPostersPublics(
            @RequestParam(value = "annee", required = false) Integer annee,
            @RequestParam(value = "rubrique", required = false) String rubrique
    ) {
        List<EPosterResponseDTO> ePosters = ePosterService.getEPostersPublics(annee, rubrique);
        return ResponseEntity.ok(ePosters);
    }

    /**
     * GET /api/eposters/public/{id}
     * Récupère un e-poster public par ID
     */
    @GetMapping("/public/{id}")
    public ResponseEntity<?> getEPosterPublic(@PathVariable Long id) {
        try {
            EPoster ePoster = ePosterService.getEPosterById(id);
            
            // Vérifier que l'e-poster est approuvé
            if (ePoster.getStatut() != com.smcd.congress.model.enums.StatutEPoster.APPROUVE) {
                return ResponseEntity.notFound().build();
            }
            
            // Incrémenter les vues
            ePosterService.incrementerVues(id);
            
            return ResponseEntity.ok(EPosterResponseDTO.fromEntity(ePoster));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST /api/eposters/{id}/increment-download
     * Incrémente le compteur de téléchargements (public)
     */
    @PostMapping("/{id}/increment-download")
    public ResponseEntity<?> incrementerTelechargements(@PathVariable Long id) {
        try {
            ePosterService.incrementerTelechargements(id);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false));
        }
    }

    /**
     * GET /api/eposters/{id}/download
     * Télécharge un e-poster avec le nom de fichier original
     */
    @GetMapping("/{id}/download")
    public ResponseEntity<?> downloadEPoster(@PathVariable Long id) {
        try {
            EPoster ePoster = ePosterService.getEPosterById(id);
            
            // Incrémenter les téléchargements
            ePosterService.incrementerTelechargements(id);
            
            // Récupérer le nom de fichier original avec extension
            String filename = ePoster.getNomFichierOriginal();
            if (filename == null || filename.isEmpty()) {
                filename = "eposter-" + id + ".pdf";
            }
            
            // Rediriger vers l'URL Cloudinary avec Content-Disposition
            return ResponseEntity
                    .status(org.springframework.http.HttpStatus.FOUND)
                    .header("Location", ePoster.getFichierUrl())
                    .header("Content-Disposition", "attachment; filename=\"" + filename + "\"")
                    .build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ============ ENDPOINTS ADMIN ============

    /**
     * GET /api/eposters/admin
     * Liste tous les e-posters (admin)
     */
    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<List<EPosterAdminResponseDTO>> getEPostersAdmin(
            @RequestParam(value = "statut", required = false) String statut,
            @RequestParam(value = "annee", required = false) Integer annee,
            @RequestParam(value = "rubrique", required = false) String rubrique
    ) {
        List<EPosterAdminResponseDTO> ePosters = ePosterService.getEPostersAdmin(statut, annee, rubrique);
        return ResponseEntity.ok(ePosters);
    }

    /**
     * GET /api/eposters/admin/{id}
     * Récupère un e-poster par ID (admin)
     */
    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<EPosterAdminResponseDTO> getEPosterAdmin(@PathVariable Long id) {
        EPoster ePoster = ePosterService.getEPosterById(id);
        return ResponseEntity.ok(EPosterAdminResponseDTO.fromEntity(ePoster));
    }

    /**
     * PUT /api/eposters/{id}/approve
     * Approuve un e-poster (admin)
     */
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<EPosterAdminResponseDTO> approuverEPoster(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body
    ) {
        String commentaires = body != null ? body.get("commentaires") : null;
        EPoster ePoster = ePosterService.approuverEPoster(id, commentaires);
        return ResponseEntity.ok(EPosterAdminResponseDTO.fromEntity(ePoster));
    }

    /**
     * PUT /api/eposters/{id}/reject
     * Rejette un e-poster (admin)
     */
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> rejeterEPoster(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String raison = body.get("raison");
        if (raison == null || raison.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "La raison du rejet est obligatoire"
            ));
        }
        
        EPoster ePoster = ePosterService.rejeterEPoster(id, raison);
        return ResponseEntity.ok(EPosterAdminResponseDTO.fromEntity(ePoster));
    }

    /**
     * DELETE /api/eposters/{id}
     * Supprime un e-poster (admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> supprimerEPoster(@PathVariable Long id) {
        ePosterService.supprimerEPoster(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "E-poster supprimé avec succès"));
    }

    /**
     * GET /api/eposters/stats
     * Récupère les statistiques des e-posters (admin)
     */
    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<EPosterStatsDTO> getStats() {
        return ResponseEntity.ok(ePosterService.getStats());
    }
}
