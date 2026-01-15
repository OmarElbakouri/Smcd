package com.smcd.congress.controller;

import com.smcd.congress.dto.*;
import com.smcd.congress.model.Abstract;
import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutSoumission;
import com.smcd.congress.service.AbstractService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion des abstracts
 */
@RestController
@RequestMapping("/api/abstracts")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "https://smcd-frontend.vercel.app"})
public class AbstractController {

    private final AbstractService abstractService;

    /**
     * Soumettre un nouvel abstract (accès public)
     */
    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitAbstract(@Valid @RequestBody AbstractSubmissionDTO dto) {
        log.info("Nouvelle soumission d'abstract reçue de: {} {}", dto.getPrenom(), dto.getNom());

        try {
            Abstract abstractEntity = abstractService.submitAbstract(dto);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("numeroReference", abstractEntity.getNumeroReference());
            response.put("message", "Votre abstract a été soumis avec succès. Vous recevrez un email de confirmation.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erreur lors de la soumission de l'abstract", e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Une erreur est survenue lors de la soumission: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Récupérer tous les abstracts avec filtres
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<?> getAbstracts(
            @RequestParam(required = false) StatutSoumission statut,
            @RequestParam(required = false) Rubrique rubrique,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateDebut,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFin,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dateSoumission"));
            Page<AbstractResponseDTO> abstracts = abstractService.getAbstracts(statut, rubrique, dateDebut, dateFin, search, pageable);
            return ResponseEntity.ok(abstracts);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des abstracts", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * Récupérer un abstract par son ID (admin uniquement)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<AbstractResponseDTO> getAbstractById(@PathVariable Long id) {
        AbstractResponseDTO abstractDto = abstractService.getAbstractById(id);
        return ResponseEntity.ok(abstractDto);
    }

    /**
     * Récupérer un abstract par son numéro de référence
     */
    @GetMapping("/reference/{numeroReference}")
    public ResponseEntity<AbstractResponseDTO> getAbstractByReference(@PathVariable String numeroReference) {
        AbstractResponseDTO abstractDto = abstractService.getAbstractByReference(numeroReference);
        return ResponseEntity.ok(abstractDto);
    }

    /**
     * Mettre à jour le statut d'un abstract (admin uniquement)
     */
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<AbstractResponseDTO> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusDTO dto
    ) {
        log.info("Mise à jour du statut de l'abstract {} vers {}", id, dto.getStatut());
        AbstractResponseDTO abstractDto = abstractService.updateStatus(id, dto);
        return ResponseEntity.ok(abstractDto);
    }

    /**
     * Récupérer les statistiques des abstracts
     */
    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<AbstractStatsDTO> getStats() {
        AbstractStatsDTO stats = abstractService.getStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Exporter les abstracts (admin uniquement)
     */
    @GetMapping("/export")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MODERATEUR')")
    public ResponseEntity<List<AbstractResponseDTO>> exportAbstracts(
            @RequestParam(required = false) StatutSoumission statut,
            @RequestParam(required = false) Rubrique rubrique
    ) {
        List<AbstractResponseDTO> abstracts = abstractService.getAllForExport(statut, rubrique);
        return ResponseEntity.ok(abstracts);
    }

    /**
     * Supprimer un abstract (super admin uniquement)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteAbstract(@PathVariable Long id) {
        log.info("Suppression de l'abstract {}", id);
        abstractService.deleteAbstract(id);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Abstract supprimé avec succès");

        return ResponseEntity.ok(response);
    }

    /**
     * Récupérer les options pour les formulaires (enums)
     */
    @GetMapping("/options")
    public ResponseEntity<Map<String, Object>> getOptions() {
        Map<String, Object> options = new HashMap<>();

        // Types de communication
        Map<String, String> types = new HashMap<>();
        for (com.smcd.congress.model.enums.TypeCommunication type : com.smcd.congress.model.enums.TypeCommunication.values()) {
            types.put(type.name(), type.getLabel());
        }
        options.put("types", types);

        // Rubriques
        Map<String, String> rubriques = new HashMap<>();
        for (Rubrique rubrique : Rubrique.values()) {
            rubriques.put(rubrique.name(), rubrique.getLabel());
        }
        options.put("rubriques", rubriques);

        // Statuts
        Map<String, String> statuts = new HashMap<>();
        for (StatutSoumission statut : StatutSoumission.values()) {
            statuts.put(statut.name(), statut.getLabel());
        }
        options.put("statuts", statuts);

        return ResponseEntity.ok(options);
    }
}
