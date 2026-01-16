import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'À propos',
    description: 'Découvrez la Société Marocaine de Chirurgie Digestive (SMCD), sa mission, sa vision et ses valeurs.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
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
                            À propos de la SMCD
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Une société savante dédiée à l&apos;excellence en chirurgie digestive au Maroc
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>À propos</span>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    La Société Marocaine de Chirurgie Digestive (SMCD) a pour mission de promouvoir
                                    l'excellence dans la pratique de la chirurgie digestive au Maroc. Elle rassemble
                                    les chirurgiens spécialisés dans les pathologies de l'appareil digestif et œuvre
                                    pour l'amélioration continue des pratiques chirurgicales.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    À travers ses congrès annuels, formations continues et publications scientifiques,
                                    la SMCD contribue à l'avancement des connaissances et au partage d'expertise entre
                                    les praticiens.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Nos Objectifs</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mr-3 mt-1">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-600">Promouvoir la recherche et l'innovation en chirurgie digestive</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mr-3 mt-1">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-600">Organiser des formations continues pour les chirurgiens</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mr-3 mt-1">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-600">Favoriser les échanges entre praticiens nationaux et internationaux</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mr-3 mt-1">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-600">Améliorer la prise en charge des patients</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Values */}
                <section className="py-16 lg:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Les principes qui guident notre action au quotidien
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Excellence */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                                <p className="text-gray-600">
                                    Nous visons l'excellence dans chaque aspect de notre pratique,
                                    de la recherche à la formation en passant par les soins aux patients.
                                </p>
                            </div>

                            {/* Innovation */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                                <p className="text-gray-600">
                                    Nous encourageons l'innovation et l'adoption des technologies
                                    de pointe pour améliorer les techniques chirurgicales.
                                </p>
                            </div>

                            {/* Collaboration */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
                                <p className="text-gray-600">
                                    Nous croyons en la force du partage de connaissances et de
                                    la collaboration entre praticiens.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* History Timeline */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Histoire</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Des décennies d'engagement pour la chirurgie digestive au Maroc
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-teal-500 rounded-full"></div>

                            <div className="space-y-12">
                                {/* Timeline item 1 */}
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                                        <span className="text-blue-600 font-bold">Fondation</span>
                                        <h3 className="text-xl font-bold text-gray-900">Création de la SMCD</h3>
                                        <p className="text-gray-600">La Société Marocaine de Chirurgie Digestive voit le jour grâce à un groupe de chirurgiens visionnaires.</p>
                                    </div>
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-500 rounded-full shadow-lg">
                                        <span className="text-blue-600 font-bold text-sm">1</span>
                                    </div>
                                    <div className="md:w-1/2 md:pl-12"></div>
                                </div>

                                {/* Timeline item 2 */}
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/2 md:pr-12"></div>
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-white border-4 border-teal-500 rounded-full shadow-lg">
                                        <span className="text-teal-600 font-bold text-sm">2</span>
                                    </div>
                                    <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0 mt-4 md:mt-0">
                                        <span className="text-teal-600 font-bold">Développement</span>
                                        <h3 className="text-xl font-bold text-gray-900">Premiers Congrès Nationaux</h3>
                                        <p className="text-gray-600">Organisation des premiers congrès annuels rassemblant des centaines de chirurgiens.</p>
                                    </div>
                                </div>

                                {/* Timeline item 3 */}
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                                        <span className="text-blue-600 font-bold">Aujourd'hui</span>
                                        <h3 className="text-xl font-bold text-gray-900">Rayonnement International</h3>
                                        <p className="text-gray-600">La SMCD est reconnue comme une référence en chirurgie digestive en Afrique du Nord.</p>
                                    </div>
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-500 rounded-full shadow-lg">
                                        <span className="text-blue-600 font-bold text-sm">3</span>
                                    </div>
                                    <div className="md:w-1/2 md:pl-12"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
