'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ArchivesVideosPage() {
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
                            Vidéos Archives
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Vidéos Archives</span>
                        </div>
                    </div>
                </section>

                {/* Contenu */}
                <section className="py-12">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-600 text-lg">
                            Les vidéos d&apos;archives seront bientôt disponibles.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
