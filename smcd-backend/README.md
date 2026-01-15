# 🏥 SMCD Congress - Backend API

API Backend Spring Boot pour le Congrès de la Société Marocaine de Chirurgie Digestive.

## 📋 Prérequis

- **Java 17** ou supérieur
- **Maven 3.8+**
- **PostgreSQL 15**
- Compte **Cloudinary** (pour les uploads)
- Compte **Gmail** avec mot de passe d'application (pour les emails)

## 🚀 Installation

### 1. Cloner le projet

```bash
cd smcd-backend
```

### 2. Configurer PostgreSQL

Créez la base de données :

```sql
CREATE DATABASE smcd_db;
```

### 3. Configurer application.properties

Modifiez `src/main/resources/application.properties` :

```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/smcd_db
spring.datasource.username=votre_username
spring.datasource.password=votre_password

# JWT (garder secret en production)
jwt.secret=VotreCleSecreteUniqueEtSecurisee

# Email Gmail
spring.mail.username=votre-email@gmail.com
spring.mail.password=votre-mot-de-passe-application

# Cloudinary
cloudinary.cloud-name=votre-cloud-name
cloudinary.api-key=votre-api-key
cloudinary.api-secret=votre-api-secret
```

### 4. Lancer l'application

```bash
mvn spring-boot:run
```

L'API sera disponible sur `http://localhost:8080`

## 📚 Endpoints API

### Authentification (`/api/auth`)

| Méthode | Endpoint       | Description                    | Auth |
|---------|----------------|--------------------------------|------|
| POST    | /api/auth/login    | Connexion utilisateur          | ❌   |
| POST    | /api/auth/register | Inscription nouvel admin       | ❌   |
| GET     | /api/auth/me       | Info utilisateur connecté      | ✅   |
| POST    | /api/auth/logout   | Déconnexion                    | ✅   |

### API Publique (`/api/public`)

| Méthode | Endpoint          | Description              | Auth |
|---------|-------------------|--------------------------|------|
| GET     | /api/public/info  | Informations du congrès  | ❌   |
| POST    | /api/public/contact | Formulaire de contact  | ❌   |

### Tests (`/api/test`)

| Méthode | Endpoint            | Description              | Auth |
|---------|---------------------|--------------------------|------|
| GET     | /api/test/health    | Vérifier l'état de l'API | ❌   |
| POST    | /api/test/upload    | Tester upload Cloudinary | ❌   |
| POST    | /api/test/send-email| Tester envoi email       | ❌   |

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification :

1. Obtenez un token via `POST /api/auth/login`
2. Incluez le token dans le header : `Authorization: Bearer <token>`
3. Le token expire après 24 heures

### Compte Admin par défaut

Au premier démarrage, un compte admin est créé automatiquement :

- **Email:** `admin@smcd.ma`
- **Mot de passe:** `Admin123!`
- **Rôle:** `SUPER_ADMIN`

## 🏗️ Structure du projet

```
src/main/java/com/smcd/congress/
├── SmcdCongressApplication.java   # Point d'entrée
├── config/                        # Configurations
│   ├── SecurityConfig.java        # Spring Security + CORS
│   ├── CloudinaryConfig.java      # Cloudinary
│   └── DataInitializer.java       # Données initiales
├── controller/                    # Endpoints API
│   ├── AuthController.java
│   ├── PublicController.java
│   └── TestController.java
├── service/                       # Logique métier
│   ├── AuthService.java
│   ├── UserService.java
│   ├── CloudinaryService.java
│   └── EmailService.java
├── repository/                    # Accès données
│   └── UserRepository.java
├── model/                         # Entités JPA
│   ├── User.java
│   └── Role.java
├── dto/                           # Data Transfer Objects
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   └── ...
├── security/                      # Sécurité JWT
│   ├── JwtTokenProvider.java
│   └── JwtAuthenticationFilter.java
└── exception/                     # Gestion erreurs
    ├── GlobalExceptionHandler.java
    └── ...
```

## 🧪 Test avec Postman

### Login
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "admin@smcd.ma",
  "password": "Admin123!"
}
```

### Get Current User
```http
GET http://localhost:8080/api/auth/me
Authorization: Bearer <votre_token>
```

### Upload Test
```http
POST http://localhost:8080/api/test/upload
Content-Type: multipart/form-data

file: <votre_fichier>
folder: test
```

## 🚢 Déploiement (Railway)

1. Connectez votre repo GitHub à Railway
2. Configurez les variables d'environnement
3. Railway détectera automatiquement Maven et déploiera

Variables d'environnement requises :
- `DATABASE_URL`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`

## 📝 Licence

© 2026 Société Marocaine de Chirurgie Digestive
