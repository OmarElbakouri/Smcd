import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'À propos - Objectifs de la SMCD',
    description: 'Découvrez la Société Marocaine de Chirurgie Digestive (SMCD), sa mission, ses objectifs et les objectifs du congrès 2026.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
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
                            Objectifs de la SMCD
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Société Marocaine de Chirurgie Digestive
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
                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center">
                                La Société Marocaine de Chirurgie Digestive a pour mission de contribuer activement à l&apos;amélioration de la prise en charge des pathologies chirurgicales digestives au Maroc, à travers une démarche scientifique, pédagogique et collaborative.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Promotion de l'innovation chirurgicale */}
                            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Promotion de l&apos;innovation chirurgicale</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    La SMCD œuvre pour l&apos;intégration des techniques chirurgicales innovantes et des avancées technologiques les plus récentes en chirurgie digestive. À travers ses congrès, ateliers et sessions scientifiques, elle favorise le partage d&apos;expertises nationales et internationales, contribuant ainsi à l&apos;amélioration continue de la qualité et de la sécurité des soins offerts aux patients.
                                </p>
                            </div>

                            {/* Soutien à la recherche scientifique */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Soutien à la recherche scientifique et aux jeunes générations</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    La société encourage la recherche clinique et fondamentale en chirurgie digestive, en soutenant les projets innovants et en valorisant les travaux scientifiques des jeunes chirurgiens. Elle s&apos;engage également à accompagner la nouvelle génération à travers des programmes de formation, des bourses, des prix scientifiques et des opportunités d&apos;échanges académiques.
                                </p>
                            </div>

                            {/* Renforcement des liens */}
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Renforcement des liens entre les spécialités</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    La SMCD joue un rôle fédérateur en favorisant une collaboration étroite entre les différentes spécialités chirurgicales ainsi qu&apos;avec les disciplines médico-techniques et oncologiques. Cette approche multidisciplinaire vise à optimiser la prise en charge globale des patients atteints de pathologies digestives complexes.
                                </p>
                            </div>

                            {/* Développement de la formation continue */}
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Développement de la formation continue</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    La société s&apos;inscrit dans une dynamique de formation médicale continue, en proposant des programmes éducatifs réguliers conformes aux standards internationaux. Elle participe activement à la réflexion et à l&apos;élaboration de stratégies nationales et de recommandations de bonnes pratiques pour la prise en charge des pathologies chirurgicales digestives, en adéquation avec les réalités du système de santé marocain.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Objectifs du Congrès 2026 */}
                <section className="py-16 lg:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Objectifs du Congrès 2026</h2>
                            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                                La Société Marocaine de Chirurgie Digestive organise son congrès national annuel les 26 et 27 juin 2026 à Casablanca, rendez-vous scientifique majeur réunissant les chirurgiens digestifs, autres spécialistes médico-chirurgicaux et acteurs de la santé autour d&apos;un programme à forte valeur scientifique.
                            </p>
                            <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
                                Cette édition sera consacrée à deux thématiques d&apos;actualité et à fort impact clinique : <strong>le cancer de l&apos;estomac</strong> et <strong>les urgences biliaires lithiasiques</strong>, pathologies fréquentes, complexes et nécessitant une prise en charge multidisciplinaire et technologiquement avancée.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Objectif 1 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">1</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Élévation du niveau scientifique et harmonisation des pratiques</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Le congrès a pour objectif principal de renforcer les compétences scientifiques et pratiques du chirurgien marocain, à travers des communications, tables rondes, conférences d&apos;experts et discussions interactives. Les échanges permettront de confronter les expériences, d&apos;actualiser les connaissances et de promouvoir des pratiques conformes aux recommandations internationales, adaptées au contexte national.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Objectif 2 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">2</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Mise en lumière des innovations thérapeutiques et technologiques</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            Les thématiques choisies offrent une plateforme idéale pour la présentation des innovations en matière de médicaments, de dispositifs médicaux, d&apos;équipements chirurgicaux et de technologies mini-invasives.
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">
                                            Le congrès constitue ainsi une opportunité unique pour les partenaires industriels de valoriser leurs solutions thérapeutiques et technologiques, démontrer leur impact dans l&apos;amélioration du parcours patient, et accompagner l&apos;évolution des standards de prise en charge en chirurgie digestive.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Objectif 3 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">3</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Promotion de l&apos;approche multidisciplinaire</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            La prise en charge du cancer gastrique et des urgences biliaires lithiasiques implique une collaboration étroite entre chirurgiens, gastro-entérologues, oncologues, radiologues, anesthésistes-réanimateurs et industriels de santé. Le congrès favorisera cette synergie, en mettant en avant le rôle essentiel des traitements médicamenteux, des dispositifs médicaux et des équipements de pointe dans l&apos;optimisation des résultats cliniques.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Objectif 4 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">4</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Renforcement du partenariat entre la SMCD et l&apos;industrie de la santé</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            À travers ce congrès, la SMCD souhaite construire des partenariats durables et éthiques avec les sociétés pharmaceutiques et de matériel médical, fondés sur un objectif commun : l&apos;amélioration de la qualité des soins.
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">
                                            Le sponsoring du congrès offre aux partenaires une visibilité ciblée auprès d&apos;un public décisionnaire (chirurgiens, chefs de service, prescripteurs), un positionnement en tant qu&apos;acteur engagé dans la formation médicale continue, et une participation active au développement de la chirurgie digestive au Maroc.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Objectif 5 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">5</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Soutien à la formation continue et à la jeune génération de chirurgiens</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Le congrès constitue également un espace privilégié de formation médicale continue, contribuant au développement des compétences des jeunes chirurgiens et internes. Le soutien des partenaires industriels permet de garantir la qualité scientifique de l&apos;événement et d&apos;encourager la transmission du savoir et de l&apos;innovation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fiche Technique */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fiche Technique</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Tableau Fiche Technique */}
                            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-lg">
                                <table className="w-full">
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Événement</td>
                                            <td className="py-3 text-gray-600">Congrès SMCD 2026</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Dates</td>
                                            <td className="py-3 text-gray-600">26-27 Juin 2026</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Lieu</td>
                                            <td className="py-3 text-gray-600">Hôtel Marriott Casablanca</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Participants attendus</td>
                                            <td className="py-3 text-gray-600">300+</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Thèmes principaux</td>
                                            <td className="py-3 text-gray-600">Le cancer de l&apos;estomac, Les urgences biliaires lithiasiques</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Répartition</td>
                                            <td className="py-3 text-gray-600">80% Chirurgiens · 15% Autres spécialités · 5% Internationaux · +30 Sponsors</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Langue</td>
                                            <td className="py-3 text-gray-600">Français / Anglais</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-semibold text-gray-700">Type de sessions</td>
                                            <td className="py-3 text-gray-600">Conférences, Ateliers pratiques, Symposiums, Tables rondes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Public cible & Impact */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Public cible</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Chirurgiens digestifs
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Gastro-entérologues
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Médecins
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Industriels du secteur de santé
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Développement professionnel continu (DPC)
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Networking
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Échanges scientifiques
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Innovations
                                        </li>
                                    </ul>
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
