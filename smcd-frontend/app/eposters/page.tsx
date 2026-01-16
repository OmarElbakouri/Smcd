'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Empty,
    Spin,
    Tag,
    Typography,
    Row,
    Col,
    Pagination,
    message,
} from 'antd';
import {
    FileOutlined,
    DownloadOutlined,
    SearchOutlined,
    FilterOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import api from '@/lib/axios';
import { RUBRIQUE_LABELS, type EPosterPublic, type Rubrique } from '@/types';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const ITEMS_PER_PAGE = 12;

export default function EPostersGalleryPage() {
    const [ePosters, setEPosters] = useState<EPosterPublic[]>([]);
    const [filteredEPosters, setFilteredEPosters] = useState<EPosterPublic[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState<number | null>(2026);
    const [selectedRubrique, setSelectedRubrique] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>('recent');
    const [currentPage, setCurrentPage] = useState(1);

    const years = [2026, 2025, 2024];
    const rubriquesOptions = [
        { value: '', label: 'Toutes les rubriques' },
        ...Object.entries(RUBRIQUE_LABELS).map(([value, label]) => ({ value, label })),
    ];

    useEffect(() => {
        fetchEPosters();
    }, [selectedYear, selectedRubrique]);

    useEffect(() => {
        filterAndSortEPosters();
    }, [ePosters, searchTerm, sortBy]);

    const fetchEPosters = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedYear) params.append('annee', selectedYear.toString());
            if (selectedRubrique) params.append('rubrique', selectedRubrique);

            const response = await api.get(`/eposters/public?${params.toString()}`);
            setEPosters(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des e-posters:', error);
            message.error('Erreur lors du chargement des e-posters');
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortEPosters = () => {
        let filtered = [...ePosters];

        // Recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (ep) =>
                    ep.titre.toLowerCase().includes(term) ||
                    ep.nomCompletAuteur.toLowerCase().includes(term)
            );
        }

        // Tri
        switch (sortBy) {
            case 'recent':
                filtered.sort((a, b) => new Date(b.dateUpload).getTime() - new Date(a.dateUpload).getTime());
                break;
            case 'downloads':
                filtered.sort((a, b) => b.nombreTelechargements - a.nombreTelechargements);
                break;
            case 'alpha':
                filtered.sort((a, b) => a.titre.localeCompare(b.titre));
                break;
        }

        setFilteredEPosters(filtered);
        setCurrentPage(1);
    };

    const handleDownload = async (ePoster: EPosterPublic) => {
        try {
            // Utiliser l'endpoint de téléchargement qui gère le nom du fichier
            const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/eposters/${ePoster.id}/download`;
            window.open(downloadUrl, '_blank');
            
            // Mettre à jour localement
            setEPosters(prev =>
                prev.map(ep =>
                    ep.id === ePoster.id
                        ? { ...ep, nombreTelechargements: ep.nombreTelechargements + 1 }
                        : ep
                )
            );
        } catch (error) {
            console.error('Erreur:', error);
            // Fallback: ouvrir directement l'URL Cloudinary
            window.open(ePoster.fichierUrl, '_blank');
        }
    };

    const paginatedEPosters = filteredEPosters.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

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
                            <FileOutlined className="mr-3" />
                            Galerie des E-Posters
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Consultez et téléchargez les présentations des participants au Congrès SMCD
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>E-Posters</span>
                        </div>
                        <Link href="/eposters/upload">
                            <Button type="primary" icon={<UploadOutlined />} size="large" className="mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 border-none">
                                Soumettre un E-Poster
                            </Button>
                        </Link>
                    </div>
                </section>

                <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Filtres */}
                    <Card className="mb-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <FilterOutlined />
                                <Text strong>Filtres :</Text>
                            </div>

                            <Select
                                value={selectedYear}
                                onChange={setSelectedYear}
                                style={{ width: 120 }}
                                options={years.map((y) => ({ value: y, label: y.toString() }))}
                                placeholder="Année"
                                allowClear
                            />

                            <Select
                                value={selectedRubrique}
                                onChange={setSelectedRubrique}
                                style={{ width: 250 }}
                                options={rubriquesOptions}
                                placeholder="Rubrique"
                                allowClear
                            />

                            <Select
                                value={sortBy}
                                onChange={setSortBy}
                                style={{ width: 180 }}
                                options={[
                                    { value: 'recent', label: 'Plus récents' },
                                    { value: 'downloads', label: 'Plus téléchargés' },
                                    { value: 'alpha', label: 'Alphabétique' },
                                ]}
                            />

                            <Search
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: 250 }}
                                allowClear
                            />
                        </div>
                    </Card>

                    {/* Résultats */}
                    <div className="mb-4">
                        <Text className="text-gray-600">
                            {filteredEPosters.length} e-poster(s) trouvé(s)
                        </Text>
                    </div>

                    {/* Grille */}
                    {loading ? (
                        <div className="text-center py-12">
                            <Spin size="large" />
                        </div>
                    ) : filteredEPosters.length === 0 ? (
                        <Empty description="Aucun e-poster trouvé" />
                    ) : (
                        <>
                            <Row gutter={[24, 24]}>
                                {paginatedEPosters.map((ePoster) => (
                                    <Col xs={24} sm={12} lg={8} xl={6} key={ePoster.id}>
                                        <Card
                                            className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                                            cover={
                                                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 h-32 flex items-center justify-center">
                                                    <FileOutlined className="text-5xl text-white" />
                                                </div>
                                            }
                                            actions={[
                                                <Button
                                                    key="download"
                                                    type="primary"
                                                    icon={<DownloadOutlined />}
                                                    onClick={() => handleDownload(ePoster)}
                                                >
                                                    Télécharger
                                                </Button>,
                                            ]}
                                        >
                                            <Card.Meta
                                                title={
                                                    <Text
                                                        className="line-clamp-2"
                                                        title={ePoster.titre}
                                                    >
                                                        {ePoster.titre}
                                                    </Text>
                                                }
                                                description={
                                                    <div className="space-y-2">
                                                        <Text className="text-gray-600 block">
                                                            {ePoster.nomCompletAuteur}
                                                        </Text>
                                                        {ePoster.rubriqueLabel && (
                                                            <Tag color="blue">
                                                                {ePoster.rubriqueLabel}
                                                            </Tag>
                                                        )}
                                                        <div className="flex justify-between text-xs text-gray-400">
                                                            <span>{ePoster.dateUpload}</span>
                                                            <span>
                                                                <DownloadOutlined /> {ePoster.nombreTelechargements}
                                                            </span>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {/* Pagination */}
                            {filteredEPosters.length > ITEMS_PER_PAGE && (
                                <div className="mt-8 text-center">
                                    <Pagination
                                        current={currentPage}
                                        total={filteredEPosters.length}
                                        pageSize={ITEMS_PER_PAGE}
                                        onChange={setCurrentPage}
                                        showSizeChanger={false}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
