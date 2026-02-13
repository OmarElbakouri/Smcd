'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Packages de sponsoring
const sponsoringPackages = [
    {
        name: 'SPONSOR PLATINIUM',
        price: '250 000',
        color: 'from-slate-600 to-slate-800',
        textColor: 'text-slate-600',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-300',
        priority: 1,
        standSize: '18m²',
        badges: 8,
        dejeuners: 4,
        saccoches: 4,
        avantages: [
            'Priorité N°1 de choix de l\'emplacement du stand',
            'Dénomination officielle : Sponsor Platine',
            'Projection du logo et une publicité sur l\'écran de la grande salle lors des présentations scientifiques',
            'Logo en grand format sur panneau de remerciement à l\'accueil du congrès',
            'Logo sur panneau de remerciement à l\'entrée de l\'exposition',
            'Logo sur panneau de remerciement dans la zone e-communication',
            'Page de remerciement des sponsors dans le programme définitif',
            'Possibilité de disposer des encarts publicitaires sur le présentoir à l\'accueil du congrès',
            'Stand d\'exposition de 18m²',
        ],
        featured: true,
    },
    {
        name: 'SPONSOR GOLD',
        price: '200 000',
        color: 'from-amber-500 to-amber-600',
        textColor: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-300',
        priority: 2,
        standSize: '12m²',
        badges: 5,
        dejeuners: 2,
        saccoches: 2,
        avantages: [
            'Priorité N°2 de choix de l\'emplacement du stand',
            'Dénomination officielle : Sponsor Or',
            'Logo en moyen format sur panneau de remerciement à l\'accueil du congrès',
            'Logo sur panneau de remerciement à l\'entrée de l\'exposition',
            'Logo sur panneau de remerciement dans la zone e-communication',
            'Diapositive sponsors interséance',
            'Page de remerciement des sponsors dans le programme définitif',
            'Possibilité de disposer des encarts publicitaires sur le présentoir à l\'accueil du congrès',
            'Stand 12m²',
        ],
    },
    {
        name: 'SPONSOR SILVER',
        price: '120 000',
        color: 'from-gray-400 to-gray-500',
        textColor: 'text-gray-500',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-300',
        priority: 3,
        standSize: '9m²',
        badges: 3,
        dejeuners: 1,
        saccoches: 1,
        avantages: [
            'Priorité N°3 de choix de l\'emplacement du stand',
            'Dénomination officielle : Sponsor Argent',
            'Logo en petit format sur panneau de remerciement à l\'accueil du congrès',
            'Logo sur panneau de remerciement à l\'entrée de l\'exposition',
            'Logo sur panneau de remerciement dans la zone e-communication',
            'Diapositive sponsors interséance',
            'Page de remerciement des sponsors dans le programme définitif',
            'Stand d\'exposition de 9m²',
        ],
    },
];

