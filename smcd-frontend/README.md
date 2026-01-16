# 🌐 SMCD Congress - Frontend

Interface web Next.js pour le Congrès de la Société Marocaine de Chirurgie Digestive.

## 📋 Prérequis

- **Node.js 18** ou supérieur
- **npm** ou **yarn**
- Backend API en cours d'exécution

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd smcd-frontend
npm install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 📁 Structure du projet

```
smcd-frontend/
├── app/                        # App Router Next.js 14
│   ├── layout.tsx             # Layout racine + SEO
│   ├── page.tsx               # Page d'accueil
│   ├── about/
│   │   └── page.tsx           # Page À propos
│   ├── contact/
│   │   └── page.tsx           # Page Contact
│   └── admin/
│       ├── login/
│       │   └── page.tsx       # Page connexion admin
│       └── (dashboard)/
│           ├── layout.tsx     # Layout admin (sidebar + header)
│           └── dashboard/
│               └── page.tsx   # Dashboard admin
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Header site public
│   │   ├── Footer.tsx         # Footer site public
│   │   ├── AdminSidebar.tsx   # Sidebar espace admin
│   │   └── AdminHeader.tsx    # Header espace admin
│   └── ui/
│       └── LoadingSpinner.tsx # Composant de chargement
├── lib/
│   ├── axios.ts               # Client HTTP configuré
│   ├── auth.ts                # Fonctions authentification
│   └── constants.ts           # Constantes globales
├── types/
│   └── index.ts               # Types TypeScript
└── middleware.ts              # Protection des routes
```

## 🔐 Authentification

Le système d'authentification utilise :
- **JWT** stocké dans un cookie sécurisé
- **Middleware** Next.js pour protéger les routes `/admin/*`
- **Intercepteurs Axios** pour ajouter le token aux requêtes

### Connexion

Accédez à `/admin/login` avec les identifiants :
- **Email:** `admin@smcd.ma`
- **Mot de passe:** `Admin123!`

## 📱 Pages disponibles

### Site Public
- `/` - Page d'accueil
- `/about` - À propos de la SMCD
- `/contact` - Formulaire de contact

### Espace Admin
- `/admin/login` - Connexion
- `/admin/dashboard` - Tableau de bord (protégé)
- `/admin/abstracts` - Gestion des abstracts (à venir)
- `/admin/posters` - Gestion des e-posters (à venir)
- `/admin/videos` - Gestion des vidéos (à venir)
- `/admin/invites` - Gestion des invités (à venir)

## 🎨 Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Ant Design** - Composants UI
- **Axios** - Client HTTP
- **React Hook Form** - Gestion formulaires
- **Zod** - Validation schémas

## 🛠️ Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run start    # Démarrer en production
npm run lint     # Vérifier le code
```

## 🚢 Déploiement (Vercel)

1. Connectez votre repo GitHub à Vercel
2. Configurez la variable d'environnement :
   - `NEXT_PUBLIC_API_URL` = URL de votre API backend

Le déploiement est automatique à chaque push.

## 📝 Licence

© 2026 Société Marocaine de Chirurgie Digestive
