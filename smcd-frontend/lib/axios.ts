import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { API_URL, TOKEN_COOKIE_NAME, ROUTES, MESSAGES } from './constants';

/**
 * Instance Axios configurée pour l'API SMCD
 * - Base URL automatique
 * - Injection automatique du token JWT
 * - Gestion des erreurs 401 (redirection login)
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 secondes
});

/**
 * Intercepteur de requête
 * Ajoute automatiquement le token JWT dans le header Authorization
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(TOKEN_COOKIE_NAME);

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Intercepteur de réponse
 * Gère les erreurs globalement, notamment les 401 (session expirée)
 */
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        // Erreur 401 : Non autorisé (token expiré ou invalide)
        if (error.response?.status === 401) {
            // Supprimer le token et les données utilisateur
            Cookies.remove(TOKEN_COOKIE_NAME);
            localStorage.removeItem('smcd_user');

            // Rediriger vers la page de login si on n'y est pas déjà
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
                window.location.href = ROUTES.ADMIN_LOGIN;
            }
        }

        // Erreur réseau (pas de réponse du serveur)
        if (!error.response) {
            console.error('Erreur réseau:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

// Export aussi une version pour les requêtes multipart (upload de fichiers)
export const axiosMultipart: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    timeout: 120000, // 2 minutes pour les uploads
});

// Appliquer les mêmes intercepteurs
axiosMultipart.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(TOKEN_COOKIE_NAME);

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosMultipart.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            Cookies.remove(TOKEN_COOKIE_NAME);
            localStorage.removeItem('smcd_user');

            if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
                window.location.href = ROUTES.ADMIN_LOGIN;
            }
        }
        return Promise.reject(error);
    }
);

/**
 * Instance Axios pour les API publiques (sans authentification)
 */
export const publicAxios: AxiosInstance = axios.create({
    baseURL: `${API_URL}/public`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

/**
 * Instance Axios pour les API admin (avec authentification)
 * Note: Les endpoints sont directement sur /api (pas /api/admin)
 * L'authentification est gérée par les intercepteurs et @PreAuthorize côté backend
 */
export const adminAxios: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000,
});

// Appliquer les intercepteurs à adminAxios
adminAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(TOKEN_COOKIE_NAME);

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

adminAxios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            Cookies.remove(TOKEN_COOKIE_NAME);
            localStorage.removeItem('smcd_user');

            if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
                window.location.href = ROUTES.ADMIN_LOGIN;
            }
        }
        return Promise.reject(error);
    }
);
