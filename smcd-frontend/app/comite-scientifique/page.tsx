'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const scientifiqueMembers = [
    { nom: 'FADIL Abdelaziz', role: 'Président', highlight: true },
    { nom: 'ELHATTABI Khalid', role: 'Coordinateur' },
    { nom: 'CHEHAB Farid', role: 'Membre' },
    { nom: 'BENISSA Nadia', role: 'Membre' },
    { nom: 'RADHI Noureddine', role: 'Membre' },
    { nom: 'BENSARDI FatimaZahra', role: 'Membre' },
    { nom: 'EL BAKOURI Abdelilah', role: 'Membre' },
    { nom: 'BOUZIANE Mohammed', role: 'Membre' },
    { nom: 'SAIR Khalid', role: 'Membre' },
    { nom: 'KAFIH Mohammed', role: 'Membre' },
    { nom: 'KHARROUB El Khadir', role: 'Membre' },
    { nom: 'BOUFETTAL Rachid', role: 'Membre' },
    { nom: 'HAJRI Amal', role: 'Membre' },
    { nom: 'ELOUFIR Mouhcine', role: 'Membre' },
    { nom: 'AISSE Larbi', role: 'Membre' },
];

export default function ComiteScientifiquePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#1a365d] overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-[10%] w-2 h-2 bg-cyan-400/30 rounded-full" />
                        <div className="absolute top-40 left-[20%] w-1 h-1 bg-white/20 rounded-full" />
                        <div className="absolute top-32 right-[15%] w-1.5 h-1.5 bg-teal-400/40 rounded-full" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
                            Comité Scientifique
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Société Marocaine de Chirurgie Digestive
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Comité Scientifique</span>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Membres du Comité Scientifique</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {scientifiqueMembers.map((membre, index) => (
                                    <div key={index} className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-purple-300 transition-all duration-300 bg-white">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-3">
                                            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-800 font-semibold">{membre.nom}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
