// API Backend URL
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Noms des cookies
export const TOKEN_COOKIE_NAME = 'smcd_token';
export const USER_STORAGE_KEY = 'smcd_user';

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  // Public routes
  EPOSTERS: '/eposters',
  EPOSTERS_UPLOAD: '/eposters/upload',
  SPEAKERS: '/speakers',
  SPONSORS: '/sponsors',
  VIDEOS: '/videos',
  ABSTRACTS_SUBMIT: '/abstracts/submit',
  // Admin routes
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ABSTRACTS: '/admin/abstracts',
  ADMIN_EPOSTERS: '/admin/eposters',
  ADMIN_SPEAKERS: '/admin/speakers',
  ADMIN_VIDEOS: '/admin/videos',
  ADMIN_DOCUMENTS: '/admin/documents',
  ADMIN_SPONSORS: '/admin/sponsors',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

// Durée d'expiration du token (en jours)
export const TOKEN_EXPIRATION_DAYS = 1;

// Messages
export const MESSAGES = {
  LOGIN_SUCCESS: 'Connexion réussie',
  LOGIN_ERROR: 'Email ou mot de passe incorrect',
  LOGOUT_SUCCESS: 'Déconnexion réussie',
  SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',
  NETWORK_ERROR: 'Erreur de connexion au serveur. Vérifiez votre connexion internet.',
  GENERIC_ERROR: 'Une erreur s\'est produite. Veuillez réessayer.',
} as const;

// Configuration du congrès
export const CONGRESS_INFO = {
  name: 'Congrès National de Chirurgie Digestive 2026',
  shortName: 'SMCD 2026',
  organizer: 'Société Marocaine de Chirurgie Digestive',
  location: 'Casablanca, Maroc',
  year: 2026,
  dates: '26 et 27 Juin 2026',
  email: 'fadilaziz57@gmail.com',
  phone: '+212 661 176 899',
  phone2: '+212 600 650 485',
  address: 'Casablanca, Maroc',
  president: 'Pr Abdelaziz FADIL',
  secretaryGeneral: 'Pr Khalid EL HATTABI',
} as const;
