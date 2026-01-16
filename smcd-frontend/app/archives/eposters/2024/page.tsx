'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axiosInstance from '@/lib/axios';
import { FileOutlined } from '@ant-design/icons';

interface EPoster {
    id: number;
    titre: string;
    nomCompletAuteur: string;
    fichierUrl: string;
    dateUpload: string;
    nombreTelechargements: number;
}

export default function ArchivesEPosters2024Page() {
    const [eposters, setEposters] = useState<EPoster[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEPosters();
    }, []);

    const fetchEPosters = async () => {
        try {
            const response = await axiosInstance.get('/eposters/public?annee=2024');
            setEposters(response.data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (eposter: EPoster) => {
        window.open(eposter.fichierUrl, '_blank');
        setEposters(prev =>
            prev.map(ep =>
                ep.id === eposter.id
                    ? { ...ep, nombreTelechargements: ep.nombreTelechargements + 1 }
                    : ep
            )
        );
    };

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
                            PowerPoint Presentations
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>PowerPoint Presentations 2024</span>
                        </div>
                    </div>
                </section>

                {/* Tableau des E-Posters */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : eposters.length === 0 ? (
                            <div className="text-center py-20">
                                <FileOutlined className="text-6xl text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">Aucun e-poster disponible pour 2024</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto shadow-lg rounded-lg">
                                <table className="w-full bg-white">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Name</th>
                                            <th className="px-6 py-4 text-left font-semibold">Title</th>
                                            <th className="px-6 py-4 text-center font-semibold">Download</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eposters.map((eposter, index) => (
                                            <tr 
                                                key={eposter.id}
                                                className={`border-b hover:bg-gray-50 transition-colors ${
                                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                }`}
                                            >
                                                <td className="px-6 py-4 text-gray-800 font-medium">
                                                    {eposter.nomCompletAuteur}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {eposter.titre}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleDownload(eposter)}
                                                        className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                                    >
                                                        Download
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
