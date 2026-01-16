// Types pour l'utilisateur
export interface User {
    id?: number;
    email: string;
    nom: string;
    prenom: string;
    role: 'SUPER_ADMIN' | 'MODERATEUR';
    active?: boolean;
}

// Types pour l'authentification
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    message: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    role: 'SUPER_ADMIN' | 'MODERATEUR';
}

export interface UserResponse {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    active: boolean;
}

// Types pour les réponses API
export interface ApiResponse {
    message: string;
    success: boolean;
}

export interface ErrorResponse {
    error: string;
    message: string;
    status: number;
    timestamp: string;
    path: string;
}

// Types pour le formulaire de contact
export interface ContactForm {
    nom: string;
    email: string;
    sujet: string;
    message: string;
}

// Types pour les statistiques du dashboard
export interface DashboardStats {
    abstractsSoumis: number;
    ePostersUploades: number;
    videosPubliees: number;
    invitesConfirmes: number;
}

// Types pour les items du menu admin
export interface MenuItem {
    key: string;
    icon: React.ReactNode;
    label: string;
    path: string;
}

// ============ TYPES POUR LES ABSTRACTS ============

// Enums
export type TypeCommunication = 'EPOSTER' | 'COMMUNICATION_ORALE' | 'PRESENTATION_VIDEO';
export type Rubrique =
    | 'CHIRURGIE_HEPATO_BILIAIRE'
    | 'CHIRURGIE_PANCREATIQUE'
    | 'CHIRURGIE_COLORECTALE'
    | 'CHIRURGIE_OESO_GASTRIQUE'
    | 'CHIRURGIE_BARIATRIQUE'
    | 'CHIRURGIE_ROBOTIQUE'
    | 'CHIRURGIE_PARIETALE'
    | 'CHIRURGIE_ENDOCRINIENNE'
    | 'URGENCES_VISCERALES'
    | 'CHIRURGIE_PROCTOLOGIQUE';
export type StatutSoumission = 'EN_ATTENTE' | 'EN_REVISION' | 'ACCEPTE' | 'REFUSE';

// Labels pour les enums
export const TYPE_LABELS: Record<TypeCommunication, string> = {
    EPOSTER: 'E-Poster',
    COMMUNICATION_ORALE: 'Communication orale',
    PRESENTATION_VIDEO: 'Présentation vidéo',
};

export const RUBRIQUE_LABELS: Record<Rubrique, string> = {
    CHIRURGIE_HEPATO_BILIAIRE: 'Chirurgie hépato-biliaire',
    CHIRURGIE_PANCREATIQUE: 'Chirurgie pancréatique',
    CHIRURGIE_COLORECTALE: 'Chirurgie colorectale',
    CHIRURGIE_OESO_GASTRIQUE: 'Chirurgie œso-gastrique',
    CHIRURGIE_BARIATRIQUE: 'Chirurgie bariatrique',
    CHIRURGIE_ROBOTIQUE: 'Chirurgie robotique',
    CHIRURGIE_PARIETALE: 'Chirurgie pariétale',
    CHIRURGIE_ENDOCRINIENNE: 'Chirurgie endocrinienne',
    URGENCES_VISCERALES: 'Urgences viscérales et digestives',
    CHIRURGIE_PROCTOLOGIQUE: 'Chirurgie proctologique',
};

export const STATUT_LABELS: Record<StatutSoumission, string> = {
    EN_ATTENTE: 'En attente de révision',
    EN_REVISION: 'En cours de révision',
    ACCEPTE: 'Accepté',
    REFUSE: 'Refusé',
};

export const STATUT_COLORS: Record<StatutSoumission, string> = {
    EN_ATTENTE: 'gold',
    EN_REVISION: 'blue',
    ACCEPTE: 'green',
    REFUSE: 'red',
};

// ============ TYPES POUR LES DOCUMENTS ============

export type TypeDocument = 
    | 'PROGRAMME'
    | 'BROCHURE'
    | 'LIVRE_RESUMES'
    | 'FORMULAIRE'
    | 'REGLEMENT'
    | 'CERTIFICAT'
    | 'RAPPORT'
    | 'AUTRE';

export const TYPE_DOCUMENT_LABELS: Record<TypeDocument, string> = {
    PROGRAMME: 'Programme du congrès',
    BROCHURE: 'Brochure',
    LIVRE_RESUMES: 'Livre des résumés',
    FORMULAIRE: 'Formulaire',
    REGLEMENT: 'Règlement intérieur',
    CERTIFICAT: 'Certificat',
    RAPPORT: 'Rapport',
    AUTRE: 'Autre',
};

// ============ TYPES POUR LES SPONSORS ============

export type NiveauSponsor = 'PLATINE' | 'OR' | 'ARGENT' | 'BRONZE' | 'PARTENAIRE';

