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
                    <div className="container mx-auto px-4 max-w-6xl">
                        {/* Titre */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                Congrès National De Chirurgie Digestive
                            </h2>
                            <p className="text-xl text-teal-600 font-semibold">
                                26 et 27 Juin 2026 - Hôtel Marriott Casablanca
                            </p>
                        </div>

                        {/* Programme Jour 1 - Vendredi */}
                        <div className="mb-12">
                            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-t-xl">
                                <h3 className="text-xl font-bold">
                                    📅 Vendredi 26 Juin 2026
                                </h3>
                            </div>
                            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100 border-b border-gray-200">
                                            <th className="px-4 py-3 text-left text-gray-600 font-semibold w-36">Horaire</th>
                                            <th className="px-4 py-3 text-left text-teal-700 font-semibold">🏛️ Salle 1</th>
                                            <th className="px-4 py-3 text-left text-purple-700 font-semibold">🏛️ Salle 2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">08h30 - 10h30</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 1</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie des métastases hépatiques</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 2</span>
                                                <br />
                                                <span className="text-gray-600">Urgences</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td colSpan={3} className="px-4 py-3 text-gray-600 italic text-center">☕ 10h30 - 11h00 : Pause Café, Visite des Stands</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">11h00 - 13h00</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 3</span>
                                                <br />
                                                <span className="text-gray-600">Session Rectum</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 4</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie Pancréatique</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td colSpan={3} className="px-4 py-3 text-gray-600 italic text-center">🍽️ 12h30 - 14h30 : Pause Déjeuner</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">15h00 - 16h30</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 5</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie Robotique</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 6</span>
                                                <br />
                                                <span className="text-gray-600">Face à face en chirurgie colorectale</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td colSpan={3} className="px-4 py-3 text-gray-600 italic text-center">☕ 16h30 - 17h00 : Pause Café, Visite des Stands</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">17h00 - 19h00</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 7</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie bariatrique</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 8</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie pariétale</span>
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td colSpan={3} className="px-4 py-3 text-center">
                                                <span className="font-semibold text-gray-800">🎊 Inauguration officielle du congrès</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Programme Jour 2 - Samedi */}
                        <div className="mb-12">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-t-xl">
                                <h3 className="text-xl font-bold">
                                    📅 Samedi 27 Juin 2026
                                </h3>
                            </div>
                            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100 border-b border-gray-200">
                                            <th className="px-4 py-3 text-left text-gray-600 font-semibold w-36">Horaire</th>
                                            <th className="px-4 py-3 text-left text-teal-700 font-semibold">🏛️ Salle 1</th>
                                            <th className="px-4 py-3 text-left text-purple-700 font-semibold">🏛️ Salle 2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">08h30 - 10h30</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 1</span>
                                                <br />
                                                <span className="text-gray-600">Cas cliniques</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 2</span>
                                                <br />
                                                <span className="text-gray-600">Vidéos divers</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td colSpan={3} className="px-4 py-3 text-gray-600 italic text-center">☕ 10h30 - 11h00 : Pause Café, Visite des Stands</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">11h00 - 12h30</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 3</span>
                                                <br />
                                                <span className="text-gray-600">Cancer de l&apos;estomac</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 4</span>
                                                <br />
                                                <span className="text-gray-600">Communications libres</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td colSpan={3} className="px-4 py-3 text-gray-600 italic text-center">🍽️ 12h30 - 14h30 : Pause Déjeuner</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">14h30 - 16h00</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 5</span>
                                                <br />
                                                <span className="text-gray-600">Urgences biliaires lithiasiques</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 6</span>
                                                <br />
                                                <span className="text-gray-600">Chirurgie endocrinienne</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 bg-amber-50">
                                            <td colSpan={3} className="px-4 py-3 text-gray-600 italic text-center">☕ 16h30 - 17h00 : Pause Café, Visite des Stands</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="px-4 py-3 text-gray-500 font-medium align-top">16h30 - 18h00</td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-teal-600">SESSION 7</span>
                                                <br />
                                                <span className="text-gray-600">Vidéos : comment je fais ?</span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="font-semibold text-purple-600">SESSION 8</span>
                                                <br />
                                                <span className="text-gray-600">Traumatismes de l&apos;abdomen</span>
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td colSpan={3} className="px-4 py-3 text-center">
                                                <span className="font-semibold text-purple-600">🎓 Clôture du congrès</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-800">📋 Note :</span> Le programme détaillé avec les intervenants sera disponible prochainement.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Dernière mise à jour : Février 2026
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
