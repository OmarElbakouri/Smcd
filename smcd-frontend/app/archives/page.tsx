'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, Row, Col, Typography, Spin, Empty, Tag, Button, Statistic } from 'antd';
import { HistoryOutlined, CalendarOutlined, EnvironmentOutlined, TeamOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axiosInstance from '@/lib/axios';
import type { Archive } from '@/types';

const { Title, Text, Paragraph } = Typography;

export default function ArchivesPage() {
    const [archives, setArchives] = useState<Archive[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArchives();
    }, []);

    const fetchArchives = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<Archive[]>('/archives');
            setArchives(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des archives', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-purple-800 to-indigo-600 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Title level={1} className="!text-white !mb-4">
                            <HistoryOutlined className="mr-3" />
                            Archives des Congrès
                        </Title>
                        <Paragraph className="text-white/90 text-lg max-w-2xl mx-auto">
                            Retrouvez l&apos;historique des éditions précédentes du Congrès National
                            de Chirurgie Digestive de la SMCD.
                        </Paragraph>
                    </div>
                </section>

                {/* Timeline */}
                <section className="py-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                            <div className="text-center py-12">
                                <Spin size="large" />
                            </div>
                        ) : archives.length === 0 ? (
                            <Empty
                                description="Aucune archive disponible"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        ) : (
                            <div className="relative">
                                {/* Ligne verticale */}
                                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500" />

                                {archives.map((archive, index) => (
                                    <div
                                        key={archive.id}
                                        className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Point sur la timeline */}
                                        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                {archive.annee}
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className={`w-full md:w-1/2 pl-28 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                            }`}>
                                            <Card
                                                className="shadow-lg hover:shadow-xl transition-all duration-300"
                                                cover={
                                                    archive.imageUrl ? (
                                                        <div className="relative h-48">
                                                            <Image
                                                                src={archive.imageUrl}
                                                                alt={`Congrès SMCD ${archive.annee}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : null
                                                }
                                            >
                                                {/* Thème */}
                                                {archive.theme && (
                                                    <Title level={4} className="!mb-2 text-purple-700">
                                                        {archive.theme}
                                                    </Title>
                                                )}

                                                {/* Infos */}
                                                <div className="space-y-2 mb-4">
                                                    {archive.lieu && (
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <EnvironmentOutlined className="text-purple-500" />
                                                            <Text>{archive.lieu}</Text>
                                                        </div>
                                                    )}
                                                    {archive.dateDebut && (
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <CalendarOutlined className="text-purple-500" />
                                                            <Text>
                                                                {formatDate(archive.dateDebut)}
                                                                {archive.dateFin && ` - ${formatDate(archive.dateFin)}`}
                                                            </Text>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Chiffres clés */}
                                                <Row gutter={16} className="mb-4">
                                                    {archive.nombreParticipants && (
                                                        <Col span={12}>
                                                            <Statistic
                                                                title="Participants"
                                                                value={archive.nombreParticipants}
                                                                prefix={<TeamOutlined />}
                                                                styles={{ content: { fontSize: 18 } }}
                                                            />
                                                        </Col>
                                                    )}
                                                    {archive.nombreAbstracts && (
                                                        <Col span={12}>
                                                            <Statistic
                                                                title="Abstracts"
                                                                value={archive.nombreAbstracts}
                                                                prefix={<FileTextOutlined />}
                                                                styles={{ content: { fontSize: 18 } }}
                                                            />
                                                        </Col>
                                                    )}
                                                </Row>

                                                {/* Description */}
                                                {archive.description && (
                                                    <Paragraph
                                                        ellipsis={{ rows: 3 }}
                                                        className="text-gray-600"
                                                    >
                                                        {archive.description}
                                                    </Paragraph>
                                                )}

                                                {/* Lien externe */}
                                                {archive.urlExterne && (
                                                    <Button
                                                        type="link"
                                                        icon={<LinkOutlined />}
                                                        href={archive.urlExterne}
                                                        target="_blank"
                                                        className="p-0"
                                                    >
                                                        Voir l&apos;ancien site
                                                    </Button>
                                                )}
                                            </Card>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
