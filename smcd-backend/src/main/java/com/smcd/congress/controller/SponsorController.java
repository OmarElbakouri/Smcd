package com.smcd.congress.controller;

import com.smcd.congress.dto.SponsorDTO;
import com.smcd.congress.model.Sponsor;
import com.smcd.congress.model.enums.NiveauSponsor;
import com.smcd.congress.service.SponsorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sponsors")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "https://smcd-frontend.vercel.app"})
public class SponsorController {

    private final SponsorService sponsorService;

    @PostMapping
    public ResponseEntity<Sponsor> creerSponsor(
            @RequestParam("logo") MultipartFile logo,
            @RequestParam("nom") String nom,
            @RequestParam(value = "nomCourt", required = false) String nomCourt,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("niveau") NiveauSponsor niveau,
            @RequestParam(value = "categorie", required = false) String categorie,
            @RequestParam(value = "siteWeb", required = false) String siteWeb,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "annee", defaultValue = "2026") Integer annee
    ) throws IOException {
        SponsorDTO dto = SponsorDTO.builder()
                .nom(nom)
                .nomCourt(nomCourt)
                .description(description)
                .niveau(niveau)
                .categorie(categorie)
                .siteWeb(siteWeb)
                .email(email)
                .annee(annee)
                .build();

        return ResponseEntity.ok(sponsorService.creerSponsor(dto, logo));
    }

    @GetMapping
    public ResponseEntity<Map<String, List<Sponsor>>> getSponsorsPublics(
            @RequestParam(defaultValue = "2026") Integer annee
    ) {
        return ResponseEntity.ok(sponsorService.getSponsorsPublics(annee));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Sponsor>> getAllSponsors(
            @RequestParam(required = false) Integer annee
    ) {
        return ResponseEntity.ok(sponsorService.getAll(annee));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sponsor> getSponsor(@PathVariable Long id) {
        return ResponseEntity.ok(sponsorService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sponsor> updateSponsor(
            @PathVariable Long id,
            @RequestParam(value = "logo", required = false) MultipartFile logo,
            @RequestParam("nom") String nom,
            @RequestParam(value = "nomCourt", required = false) String nomCourt,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("niveau") NiveauSponsor niveau,
            @RequestParam(value = "siteWeb", required = false) String siteWeb,
            @RequestParam(value = "annee", defaultValue = "2026") Integer annee
    ) throws IOException {
        SponsorDTO dto = SponsorDTO.builder()
                .nom(nom)
                .nomCourt(nomCourt)
                .description(description)
                .niveau(niveau)
                .siteWeb(siteWeb)
                .annee(annee)
                .build();

        return ResponseEntity.ok(sponsorService.modifierSponsor(id, dto, logo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteSponsor(@PathVariable Long id) {
        sponsorService.supprimerSponsor(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/click")
    public ResponseEntity<Map<String, Object>> incrementerClics(@PathVariable Long id) {
        sponsorService.incrementerClics(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(sponsorService.getStats());
    }

    @GetMapping("/niveaux")
    public ResponseEntity<Map<String, Object>> getNiveaux() {
        Map<String, Object> niveaux = new HashMap<>();
        for (NiveauSponsor niveau : NiveauSponsor.values()) {
            Map<String, Object> info = new HashMap<>();
            info.put("nom", niveau.getNom());
            info.put("couleur", niveau.getCouleur());
            info.put("priorite", niveau.getPriorite());
            niveaux.put(niveau.name(), info);
        }
        return ResponseEntity.ok(niveaux);
    }
}
