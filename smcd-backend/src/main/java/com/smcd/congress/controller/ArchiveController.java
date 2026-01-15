package com.smcd.congress.controller;

import com.smcd.congress.dto.ArchiveDTO;
import com.smcd.congress.model.Archive;
import com.smcd.congress.service.ArchiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/archives")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://smcd-frontend.vercel.app"})
public class ArchiveController {

    private final ArchiveService archiveService;

    @GetMapping
    public ResponseEntity<List<Archive>> getAllArchives() {
        return ResponseEntity.ok(archiveService.getAllArchives());
    }

    @GetMapping("/{annee}")
    public ResponseEntity<Archive> getArchiveByAnnee(@PathVariable Integer annee) {
        return ResponseEntity.ok(archiveService.getByAnnee(annee));
    }

    @PostMapping
    public ResponseEntity<Archive> creerArchive(
            @RequestParam("annee") Integer annee,
            @RequestParam(value = "theme", required = false) String theme,
            @RequestParam(value = "lieu", required = false) String lieu,
            @RequestParam(value = "dateDebut", required = false) String dateDebut,
            @RequestParam(value = "dateFin", required = false) String dateFin,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "nombreParticipants", required = false) Integer nombreParticipants,
            @RequestParam(value = "nombreAbstracts", required = false) Integer nombreAbstracts,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {
        ArchiveDTO dto = ArchiveDTO.builder()
                .annee(annee)
                .theme(theme)
                .lieu(lieu)
                .dateDebut(dateDebut != null ? LocalDate.parse(dateDebut) : null)
                .dateFin(dateFin != null ? LocalDate.parse(dateFin) : null)
                .description(description)
                .nombreParticipants(nombreParticipants)
                .nombreAbstracts(nombreAbstracts)
                .build();

        return ResponseEntity.ok(archiveService.creerArchive(dto, image));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Archive> modifierArchive(
            @PathVariable Long id,
            @RequestParam(value = "theme", required = false) String theme,
            @RequestParam(value = "lieu", required = false) String lieu,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "nombreParticipants", required = false) Integer nombreParticipants,
            @RequestParam(value = "nombreAbstracts", required = false) Integer nombreAbstracts,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {
        ArchiveDTO dto = ArchiveDTO.builder()
                .theme(theme)
                .lieu(lieu)
                .description(description)
                .nombreParticipants(nombreParticipants)
                .nombreAbstracts(nombreAbstracts)
                .build();

        return ResponseEntity.ok(archiveService.modifierArchive(id, dto, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> supprimerArchive(@PathVariable Long id) {
        archiveService.supprimerArchive(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return ResponseEntity.ok(response);
    }
}
