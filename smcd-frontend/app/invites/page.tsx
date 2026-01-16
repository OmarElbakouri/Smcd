'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Liste des invités/conférenciers
const invites = [
    {
        nom: 'Pr. Aziz Benbrahim',
        titre: 'MD, FACS, FASMBS',
        specialite: 'Chirurgie robotique bariatrique, endocrinienne',
        lieu: 'Connecticut, USA',
        pays: '🇺🇸',
        photo: 'https://ui-avatars.com/api/?name=Aziz+Benbrahim&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Pr. Robert Caiazzo',
        titre: '',
        specialite: 'Chirurgie bariatrique et endocrinienne robotique',
        lieu: 'CHU Lille - Hôpital Claude Huriez',
        pays: '🇫🇷',
        photo: 'https://ui-avatars.com/api/?name=Robert+Caiazzo&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Pr Jean Closset',
        titre: '',
        specialite: 'Chirurgie digestive',
        lieu: 'Hôpital Erasme, Bruxelles',
        pays: '🇧🇪',
        photo: 'https://ui-avatars.com/api/?name=Jean+Closset&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Dr Xavier Delgadillo',
        titre: '',
        specialite: 'Colo-proctologie',
        lieu: 'Suisse',
        pays: '🇨🇭',
        photo: 'https://ui-avatars.com/api/?name=Xavier+Delgadillo&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Pr Saïf Dzelznek',
        titre: '',
        specialite: 'Chirurgie digestive',
        lieu: 'Turquie',
        pays: '🇹🇷',
        photo: 'https://ui-avatars.com/api/?name=Saif+Dzelznek&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Pr. Damien Dresse',
        titre: '',
        specialite: 'Surgical Oncology, Robotic and Laparoscopic surgery',
        lieu: 'Liège, WAL, BE',
        pays: '🇧🇪',
        photo: 'https://ui-avatars.com/api/?name=Damien+Dresse&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Dr Mehdi ELAMRANI',
        titre: '',
        specialite: 'Chirurgie digestive et oncologique',
        lieu: 'CHU Hassan II, Fès',
        pays: '🇲🇦',
        photo: 'https://ui-avatars.com/api/?name=Mehdi+Elamrani&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Pr David Fuks',
        titre: '',
        specialite: 'Chirurgie hépatobiliaire et pancréatique',
        lieu: 'Paris, France',
        pays: '🇫🇷',
        photo: 'https://ui-avatars.com/api/?name=David+Fuks&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Dr Desislava Germanova',
        titre: '',
        specialite: 'Chirurgie bariatrique',
        lieu: 'Bulgarie',
        pays: '🇧🇬',
        photo: 'https://ui-avatars.com/api/?name=Desislava+Germanova&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Dr Philippe Hauters',
        titre: '',
        specialite: 'Chirurgie colorectale',
        lieu: 'Belgique',
        pays: '🇧🇪',
        photo: 'https://ui-avatars.com/api/?name=Philippe+Hauters&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Pr Jacques HUBERT',
        titre: '',
        specialite: 'Chirurgie robotique',
        lieu: 'Nancy, France',
        pays: '🇫🇷',
        photo: 'https://ui-avatars.com/api/?name=Jacques+Hubert&background=0891b2&color=fff&size=200'
    },
    {
        nom: 'Dr H. M. Leghnidiche',
        titre: '',
        specialite: 'Chirurgie digestive',
        lieu: 'Algérie',
        pays: '🇩🇿',
        photo: 'https://ui-avatars.com/api/?name=HM+Leghnidiche&background=0891b2&color=fff&size=200'
    },
];

export default function InvitesPage() {
    const [selectedInvite, setSelectedInvite] = useState<typeof invites[0] | null>(null);

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
                            Nos Invités
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Nos Invités</span>
                        </div>
                    </div>
                </section>

                {/* Liste des invités */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {invites.map((invite, index) => (
                                <div 
                                    key={index}
                                    onClick={() => setSelectedInvite(invite)}
                                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all duration-300 cursor-pointer group"
                                >
                                    {/* Photo */}
                                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                                        <Image
                                            src={invite.photo}
                                            alt={invite.nom}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="p-4 text-center">
                                        <h3 className="font-bold text-gray-800 mb-1">
                                            {invite.nom}
                                        </h3>
                                        {invite.titre && (
                                            <p className="text-xs text-teal-600 font-medium mb-1">
                                                {invite.titre}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            {invite.specialite}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {invite.lieu}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modal détail invité */}
                {selectedInvite && (
                    <div 
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedInvite(null)}
                    >
                        <div 
                            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header avec logos */}
                            <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">S</span>
                                    </div>
                                    <span className="text-xs text-gray-500">SMCD</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-teal-600">Congrès National de</p>
                                    <p className="text-xl font-bold text-gray-800">Chirurgie <span className="text-teal-600">2026</span></p>
                                </div>
                            </div>

                            {/* Badge */}
                            <div className="px-4 pt-4">
                                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-2 rounded-lg text-sm font-semibold">
                                    NOS ORATEURS
                                </div>
                            </div>

                            {/* Photo et info */}
                            <div className="p-6 text-center">
                                <div className="relative w-40 h-40 mx-auto mb-4 rounded-xl overflow-hidden">
                                    <Image
                                        src={selectedInvite.photo}
                                        alt={selectedInvite.nom}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                    {selectedInvite.nom}
                                </h3>
                                <p className="text-lg">
                                    {selectedInvite.lieu} {selectedInvite.pays}
                                </p>
                                
                                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-600 text-sm">
                                        {selectedInvite.specialite}
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t p-4 text-center">
                                <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-2 rounded-full" />
                                <p className="text-xs text-gray-400">www.smcd-congress.ma</p>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setSelectedInvite(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
