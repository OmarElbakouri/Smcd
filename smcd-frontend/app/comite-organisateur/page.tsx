'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const comiteMembers = [
    { nom: 'FADIL Abdelaziz', role: 'Président du congrès', highlight: true },
    { nom: 'ELHATTABI Khalid', role: 'Secrétaire général' },
    { nom: 'BENSARDI FatimaZahra', role: 'Trésorière' },
    { nom: 'EL BAKOURI Abdelilah', role: 'Trésorier adjoint' },
    { nom: 'BOUZIANE Mohammed', role: 'Secrétaire adjoint' },
    { nom: 'CHEHAB Farid', role: 'Vice-président' },
    { nom: 'BENISSA Nadia', role: 'Vice-présidente' },
    { nom: 'RADHI Noureddine', role: 'Vice-président' },
    { nom: 'SAIR Khalid', role: 'Membre' },
    { nom: 'KAFIH Mohammed', role: 'Membre' },
    { nom: 'KHARROUB El Khadir', role: 'Membre' },
    { nom: 'BOUFETTAL Rachid', role: 'Membre' },
    { nom: 'HAJRI Amal', role: 'Membre' },
    { nom: 'ELOUFIR Mouhcine', role: 'Membre' },
    { nom: 'AISSE Larbi', role: 'Membre' },
];

export default function ComiteOrganisateurPage() {
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
                            Comité d&apos;Organisation
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Société Marocaine de Chirurgie Digestive
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Comité d&apos;Organisation</span>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12 flex justify-center">
                                <div className="bg-gradient-to-br from-[#0a1628] to-[#1a365d] rounded-2xl p-8 text-center shadow-xl max-w-sm">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Pr {comiteMembers[0].nom}</h3>
                                    <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                                        {comiteMembers[0].role}
                                    </span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Membres du Comité</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {comiteMembers.slice(1).map((membre, index) => (
                                    <div key={index} className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-teal-300 transition-all duration-300 bg-white">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mb-3">
                                            <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-800 font-semibold">{membre.nom}</p>
                                        <span className="text-xs text-teal-600 font-medium">{membre.role}</span>
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
