package com.smcd.congress.config;

import com.smcd.congress.security.JwtAuthenticationFilter;
import com.smcd.congress.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Configuration Spring Security
 * Gère l'authentification JWT, les autorisations et CORS
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Encodeur de mot de passe BCrypt
     * Utilisé pour hasher les mots de passe avant stockage
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Provider d'authentification DAO
     * Utilise UserService pour charger les utilisateurs
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Manager d'authentification
     * Requis pour AuthService.login()
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Configuration de la chaîne de filtres de sécurité
     * Définit les règles d'accès aux endpoints
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Désactiver CSRF (API REST stateless)
                .csrf(csrf -> csrf.disable())

                // Configurer CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Configurer la gestion de session (stateless pour JWT)
                .sessionManagement(session -> 
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configurer les autorisations
                .authorizeHttpRequests(auth -> auth
                        // Endpoints publics - Authentification
                        .requestMatchers("/api/auth/**").permitAll()
                        
                        // Endpoints publics - API publique
                        .requestMatchers("/api/public/**").permitAll()
                        
                        // Endpoints publics - Soumission d'abstracts
                        .requestMatchers("/api/abstracts/submit").permitAll()
                        .requestMatchers("/api/abstracts/options").permitAll()
                        
                        // Endpoints publics - E-Posters
                        .requestMatchers("/api/eposters/upload").permitAll()
                        .requestMatchers("/api/eposters/public").permitAll()
                        .requestMatchers("/api/eposters/public/**").permitAll()
                        .requestMatchers("/api/eposters/*/increment-download").permitAll()
                        
                        // Endpoints publics - Communications Vidéo
                        .requestMatchers("/api/videos/upload").permitAll()
                        .requestMatchers("/api/videos/public").permitAll()
                        .requestMatchers("/api/videos/*/incrementer-vues").permitAll()
                        .requestMatchers("/api/videos/*/incrementer-telechargements").permitAll()
                        
                        // Endpoints publics - Speakers
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/speakers").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/speakers/filters").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/speakers/{id}").permitAll()
                        
                        // Endpoints de test (à retirer en production)
                        .requestMatchers("/api/test/**").permitAll()
                        
                        // Endpoint de santé
                        .requestMatchers("/actuator/health").permitAll()
                        
                        // Tous les autres endpoints nécessitent une authentification
                        .anyRequest().authenticated()
                )

                // Ajouter le provider d'authentification
                .authenticationProvider(authenticationProvider())

                // Ajouter le filtre JWT avant le filtre d'authentification standard
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuration CORS
     * Autorise les requêtes depuis le frontend Next.js
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Origines autorisées (frontend Next.js)
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",      // Dev local
                "http://127.0.0.1:3000",      // Dev local alternative
                "https://smcd-frontend.vercel.app" // Production Vercel (à ajuster)
        ));
        
        // Méthodes HTTP autorisées
        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));
        
        // Headers autorisés
        configuration.setAllowedHeaders(List.of("*"));
        
        // Exposer le header Authorization pour le frontend
        configuration.setExposedHeaders(Arrays.asList(
                "Authorization", "Content-Disposition"
        ));
        
        // Autoriser les credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        // Durée de mise en cache de la réponse preflight
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