export default function SponsoringPage() {
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
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
                            Formules de Sponsoring
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Dossier Sponsoring - Congrès National de Chirurgie Digestive 2026
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Sponsoring</span>
                        </div>
                    </div>
                </section>

                {/* Avantages Généraux */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                En sponsorisant notre congrès, vous pouvez bénéficier :
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Avant la manifestation */}
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <h3 className="text-xl font-bold text-blue-600 mb-4">Avant la manifestation</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Votre logo associé à tous les documents de promotion imprimés (invitations, programmes, flyers)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Campagne Outdoor : votre logo sur l&apos;affiche officielle (affiches, flyers, banderoles)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Votre logo associé à toutes les insertions publicitaires</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Page publicitaire sur le bulletin officiel de l&apos;événement</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Bannière et bouton sur le site web : www.smcd.com</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Pendant la manifestation */}
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <h3 className="text-xl font-bold text-teal-600 mb-4">Pendant la manifestation</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Mise à disposition d&apos;une surface nue avec emplacement privilégié</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Votre logo sur les bannières officielles à l&apos;accueil des visiteurs</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600">Votre logo dans les salles de travail</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Packages de Sponsoring */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Nos Formules de Sponsoring
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {sponsoringPackages.map((pkg, index) => (
                                <div 
                                    key={index}
                                    className={`relative rounded-2xl border-2 ${pkg.borderColor} overflow-hidden ${pkg.featured ? 'ring-4 ring-slate-200' : ''}`}
                                >
                                    {pkg.featured && (
                                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-slate-600 to-slate-800 text-white text-center py-2 text-sm font-semibold">
                                            Recommandé
                                        </div>
                                    )}
                                    
                                    <div className={`p-8 ${pkg.featured ? 'pt-12' : ''}`}>
                                        {/* Header */}
                                        <div className="text-center mb-6">
                                            <h3 className={`text-2xl font-bold ${pkg.textColor} mb-2`}>{pkg.name}</h3>
                                            <div className="text-4xl font-bold text-gray-900">
                                                {pkg.price} <span className="text-lg font-normal text-gray-500">MAD</span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className={`${pkg.bgColor} rounded-xl p-4 mb-6`}>
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div>
                                                    <div className={`text-2xl font-bold ${pkg.textColor}`}>{pkg.standSize}</div>
                                                    <div className="text-xs text-gray-500">Stand</div>
                                                </div>
                                                <div>
                                                    <div className={`text-2xl font-bold ${pkg.textColor}`}>{pkg.badges}</div>
                                                    <div className="text-xs text-gray-500">Badges</div>
                                                </div>
                                                <div>
                                                    <div className={`text-2xl font-bold ${pkg.textColor}`}>{pkg.dejeuners}</div>
                                                    <div className="text-xs text-gray-500">Déjeuners</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Avantages */}
                                        <ul className="space-y-2 mb-6">
                                            {pkg.avantages.map((avantage, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <svg className={`w-4 h-4 ${pkg.textColor} mt-1 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">{avantage}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        <Link
                                            href="/contact"
                                            className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${pkg.color} text-white hover:shadow-lg`}
                                        >
                                            Nous contacter
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tableau Récapitulatif Avantages */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                            Avantages Associés
                        </h2>
                        
                        <div className="max-w-3xl mx-auto overflow-x-auto">
                            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                                <thead className="bg-gradient-to-r from-[#0a1628] to-[#1a365d] text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Sponsoring</th>
                                        <th className="px-6 py-4 text-center">Nombre de badges</th>
                                        <th className="px-6 py-4 text-center">Nombre de déjeuners</th>
                                        <th className="px-6 py-4 text-center">Saccoches du Congrès</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="bg-slate-50">
                                        <td className="px-6 py-4 font-semibold text-slate-700">Sponsor Platine</td>
                                        <td className="px-6 py-4 text-center">8</td>
                                        <td className="px-6 py-4 text-center">4</td>
                                        <td className="px-6 py-4 text-center">4</td>
                                    </tr>
                                    <tr className="bg-amber-50">
                                        <td className="px-6 py-4 font-semibold text-amber-700">Sponsor Or</td>
                                        <td className="px-6 py-4 text-center">5</td>
                                        <td className="px-6 py-4 text-center">2</td>
                                        <td className="px-6 py-4 text-center">2</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 font-semibold text-gray-600">Sponsor Argent</td>
                                        <td className="px-6 py-4 text-center">3</td>
                                        <td className="px-6 py-4 text-center">1</td>
                                        <td className="px-6 py-4 text-center">1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Autres Tarifs */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Autres Tarifs
                        </h2>

                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Tarifs d'inscription */}
                            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Tarifs d&apos;inscription</h3>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-2 text-left text-gray-600"></th>
                                            <th className="py-2 text-center text-sm text-gray-600">Avant le 30 mars 2026</th>
                                            <th className="py-2 text-center text-sm text-gray-600">Après le 30 mars 2026</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3 font-medium">Interne / résident</td>
                                            <td className="py-3 text-center text-teal-600 font-semibold">2 000 MAD</td>
                                            <td className="py-3 text-center">2 500 MAD</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-medium">Chirurgien</td>
                                            <td className="py-3 text-center text-teal-600 font-semibold">3 000 MAD</td>
                                            <td className="py-3 text-center">3 500 MAD</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Location de Stand */}
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Location de Stand</h3>
                                <p className="text-gray-600 mb-4">
                                    Location de Stand durant les deux jours de la manifestation
                                </p>
                                <div className="text-3xl font-bold text-orange-600">
                                    À partir de 30 000 MAD
                                </div>
                                <p className="text-sm text-gray-500 mt-2">(4m²), en fonction de la localisation et de la superficie</p>
                            </div>

                            {/* Sessions parrainées */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Sessions parrainées</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                                        <span className="font-medium">Organisation d&apos;un Atelier</span>
                                        <span className="text-purple-600 font-bold">40 000 MAD</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                                        <span className="font-medium">Organisation d&apos;un Symposium</span>
                                        <span className="text-purple-600 font-bold">50 000 MAD</span>
                                    </div>
                                </div>
                            </div>

                            {/* Prise en charge congressistes */}
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Prise en charge de congressistes</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    L&apos;inscription donne accès aux séances du congrès, aux pauses café et déjeuners.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Repas conjoint</span>
                                        <span className="font-semibold">400 MAD</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Dîner de clôture</span>
                                        <span className="font-semibold">700 MAD <span className="text-xs text-gray-400">(option)</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Marketing & Publicité */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Marketing & Publicité
                        </h2>

                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-gray-900">Logo sur le site web du congrès</h3>
                                    <span className="text-teal-600 font-bold whitespace-nowrap">10 000 MAD</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Insérer votre logo sur le site web du congrès avec lien vers votre site internet.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-gray-900">Emailing</h3>
                                    <span className="text-teal-600 font-bold whitespace-nowrap">10 000 MAD</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Envoyer un emailing personnalisé à tous les inscrits avant l&apos;ouverture du congrès.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-gray-900">Synopsis du programme</h3>
                                    <span className="text-teal-600 font-bold whitespace-nowrap">15 000 MAD</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Publicité exclusive sur la 2ème ou 3ème de couverture du synopsis du programme.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-gray-900">Stylos du congrès</h3>
                                    <span className="text-teal-600 font-bold whitespace-nowrap">10 000 MAD</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Personnalisez les stylos du congrès à vos couleurs (fournis par vos soins).
                                </p>
                            </div>
                        </div>

                        <div className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-[#0a1628] to-[#1a365d] rounded-2xl p-8 text-center text-white">
                            <h3 className="text-xl font-bold mb-4">Projet personnalisé ?</h3>
                            <p className="text-white/80 mb-6">
                                Vous avez un projet de partenariat qui ne fait pas partie de la liste ci-dessus ? 
                                N&apos;hésitez pas à nous en faire part pour que nous puissions étudier ensemble votre projet !
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-3 bg-white text-[#0a1628] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                Nous contacter
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Calendrier des Stands */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Calendrier des Stands
                        </h2>

                        <div className="max-w-3xl mx-auto">
                            <div className="space-y-6">
                                <div className="bg-blue-50 rounded-2xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Installation des stands</h3>
                                            <p className="text-blue-600 font-semibold">Jeudi 25 juin 2026</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-teal-50 rounded-2xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Horaires d&apos;ouverture de l&apos;exposition</h3>
                                            <p className="text-teal-600">Vendredi 26 juin 2026 : <span className="font-semibold">08h à 18h</span></p>
                                            <p className="text-teal-600">Samedi 27 juin 2026 : <span className="font-semibold">08h à 18h</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 rounded-2xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Démontage des stands</h3>
                                            <p className="text-orange-600 font-semibold">Samedi 27 juin 2026 à 18h</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 text-center mt-6 italic">
                                NB : Le planning de montage pourrait subir des modifications selon les besoins organisationnels du congrès
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-16 bg-gradient-to-r from-[#0a1628] to-[#1a365d]">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Devenez partenaire du Congrès SMCD 2026
                        </h2>
                        <p className="text-white/80 max-w-2xl mx-auto mb-8">
                            Rejoignez nos partenaires et bénéficiez d&apos;une visibilité exceptionnelle 
                            auprès de la communauté scientifique lors du Congrès National de Chirurgie Digestive.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0a1628] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                Nous Contacter
                            </Link>
                            <a
                                href="/documents/dossier-sponsoring.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                Télécharger le Dossier
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