export const NIVEAU_SPONSOR_LABELS: Record<NiveauSponsor, string> = {
    PLATINE: 'Platine',
    OR: 'Or',
    ARGENT: 'Argent',
    BRONZE: 'Bronze',
    PARTENAIRE: 'Partenaire',
};

export const NIVEAU_SPONSOR_COLORS: Record<NiveauSponsor, string> = {
    PLATINE: '#E5E4E2',
    OR: '#FFD700',
    ARGENT: '#C0C0C0',
    BRONZE: '#CD7F32',
    PARTENAIRE: '#4A90E2',
};

// DTO pour la soumission
export interface AbstractSubmission {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    auteurs: string;
    affiliation: string;
    type: TypeCommunication;
    urlVideo?: string;
    rubrique: Rubrique;
    titre: string;
    motsCles?: string;
    introduction: string;
    materielMethodes: string;
    resultats: string;
    discussion: string;
    conclusion: string;
    references?: string;
}

// DTO pour la réponse
export interface AbstractResponse {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    auteurs: string;
    affiliation: string;
    type: TypeCommunication;
    typeLabel: string;
    urlVideo?: string;
    rubrique: Rubrique;
    rubriqueLabel: string;
    titre: string;
    motsCles?: string;
    introduction: string;
    materielMethodes: string;
    resultats: string;
    discussion: string;
    conclusion: string;
    references?: string;
    statut: StatutSoumission;
    statutLabel: string;
    numeroReference: string;
    wordFileUrl?: string;
    commentairesComite?: string;
    dateSoumission: string;
    dateRevision?: string;
}

// DTO pour les statistiques
export interface AbstractStats {
    total: number;
    enAttente: number;
    enRevision: number;
    acceptes: number;
    refuses: number;
    parRubrique: Record<string, number>;
    parType: Record<string, number>;
    soumissionsParJour: { date: string; count: number }[];
}

// DTO pour la mise à jour du statut
export interface UpdateStatus {
    statut: StatutSoumission;
    commentaires?: string;
    envoyerEmail?: boolean;
}

// Réponse de soumission
export interface SubmitResponse {
    success: boolean;
    numeroReference?: string;
    message: string;
}

// Options pour les formulaires
export interface AbstractOptions {
    types: Record<string, string>;
    rubriques: Record<string, string>;
    statuts: Record<string, string>;
}

// ============ TYPES POUR LES E-POSTERS ============

export type StatutEPoster = 'EN_ATTENTE' | 'APPROUVE' | 'REJETE';

export const STATUT_EPOSTER_LABELS: Record<StatutEPoster, string> = {
    EN_ATTENTE: 'En attente de validation',
    APPROUVE: 'Approuvé',
    REJETE: 'Rejeté',
};

export const STATUT_EPOSTER_COLORS: Record<StatutEPoster, string> = {
    EN_ATTENTE: 'gold',
    APPROUVE: 'green',
    REJETE: 'red',
};

// DTO pour l'upload d'e-poster
export interface EPosterUpload {
    nomAuteur: string;
    prenomAuteur: string;
    emailAuteur: string;
    titre: string;
    rubrique?: string;
}

// Réponse e-poster publique
export interface EPosterPublic {
    id: number;
    titre: string;
    nomCompletAuteur: string;
    fichierUrl: string;
    nomFichierOriginal?: string;
    rubrique?: string;
    rubriqueLabel?: string;
    annee: number;
    dateUpload: string;
    nombreTelechargements: number;
    nombreVues: number;
}

// Réponse e-poster admin
export interface EPosterAdmin extends EPosterPublic {
    nomAuteur: string;
    prenomAuteur: string;
    emailAuteur: string;
    fichierPublicId?: string;
    tailleFichier: number;
    tailleFichierFormatee: string;
    nomFichierOriginal: string;
    statut: StatutEPoster;
    statutLabel: string;
    commentairesAdmin?: string;
    dateValidation?: string;
    dateModification: string;
}

// Statistiques e-posters
export interface EPosterStats {
    total: number;
    enAttente: number;
    approuves: number;
    rejetes: number;
    parAnnee: Record<number, number>;
    parRubrique: Record<string, number>;
    tailleTotale: string;
}

// ============ TYPES POUR LES SPEAKERS ============

// DTO pour création/modification speaker
export interface SpeakerFormData {
    titre?: string;
    nom: string;
    prenom: string;
    specialite?: string;
    institution?: string;
    pays?: string;
    ville?: string;
    bioCourteFr?: string;
    bioCompleteFr?: string;
    bioCourteEn?: string;
    bioCompleteEn?: string;
    email?: string;
    telephone?: string;
    siteWeb?: string;
    linkedinUrl?: string;
    researchGateUrl?: string;
    featured?: boolean;
    annee?: number;
}

