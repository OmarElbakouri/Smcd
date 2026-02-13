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
  venue: 'Hôtel Marriott Casablanca',
  year: 2026,
  dates: '26 et 27 Juin 2026',
  email: 'smcdcasa@gmail.com',
  phone: '+212 661 176 899',
  phonePresident: '00212 661 176 899',
  phoneTresorier: '00212 661 230 833',
  phoneTresorierAdjoint: '00212 664 286 771',
  address: 'CHU Ibn Rochd – Casablanca, Rue des Hôpitaux, Casablanca',
  president: 'Pr FADIL Abdelaziz',
  secretaryGeneral: 'Pr ELHATTABI Khalid',
  website: 'www.smcd.com',
  themes: [
    'Le cancer de l\'estomac',
    'Les urgences biliaires lithiasiques'
  ],
} as const;

// Membres du bureau SMCD
export const BUREAU_MEMBERS = {
  president: { nom: 'FADIL Abdelaziz', role: 'Président' },
  vicePresidents: [
    { nom: 'CHEHAB Farid', role: 'Vice-président' },
    { nom: 'BENISSA Nadia', role: 'Vice-présidente' },
    { nom: 'RADHI Noureddine', role: 'Vice-président' },
  ],
  secretaireGeneral: { nom: 'ELHATTABI Khalid', role: 'Secrétaire général' },
  tresorier: { nom: 'BENSARDI FatimaZahra', role: 'Trésorière' },
  tresorierAdjoint: { nom: 'EL BAKOURI Abdelilah', role: 'Trésorier adjoint' },
  secretaireAdjoint: { nom: 'BOUZIANE Mohammed', role: 'Secrétaire adjoint' },
  assesseurs: [
    { nom: 'SAIR Khalid' },
    { nom: 'KAFIH Mohammed' },
    { nom: 'KHARROUB El Khadir' },
    { nom: 'BOUFETTAL Rachid' },
    { nom: 'HAJRI Amal' },
    { nom: 'ELOUFIR Mouhcine' },
    { nom: 'AISSE Larbi' },
  ],
} as const;

// Tarifs sponsoring
export const SPONSORING_PACKAGES = {
  platinium: {
    name: 'SPONSOR PLATINIUM',
    price: 250000,
    priority: 1,
    standSize: '18m²',
    badges: 8,
    dejeuners: 4,
    saccoches: 4,
    avantages: [
      'Priorité N°1 de choix de l\'emplacement du stand',
      'Dénomination officielle : Sponsor Platine',
      'Projection du logo et une publicité sur l\'écran de la grande salle lors des présentations scientifiques',
      'Logo en grand format sur panneau de remerciement à l\'accueil du congrès',
      'Logo sur panneau de remerciement à l\'entrée de l\'exposition',
      'Logo sur panneau de remerciement dans la zone e-communication',
      'Page de remerciement des sponsors dans le programme définitif',
      'Possibilité de disposer des encarts publicitaires sur le présentoir à l\'accueil du congrès',
      'Stand d\'exposition de 18m²',
    ],
  },
  gold: {
    name: 'SPONSOR GOLD',
    price: 200000,
    priority: 2,
    standSize: '12m²',
    badges: 5,
    dejeuners: 2,
    saccoches: 2,
    avantages: [
      'Priorité N°2 de choix de l\'emplacement du stand',
      'Dénomination officielle : Sponsor Or',
      'Logo en moyen format sur panneau de remerciement à l\'accueil du congrès',
      'Logo sur panneau de remerciement à l\'entrée de l\'exposition',
      'Logo sur panneau de remerciement dans la zone e-communication',
      'Diapositive sponsors interséance',
      'Page de remerciement des sponsors dans le programme définitif',
      'Possibilité de disposer des encarts publicitaires sur le présentoir à l\'accueil du congrès',
      'Stand 12m²',
    ],
  },
  silver: {
    name: 'SPONSOR SILVER',
    price: 120000,
    priority: 3,
    standSize: '9m²',
    badges: 3,
    dejeuners: 1,
    saccoches: 1,
    avantages: [
      'Priorité N°3 de choix de l\'emplacement du stand',
      'Dénomination officielle : Sponsor Argent',
      'Logo en petit format sur panneau de remerciement à l\'accueil du congrès',
      'Logo sur panneau de remerciement à l\'entrée de l\'exposition',
      'Logo sur panneau de remerciement dans la zone e-communication',
      'Diapositive sponsors interséance',
      'Page de remerciement des sponsors dans le programme définitif',
      'Stand d\'exposition de 9m²',
    ],
  },
} as const;

// Autres tarifs
export const OTHER_TARIFS = {
  inscription: {
    interneResident: { avant: 2000, apres: 2500, deadline: '30 mars 2026' },
    chirurgien: { avant: 3000, apres: 3500, deadline: '30 mars 2026' },
  },
  stand: {
    minimum: 30000,
    surface: '4m²',
    description: 'Location de Stand durant les deux jours de la manifestation',
  },
  sessions: {
    atelier: 40000,
    symposium: 50000,
  },
  repas: {
    conjoint: 400,
    dinerCloture: 700,
  },
  marketing: {
    logoSiteWeb: 10000,
    emailing: 10000,
    synopsisProgram: 15000,
    stylos: 10000,
  },
} as const;

// Statistiques du congrès (Fiche Technique)
export const CONGRESS_STATS = {
  participants: '300+',
  participantsLabel: 'Participants',
  chirurgiens: '80%',
  chirurgiensLabel: 'Chirurgiens',
  internationaux: '5%',
  internationauxLabel: 'Internationaux',
  anesthesistes: '15%',
  anesthesistesLabel: 'Anesthésistes',
  societesExposantes: '+30',
  societesExposantesLabel: 'Sponsors',
  langues: 'Français / Anglais',
  typeSessions: 'Conférences, Ateliers pratiques, Symposiums, Tables rondes',
} as const;

// Calendrier des stands
export const CALENDRIER_STANDS = {
  installation: {
    date: 'Jeudi 25 juin 2026',
    description: 'Installation des stands',
  },
  ouverture: [
    { date: 'Vendredi 26 juin 2026', horaires: '08h à 18h' },
    { date: 'Samedi 27 juin 2026', horaires: '08h à 18h' },
  ],
  demontage: {
    date: 'Samedi 27 juin 2026 à 18h',
    description: 'Démontage des stands',
  },
} as const;
