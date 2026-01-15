package com.smcd.congress.controller;

import com.smcd.congress.dto.DocumentDTO;
import com.smcd.congress.model.Document;
import com.smcd.congress.model.enums.TypeDocument;
import com.smcd.congress.service.DocumentService;
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
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "https://smcd-frontend.vercel.app"})
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("titre") String titre,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "descriptionCourte", required = false) String descriptionCourte,
            @RequestParam(value = "type", required = false) TypeDocument type,
            @RequestParam(value = "annee", defaultValue = "2026") Integer annee,
            @RequestParam(value = "langue", defaultValue = "FR") String langue
    ) throws IOException {
        DocumentDTO dto = DocumentDTO.builder()
                .titre(titre)
                .description(description)
                .descriptionCourte(descriptionCourte)
                .type(type)
                .annee(annee)
                .langue(langue)
                .build();

        Document document = documentService.uploadDocument(file, dto);
        return ResponseEntity.ok(document);
    }

    @GetMapping("/public")
    public ResponseEntity<List<Document>> getDocumentsPublics(
            @RequestParam(required = false) TypeDocument type,
            @RequestParam(required = false) Integer annee
    ) {
        return ResponseEntity.ok(documentService.getDocumentsPublics(type, annee));
    }

    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getById(id));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Map<String, String>> downloadDocument(@PathVariable Long id) {
        Document document = documentService.getById(id);
        documentService.incrementerTelechargements(id);
        
        Map<String, String> response = new HashMap<>();
        response.put("url", document.getFichierUrl());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("titre") String titre,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "type", required = false) TypeDocument type,
            @RequestParam(value = "annee", defaultValue = "2026") Integer annee
    ) throws IOException {
        DocumentDTO dto = DocumentDTO.builder()
                .titre(titre)
                .description(description)
                .type(type)
                .annee(annee)
                .build();

        return ResponseEntity.ok(documentService.modifierDocument(id, dto, file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteDocument(@PathVariable Long id) {
        documentService.supprimerDocument(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Document supprimé avec succès");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(documentService.getStats());
    }

    @GetMapping("/types")
    public ResponseEntity<Map<String, String>> getTypes() {
        Map<String, String> types = new HashMap<>();
        for (TypeDocument type : TypeDocument.values()) {
            types.put(type.name(), type.getLabel());
        }
        return ResponseEntity.ok(types);
    }
}
