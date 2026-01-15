package com.smcd.congress.service;

import com.smcd.congress.dto.*;
import com.smcd.congress.exception.EmailAlreadyExistsException;
import com.smcd.congress.exception.InvalidCredentialsException;
import com.smcd.congress.model.User;
import com.smcd.congress.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service d'authentification
 * Gère la connexion, l'inscription et la récupération des infos utilisateur
 */
@Service
@Transactional
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Authentifie un utilisateur et génère un token JWT
     * 
     * @param request Les credentials de connexion
     * @return LoginResponse avec le token et les infos utilisateur
     * @throws InvalidCredentialsException si les credentials sont invalides
     */
    public LoginResponse login(LoginRequest request) {
        try {
            // Authentifier l'utilisateur
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // Définir l'authentification dans le contexte
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupérer l'utilisateur
            User user = (User) authentication.getPrincipal();

            // Générer le token JWT
            String token = jwtTokenProvider.generateToken(user);

            logger.info("Utilisateur connecté avec succès: {}", user.getEmail());

            return LoginResponse.builder()
                    .token(token)
                    .email(user.getEmail())
                    .nom(user.getNom())
                    .prenom(user.getPrenom())
                    .role(user.getRole().name())
                    .message("Connexion réussie")
                    .build();

        } catch (BadCredentialsException e) {
            logger.warn("Tentative de connexion échouée pour: {}", request.getEmail());
            throw new InvalidCredentialsException("Email ou mot de passe incorrect");
        }
    }

    /**
     * Inscrit un nouvel utilisateur administrateur
     * 
     * @param request Les informations d'inscription
     * @return ApiResponse confirmant la création
     * @throws EmailAlreadyExistsException si l'email existe déjà
     */
    public ApiResponse register(RegisterRequest request) {
        // Vérifier si l'email existe déjà
        if (userService.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Cet email est déjà utilisé: " + request.getEmail());
        }

        // Créer le nouvel utilisateur
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .role(request.getRole())
                .active(true)
                .build();

        // Sauvegarder l'utilisateur
        userService.save(user);

        logger.info("Nouvel utilisateur créé: {} avec le rôle {}", user.getEmail(), user.getRole());

        return ApiResponse.success("Utilisateur créé avec succès");
    }

    /**
     * Récupère les informations de l'utilisateur actuellement connecté
     * 
     * @return UserResponse avec les infos de l'utilisateur
     */
    public UserResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .role(user.getRole().name())
                .active(user.getActive())
                .build();
    }
}
