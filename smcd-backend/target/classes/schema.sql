-- =====================================================
-- SMCD Congress - Script de création de base de données
-- =====================================================

-- Créer la base de données (exécuter en tant que superuser)
-- CREATE DATABASE smcd_db;

-- Se connecter à la base smcd_db avant d'exécuter les commandes suivantes

-- =====================================================
-- Table USERS - Administrateurs du système
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les recherches par email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Index pour optimiser les recherches par rôle
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- =====================================================
-- Insertion de l'administrateur par défaut
-- Note: Le hash BCrypt ci-dessous correspond à "Admin123!"
-- Il est préférable d'utiliser DataInitializer qui génère
-- le hash dynamiquement
-- =====================================================
-- INSERT INTO users (email, password, nom, prenom, role, active)
-- VALUES (
--     'admin@smcd.ma',
--     '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
--     'Admin',
--     'SMCD',
--     'SUPER_ADMIN',
--     TRUE
-- )
-- ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- Tables futures (pour référence)
-- =====================================================

-- Table ABSTRACTS (à créer dans les prochains prompts)
-- CREATE TABLE IF NOT EXISTS abstracts (
--     id BIGSERIAL PRIMARY KEY,
--     titre VARCHAR(500) NOT NULL,
--     auteurs TEXT NOT NULL,
--     affiliation TEXT,
--     contenu TEXT NOT NULL,
--     type VARCHAR(50) NOT NULL,
--     statut VARCHAR(50) DEFAULT 'SOUMIS',
--     reference VARCHAR(50) UNIQUE,
--     email_correspondant VARCHAR(255) NOT NULL,
--     fichier_url VARCHAR(500),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Table E_POSTERS (à créer dans les prochains prompts)
-- CREATE TABLE IF NOT EXISTS e_posters (
--     id BIGSERIAL PRIMARY KEY,
--     titre VARCHAR(500) NOT NULL,
--     auteurs TEXT NOT NULL,
--     fichier_url VARCHAR(500) NOT NULL,
--     thumbnail_url VARCHAR(500),
--     statut VARCHAR(50) DEFAULT 'EN_ATTENTE',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Table VIDEOS (à créer dans les prochains prompts)
-- CREATE TABLE IF NOT EXISTS videos (
--     id BIGSERIAL PRIMARY KEY,
--     titre VARCHAR(500) NOT NULL,
--     description TEXT,
--     url VARCHAR(500) NOT NULL,
--     thumbnail_url VARCHAR(500),
--     salle VARCHAR(100),
--     chapitre VARCHAR(200),
--     duree_secondes INTEGER,
--     publie BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Table INVITES (à créer dans les prochains prompts)
-- CREATE TABLE IF NOT EXISTS invites (
--     id BIGSERIAL PRIMARY KEY,
--     nom VARCHAR(100) NOT NULL,
--     prenom VARCHAR(100) NOT NULL,
--     titre_academique VARCHAR(100),
--     specialite VARCHAR(200),
--     institution VARCHAR(300),
--     pays VARCHAR(100),
--     photo_url VARCHAR(500),
--     biographie TEXT,
--     confirme BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
