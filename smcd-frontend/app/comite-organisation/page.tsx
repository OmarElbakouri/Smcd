'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Membres du bureau SMCD
const bureauMembers = {
    direction: [
        { nom: 'FADIL Abdelaziz', role: 'Président', highlight: true },
    ],
    vicePresidents: [
        { nom: 'CHEHAB Farid', role: 'Vice-président' },
        { nom: 'BENISSA Nadia', role: 'Vice-présidente' },
        { nom: 'RADHI Noureddine', role: 'Vice-président' },
    ],
    secretariat: [
        { nom: 'ELHATTABI Khalid', role: 'Secrétaire général', highlight: true },
        { nom: 'BOUZIANE Mohammed', role: 'Secrétaire adjoint' },
    ],
    tresorerie: [
        { nom: 'BENSARDI FatimaZahra', role: 'Trésorier' },
        { nom: 'EL BAKOURI Abdelilah', role: 'Trésorier adjoint' },
    ],
    assesseurs: [
        { nom: 'SAIR Khalid', role: 'Assesseur' },
        { nom: 'KAFIH Mohammed', role: 'Assesseur' },
        { nom: 'KHARROUB El Khadir', role: 'Assesseur' },
        { nom: 'BOUFETTAL Rachid', role: 'Assesseur' },
        { nom: 'HAJRI Amal', role: 'Assesseur' },
        { nom: 'ELOUFIR Mouhcine', role: 'Assesseur' },
        { nom: 'AISSE Larbi', role: 'Assesseur' },
    ],
};

export default function ComiteOrganisationPage() {
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
                            Membres du Bureau
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Société Marocaine de Chirurgie Digestive
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Membres du Bureau</span>
                        </div>
                    </div>
                </section>

                {/* Bureau Principal */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            
                            {/* Président */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Président</h2>
                                <div className="flex justify-center">
                                    <div className="bg-gradient-to-br from-[#0a1628] to-[#1a365d] rounded-2xl p-8 text-center shadow-xl max-w-sm">
                                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Pr FADIL Abdelaziz</h3>
                                        <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                                            Président
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Vice-Présidents */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Vice-Présidents</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {bureauMembers.vicePresidents.map((membre, index) => (
                                        <div 
                                            key={index}
                                            className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-teal-300 transition-all duration-300 bg-white"
                                        >
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

                            {/* Secrétariat et Trésorerie */}
                            <div className="mb-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Secrétariat */}
                                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
                                        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Secrétariat</h2>
                                        <div className="space-y-4">
                                            {bureauMembers.secretariat.map((membre, index) => (
                                                <div 
                                                    key={index}
                                                    className={`rounded-xl p-4 text-center ${membre.highlight ? 'bg-white shadow-md' : 'bg-white/50'}`}
                                                >
                                                    <p className="text-gray-800 font-semibold">{membre.nom}</p>
                                                    <span className={`text-xs font-medium ${membre.highlight ? 'text-blue-600' : 'text-gray-500'}`}>
                                                        {membre.role}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Trésorerie */}
                                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8">
                                        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Trésorerie</h2>
                                        <div className="space-y-4">
                                            {bureauMembers.tresorerie.map((membre, index) => (
                                                <div 
                                                    key={index}
                                                    className="bg-white/80 rounded-xl p-4 text-center"
                                                >
                                                    <p className="text-gray-800 font-semibold">{membre.nom}</p>
                                                    <span className="text-xs text-orange-600 font-medium">{membre.role}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assesseurs */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Assesseurs</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {bureauMembers.assesseurs.map((membre, index) => (
                                        <div 
                                            key={index}
                                            className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg hover:border-purple-300 transition-all duration-300 bg-white"
                                        >
                                            <p className="text-gray-800 font-medium">{membre.nom}</p>
                                            <span className="text-xs text-purple-600 font-medium">{membre.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tableau récapitulatif */}
                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Tableau Récapitulatif</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                                        <thead className="bg-gradient-to-r from-[#0a1628] to-[#1a365d] text-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left">Fonction</th>
                                                <th className="px-6 py-4 text-left">Nom</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="bg-cyan-50">
                                                <td className="px-6 py-4 font-semibold text-cyan-700">Président</td>
                                                <td className="px-6 py-4">FADIL Abdelaziz</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-gray-700" rowSpan={4}>Vice-présidents</td>
                                                <td className="px-6 py-4">CHEHAB Farid</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4">EL HATTABI Khalid</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4">BENISSA Nadia</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4">RADHI Noureddine</td>
                                            </tr>
                                            <tr className="bg-blue-50">
                                                <td className="px-6 py-4 font-semibold text-blue-700">Secrétaire général</td>
                                                <td className="px-6 py-4">EL HATTABI Khalid</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-gray-700">Trésorier</td>
                                                <td className="px-6 py-4">BENSARDI FatimaZahra</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-gray-700">Trésorier adjoint</td>
                                                <td className="px-6 py-4">EL BAKOURI Abdelilah</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-gray-700">Secrétaire adjoint</td>
                                                <td className="px-6 py-4">BOUZIANE Mohamed</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
