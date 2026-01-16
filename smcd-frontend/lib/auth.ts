import Cookies from 'js-cookie';
import axiosInstance from './axios';
import { TOKEN_COOKIE_NAME, USER_STORAGE_KEY, TOKEN_EXPIRATION_DAYS, ROUTES } from './constants';
import { LoginRequest, LoginResponse, User, UserResponse } from '@/types';

/**
 * Authentifie un utilisateur et stocke le token
 * 
 * @param credentials Email et mot de passe
 * @returns Les informations de connexion avec le token
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    const data = response.data;

    // Stocker le token dans un cookie sécurisé
    Cookies.set(TOKEN_COOKIE_NAME, data.token, {
        expires: TOKEN_EXPIRATION_DAYS,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    // Stocker les infos utilisateur dans localStorage
    const user: User = {
        email: data.email,
        nom: data.nom,
        prenom: data.prenom,
        role: data.role as User['role'],
    };

    if (typeof window !== 'undefined') {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }

    return data;
}

/**
 * Déconnecte l'utilisateur
 * Supprime le token et les données utilisateur
 */
export function logout(): void {
    // Supprimer le cookie du token
    Cookies.remove(TOKEN_COOKIE_NAME);

    // Supprimer les données utilisateur du localStorage
    if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_STORAGE_KEY);
    }

    // Rediriger vers la page de login
    if (typeof window !== 'undefined') {
        window.location.href = ROUTES.ADMIN_LOGIN;
    }
}

/**
 * Vérifie si l'utilisateur est authentifié
 * 
 * @returns true si un token JWT existe
 */
export function isAuthenticated(): boolean {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    return !!token;
}

/**
 * Récupère les informations de l'utilisateur connecté depuis localStorage
 * 
 * @returns Les infos utilisateur ou null
 */
export function getCurrentUser(): User | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const userStr = localStorage.getItem(USER_STORAGE_KEY);

    if (!userStr) {
        return null;
    }

    try {
        return JSON.parse(userStr) as User;
    } catch {
        return null;
    }
}

/**
 * Récupère le token JWT
 * 
 * @returns Le token ou undefined
 */
export function getToken(): string | undefined {
    return Cookies.get(TOKEN_COOKIE_NAME);
}

/**
 * Vérifie la validité du token auprès du serveur
 * Met à jour les infos utilisateur si valide
 * 
 * @returns Les infos utilisateur actualisées ou null si invalide
 */
export async function verifySession(): Promise<UserResponse | null> {
    try {
        const response = await axiosInstance.get<UserResponse>('/auth/me');

        // Mettre à jour les infos utilisateur dans localStorage
        const user: User = {
            id: response.data.id,
            email: response.data.email,
            nom: response.data.nom,
            prenom: response.data.prenom,
            role: response.data.role as User['role'],
            active: response.data.active,
        };

        if (typeof window !== 'undefined') {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        }

        return response.data;
    } catch {
        // Token invalide ou expiré
        logout();
        return null;
    }
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 * 
 * @param role Le rôle à vérifier
 * @returns true si l'utilisateur a ce rôle
 */
export function hasRole(role: User['role']): boolean {
    const user = getCurrentUser();
    return user?.role === role;
}

/**
 * Vérifie si l'utilisateur est super admin
 */
export function isSuperAdmin(): boolean {
    return hasRole('SUPER_ADMIN');
}

/**
 * Vérifie si l'utilisateur est admin (SUPER_ADMIN)
 */
export function isAdmin(): boolean {
    const user = getCurrentUser();
    return user?.role === 'SUPER_ADMIN';
}
