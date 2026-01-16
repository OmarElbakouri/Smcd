'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ThematiquesPage() {
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
                            Congrès National 2026
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Thématiques</span>
                        </div>
                    </div>
                </section>

                {/* Contenu */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {/* Titre principal */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                Congrès National De Chirurgie Digestive
                            </h2>
                            <p className="text-xl text-teal-600 font-semibold">
                                26 et 27 Juin 2026 - Casablanca
                            </p>
                        </div>

                        {/* Séances Plénières */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                                Séances Plénières :
                            </h3>
                            <ul className="text-center text-gray-600 space-y-2">
                                <li>- Chirurgie colorectale avancée</li>
                                <li>- Pathologies hépatobiliaires complexes</li>
                            </ul>
                        </div>

                        {/* FMC */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                                FMC :
                            </h3>
                            <ul className="text-center text-gray-600 space-y-2">
                                <li>- Cancers du tube digestif</li>
                                <li>- Chirurgie bariatrique et métabolique</li>
                            </ul>
                        </div>

                        {/* Live Surgery */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                                Live, Chirurgie Robotique
                            </h3>
                        </div>

                        {/* Séances Thématiques */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                                Séances Thématiques Par Spécialités
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-2">Chirurgie Hépatique</h4>
                                    <p className="text-gray-600 text-sm">Résections hépatiques, transplantation</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-2">Chirurgie Colorectale</h4>
                                    <p className="text-gray-600 text-sm">Cancer, maladies inflammatoires</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-2">Chirurgie Bariatrique</h4>
                                    <p className="text-gray-600 text-sm">Sleeve, bypass, révisions</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-2">Chirurgie Pancréatique</h4>
                                    <p className="text-gray-600 text-sm">Tumeurs, pancréatites</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-2">Chirurgie Œsogastrique</h4>
                                    <p className="text-gray-600 text-sm">RGO, cancers, hernies</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-2">Proctologie</h4>
                                    <p className="text-gray-600 text-sm">Hémorroïdes, fistules, cancers</p>
                                </div>
                            </div>
                        </div>

                        {/* Info congrès */}
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-center text-white mt-12">
                            <div className="flex items-center justify-center mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Congrès National Annuel De Chirurgie</h3>
                            <p className="text-xl mb-4">26 et 27 Juin 2026 à Casablanca</p>
                            <p className="text-white/80">Société Marocaine De Chirurgie Digestive (SMCD)</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
