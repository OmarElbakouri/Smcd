# 🏥 SMCD Congress - Système de Gestion du Congrès

Plateforme web complète pour la gestion du Congrès National de la Société Marocaine de Chirurgie Digestive (SMCD).

## 🎯 Fonctionnalités

- ✅ **Authentification Admin** - Système JWT sécurisé
- ✅ **Dashboard Admin** - Tableau de bord avec statistiques
- ✅ **Site Public** - Pages d'accueil, à propos, contact
- 🔜 **Gestion Abstracts** - Soumission et modération
- 🔜 **E-Posters** - Upload et galerie
- 🔜 **Vidéos Chirurgicales** - Bibliothèque organisée par salles/chapitres
- 🔜 **Conférenciers** - Gestion des invités

## 🛠️ Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Backend | Spring Boot 3.4, Java 17 |
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Base de données | PostgreSQL 15 |
| Stockage fichiers | Cloudinary |
| Emails | Spring Mail + Gmail SMTP |
| UI Components | Ant Design |

## 📁 Structure du projet

```
SCMD/
├── smcd-backend/          # API Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── smcd-frontend/         # Application Next.js
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── README.md
└── README.md              # Ce fichier
```

## 🚀 Démarrage rapide

### Prérequis

- Java 17+
- Node.js 18+
- PostgreSQL 15
- Maven 3.8+

### 1. Base de données

```sql
CREATE DATABASE smcd_db;
```

### 2. Backend

```bash
cd smcd-backend
# Configurer application.properties (voir README du backend)
mvn spring-boot:run
```

L'API sera disponible sur `http://localhost:8080`

### 3. Frontend

```bash
cd smcd-frontend
npm install
# Créer .env.local avec NEXT_PUBLIC_API_URL=http://localhost:8080/api
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🔐 Connexion Admin

Après le premier démarrage du backend, un compte admin est créé :

- **URL:** http://localhost:3000/admin/login
- **Email:** `admin@smcd.ma`
- **Mot de passe:** `Admin123!`

## 📚 Documentation

- [Documentation Backend](./smcd-backend/README.md)
- [Documentation Frontend](./smcd-frontend/README.md)

## 🧪 Tester l'API

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smcd.ma","password":"Admin123!"}'
```

### Vérifier l'état de l'API

```bash
curl http://localhost:8080/api/test/health
```

## 🚢 Déploiement

### Backend (Railway)

1. Connecter le repo GitHub à Railway
2. Configurer les variables d'environnement
3. Le déploiement est automatique

### Frontend (Vercel)

1. Connecter le repo GitHub à Vercel
2. Configurer `NEXT_PUBLIC_API_URL`
3. Le déploiement est automatique

## 📋 Phases du projet

| Phase | Statut | Description |
|-------|--------|-------------|
| 1 | ✅ Terminée | Fondations + Authentification Admin |
| 2 | 🔜 | Gestion des Abstracts |
| 3 | 🔜 | E-Posters |
| 4 | 🔜 | Vidéothèque |
| 5 | 🔜 | Conférenciers |
| 6 | 🔜 | Documents & Emails |

## 👥 Équipe

Développé pour la **Société Marocaine de Chirurgie Digestive**

## 📝 Licence

© 2026 SMCD - Tous droits réservés
