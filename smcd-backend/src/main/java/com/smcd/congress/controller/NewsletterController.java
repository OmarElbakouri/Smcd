package com.smcd.congress.controller;

import com.smcd.congress.dto.NewsletterDTO;
import com.smcd.congress.model.NewsletterSubscriber;
import com.smcd.congress.service.NewsletterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://smcd-frontend.vercel.app"})
public class NewsletterController {

    private final NewsletterService newsletterService;

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, Object>> subscribe(@Valid @RequestBody NewsletterDTO dto) {
        try {
            NewsletterSubscriber subscriber = newsletterService.inscrire(dto);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Inscription réussie ! Vous recevrez un email de confirmation.");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/unsubscribe/{token}")
    public ResponseEntity<Map<String, Object>> unsubscribe(@PathVariable String token) {
        try {
            newsletterService.desinscrire(token);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Vous avez été désinscrit de la newsletter.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Lien de désinscription invalide.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/subscribers")
    public ResponseEntity<List<NewsletterSubscriber>> getSubscribers() {
        return ResponseEntity.ok(newsletterService.getAbonnesActifs());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(newsletterService.getStats());
    }
}
