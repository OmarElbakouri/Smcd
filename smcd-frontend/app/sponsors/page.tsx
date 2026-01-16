'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axiosInstance from '@/lib/axios';
import type { Sponsor, NiveauSponsor } from '@/types';
import { NIVEAU_SPONSOR_LABELS } from '@/types';

// Ordre des niveaux
const NIVEAU_ORDER: NiveauSponsor[] = ['PLATINE', 'OR', 'ARGENT', 'BRONZE', 'PARTENAIRE'];

// Configuration des titres anglais pour le style
const NIVEAU_TITLES: Record<NiveauSponsor, string> = {
    PLATINE: 'Platinum',
    OR: 'Gold',
    ARGENT: 'Silver',
    BRONZE: 'Bronze',
    PARTENAIRE: 'Autres sponsors'
};

// Couleurs des titres
const NIVEAU_COLORS: Record<NiveauSponsor, string> = {
    PLATINE: 'text-slate-600',
    OR: 'text-amber-500',
    ARGENT: 'text-gray-500',
    BRONZE: 'text-orange-600',
    PARTENAIRE: 'text-gray-600'
};

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<Record<string, Sponsor[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSponsors();
    }, []);

    const fetchSponsors = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<Record<string, Sponsor[]>>('/sponsors', {
                params: { annee: 2026 }
            });
            setSponsors(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des sponsors', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSponsorClick = async (sponsor: Sponsor) => {
        if (sponsor.siteWeb) {
            try {
                await axiosInstance.post(`/sponsors/${sponsor.id}/click`);
            } catch (error) {
                console.error('Erreur lors du tracking', error);
            }
            window.open(sponsor.siteWeb, '_blank', 'noopener,noreferrer');
        }
    };

    const totalSponsors = Object.values(sponsors).flat().length;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section - Style Homepage */}
                <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#1a365d] overflow-hidden">
                    {/* Particules décoratives */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-[10%] w-2 h-2 bg-cyan-400/30 rounded-full" />
                        <div className="absolute top-40 left-[20%] w-1 h-1 bg-white/20 rounded-full" />
                        <div className="absolute top-32 right-[15%] w-1.5 h-1.5 bg-teal-400/40 rounded-full" />
                        <div className="absolute bottom-20 left-[30%] w-1 h-1 bg-cyan-300/30 rounded-full" />
                        <div className="absolute bottom-32 right-[25%] w-2 h-2 bg-white/10 rounded-full" />
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
                            Nos Partenaires
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Partenaires</span>
                        </div>
                    </div>
                </section>

                {/* Contenu Principal */}
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 max-w-6xl">

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-cyan-500" />
                            </div>
                        ) : totalSponsors === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">Aucun partenaire pour le moment</p>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                {NIVEAU_ORDER.map((niveau) => {
                                    const niveauSponsors = sponsors[NIVEAU_SPONSOR_LABELS[niveau]];
                                    if (!niveauSponsors || niveauSponsors.length === 0) return null;

                                    const isAutres = niveau === 'PARTENAIRE';

                                    return (
                                        <div key={niveau} className="text-center">
                                            {/* Titre du niveau */}
                                            {isAutres ? (
                                                <div className="mb-8">
                                                    <div className="inline-block px-8 py-2 bg-gray-600 text-white text-sm font-medium rounded-full">
                                                        {NIVEAU_TITLES[niveau]}
                                                    </div>
                                                </div>
                                            ) : (
                                                <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${NIVEAU_COLORS[niveau]}`}>
                                                    {NIVEAU_TITLES[niveau]}
                                                </h2>
                                            )}

                                            {/* Grille des logos */}
                                            <div className={`flex flex-wrap items-center justify-center ${
                                                niveau === 'PLATINE' ? 'gap-12' :
                                                niveau === 'OR' ? 'gap-10' :
                                                niveau === 'ARGENT' ? 'gap-8' :
                                                'gap-6'
                                            }`}>
                                                {niveauSponsors.map((sponsor) => (
                                                    <div
                                                        key={sponsor.id}
                                                        onClick={() => handleSponsorClick(sponsor)}
                                                        className={`relative transition-all duration-300 hover:scale-110 ${
                                                            sponsor.siteWeb ? 'cursor-pointer' : ''
                                                        } ${
                                                            niveau === 'PLATINE' ? 'h-24 w-48' :
                                                            niveau === 'OR' ? 'h-16 w-36' :
                                                            niveau === 'ARGENT' ? 'h-12 w-28' :
                                                            'h-10 w-24'
                                                        }`}
                                                    >
                                                        <Image
                                                            src={sponsor.logoUrl}
                                                            alt={sponsor.nom}
                                                            fill
                                                            className="object-contain filter grayscale-0 hover:grayscale-0 transition-all duration-300"
                                                            sizes="(max-width: 768px) 50vw, 200px"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Séparateur */}
                        <div className="my-20 border-t border-gray-200" />

                        {/* Section Devenir Partenaire */}
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                Devenir Partenaire
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Rejoignez nos partenaires et bénéficiez d&apos;une visibilité exceptionnelle 
                                auprès de la communauté scientifique lors du SMCD Congress 2026.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 
                                        text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 
                                        transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Nous Contacter
                                </Link>
                                <a
                                    href="/documents/dossier-sponsoring.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 
                                        text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50
                                        transition-all duration-300"
                                >
                                    Dossier Sponsoring
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