// Réponse speaker publique
export interface SpeakerPublic {
    id: number;
    titre?: string;
    nom: string;
    prenom: string;
    nomComplet: string;
    specialite?: string;
    institution?: string;
    pays?: string;
    ville?: string;
    localisation?: string;
    bioCourteFr?: string;
    bioCompleteFr?: string;
    bioCourteEn?: string;
    bioCompleteEn?: string;
    photoUrl: string;
    cvUrl?: string;
    siteWeb?: string;
    linkedinUrl?: string;
    researchGateUrl?: string;
    featured: boolean;
    annee: number;
    ordre: number;
}

// Réponse speaker admin
export interface SpeakerAdmin extends SpeakerPublic {
    photoPublicId?: string;
    cvPublicId?: string;
    email?: string;
    telephone?: string;
    dateAjout: string;
    dateModification: string;
}

// Statistiques speakers
export interface SpeakerStats {
    total: number;
    featured: number;
    parPays: Record<string, number>;
    parSpecialite: Record<string, number>;
}

// Options de filtres speakers
export interface SpeakerFilterOptions {
    pays: string[];
    specialites: string[];
    annees: string[];
}

// ============ TYPES POUR LES VIDÉOS ============

// Enum visibilité vidéo
export type VisibiliteVideo = 'PUBLIC' | 'INSCRITS' | 'PREMIUM';

export const VISIBILITE_LABELS: Record<VisibiliteVideo, string> = {
    PUBLIC: 'Public',
    INSCRITS: 'Inscrits uniquement',
    PREMIUM: 'Premium'
};

export const VISIBILITE_COLORS: Record<VisibiliteVideo, string> = {
    PUBLIC: 'green',
    INSCRITS: 'blue',
    PREMIUM: 'gold'
};

// Type Room (Salle)
export interface Room {
    id: number;
    nom: string;
    nomCourt?: string;
    slug: string;
    description?: string;
    descriptionCourte?: string;
    imageUrl?: string;
    imagePublicId?: string;
    couleur?: string;
    icone?: string;
    ordre: number;
    annee: number;
    active: boolean;
    nombreChapitres?: number;
    nombreVideos?: number;
    dureeTotale?: string;
    dateCreation?: string;
    dateModification?: string;
    chapters?: Chapter[];
}

// Type Chapter (Chapitre)
export interface Chapter {
    id: number;
    titre: string;
    slug: string;
    description?: string;
    descriptionCourte?: string;
    moderateur?: string;
    dateSession?: string;
    heureDebut?: string;
    heureFin?: string;
    ordre: number;
    roomId: number;
    roomNom?: string;
    nombreVideos?: number;
    dureeTotale?: string;
    horaireSession?: string;
    dateCreation?: string;
    dateModification?: string;
    videos?: Video[];
}

// Type Video
export interface Video {
    id: number;
    titre: string;
    slug: string;
    description?: string;
    descriptionCourte?: string;
    intervenant?: string;
    coIntervenants?: string;
    videoUrl: string;
    videoPublicId?: string;
    thumbnailUrl?: string;
    thumbnailPublicId?: string;
    duree?: number;
    dureeFr?: string;
    format?: string;
    resolution?: string;
    tailleFichier?: number;
    tags?: string;
    langue: string;
    sousTitresUrl?: string;
    visibilite: VisibiliteVideo;
    publie: boolean;
    ordre: number;
    nombreVues: number;
    nombreLikes: number;
    tempsVisionageMoyen?: number;
    chapterId: number;
    chapterTitre?: string;
    roomNom?: string;
    dateUpload?: string;
    datePublication?: string;
    dateModification?: string;
    streamingUrl?: string;
    tailleFormatee?: string;
    dureeFormatee?: string;
}

// DTO pour création/modification de Room
export interface RoomDTO {
    nom: string;
    nomCourt?: string;
    description?: string;
    descriptionCourte?: string;
    couleur?: string;
    icone?: string;
    annee?: number;
    active?: boolean;
}

// DTO pour création/modification de Chapter
export interface ChapterDTO {
    titre: string;
    description?: string;
    descriptionCourte?: string;
    moderateur?: string;
    dateSession?: string;
    heureDebut?: string;
    heureFin?: string;
    roomId: number;
}

// DTO pour création/modification de Video
export interface VideoDTO {
    titre: string;
    description?: string;
    intervenant?: string;
    coIntervenants?: string;
    tags?: string;
    langue?: string;
    visibilite?: VisibiliteVideo;
    chapterId: number;
}

// Statistiques vidéos
export interface VideoStats {
    totalSalles: number;
    totalChapitres: number;
    totalVideos: number;
    videosPubliees: number;
    videosBrouillon: number;
    totalVues: number;
    dureeTotale: string;
    espaceDiskUtilise: string;
    videosParLangue: Record<string, number>;
    videosParVisibilite: Record<string, number>;
    topVideos: Video[];
    videosRecentes: Video[];
}
