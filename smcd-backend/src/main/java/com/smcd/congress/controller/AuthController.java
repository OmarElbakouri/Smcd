package com.smcd.congress.controller;

import com.smcd.congress.dto.*;
import com.smcd.congress.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur d'authentification
 * Gère les endpoints publics pour login, register et vérification de session
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * POST /api/auth/login
     * Authentifie un utilisateur et retourne un token JWT
     * 
     * @param request Les credentials (email, password)
     * @return LoginResponse avec token JWT et infos utilisateur
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/auth/register
     * Inscrit un nouvel utilisateur administrateur
     * Note: En production, cet endpoint devrait être protégé ou désactivé
     * 
     * @param request Les informations d'inscription
     * @return ApiResponse confirmant la création
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        ApiResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/auth/me
     * Récupère les informations de l'utilisateur actuellement connecté
     * Nécessite un token JWT valide dans le header Authorization
     * 
     * @return UserResponse avec les infos de l'utilisateur
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        UserResponse response = authService.getCurrentUser();
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/auth/logout
     * Déconnexion (côté serveur, invalide le token si nécessaire)
     * Note: Avec JWT stateless, la déconnexion se fait principalement côté client
     * 
     * @return ApiResponse confirmant la déconnexion
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout() {
        // Avec JWT stateless, le logout se fait côté client en supprimant le token
        // Ici on peut implémenter une blacklist de tokens si nécessaire
        return ResponseEntity.ok(ApiResponse.success("Déconnexion réussie"));
    }
}
