'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Membres du comité scientifique
const membresScientifique = [
    { nom: 'Abdellatif SETTAF', ville: 'Rabat' },
    { nom: 'Abdelaziz FADIL', ville: 'Casablanca' },
    { nom: 'Abdelmalek HRORA', ville: 'Rabat' },
    { nom: 'Farid CHEHAB', ville: 'Casablanca' },
    { nom: 'Mohammed RAISS', ville: 'Rabat' },
    { nom: 'Youness BAKALI', ville: 'Rabat' },
    { nom: 'Fatima Zahra BENSARDI', ville: 'Casablanca' },
    { nom: 'Abdelmounaim AIT ALI', ville: 'Rabat' },
    { nom: 'Nadia BENISSA', ville: 'Casablanca' },
    { nom: 'Mehdi SOUFI', ville: 'Agadir' },
    { nom: 'Ahmed SERJI', ville: 'Rabat' },
    { nom: 'Noureddine RADHI', ville: 'Casablanca' },
    { nom: 'Mohamed TARCHOULI', ville: 'Agadir' },
    { nom: 'Mostafa TADLAOUI', ville: 'Meknès' },
    { nom: 'Rachid BOUFETTAL', ville: 'Casablanca' },
    { nom: 'El Khadir KHAROUB', ville: 'Casablanca' },
    { nom: 'Mohammed AL BORJI', ville: 'Fès' },
    { nom: 'Abdelilah ELBAKOURI', ville: 'Casablanca' },
    { nom: 'Abdelmalek TEKKAL', ville: 'Tanger' },
    { nom: 'Larbi AISSE', ville: 'Agadir' },
    { nom: 'Khalid EL HATTABI', ville: 'Casablanca' },
    { nom: 'Mokhtar SAMATOU', ville: 'Oujda' },
    { nom: 'Mohammed BOUCHENTOUF', ville: 'Rabat' },
];

export default function ComiteScientifiquePage() {
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
                            Comité Scientifique
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Comité Scientifique</span>
                        </div>
                    </div>
                </section>

                {/* Liste des membres */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                            {membresScientifique.map((membre, index) => (
                                <div 
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg hover:border-teal-300 transition-all duration-300"
                                >
                                    <p className="text-gray-800 font-medium">
                                        {membre.nom}
                                        <span className="text-gray-500 font-normal"> ({membre.ville})</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
