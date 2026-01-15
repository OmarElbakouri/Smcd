package com.smcd.congress.service;

import com.smcd.congress.model.User;
import com.smcd.congress.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service pour la gestion des utilisateurs
 * Implémente UserDetailsService pour l'intégration avec Spring Security
 */
@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Charge un utilisateur par son email (username)
     * Méthode requise par Spring Security pour l'authentification
     * 
     * @param email L'email de l'utilisateur
     * @return UserDetails de l'utilisateur
     * @throws UsernameNotFoundException si l'utilisateur n'existe pas
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Utilisateur non trouvé avec l'email: " + email));
    }

    /**
     * Recherche un utilisateur par son email
     * 
     * @param email L'email de l'utilisateur
     * @return Optional contenant l'utilisateur si trouvé
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Vérifie si un email existe déjà
     * 
     * @param email L'email à vérifier
     * @return true si l'email existe
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Sauvegarde un utilisateur
     * 
     * @param user L'utilisateur à sauvegarder
     * @return L'utilisateur sauvegardé
     */
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Recherche un utilisateur par son ID
     * 
     * @param id L'ID de l'utilisateur
     * @return Optional contenant l'utilisateur si trouvé
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
