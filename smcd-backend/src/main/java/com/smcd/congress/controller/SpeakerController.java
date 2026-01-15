package com.smcd.congress.controller;

import com.smcd.congress.dto.*;
import com.smcd.congress.model.Speaker;
import com.smcd.congress.service.SpeakerService;
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
 * Contrôleur pour la gestion des Speakers (Invités/Conférenciers)
 */
@RestController
@RequestMapping("/api/speakers")
public class SpeakerController {

    private static final Logger logger = LoggerFactory.getLogger(SpeakerController.class);

    @Autowired
    private SpeakerService speakerService;

    // ============ ENDPOINTS PUBLICS ============

    /**
     * GET /api/speakers
     * Liste les speakers (public)
     */
    @GetMapping
    public ResponseEntity<List<SpeakerPublicResponseDTO>> getSpeakers(
            @RequestParam(value = "annee", required = false) Integer annee,
            @RequestParam(value = "featured", required = false) Boolean featured
    ) {
        List<SpeakerPublicResponseDTO> speakers = speakerService.getSpeakersPublics(annee, featured);
        return ResponseEntity.ok(speakers);
    }

    /**
     * GET /api/speakers/{id}
     * Récupère un speaker par ID (public)
     */
    @GetMapping("/{id}")
    public ResponseEntity<SpeakerPublicResponseDTO> getSpeaker(@PathVariable Long id) {
        return ResponseEntity.ok(speakerService.getSpeakerPublicById(id));
    }

    /**
     * GET /api/speakers/filters
     * Récupère les options de filtres disponibles (public)
     */
    @GetMapping("/filters")
    public ResponseEntity<Map<String, List<String>>> getFilterOptions() {
        return ResponseEntity.ok(speakerService.getFilterOptions());
    }

