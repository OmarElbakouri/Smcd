package com.smcd.congress.repository;

import com.smcd.congress.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour l'entité User
 * Fournit les opérations CRUD de base + méthodes personnalisées
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Recherche un utilisateur par son email
     * Utilisé pour l'authentification
     * 
     * @param email L'email de l'utilisateur
     * @return Optional contenant l'utilisateur si trouvé
     */
    Optional<User> findByEmail(String email);

    /**
     * Vérifie si un email existe déjà en base
     * Utilisé lors de l'inscription pour éviter les doublons
     * 
     * @param email L'email à vérifier
     * @return true si l'email existe, false sinon
     */
    boolean existsByEmail(String email);
}
