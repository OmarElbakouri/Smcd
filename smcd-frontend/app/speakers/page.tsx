'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    Select,
    Input,
    Empty,
    Spin,
    Tag,
    Typography,
    Row,
    Col,
    Badge,
    Avatar,
    message,
} from 'antd';
import {
    UserOutlined,
    GlobalOutlined,
    SearchOutlined,
    StarFilled,
    LinkedinOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import api from '@/lib/axios';
import { type SpeakerPublic, type SpeakerFilterOptions } from '@/types';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

export default function SpeakersGalleryPage() {
    const [speakers, setSpeakers] = useState<SpeakerPublic[]>([]);
    const [featuredSpeakers, setFeaturedSpeakers] = useState<SpeakerPublic[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<SpeakerFilterOptions | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPays, setSelectedPays] = useState<string | null>(null);
    const [selectedSpecialite, setSelectedSpecialite] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [speakersRes, featuredRes, filtersRes] = await Promise.all([
                api.get('/speakers?annee=2026'),
                api.get('/speakers?annee=2026&featured=true'),
                api.get('/speakers/filters'),
            ]);

            setSpeakers(speakersRes.data);
            setFeaturedSpeakers(featuredRes.data);
            setFilters(filtersRes.data);
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Erreur lors du chargement des invités');
        } finally {
            setLoading(false);
        }
    };

    const filteredSpeakers = speakers.filter((speaker) => {
        // Exclure les featured de la liste générale
        if (speaker.featured) return false;

        // Filtre recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchSearch =
                speaker.nom.toLowerCase().includes(term) ||
                speaker.prenom.toLowerCase().includes(term) ||
                speaker.specialite?.toLowerCase().includes(term) ||
                speaker.institution?.toLowerCase().includes(term);
            if (!matchSearch) return false;
        }

        // Filtre pays
        if (selectedPays && speaker.pays !== selectedPays) return false;

        // Filtre spécialité
        if (selectedSpecialite && !speaker.specialite?.includes(selectedSpecialite)) return false;

        return true;
    });

    const SpeakerCard = ({ speaker, featured = false }: { speaker: SpeakerPublic; featured?: boolean }) => (
        <Link href={`/speakers/${speaker.id}`}>
            <Card
                className={`h-full hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 ${featured ? 'border-2 border-yellow-400' : ''
                    }`}
                cover={
                    <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
                        <img
                            src={speaker.photoUrl || '/placeholder-speaker.jpg'}
                            alt={speaker.nomComplet}
                            className="w-full h-full object-cover"
                        />
                        {featured && (
                            <div className="absolute top-2 right-2">
                                <Tag color="gold" icon={<StarFilled />}>
                                    Invité d'honneur
                                </Tag>
                            </div>
                        )}
                    </div>
                }
            >
                <Card.Meta
                    title={
                        <div className="text-center">
                            <Text strong className={featured ? 'text-lg' : ''}>
                                {speaker.nomComplet}
                            </Text>
                        </div>
                    }
                    description={
                        <div className="text-center space-y-2">
                            {speaker.specialite && (
                                <Text className="text-blue-600 block">
                                    {speaker.specialite}
                                </Text>
                            )}
                            {speaker.institution && (
                                <Text className="text-gray-500 text-sm block line-clamp-2">
                                    {speaker.institution}
                                </Text>
                            )}
                            {speaker.pays && (
                                <div className="flex items-center justify-center gap-1 text-gray-400">
                                    <GlobalOutlined />
                                    <span>{speaker.localisation || speaker.pays}</span>
                                </div>
                            )}
                            <div className="flex justify-center gap-2 mt-2">
                                {speaker.linkedinUrl && (
                                    <LinkedinOutlined className="text-blue-500" />
                                )}
                                {speaker.cvUrl && (
                                    <Tag color="green" className="text-xs">CV disponible</Tag>
                                )}
                            </div>
                        </div>
                    }
                />
            </Card>
        </Link>
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
                            <UserOutlined className="mr-3" />
                            Invités & Conférenciers
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Découvrez les experts qui interviennent au Congrès SMCD 2026
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Intervenants</span>
                        </div>
                    </div>
                </section>

                <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {loading ? (
                        <div className="text-center py-12">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            {/* Invités d'honneur */}
                            {featuredSpeakers.length > 0 && (
                                <div className="mb-12">
                                    <div className="text-center mb-6">
                                        <Title level={3} className="text-yellow-600">
                                            <StarFilled className="mr-2" />
                                            Invités d&apos;Honneur
                                        </Title>
                                    </div>
                                    <Row gutter={[24, 24]} justify="center">
                                        {featuredSpeakers.map((speaker) => (
                                            <Col xs={24} sm={12} md={8} lg={6} key={speaker.id}>
                                                <SpeakerCard speaker={speaker} featured />
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            )}

                            {/* Filtres */}
                            <Card className="mb-6">
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Search
                                        placeholder="Rechercher un conférencier..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ width: 300 }}
                                        allowClear
                                    />

                                    {filters && (
                                        <>
                                            <Select
                                                value={selectedPays}
                                                onChange={setSelectedPays}
                                                style={{ width: 180 }}
                                                placeholder="Tous les pays"
                                                allowClear
                                                options={filters.pays.map((p) => ({ value: p, label: p }))}
                                            />

                                            <Select
                                                value={selectedSpecialite}
                                                onChange={setSelectedSpecialite}
                                                style={{ width: 250 }}
                                                placeholder="Toutes les spécialités"
                                                allowClear
                                                options={filters.specialites.map((s) => ({ value: s, label: s }))}
                                            />
                                        </>
                                    )}
                                </div>
                            </Card>

                            {/* Tous les conférenciers */}
                            <div className="mb-4">
                                <Title level={4}>Tous les Conférenciers</Title>
                                <Text className="text-gray-600">
                                    {filteredSpeakers.length} conférencier(s)
                                </Text>
                            </div>

                            {filteredSpeakers.length === 0 ? (
                                <Empty description="Aucun conférencier trouvé" />
                            ) : (
                                <Row gutter={[24, 24]}>
                                    {filteredSpeakers.map((speaker) => (
                                        <Col xs={24} sm={12} md={8} lg={6} key={speaker.id}>
                                            <SpeakerCard speaker={speaker} />
                                        </Col>
                                    ))}
                                </Row>
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
