'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Row, Col, Card, Typography, Empty, Spin, Breadcrumb, Tag, Divider, Avatar, Timeline } from 'antd';
import { 
    HomeOutlined, 
    VideoCameraOutlined, 
    PlayCircleOutlined, 
    ClockCircleOutlined,
    UserOutlined,
    CalendarOutlined,
    RightOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { publicAxios } from '@/lib/axios';
import { Room, Chapter } from '@/types';

const { Title, Text, Paragraph } = Typography;

export default function RoomDetailPage() {
    const params = useParams();
    const roomSlug = params.roomSlug as string;
    
    const [room, setRoom] = useState<Room | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (roomSlug) {
            fetchRoomAndChapters();
        }
    }, [roomSlug]);

    const fetchRoomAndChapters = async () => {
        try {
            setLoading(true);
            // Récupérer la room avec ses chapitres
            const response = await publicAxios.get(`/rooms/${roomSlug}/chapters`);
            const data = response.data;
            
            if (data.room) {
                setRoom(data.room);
                setChapters(data.chapters || []);
            } else {
                // Si la structure est différente
                setRoom(data);
                if (data.chapters) {
                    setChapters(data.chapters);
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la salle:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { 
            weekday: 'long',
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    if (loading) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                    <div style={{ textAlign: 'center', padding: '120px 0' }}>
                        <Spin size="large" />
                        <div style={{ marginTop: 16 }}>
                            <Text type="secondary">Chargement de la salle...</Text>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!room) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', background: '#f5f5f5', padding: '80px 24px' }}>
                    <Empty description="Salle non trouvée" />
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                {/* Hero Section */}
                <section style={{ 
                    background: room.imageUrl 
                        ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${room.imageUrl}) center/cover`
                        : `linear-gradient(135deg, ${room.couleur || '#1a365d'} 0%, ${room.couleur || '#1a365d'}99 100%)`,
                    padding: '60px 0 80px',
                    color: 'white'
                }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                        {/* Breadcrumb */}
                        <Breadcrumb
                            style={{ marginBottom: 24 }}
                            items={[
                                { 
                                    href: '/', 
                                    title: <><HomeOutlined style={{ color: 'rgba(255,255,255,0.7)' }} /> <span style={{ color: 'rgba(255,255,255,0.7)' }}>Accueil</span></> 
                                },
                                { 
                                    href: '/videos', 
                                    title: <span style={{ color: 'rgba(255,255,255,0.7)' }}>Vidéos</span> 
                                },
                                { 
                                    title: <span style={{ color: 'white' }}>{room.nom}</span> 
                                }
                            ]}
                        />
                        
                        <Row gutter={[32, 24]} align="middle">
                            <Col xs={24} md={16}>
                                <Tag color={room.couleur || 'blue'} style={{ marginBottom: 12 }}>
                                    Congrès {room.annee}
                                </Tag>
                                <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
                                    {room.nom}
                                </Title>
                                {room.description && (
                                    <Paragraph style={{ 
                                        fontSize: 16, 
                                        color: 'rgba(255,255,255,0.85)',
                                        marginBottom: 0,
                                        maxWidth: 700
                                    }}>
                                        {room.description}
                                    </Paragraph>
                                )}
                            </Col>
                            <Col xs={24} md={8}>
                                <Card style={{ background: 'rgba(255,255,255,0.1)', border: 'none' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <VideoCameraOutlined style={{ fontSize: 20, color: 'white' }} />
                                            <Text style={{ color: 'white' }}>
                                                {chapters.length} session{chapters.length > 1 ? 's' : ''}
                                            </Text>
                                        </div>
                                        {room.nombreVideos !== undefined && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <PlayCircleOutlined style={{ fontSize: 20, color: 'white' }} />
                                                <Text style={{ color: 'white' }}>
                                                    {room.nombreVideos} vidéo{room.nombreVideos > 1 ? 's' : ''}
                                                </Text>
                                            </div>
                                        )}
                                        {room.dureeTotale && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <ClockCircleOutlined style={{ fontSize: 20, color: 'white' }} />
                                                <Text style={{ color: 'white' }}>
                                                    {room.dureeTotale} de contenu
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Liste des chapitres */}
                <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 64px' }}>
                    <Title level={3} style={{ marginBottom: 32 }}>
                        Sessions de la salle
                    </Title>
                    
                    {chapters.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Aucune session disponible pour le moment"
                            style={{ padding: '60px 0' }}
                        />
                    ) : (
                        <Row gutter={[24, 24]}>
                            {chapters.map((chapter) => (
                                <Col xs={24} key={chapter.id}>
                                    <Link 
                                        href={`/videos/${roomSlug}/${chapter.slug}`} 
                                        style={{ display: 'block' }}
                                    >
                                        <Card 
                                            hoverable
                                            styles={{ body: { padding: 0 } }}
                                        >
                                            <Row>
                                                <Col xs={24} md={4}>
                                                    <div style={{
                                                        height: '100%',
                                                        minHeight: 120,
                                                        background: `linear-gradient(135deg, ${room.couleur || '#1890ff'} 0%, ${room.couleur || '#1890ff'}cc 100%)`,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: 16
                                                    }}>
                                                        <VideoCameraOutlined style={{ fontSize: 32, color: 'white', marginBottom: 8 }} />
                                                        {chapter.nombreVideos !== undefined && (
                                                            <Text style={{ color: 'white', fontWeight: 500 }}>
                                                                {chapter.nombreVideos} vidéo{chapter.nombreVideos > 1 ? 's' : ''}
                                                            </Text>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col xs={24} md={20}>
                                                    <div style={{ padding: '20px 24px' }}>
                                                        <div style={{ 
                                                            display: 'flex', 
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start',
                                                            marginBottom: 12
                                                        }}>
                                                            <div>
                                                                <Title level={4} style={{ marginBottom: 4 }}>
                                                                    {chapter.titre}
                                                                </Title>
                                                                {chapter.description && (
                                                                    <Paragraph 
                                                                        type="secondary" 
                                                                        ellipsis={{ rows: 2 }}
                                                                        style={{ marginBottom: 12, maxWidth: 600 }}
                                                                    >
                                                                        {chapter.description}
                                                                    </Paragraph>
                                                                )}
                                                            </div>
                                                            <RightOutlined style={{ color: '#1890ff', fontSize: 18 }} />
                                                        </div>
                                                        
                                                        <div style={{ 
                                                            display: 'flex', 
                                                            gap: 16,
                                                            flexWrap: 'wrap',
                                                            alignItems: 'center'
                                                        }}>
                                                            {chapter.moderateur && (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                                    <Avatar size="small" icon={<UserOutlined />} />
                                                                    <Text type="secondary">
                                                                        {chapter.moderateur}
                                                                    </Text>
                                                                </div>
                                                            )}
                                                            {chapter.dateSession && (
                                                                <Tag icon={<CalendarOutlined />}>
                                                                    {formatDate(chapter.dateSession)}
                                                                </Tag>
                                                            )}
                                                            {chapter.horaireSession && (
                                                                <Tag icon={<ClockCircleOutlined />}>
                                                                    {chapter.horaireSession}
                                                                </Tag>
                                                            )}
                                                            {chapter.dureeTotale && (
                                                                <Tag>
                                                                    Durée: {chapter.dureeTotale}
                                                                </Tag>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card>
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
