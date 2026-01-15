package com.smcd.congress.controller;

import com.smcd.congress.dto.ApiResponse;
import com.smcd.congress.service.CloudinaryService;
import com.smcd.congress.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur de test
 * Fournit des endpoints pour tester les services (Cloudinary, Email)
 * Note: À désactiver ou protéger en production
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private EmailService emailService;

    /**
     * GET /api/test/health
     * Vérifie que l'API est fonctionnelle
     * 
     * @return Message de statut
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "SMCD Congress API");
        response.put("version", "1.0.0");
        response.put("timestamp", java.time.LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/test/upload
     * Teste l'upload de fichier vers Cloudinary
     * 
     * @param file Le fichier à uploader
     * @param folder Le dossier de destination (optionnel, défaut: "test")
     * @return L'URL du fichier uploadé
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> testUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "test") String folder) {
        
        try {
            Map<String, String> uploadResult = cloudinaryService.uploadFile(file, folder);
            String url = uploadResult.get("url");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Fichier uploadé avec succès");
            response.put("url", url);
            response.put("publicId", uploadResult.get("publicId"));
            response.put("originalFilename", file.getOriginalFilename());
            response.put("size", file.getSize());
            response.put("contentType", file.getContentType());
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors de l'upload: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * POST /api/test/send-email
     * Teste l'envoi d'email
     * 
     * @param to L'adresse email de destination
     * @param subject Le sujet de l'email (optionnel)
     * @param body Le contenu de l'email (optionnel)
     * @return Confirmation de l'envoi
     */
    @PostMapping("/send-email")
    public ResponseEntity<ApiResponse> testEmail(
            @RequestParam("to") String to,
            @RequestParam(value = "subject", defaultValue = "Test SMCD Congress") String subject,
            @RequestParam(value = "body", defaultValue = "Ceci est un email de test envoyé depuis l'API SMCD Congress.") String body) {
        
        try {
            emailService.sendSimpleEmail(to, subject, body);
            return ResponseEntity.ok(ApiResponse.success("Email envoyé avec succès à " + to));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Erreur lors de l'envoi: " + e.getMessage()));
        }
    }

    /**
     * DELETE /api/test/delete-file
     * Teste la suppression de fichier Cloudinary
     * 
     * @param publicId L'identifiant public du fichier
     * @return Confirmation de la suppression
     */
    @DeleteMapping("/delete-file")
    public ResponseEntity<ApiResponse> testDeleteFile(@RequestParam("publicId") String publicId) {
        boolean success = cloudinaryService.deleteFile(publicId);
        
        if (success) {
            return ResponseEntity.ok(ApiResponse.success("Fichier supprimé avec succès"));
        } else {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Échec de la suppression du fichier"));
        }
    }
}
