'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ThematiquesPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#1a365d] overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-[10%] w-2 h-2 bg-cyan-400/30 rounded-full" />
                        <div className="absolute top-40 left-[20%] w-1 h-1 bg-white/20 rounded-full" />
                        <div className="absolute top-32 right-[15%] w-1.5 h-1.5 bg-teal-400/40 rounded-full" />
                        <div className="absolute bottom-20 left-[30%] w-1 h-1 bg-cyan-300/30 rounded-full" />
                        <div className="absolute bottom-32 right-[25%] w-2 h-2 bg-white/10 rounded-full" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
                            Thématiques du Congrès 2026
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Société Marocaine de Chirurgie Digestive
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Thématiques</span>
                        </div>
                    </div>
                </section>

                {/* Thématiques Principales */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 rounded-full">
                                Congrès National Annuel
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                26 – 27 JUIN 2026 • HÔTEL MARRIOTT CASABLANCA
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Cette édition sera consacrée à deux thématiques d&apos;actualité et à fort impact clinique,
                                pathologies fréquentes, complexes et nécessitant une prise en charge multidisciplinaire
                                et technologiquement avancée.
                            </p>
                        </div>

                        {/* Les deux thématiques principales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {/* Cancer de l'estomac */}
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1628] to-[#1a365d] p-8 md:p-12 group hover:shadow-2xl transition-all duration-500">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-500" />
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Le Cancer de l&apos;Estomac
                                    </h3>
                                </div>
                            </div>

                            {/* Urgences biliaires lithiasiques */}
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-8 md:p-12 group hover:shadow-2xl transition-all duration-500">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px] group-hover:bg-yellow-500/30 transition-all duration-500" />
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mb-8 rounded-2xl bg-white/20 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Les Urgences Biliaires Lithiasiques
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Séances thématiques */}
                        <div className="bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5] rounded-2xl p-8 mb-16">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                </span>
                                Séances thématiques :
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {[
                                    'Hepatobiliaire',
                                    'Colorectale',
                                    'Pancreas',
                                    'Œsogastrique',
                                    'Pariétale',
                                    'Robotique',
                                    'Bariatrique',
                                    'Urgences',
                                    'Endocrinienne',
                                    'Autres',
                                ].map((theme, i) => (
                                    <div key={i} className="bg-white rounded-xl px-4 py-3 text-center shadow-sm border border-teal-100 hover:shadow-md hover:border-teal-300 transition-all">
                                        <span className="text-sm font-medium text-gray-700">{theme}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Format des sessions */}
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Format des Sessions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Conférences</h4>
                                    <p className="text-sm text-gray-600">Présentations d&apos;experts</p>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="w-14 h-14 mx-auto mb-4 bg-teal-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Tables Rondes</h4>
                                    <p className="text-sm text-gray-600">Discussions interactives</p>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="w-14 h-14 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Ateliers</h4>
                                    <p className="text-sm text-gray-600">Sessions pratiques</p>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="w-14 h-14 mx-auto mb-4 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Symposiums</h4>
                                    <p className="text-sm text-gray-600">Sessions sponsorisées</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
