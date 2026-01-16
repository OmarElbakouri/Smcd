import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Nom du cookie contenant le token JWT
const TOKEN_COOKIE_NAME = 'smcd_token';

// Routes qui nécessitent une authentification
const PROTECTED_ROUTES = ['/admin/dashboard', '/admin/abstracts', '/admin/posters', '/admin/videos', '/admin/invites', '/admin/documents', '/admin/settings'];

// Routes publiques de l'espace admin (login)
const PUBLIC_ADMIN_ROUTES = ['/admin/login'];

/**
 * Middleware Next.js
 * Protège les routes admin en vérifiant la présence du token JWT
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

    // Vérifier si la route est dans l'espace admin
    if (pathname.startsWith('/admin')) {
        // Si c'est la page de login
        if (PUBLIC_ADMIN_ROUTES.includes(pathname)) {
            // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
            if (token) {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
            // Sinon, laisser accéder à la page de login
            return NextResponse.next();
        }

        // Pour toutes les autres routes admin
        // Vérifier si l'utilisateur est authentifié
        if (!token) {
            // Rediriger vers la page de login
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Route /admin sans sous-chemin -> rediriger vers dashboard ou login
    if (pathname === '/admin') {
        if (token) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

// Configurer les routes sur lesquelles le middleware s'applique
export const config = {
    matcher: [
        // Appliquer à toutes les routes admin
        '/admin/:path*',
        // Appliquer aussi à /admin exactement
        '/admin',
    ],
};
