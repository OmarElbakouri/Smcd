'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Row, Col, Card, Typography, Empty, Spin, Breadcrumb, Tag, Avatar, List, Input } from 'antd';
import { 
    HomeOutlined, 
    VideoCameraOutlined, 
    PlayCircleOutlined, 
    ClockCircleOutlined,
    UserOutlined,
    CalendarOutlined,
    EyeOutlined,
    SearchOutlined,
    LockOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { publicAxios } from '@/lib/axios';
import { Room, Chapter, Video, VISIBILITE_LABELS, VISIBILITE_COLORS } from '@/types';

const { Title, Text, Paragraph } = Typography;

export default function ChapterDetailPage() {
    const params = useParams();
    const roomSlug = params.roomSlug as string;
    const chapterSlug = params.chapterSlug as string;
    
    const [room, setRoom] = useState<Room | null>(null);
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (roomSlug && chapterSlug) {
            fetchChapterAndVideos();
        }
    }, [roomSlug, chapterSlug]);

    const fetchChapterAndVideos = async () => {
        try {
            setLoading(true);
            // Récupérer le chapitre avec ses vidéos
            const response = await publicAxios.get(`/chapters/${chapterSlug}/videos`);
            const data = response.data;
            
            if (data.chapter) {
                setChapter(data.chapter);
                setVideos(data.videos || []);
                // Essayer de récupérer la room
                if (data.room) {
                    setRoom(data.room);
                }
            } else {
                setChapter(data);
                if (data.videos) {
                    setVideos(data.videos);
                }
            }
            
            // Si pas de room, la récupérer séparément
            if (!room && roomSlug) {
                try {
                    const roomResponse = await publicAxios.get(`/rooms/${roomSlug}`);
                    setRoom(roomResponse.data);
                } catch (e) {
                    console.log('Room info not available');
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement du chapitre:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) {
            return `${h}h${m.toString().padStart(2, '0')}min`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const filteredVideos = videos.filter(video => 
        !searchTerm || 
        video.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.intervenant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                    <div style={{ textAlign: 'center', padding: '120px 0' }}>
                        <Spin size="large" />
                        <div style={{ marginTop: 16 }}>
                            <Text type="secondary">Chargement de la session...</Text>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!chapter) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', background: '#f5f5f5', padding: '80px 24px' }}>
                    <Empty description="Session non trouvée" />
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
                    background: `linear-gradient(135deg, ${room?.couleur || '#1a365d'} 0%, ${room?.couleur || '#1a365d'}cc 100%)`,
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
                                    href: `/videos/${roomSlug}`, 
                                    title: <span style={{ color: 'rgba(255,255,255,0.7)' }}>{room?.nom || 'Salle'}</span> 
                                },
                                { 
                                    title: <span style={{ color: 'white' }}>{chapter.titre}</span> 
                                }
                            ]}
                        />
                        
                        <Row gutter={[32, 24]} align="middle">
                            <Col xs={24} md={16}>
                                {room && (
                                    <Tag color="white" style={{ 
                                        marginBottom: 12, 
                                        color: room.couleur || '#1a365d',
                                        fontWeight: 500
                                    }}>
                                        {room.nom}
                                    </Tag>
                                )}
                                <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
                                    {chapter.titre}
                                </Title>
                                {chapter.description && (
                                    <Paragraph style={{ 
                                        fontSize: 16, 
                                        color: 'rgba(255,255,255,0.85)',
                                        marginBottom: 16,
                                        maxWidth: 700
                                    }}>
                                        {chapter.description}
                                    </Paragraph>
                                )}
                                
                                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                    {chapter.moderateur && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Avatar size="small" icon={<UserOutlined />} style={{ background: 'rgba(255,255,255,0.2)' }} />
                                            <Text style={{ color: 'white' }}>
                                                Modérateur: {chapter.moderateur}
                                            </Text>
                                        </div>
                                    )}
                                    {chapter.dateSession && (
                                        <Tag icon={<CalendarOutlined />} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>
                                            {formatDate(chapter.dateSession)}
                                        </Tag>
                                    )}
                                    {chapter.horaireSession && (
                                        <Tag icon={<ClockCircleOutlined />} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>
                                            {chapter.horaireSession}
                                        </Tag>
                                    )}
                                </div>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card style={{ background: 'rgba(255,255,255,0.1)', border: 'none' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <PlayCircleOutlined style={{ fontSize: 20, color: 'white' }} />
                                            <Text style={{ color: 'white' }}>
                                                {videos.length} vidéo{videos.length > 1 ? 's' : ''}
                                            </Text>
                                        </div>
                                        {chapter.dureeTotale && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <ClockCircleOutlined style={{ fontSize: 20, color: 'white' }} />
                                                <Text style={{ color: 'white' }}>
                                                    {chapter.dureeTotale} de contenu
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Liste des vidéos */}
                <section style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 64px' }}>
                    {/* Barre de recherche */}
                    <div style={{ marginBottom: 24 }}>
                        <Input
                            placeholder="Rechercher une vidéo..."
                            prefix={<SearchOutlined />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="large"
                            style={{ maxWidth: 400 }}
                            allowClear
                        />
                    </div>
                    
                    {filteredVideos.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                searchTerm 
                                    ? "Aucune vidéo ne correspond à votre recherche"
                                    : "Aucune vidéo disponible pour le moment"
                            }
                            style={{ padding: '60px 0' }}
                        />
                    ) : (
                        <List
                            grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
                            dataSource={filteredVideos}
                            renderItem={(video) => (
                                <List.Item>
                                    <Link 
                                        href={`/videos/${roomSlug}/${chapterSlug}/${video.slug}`}
                                        style={{ display: 'block' }}
                                    >
                                        <Card
                                            hoverable
                                            cover={
                                                <div style={{ position: 'relative' }}>
                                                    {video.thumbnailUrl ? (
                                                        <div style={{
                                                            height: 180,
                                                            background: `url(${video.thumbnailUrl}) center/cover`,
                                                            position: 'relative'
                                                        }} />
                                                    ) : (
                                                        <div style={{
                                                            height: 180,
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <VideoCameraOutlined style={{ fontSize: 48, color: 'white', opacity: 0.8 }} />
                                                        </div>
                                                    )}
                                                    
                                                    {/* Overlay avec bouton play */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <PlayCircleOutlined style={{ 
                                                            fontSize: 48, 
                                                            color: 'white',
                                                            opacity: 0.9,
                                                            transition: 'transform 0.2s'
                                                        }} />
                                                    </div>
                                                    
                                                    {/* Durée */}
                                                    {video.duree && (
                                                        <Tag style={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            right: 8,
                                                            background: 'rgba(0,0,0,0.75)',
                                                            border: 'none',
                                                            color: 'white'
                                                        }}>
                                                            {formatDuration(video.duree)}
                                                        </Tag>
                                                    )}
                                                    
                                                    {/* Visibilité */}
                                                    {video.visibilite !== 'PUBLIC' && (
                                                        <Tag 
                                                            icon={<LockOutlined />}
                                                            color={VISIBILITE_COLORS[video.visibilite]}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 8,
                                                                right: 8
                                                            }}
                                                        >
                                                            {VISIBILITE_LABELS[video.visibilite]}
                                                        </Tag>
                                                    )}
                                                </div>
                                            }
                                            styles={{ body: { padding: 16 } }}
                                        >
                                            <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 8, minHeight: 44 }}>
                                                {video.titre}
                                            </Title>
                                            
                                            {video.intervenant && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                                    <Avatar size="small" icon={<UserOutlined />} />
                                                    <Text type="secondary" ellipsis style={{ flex: 1 }}>
                                                        {video.intervenant}
                                                    </Text>
                                                </div>
                                            )}
                                            
                                            <div style={{ display: 'flex', gap: 12, color: '#888' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <EyeOutlined /> {video.nombreVues || 0}
                                                </span>
                                            </div>
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
