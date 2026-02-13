'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProgrammePage() {
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
                            Programme Du Congrès
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Programme</span>
                        </div>
                    </div>
                </section>

                {/* Contenu */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        {/* Titre */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                Congrès National De Chirurgie Digestive
                            </h2>
                            <p className="text-xl text-teal-600 font-semibold">
                                26 et 27 Juin 2026 - Hôtel Marriott Casablanca
                            </p>
                        </div>

                        {/* Programme Jour 1 */}
                        <div className="mb-12">
                            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-t-xl">
                                <h3 className="text-xl font-bold">
                                    📅 Vendredi 26 Juin 2026
                                </h3>
                            </div>
                            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden">
                                <table className="w-full">
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium w-32">08:00 - 08:30</td>
                                            <td className="px-4 py-3 text-gray-800">Accueil et inscription</td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-gray-50">
                                            <td className="px-4 py-3 text-gray-500 font-medium">08:30 - 09:00</td>
                                            <td className="px-4 py-3 text-gray-800 font-semibold">Cérémonie d&apos;ouverture</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">09:00 - 10:30</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-teal-600">Séance Plénière 1</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie colorectale avancée</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td className="px-4 py-3 text-gray-500 font-medium">10:30 - 11:00</td>
                                            <td className="px-4 py-3 text-gray-600 italic">☕ Pause café - Visite des stands</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">11:00 - 12:30</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-teal-600">FMC 1</span>
                                                <br />
                                                <span className="text-gray-600">Cancers du tube digestif</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td className="px-4 py-3 text-gray-500 font-medium">12:30 - 14:00</td>
                                            <td className="px-4 py-3 text-gray-600 italic">🍽️ Déjeuner</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">14:00 - 15:30</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-purple-600">🤖 Live Surgery - Chirurgie Robotique</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td className="px-4 py-3 text-gray-500 font-medium">15:30 - 16:00</td>
                                            <td className="px-4 py-3 text-gray-600 italic">☕ Pause café</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">16:00 - 17:30</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-teal-600">Séances Thématiques Parallèles</span>
                                                <br />
                                                <span className="text-gray-600">• Chirurgie hépatique</span>
                                                <br />
                                                <span className="text-gray-600">• Chirurgie bariatrique</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-500 font-medium">17:30 - 18:30</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-gray-800">Session E-Posters</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Programme Jour 2 */}
                        <div className="mb-12">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-t-xl">
                                <h3 className="text-xl font-bold">
                                    📅 Samedi 27 Juin 2026
                                </h3>
                            </div>
                            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden">
                                <table className="w-full">
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium w-32">08:30 - 10:00</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-teal-600">Séance Plénière 2</span>
                                                <br />
                                                <span className="text-gray-600">Pathologies hépatobiliaires complexes</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td className="px-4 py-3 text-gray-500 font-medium">10:00 - 10:30</td>
                                            <td className="px-4 py-3 text-gray-600 italic">☕ Pause café</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">10:30 - 12:00</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-teal-600">FMC 2</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie bariatrique et métabolique</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td className="px-4 py-3 text-gray-500 font-medium">12:00 - 13:30</td>
                                            <td className="px-4 py-3 text-gray-600 italic">🍽️ Déjeuner</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">13:30 - 15:00</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-teal-600">Séances Thématiques Parallèles</span>
                                                <br />
                                                <span className="text-gray-600">• Chirurgie pancréatique</span>
                                                <br />
                                                <span className="text-gray-600">• Proctologie</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td className="px-4 py-3 text-gray-500 font-medium">15:00 - 15:30</td>
                                            <td className="px-4 py-3 text-gray-600 italic">☕ Pause café</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">15:30 - 16:30</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-gray-800">Communications libres</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium">16:30 - 17:00</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-gray-800">Remise des prix</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-500 font-medium">17:00</td>
                                            <td className="px-4 py-3">
                                                <span className="font-semibold text-purple-600">Cérémonie de clôture</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-800">📋 Note :</span> Le programme détaillé sera disponible prochainement.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Dernière mise à jour : Janvier 2026
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
