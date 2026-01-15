package com.smcd.congress.controller;

import com.smcd.congress.dto.ContenuDTO;
import com.smcd.congress.model.ContenuStatique;
import com.smcd.congress.service.ContenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/contenu")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://smcd-frontend.vercel.app"})
public class ContenuController {

    private final ContenuService contenuService;

    @GetMapping("/{cle}")
    public ResponseEntity<ContenuStatique> getContenu(@PathVariable String cle) {
        return ResponseEntity.ok(contenuService.getContenu(cle));
    }

    @GetMapping
    public ResponseEntity<List<ContenuStatique>> getAllContenus() {
        return ResponseEntity.ok(contenuService.getAllContenus());
    }

    @PutMapping("/{cle}")
    public ResponseEntity<ContenuStatique> updateContenu(
            @PathVariable String cle,
            @RequestParam(value = "titreFr", required = false) String titreFr,
            @RequestParam(value = "titreEn", required = false) String titreEn,
            @RequestParam(value = "contenuFr", required = false) String contenuFr,
            @RequestParam(value = "contenuEn", required = false) String contenuEn,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication
    ) throws IOException {
        ContenuDTO dto = ContenuDTO.builder()
                .titreFr(titreFr)
                .titreEn(titreEn)
                .contenuFr(contenuFr)
                .contenuEn(contenuEn)
                .build();

        String modifiePar = authentication != null ? authentication.getName() : "admin";
        return ResponseEntity.ok(contenuService.updateContenu(cle, dto, image, modifiePar));
    }
}