    /**
     * GET /api/speakers/president
     * Récupère le président du congrès (public)
     */
    @GetMapping("/president")
    public ResponseEntity<SpeakerPublicResponseDTO> getPresident(
            @RequestParam(value = "annee", defaultValue = "2026") Integer annee
    ) {
        return speakerService.getPresident(annee)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ============ ENDPOINTS ADMIN ============

    /**
     * GET /api/speakers/admin
     * Liste tous les speakers avec infos complètes (admin)
     */
    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<List<SpeakerAdminResponseDTO>> getSpeakersAdmin(
            @RequestParam(value = "annee", required = false) Integer annee,
            @RequestParam(value = "pays", required = false) String pays,
            @RequestParam(value = "specialite", required = false) String specialite
    ) {
        List<SpeakerAdminResponseDTO> speakers = speakerService.getSpeakersAdmin(annee, pays, specialite);
        return ResponseEntity.ok(speakers);
    }

    /**
     * GET /api/speakers/admin/{id}
     * Récupère un speaker par ID avec infos complètes (admin)
     */
    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<SpeakerAdminResponseDTO> getSpeakerAdmin(@PathVariable Long id) {
        Speaker speaker = speakerService.getSpeakerById(id);
        return ResponseEntity.ok(SpeakerAdminResponseDTO.fromEntity(speaker));
    }

    /**
     * POST /api/speakers
     * Crée un nouveau speaker (admin)
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> creerSpeaker(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam(value = "cv", required = false) MultipartFile cv,
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam(value = "titre", required = false) String titre,
            @RequestParam(value = "specialite", required = false) String specialite,
            @RequestParam(value = "institution", required = false) String institution,
            @RequestParam(value = "pays", required = false) String pays,
            @RequestParam(value = "ville", required = false) String ville,
            @RequestParam(value = "bioCourteFr", required = false) String bioCourteFr,
            @RequestParam(value = "bioCompleteFr", required = false) String bioCompleteFr,
            @RequestParam(value = "bioCourteEn", required = false) String bioCourteEn,
            @RequestParam(value = "bioCompleteEn", required = false) String bioCompleteEn,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "telephone", required = false) String telephone,
            @RequestParam(value = "siteWeb", required = false) String siteWeb,
            @RequestParam(value = "linkedinUrl", required = false) String linkedinUrl,
            @RequestParam(value = "researchGateUrl", required = false) String researchGateUrl,
            @RequestParam(value = "featured", required = false) Boolean featured,
            @RequestParam(value = "annee", required = false) Integer annee
    ) {
        try {
            SpeakerDTO dto = SpeakerDTO.builder()
                    .titre(titre)
                    .nom(nom)
                    .prenom(prenom)
                    .specialite(specialite)
                    .institution(institution)
                    .pays(pays)
                    .ville(ville)
                    .bioCourteFr(bioCourteFr)
                    .bioCompleteFr(bioCompleteFr)
                    .bioCourteEn(bioCourteEn)
                    .bioCompleteEn(bioCompleteEn)
                    .email(email)
                    .telephone(telephone)
                    .siteWeb(siteWeb)
                    .linkedinUrl(linkedinUrl)
                    .researchGateUrl(researchGateUrl)
                    .featured(featured)
                    .annee(annee)
                    .build();

            Speaker speaker = speakerService.creerSpeaker(dto, photo, cv);
            return ResponseEntity.status(HttpStatus.CREATED).body(SpeakerAdminResponseDTO.fromEntity(speaker));

        } catch (IllegalArgumentException e) {
            logger.warn("Erreur de validation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (IOException e) {
            logger.error("Erreur lors de l'upload: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de l'upload des fichiers"
            ));
        }
    }

    /**
     * PUT /api/speakers/{id}
     * Modifie un speaker (admin)
     */
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> modifierSpeaker(
            @PathVariable Long id,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "cv", required = false) MultipartFile cv,
            @RequestParam(value = "nom", required = false) String nom,
            @RequestParam(value = "prenom", required = false) String prenom,
            @RequestParam(value = "titre", required = false) String titre,
            @RequestParam(value = "specialite", required = false) String specialite,
            @RequestParam(value = "institution", required = false) String institution,
            @RequestParam(value = "pays", required = false) String pays,
            @RequestParam(value = "ville", required = false) String ville,
            @RequestParam(value = "bioCourteFr", required = false) String bioCourteFr,
            @RequestParam(value = "bioCompleteFr", required = false) String bioCompleteFr,
            @RequestParam(value = "bioCourteEn", required = false) String bioCourteEn,
            @RequestParam(value = "bioCompleteEn", required = false) String bioCompleteEn,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "telephone", required = false) String telephone,
            @RequestParam(value = "siteWeb", required = false) String siteWeb,
            @RequestParam(value = "linkedinUrl", required = false) String linkedinUrl,
            @RequestParam(value = "researchGateUrl", required = false) String researchGateUrl,
            @RequestParam(value = "featured", required = false) Boolean featured
    ) {
        try {
            SpeakerDTO dto = SpeakerDTO.builder()
                    .titre(titre)
                    .nom(nom)
                    .prenom(prenom)
                    .specialite(specialite)
                    .institution(institution)
                    .pays(pays)
                    .ville(ville)
                    .bioCourteFr(bioCourteFr)
                    .bioCompleteFr(bioCompleteFr)
                    .bioCourteEn(bioCourteEn)
                    .bioCompleteEn(bioCompleteEn)
                    .email(email)
                    .telephone(telephone)
                    .siteWeb(siteWeb)
                    .linkedinUrl(linkedinUrl)
                    .researchGateUrl(researchGateUrl)
                    .featured(featured)
                    .build();

            Speaker speaker = speakerService.modifierSpeaker(id, dto, photo, cv);
            return ResponseEntity.ok(SpeakerAdminResponseDTO.fromEntity(speaker));

        } catch (IllegalArgumentException e) {
            logger.warn("Erreur de validation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (IOException e) {
            logger.error("Erreur lors de l'upload: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de l'upload des fichiers"
            ));
        }
    }

    /**
     * DELETE /api/speakers/{id}
     * Supprime un speaker (admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> supprimerSpeaker(@PathVariable Long id) {
        speakerService.supprimerSpeaker(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Invité supprimé avec succès"));
    }

    /**
     * PUT /api/speakers/reorder
     * Réorganise l'ordre des speakers (admin)
     */
    @PutMapping("/reorder")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> reordonnerSpeakers(@RequestBody SpeakerReorderDTO dto) {
        speakerService.reordonnerSpeakers(dto.getIdsOrdre());
        return ResponseEntity.ok(Map.of("success", true, "message", "Ordre mis à jour avec succès"));
    }

    /**
     * GET /api/speakers/stats
     * Récupère les statistiques des speakers (admin)
     */
    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'MODERATEUR')")
    public ResponseEntity<SpeakerStatsDTO> getStats(
            @RequestParam(value = "annee", required = false) Integer annee
    ) {
        return ResponseEntity.ok(speakerService.getStats(annee));
    }
}
