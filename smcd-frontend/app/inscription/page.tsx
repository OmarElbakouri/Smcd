'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateReservationPDF, generateReservationDOCX } from '@/lib/generateReservationForm';

export default function InscriptionPage() {
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
                        <div className="absolute bottom-20 right-[25%] w-2 h-2 bg-[#00D4AA]/20 rounded-full" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
                            Formules d&apos;inscriptions
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Congrès National de Chirurgie Digestive 2026 — Tarifs et Packs
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Inscription</span>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    INSCRIPTION - Tarifs simples
                    ============================================ */}
                <section className="py-12 md:py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8 md:mb-10">
                                <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest text-[#00D4AA] bg-[#00D4AA]/10 rounded-full">
                                    Tarifs
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Inscription au Congrès
                                </h2>
                            </div>

                            {/* Mobile: Card layout */}
                            <div className="block md:hidden space-y-4">
                                {/* Internes */}
                                <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
                                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Internes / résidents</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-[#00D4AA]/5 rounded-xl p-4 text-center border border-[#00D4AA]/20">
                                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Avant le 30 Mars</p>
                                            <p className="text-2xl font-bold text-[#00D4AA]">2 000 <span className="text-sm text-gray-500">DH</span></p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Après le 30 Mars</p>
                                            <p className="text-2xl font-bold text-gray-700">2 500 <span className="text-sm text-gray-500">DH</span></p>
                                        </div>
                                    </div>
                                </div>
                                {/* Chirurgiens */}
                                <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
                                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Chirurgiens</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-[#00D4AA]/5 rounded-xl p-4 text-center border border-[#00D4AA]/20">
                                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Avant le 30 Mars</p>
                                            <p className="text-2xl font-bold text-[#00D4AA]">3 000 <span className="text-sm text-gray-500">DH</span></p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Après le 30 Mars</p>
                                            <p className="text-2xl font-bold text-gray-700">3 500 <span className="text-sm text-gray-500">DH</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: Table layout */}
                            <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-[#0a1628] to-[#1a365d]">
                                            <th className="px-6 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider"></th>
                                            <th className="px-6 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">Avant le 30 Mars</th>
                                            <th className="px-6 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">Après le 30 Mars</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-gray-800">Internes / résidents</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-[#00D4AA]">2 000</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-gray-700">2 500</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-gray-800">Chirurgiens</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-[#00D4AA]">3 000</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-gray-700">3 500</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    FORMULE 2 NUITÉES
                    ============================================ */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-8 md:mb-10">
                                <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-100 rounded-full">
                                    Hébergement
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Formule 2 nuitées
                                </h2>
                            </div>

                            {/* Mobile: Card layout */}
                            <div className="block md:hidden space-y-4">
                                {/* Internes */}
                                <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-100">
                                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Internes / résidents</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 1</p>
                                            <p className="text-lg font-bold text-blue-700">5 000</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 2</p>
                                            <p className="text-lg font-bold text-blue-700">6 100</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 3</p>
                                            <p className="text-lg font-bold text-blue-700">8 000</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Chirurgiens */}
                                <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-100">
                                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Chirurgiens</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 1</p>
                                            <p className="text-lg font-bold text-blue-700">6 500</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 2</p>
                                            <p className="text-lg font-bold text-blue-700">7 100</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 3</p>
                                            <p className="text-lg font-bold text-blue-700">9 500</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: Table layout */}
                            <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-600 to-blue-800">
                                            <th className="px-6 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider"></th>
                                            <th className="px-6 py-5 text-center text-white font-semibold">
                                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
                                                    <span className="w-2 h-2 bg-[#00D4AA] rounded-full"></span>
                                                    PACK 1
                                                </div>
                                            </th>
                                            <th className="px-6 py-5 text-center text-white font-semibold">
                                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
                                                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                                    PACK 2
                                                </div>
                                            </th>
                                            <th className="px-6 py-5 text-center text-white font-semibold">
                                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
                                                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                                    PACK 3
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-gray-800">Internes / résidents</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-blue-700">5 000</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-blue-700">6 100</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-blue-700">8 000</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-gray-800">Chirurgiens</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-blue-700">6 500</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-blue-700">7 100</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-blue-700">9 500</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    FORMULE 3 NUITÉES
                    ============================================ */}
                <section className="py-12 md:py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-8 md:mb-10">
                                <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest text-purple-600 bg-purple-100 rounded-full">
                                    Hébergement
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Formule 3 nuitées
                                </h2>
                            </div>

                            {/* Mobile: Card layout */}
                            <div className="block md:hidden space-y-4">
                                {/* Internes */}
                                <div className="bg-white rounded-2xl shadow-lg p-5 border border-purple-100">
                                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Internes / résidents</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 1</p>
                                            <p className="text-lg font-bold text-purple-700">6 500</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 2</p>
                                            <p className="text-lg font-bold text-purple-700">7 600</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 3</p>
                                            <p className="text-lg font-bold text-purple-700">9 500</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Chirurgiens */}
                                <div className="bg-white rounded-2xl shadow-lg p-5 border border-purple-100">
                                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Chirurgiens</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 1</p>
                                            <p className="text-lg font-bold text-purple-700">7 500</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 2</p>
                                            <p className="text-lg font-bold text-purple-700">8 600</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                                            <p className="text-[10px] text-gray-500 mb-1 font-semibold uppercase">Pack 3</p>
                                            <p className="text-lg font-bold text-purple-700">11 000</p>
                                            <p className="text-[10px] text-gray-400">DH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: Table layout */}
                            <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-purple-600 to-purple-800">
                                            <th className="px-6 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider"></th>
                                            <th className="px-6 py-5 text-center text-white font-semibold">
                                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
                                                    <span className="w-2 h-2 bg-[#00D4AA] rounded-full"></span>
                                                    PACK 1
                                                </div>
                                            </th>
                                            <th className="px-6 py-5 text-center text-white font-semibold">
                                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
                                                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                                    PACK 2
                                                </div>
                                            </th>
                                            <th className="px-6 py-5 text-center text-white font-semibold">
                                                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
                                                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                                    PACK 3
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-gray-800">Internes / résidents</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-purple-700">6 500</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-purple-700">7 600</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-purple-700">9 500</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-purple-50/50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-gray-800">Chirurgiens</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-purple-700">7 500</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-purple-700">8 600</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xl font-bold text-purple-700">11 000</span>
                                                <span className="text-sm text-gray-500 ml-1">DH</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    DÉTAILS DES PACKS
                    ============================================ */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-10 md:mb-12">
                                <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest text-[#0A1628] bg-gray-100 rounded-full">
                                    Détails
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Contenu des Packs
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                {/* PACK 1 */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4AA] to-cyan-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                                    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#00D4AA] to-cyan-500 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">1</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">PACK 1</h3>
                                        </div>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-[#00D4AA] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Inscription</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-[#00D4AA] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Chambre single</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-[#00D4AA] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Pause-café &amp; déjeuner</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* PACK 2 */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                                    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">2</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">PACK 2</h3>
                                        </div>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Inscription</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Chambre double</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Pause-café &amp; déjeuner</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* PACK 3 */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                                    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">3</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">PACK 3</h3>
                                        </div>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">2 Inscriptions</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">2 médecins</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Chambre twin</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Pause-café &amp; déjeuner</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    MODALITÉS DE PAIEMENT
                    ============================================ */}
                <section className="py-12 md:py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-10 md:mb-12">
                                <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest text-teal-700 bg-teal-100 rounded-full">
                                    Paiement
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Modalités de Paiement
                                </h2>
                                <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
                                    Deux méthodes de paiement sont disponibles pour finaliser votre inscription.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {/* MÉTHODE 1 — Virement Bancaire */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                                    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 6l7-3 7 3" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 rounded-full mb-1">Méthode 1</span>
                                                <h3 className="text-lg md:text-xl font-bold text-gray-900">Virement Bancaire</h3>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                            Effectuez un virement bancaire sur le compte de la SMCD, puis envoyez une <strong className="text-gray-800">capture d&apos;écran du reçu de virement</strong> comme justificatif de paiement.
                                        </p>

                                        <div className="bg-gradient-to-br from-[#0a1628] to-[#1a365d] rounded-xl p-5 mt-auto">
                                            <p className="text-xs text-cyan-300/80 uppercase tracking-wider font-semibold mb-2">Compte bancaire SMCD</p>
                                            <p className="text-white font-mono text-lg md:text-xl font-bold tracking-wider mb-3">
                                                011 780 0000322000004185 50
                                            </p>
                                            <div className="border-t border-white/10 pt-3">
                                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Au nom de</p>
                                                <p className="text-white/90 font-semibold text-sm">
                                                    STE MAROCAINE DE CHIRURGIE DIGESTIVE
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-xs text-amber-800">
                                                N&apos;oubliez pas d&apos;envoyer la capture d&apos;écran du virement comme preuve de paiement.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* MÉTHODE 2 — Chèque */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                                    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 rounded-full mb-1">Méthode 2</span>
                                                <h3 className="text-lg md:text-xl font-bold text-gray-900">Chèque</h3>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                            Vous pouvez également régler votre inscription par chèque, à établir à l&apos;ordre de la Société Marocaine de Chirurgie Digestive.
                                        </p>

                                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 mt-auto">
                                            <p className="text-xs text-blue-200/80 uppercase tracking-wider font-semibold mb-2">Chèque à l&apos;ordre de</p>
                                            <p className="text-white font-semibold text-base md:text-lg leading-snug">
                                                SOCIÉTÉ MAROCAINE DE CHIRURGIE DIGESTIVE
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-xs text-blue-800">
                                                Déposer le chèque auprès de la trésorerie
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    PRISE EN CHARGE DE CONGRESSISTES
                    ============================================ */}
                <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-teal-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                    Prise en charge de congressistes
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">
                                    L&apos;inscription donne accès aux séances du congrès, aux pauses café et déjeuners.
                                </p>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-center justify-between p-4 md:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 font-medium text-base md:text-lg">Repas conjoint</span>
                                        </div>
                                        <span className="text-lg md:text-xl font-bold text-[#0A1628] whitespace-nowrap ml-3">400 <span className="text-xs md:text-sm font-semibold text-gray-500">MAD</span></span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 md:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 md:w-5 md:h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 font-medium text-base md:text-lg">Dîner de clôture</span>
                                        </div>
                                        <div className="text-right ml-3">
                                            <span className="text-lg md:text-xl font-bold text-[#0A1628] whitespace-nowrap">700 <span className="text-xs md:text-sm font-semibold text-gray-500">MAD</span></span>
                                            <span className="block text-xs text-gray-400 mt-0.5">(option)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    FORMULAIRE DE RÉSERVATION
                    ============================================ */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-md mx-auto">
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Formulaire de Réservation</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-5">
                                    Téléchargez le formulaire de réservation au format de votre choix.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => generateReservationDOCX()}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0A1628] text-white rounded-xl text-sm font-medium hover:bg-[#1a2d4a] transition-colors cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        DOC
                                    </button>
                                    <button
                                        onClick={() => generateReservationPDF()}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        PDF
                                    </button>
                                </div>
                                <p className="text-xs md:text-sm text-gray-600 mt-5 pt-5 border-t border-gray-200 text-center">
                                    Nous vous prions de confirmer votre inscription dans les meilleurs délais, compte tenu du nombre limité de places d&apos;hébergement disponibles.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    CTA FINAL
                    ============================================ */}
                <section className="py-12 md:py-16 bg-gradient-to-r from-[#0a1628] to-[#1a365d]">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Inscrivez-vous au Congrès SMCD 2026
                        </h2>
                        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-sm md:text-base">
                            Rejoignez-nous à Casablanca pour le Congrès National de Chirurgie Digestive.
                            Pour toute question, n&apos;hésitez pas à nous contacter.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0a1628] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                        >
                            Nous Contacter
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
