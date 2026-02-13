'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONGRESS_INFO, ROUTES } from '@/lib/constants';

/**
 * Premium Footer - Clean, Professional Design
 */
export default function Footer() {
    const currentYear = 2026;
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate subscription
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubscribed(true);
        setEmail('');
        setIsLoading(false);
        setTimeout(() => setSubscribed(false), 4000);
    };

    const footerLinks = {
        congress: [
            { href: '/about', label: 'Objectifs SMCD' },
            { href: '/thematiques', label: 'Thématiques' },
            { href: '/programme', label: 'Programme' },
            { href: ROUTES.SPEAKERS, label: 'Intervenants' },
            { href: '/comite-organisation', label: 'Membres du Bureau' },
        ],
        resources: [
            { href: ROUTES.VIDEOS, label: 'Vidéothèque' },
            { href: ROUTES.EPOSTERS, label: 'E-Posters' },
            { href: '/documents', label: 'Documents' },
            { href: '/archives', label: 'Archives' },
        ],
        submissions: [
            { href: '/abstracts/submit', label: 'Soumettre un Abstract' },
            { href: '/sponsoring', label: 'Dossier Sponsoring' },
            { href: ROUTES.SPONSORS, label: 'Nos Partenaires' },
            { href: ROUTES.CONTACT, label: 'Contact' },
        ],
    };

    const socialLinks = [
        {
            name: 'Facebook',
            href: '#',
            icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
        },
        {
            name: 'LinkedIn',
            href: '#',
            icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
        },
        {
            name: 'YouTube',
            href: '#',
            icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
        },
    ];

    return (
        <footer className="bg-[#0A1628] text-white">
            {/* Newsletter Section */}
            <div className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Restez <span className="gradient-text">informé</span>
                        </h3>
                        <p className="text-white/50 mb-8 max-w-xl mx-auto">
                            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités du congrès.
                        </p>
                        <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Votre adresse email"
                                className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/50 focus:border-[#00D4AA]/50 transition-all"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-4 rounded-full bg-[#00D4AA] text-[#0A1628] font-semibold hover:bg-[#00B894] transition-all duration-300 shadow-lg hover:shadow-[#00D4AA]/20 disabled:opacity-70 whitespace-nowrap"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Envoi...
                                    </span>
                                ) : subscribed ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Inscrit !
                                    </span>
                                ) : (
                                    "S'inscrire"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <div className="mb-6">
                            <Image
                                src="/smcd-logo.png"
                                alt="SMCD - Société Marocaine de Chirurgie Digestive"
                                width={160}
                                height={64}
                                className="object-contain rounded-lg"
                                style={{ width: 'auto', height: '64px' }}
                            />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            L'excellence en chirurgie digestive au Maroc.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#00D4AA]/20 flex items-center justify-center transition-all duration-300 group border border-white/5 hover:border-[#00D4AA]/30"
                                    aria-label={social.name}
                                >
                                    <svg className="w-4 h-4 text-white/40 group-hover:text-[#00D4AA] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Le Congrès */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-white/70">
                            Le Congrès
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.congress.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/40 hover:text-[#00D4AA] transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ressources */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-white/70">
                            Ressources
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/40 hover:text-[#00D4AA] transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Soumissions */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-white/70">
                            Soumissions
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.submissions.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/40 hover:text-[#00D4AA] transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-white/70">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-[#00D4AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-sm text-white/40">{CONGRESS_INFO.email}</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-[#00D4AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="text-sm text-white/40">{CONGRESS_INFO.phone}</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-[#00D4AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="text-sm text-white/40">{CONGRESS_INFO.location}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/30 text-sm">
                            © {currentYear} {CONGRESS_INFO.organizer}. Tous droits réservés.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/mentions-legales" className="text-white/30 hover:text-[#00D4AA] text-sm transition-colors">
                                Mentions légales
                            </Link>
                            <Link href="/confidentialite" className="text-white/30 hover:text-[#00D4AA] text-sm transition-colors">
                                Confidentialité
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
