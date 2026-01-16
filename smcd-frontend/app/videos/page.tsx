'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Empty, Input, Select, Spin, Badge, Tag } from 'antd';
import { PlayCircleOutlined, VideoCameraOutlined, ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { publicAxios } from '@/lib/axios';
import { Room } from '@/types';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

export default function VideosPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const response = await publicAxios.get('/rooms');
            const roomsData = response.data || [];
            setRooms(roomsData);
            
            // Extraire les années uniques
            const uniqueYears = [...new Set(roomsData.map((r: Room) => r.annee))] as number[];
            uniqueYears.sort((a, b) => b - a);
            setYears(uniqueYears as number[]);
            
            // Sélectionner l'année la plus récente par défaut
            if (uniqueYears.length > 0 && !selectedYear) {
                setSelectedYear(uniqueYears[0] as number);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des salles:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = !searchTerm || 
            room.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = !selectedYear || room.annee === selectedYear;
        return matchesSearch && matchesYear;
    });

    const defaultColors = ['#1890ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1', '#13c2c2'];

    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                {/* Hero Section */}
                <section style={{ 
                    background: 'linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)',
                    padding: '80px 0',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
                        <VideoCameraOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                        <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
                            Galerie Vidéo
                        </Title>
                        <Paragraph style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 0 }}>
                            Accédez aux enregistrements des sessions du congrès, organisés par salles thématiques
                        </Paragraph>
                    </div>
                </section>

                {/* Filtres */}
                <section style={{ 
                    maxWidth: 1200, 
                    margin: '0 auto', 
                    padding: '32px 24px 16px',
                }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={12} md={8}>
                            <Input
                                placeholder="Rechercher une salle..."
                                prefix={<SearchOutlined />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                size="large"
                                allowClear
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Select
                                placeholder="Année"
                                value={selectedYear}
                                onChange={setSelectedYear}
                                style={{ width: '100%' }}
                                size="large"
                                allowClear
                            >
                                {years.map(year => (
                                    <Select.Option key={year} value={year}>
                                        Congrès {year}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={10}>
                            <Text type="secondary">
                                {filteredRooms.length} salle{filteredRooms.length > 1 ? 's' : ''} disponible{filteredRooms.length > 1 ? 's' : ''}
                            </Text>
                        </Col>
                    </Row>
                </section>

                {/* Liste des salles */}
                <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px 64px' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <Spin size="large" />
                            <div style={{ marginTop: 16 }}>
                                <Text type="secondary">Chargement des salles...</Text>
                            </div>
                        </div>
                    ) : filteredRooms.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                searchTerm || selectedYear
                                    ? "Aucune salle ne correspond à votre recherche"
                                    : "Aucune salle disponible pour le moment"
                            }
                            style={{ padding: '80px 0' }}
                        />
                    ) : (
                        <Row gutter={[24, 24]}>
                            {filteredRooms.map((room, index) => (
                                <Col xs={24} sm={12} lg={8} key={room.id}>
                                    <Link href={`/videos/${room.slug}`} style={{ display: 'block' }}>
                                        <Badge.Ribbon 
                                            text={`${room.annee}`} 
                                            color={room.couleur || defaultColors[index % defaultColors.length]}
                                        >
                                            <Card
                                                hoverable
                                                cover={
                                                    room.imageUrl ? (
                                                        <div style={{
                                                            height: 180,
                                                            background: `url(${room.imageUrl}) center/cover`,
                                                            position: 'relative'
                                                        }}>
                                                            <div style={{
                                                                position: 'absolute',
                                                                inset: 0,
                                                                background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))',
                                                                display: 'flex',
                                                                alignItems: 'flex-end',
                                                                padding: 16
                                                            }}>
                                                                <PlayCircleOutlined style={{ 
                                                                    fontSize: 48, 
                                                                    color: 'white',
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    opacity: 0.9
                                                                }} />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div style={{
                                                            height: 180,
                                                            background: `linear-gradient(135deg, ${room.couleur || defaultColors[index % defaultColors.length]} 0%, ${room.couleur || defaultColors[index % defaultColors.length]}99 100%)`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <VideoCameraOutlined style={{ fontSize: 64, color: 'white', opacity: 0.9 }} />
                                                        </div>
                                                    )
                                                }
                                                styles={{ body: { padding: '16px 20px' } }}
                                            >
                                                <Meta
                                                    title={
                                                        <Text strong style={{ fontSize: 16 }}>
                                                            {room.nom}
                                                        </Text>
                                                    }
                                                    description={
                                                        <div>
                                                            {room.descriptionCourte && (
                                                                <Paragraph 
                                                                    type="secondary" 
                                                                    ellipsis={{ rows: 2 }}
                                                                    style={{ marginBottom: 12 }}
                                                                >
                                                                    {room.descriptionCourte}
                                                                </Paragraph>
                                                            )}
                                                            <div style={{ 
                                                                display: 'flex', 
                                                                gap: 16,
                                                                flexWrap: 'wrap'
                                                            }}>
                                                                {room.nombreChapitres !== undefined && (
                                                                    <Tag icon={<VideoCameraOutlined />}>
                                                                        {room.nombreChapitres} session{room.nombreChapitres > 1 ? 's' : ''}
                                                                    </Tag>
                                                                )}
                                                                {room.nombreVideos !== undefined && (
                                                                    <Tag icon={<PlayCircleOutlined />}>
                                                                        {room.nombreVideos} vidéo{room.nombreVideos > 1 ? 's' : ''}
                                                                    </Tag>
                                                                )}
                                                                {room.dureeTotale && (
                                                                    <Tag icon={<ClockCircleOutlined />}>
                                                                        {room.dureeTotale}
                                                                    </Tag>
                                                                )}
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </Card>
                                        </Badge.Ribbon>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
