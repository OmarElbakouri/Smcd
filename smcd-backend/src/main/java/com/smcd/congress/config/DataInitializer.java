package com.smcd.congress.config;

import com.smcd.congress.model.Role;
import com.smcd.congress.model.User;
import com.smcd.congress.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Initialisation des données au démarrage de l'application
 * Crée l'administrateur par défaut si aucun utilisateur n'existe
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Vérifier si l'admin par défaut existe
        if (!userRepository.existsByEmail("admin@smcd.ma")) {
            logger.info("Création de l'administrateur par défaut...");
            
            User admin = User.builder()
                    .email("admin@smcd.ma")
                    .password(passwordEncoder.encode("Admin123!"))
                    .nom("Admin")
                    .prenom("SMCD")
                    .role(Role.SUPER_ADMIN)
                    .active(true)
                    .build();
            
            userRepository.save(admin);
            
            logger.info("✓ Administrateur par défaut créé avec succès");
            logger.info("  Email: admin@smcd.ma");
            logger.info("  Password: Admin123!");
            logger.info("  Role: SUPER_ADMIN");
        } else {
            logger.info("Administrateur par défaut déjà existant");
        }
    }
}
