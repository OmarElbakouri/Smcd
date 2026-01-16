'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CONGRESS_INFO, ROUTES } from '@/lib/constants';

/**
 * Footer public du site - Design moderne inspiré de somachir.ma
 * Affiche les liens, newsletter, informations de contact et copyright
 */
export default function Footer() {
    const currentYear = 2026;
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation d'inscription
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
            {/* Newsletter Section */}
            <div className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                                Restez <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">informé</span>
                            </h3>
                            <p className="text-gray-400">
                                Inscrivez-vous à notre newsletter pour recevoir les dernières actualités du congrès.
                            </p>
                        </div>
                        <div>
                            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Votre adresse email"
                                    className="flex-1 px-5 py-4 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-teal-500/30 whitespace-nowrap"
                                >
                                    {subscribed ? '✓ Inscrit !' : 'S\'inscrire'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* À propos */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold block">SMCD</span>
                                <span className="text-xs text-gray-500">Congrès 2026</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            La Société Marocaine de Chirurgie Digestive organise chaque année un congrès
                            national réunissant les meilleurs spécialistes de la chirurgie digestive.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-3">
                            {[
                                { icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z', name: 'Facebook' },
                                { icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84', name: 'Twitter' },
                                { icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', name: 'LinkedIn' },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 flex items-center justify-center transition-all duration-300 group"
                                    aria-label={social.name}
                                >
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Liens rapides */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
                            Liens rapides
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { href: ROUTES.HOME, label: 'Accueil' },
                                { href: ROUTES.ABOUT, label: 'À propos' },
                                { href: '/programme', label: 'Programme' },
                                { href: '/speakers', label: 'Intervenants' },
                                { href: '/videos', label: 'Vidéos' },
                                { href: '/eposters', label: 'E-Posters' },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center group"
                                    >
                                        <svg className="w-4 h-4 mr-2 text-gray-600 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Soumissions */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
                            Soumissions
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { href: '/abstracts/submit', label: 'Soumettre un Abstract' },
                                { href: '/videos/submit', label: 'Soumettre une Vidéo' },
                                { href: '/eposters/submit', label: 'Soumettre un E-Poster' },
                                { href: ROUTES.CONTACT, label: 'Nous contacter' },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center group"
                                    >
                                        <svg className="w-4 h-4 mr-2 text-gray-600 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Email</p>
                                    <p className="text-sm text-gray-300">{CONGRESS_INFO.email}</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Téléphone</p>
                                    <p className="text-sm text-gray-300">{CONGRESS_INFO.phone}</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Adresse</p>
                                    <p className="text-sm text-gray-300">{CONGRESS_INFO.address}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} {CONGRESS_INFO.organizer}. Tous droits réservés.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/mentions-legales" className="text-gray-500 hover:text-teal-400 text-sm transition-colors">
                                Mentions légales
                            </Link>
                            <Link href="/confidentialite" className="text-gray-500 hover:text-teal-400 text-sm transition-colors">
                                Politique de confidentialité
                            </Link>
                            <Link href="/cgv" className="text-gray-500 hover:text-teal-400 text-sm transition-colors">
                                CGV
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
