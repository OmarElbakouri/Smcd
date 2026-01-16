'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
    Row, Col, Card, Typography, Empty, Spin, Breadcrumb, Tag, Avatar, 
    Button, Space, List, Divider, message 
} from 'antd';
import { 
    HomeOutlined, 
    VideoCameraOutlined, 
    PlayCircleOutlined, 
    ClockCircleOutlined,
    UserOutlined,
    EyeOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    LockOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { publicAxios } from '@/lib/axios';
import { Room, Chapter, Video, VISIBILITE_LABELS, VISIBILITE_COLORS } from '@/types';

const { Title, Text, Paragraph } = Typography;

export default function VideoPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const roomSlug = params.roomSlug as string;
    const chapterSlug = params.chapterSlug as string;
    const videoSlug = params.videoSlug as string;
    
    const [room, setRoom] = useState<Room | null>(null);
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [video, setVideo] = useState<Video | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(true);
    const [showPlaylist, setShowPlaylist] = useState(true);

    useEffect(() => {
        if (videoSlug) {
            fetchVideo();
        }
    }, [videoSlug]);

    const fetchVideo = async () => {
        try {
            setLoading(true);
            
            // Récupérer la vidéo
            const videoResponse = await publicAxios.get(`/videos/${videoSlug}`);
            setVideo(videoResponse.data);
            
            // Incrémenter les vues
            try {
                await publicAxios.post(`/videos/${videoSlug}/vue`);
            } catch (e) {
                console.log('Increment view failed');
            }
            
            // Récupérer le chapitre avec ses vidéos pour la playlist
            if (chapterSlug) {
                try {
                    const chapterResponse = await publicAxios.get(`/chapters/${chapterSlug}/videos`);
                    const data = chapterResponse.data;
                    if (data.chapter) {
                        setChapter(data.chapter);
                        // Filtrer pour ne pas inclure la vidéo actuelle
                        setRelatedVideos((data.videos || []).filter((v: Video) => v.slug !== videoSlug));
                    } else {
                        setChapter(data);
                        if (data.videos) {
                            setRelatedVideos(data.videos.filter((v: Video) => v.slug !== videoSlug));
                        }
                    }
                    if (data.room) {
                        setRoom(data.room);
                    }
                } catch (e) {
                    console.log('Chapter info not available');
                }
            }
            
            // Récupérer la room si pas déjà fait
            if (!room && roomSlug) {
                try {
                    const roomResponse = await publicAxios.get(`/rooms/${roomSlug}`);
                    setRoom(roomResponse.data);
                } catch (e) {
                    console.log('Room info not available');
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la vidéo:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            message.success('Lien copié dans le presse-papiers !');
        } catch (err) {
            message.error('Impossible de copier le lien');
        }
    };

    const navigateToVideo = (direction: 'prev' | 'next') => {
        if (!chapter?.videos) return;
        const currentIndex = chapter.videos.findIndex(v => v.slug === videoSlug);
        const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex >= 0 && newIndex < chapter.videos.length) {
            router.push(`/videos/${roomSlug}/${chapterSlug}/${chapter.videos[newIndex].slug}`);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', background: '#000' }}>
                    <div style={{ textAlign: 'center', padding: '120px 0' }}>
                        <Spin size="large" />
                        <div style={{ marginTop: 16 }}>
                            <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Chargement de la vidéo...</Text>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!video) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', background: '#f5f5f5', padding: '80px 24px' }}>
                    <Empty description="Vidéo non trouvée" />
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#1a1a2e' }}>
                {/* Lecteur vidéo */}
                <section style={{ background: '#000' }}>
                    <div style={{ 
                        maxWidth: showPlaylist ? 1600 : 1400, 
                        margin: '0 auto',
                        display: 'flex',
                        gap: 0
                    }}>
                        {/* Zone principale du lecteur */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ 
                                position: 'relative', 
                                paddingTop: '56.25%',
                                background: '#000'
                            }}>
                                <video
                                    src={video.streamingUrl || video.videoUrl}
                                    poster={video.thumbnailUrl}
                                    controls
                                    autoPlay
                                    style={{ 
                                        position: 'absolute', 
                                        top: 0, 
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                    controlsList="nodownload"
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        // Auto-play next video
                                        if (relatedVideos.length > 0) {
                                            setTimeout(() => {
                                                router.push(`/videos/${roomSlug}/${chapterSlug}/${relatedVideos[0].slug}`);
                                            }, 3000);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        
                        {/* Playlist latérale */}
                        {showPlaylist && relatedVideos.length > 0 && (
                            <div style={{ 
                                width: 360, 
                                background: '#16213e',
                                maxHeight: '56.25vw',
                                overflowY: 'auto',
                                display: 'none'
                            }} className="playlist-sidebar">
                                <div style={{ 
                                    padding: '12px 16px', 
                                    background: '#0f3460',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}>
                                    <Text strong style={{ color: 'white' }}>
                                        Autres vidéos de la session ({relatedVideos.length})
                                    </Text>
                                </div>
                                <List
                                    dataSource={relatedVideos}
                                    renderItem={(v) => (
                                        <Link href={`/videos/${roomSlug}/${chapterSlug}/${v.slug}`}>
                                            <div style={{ 
                                                display: 'flex', 
                                                gap: 12, 
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s',
                                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{ 
                                                    width: 120, 
                                                    height: 68, 
                                                    background: v.thumbnailUrl 
                                                        ? `url(${v.thumbnailUrl}) center/cover`
                                                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    borderRadius: 4,
                                                    flexShrink: 0,
                                                    position: 'relative'
                                                }}>
                                                    {v.duree && (
                                                        <Tag style={{
                                                            position: 'absolute',
                                                            bottom: 4,
                                                            right: 4,
                                                            background: 'rgba(0,0,0,0.75)',
                                                            border: 'none',
                                                            color: 'white',
                                                            fontSize: 11,
                                                            padding: '0 4px',
                                                            lineHeight: '18px'
                                                        }}>
                                                            {formatDuration(v.duree)}
                                                        </Tag>
                                                    )}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <Text 
                                                        style={{ 
                                                            color: 'white', 
                                                            fontSize: 13,
                                                            lineHeight: 1.4,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            display: '-webkit-box'
                                                        } as React.CSSProperties}
                                                    >
                                                        {v.titre}
                                                    </Text>
                                                    {v.intervenant && (
                                                        <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                                                            {v.intervenant}
                                                        </Text>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* Informations sur la vidéo */}
                <section style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
                    {/* Breadcrumb */}
                    <Breadcrumb
                        style={{ marginBottom: 24 }}
                        items={[
                            { 
                                href: '/', 
                                title: <><HomeOutlined style={{ color: 'rgba(255,255,255,0.5)' }} /> <span style={{ color: 'rgba(255,255,255,0.5)' }}>Accueil</span></> 
                            },
                            { 
                                href: '/videos', 
                                title: <span style={{ color: 'rgba(255,255,255,0.5)' }}>Vidéos</span> 
                            },
                            { 
                                href: `/videos/${roomSlug}`, 
                                title: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{room?.nom || 'Salle'}</span> 
                            },
                            { 
                                href: `/videos/${roomSlug}/${chapterSlug}`, 
                                title: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{chapter?.titre || 'Session'}</span> 
                            },
                            { 
                                title: <span style={{ color: 'rgba(255,255,255,0.8)' }}>{video.titre}</span> 
                            }
                        ]}
                    />
                    
                    <Row gutter={[32, 32]}>
                        <Col xs={24} lg={16}>
                            {/* Titre et meta */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                                    {room && (
                                        <Tag color={room.couleur || 'blue'}>
                                            {room.nom}
                                        </Tag>
                                    )}
                                    {video.visibilite !== 'PUBLIC' && (
                                        <Tag 
                                            icon={<LockOutlined />}
                                            color={VISIBILITE_COLORS[video.visibilite]}
                                        >
                                            {VISIBILITE_LABELS[video.visibilite]}
                                        </Tag>
                                    )}
                                    {video.langue && (
                                        <Tag>{video.langue.toUpperCase()}</Tag>
                                    )}
                                </div>
                                
                                <Title level={2} style={{ color: 'white', marginBottom: 16 }}>
                                    {video.titre}
                                </Title>
                                
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 16
                                }}>
                                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                            <EyeOutlined /> {video.nombreVues || 0} vues
                                        </span>
                                        {video.duree && (
                                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                                <ClockCircleOutlined /> {formatDuration(video.duree)}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <Space>
                                        <Button 
                                            icon={<ShareAltOutlined />}
                                            onClick={handleShare}
                                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}
                                        >
                                            Partager
                                        </Button>
                                    </Space>
                                </div>
                            </div>
                            
                            <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                            
                            {/* Intervenant */}
                            {video.intervenant && (
                                <div style={{ marginBottom: 24 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <Avatar size={48} icon={<UserOutlined />} style={{ background: room?.couleur || '#1890ff' }} />
                                        <div>
                                            <Text strong style={{ color: 'white', display: 'block' }}>
                                                {video.intervenant}
                                            </Text>
                                            {video.coIntervenants && (
                                                <Text style={{ color: 'rgba(255,255,255,0.5)' }}>
                                                    Co-intervenants: {video.coIntervenants}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Description */}
                            {video.description && (
                                <Card style={{ background: 'rgba(255,255,255,0.05)', border: 'none' }}>
                                    <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 0, whiteSpace: 'pre-line' }}>
                                        {video.description}
                                    </Paragraph>
                                </Card>
                            )}
                            
                            {/* Tags */}
                            {video.tags && (
                                <div style={{ marginTop: 16 }}>
                                    {video.tags.split(',').map((tag, i) => (
                                        <Tag key={i} style={{ marginBottom: 8 }}>
                                            {tag.trim()}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </Col>
                        
                        {/* Vidéos suivantes */}
                        <Col xs={24} lg={8}>
                            <Card 
                                title={
                                    <span style={{ color: 'white' }}>
                                        <UnorderedListOutlined /> Autres vidéos de la session
                                    </span>
                                }
                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none' }}
                                styles={{ 
                                    header: { borderBottom: '1px solid rgba(255,255,255,0.1)' },
                                    body: { padding: 0, maxHeight: 500, overflowY: 'auto' }
                                }}
                            >
                                {relatedVideos.length === 0 ? (
                                    <div style={{ padding: 24, textAlign: 'center' }}>
                                        <Text style={{ color: 'rgba(255,255,255,0.5)' }}>
                                            Aucune autre vidéo dans cette session
                                        </Text>
                                    </div>
                                ) : (
                                    <List
                                        dataSource={relatedVideos}
                                        renderItem={(v) => (
                                            <Link href={`/videos/${roomSlug}/${chapterSlug}/${v.slug}`}>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    gap: 12, 
                                                    padding: '12px 16px',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s',
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    <div style={{ 
                                                        width: 100, 
                                                        height: 56, 
                                                        background: v.thumbnailUrl 
                                                            ? `url(${v.thumbnailUrl}) center/cover`
                                                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        borderRadius: 4,
                                                        flexShrink: 0,
                                                        position: 'relative'
                                                    }}>
                                                        <PlayCircleOutlined style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            fontSize: 24,
                                                            color: 'white',
                                                            opacity: 0.8
                                                        }} />
                                                        {v.duree && (
                                                            <Tag style={{
                                                                position: 'absolute',
                                                                bottom: 2,
                                                                right: 2,
                                                                background: 'rgba(0,0,0,0.75)',
                                                                border: 'none',
                                                                color: 'white',
                                                                fontSize: 10,
                                                                padding: '0 4px',
                                                                lineHeight: '16px'
                                                            }}>
                                                                {formatDuration(v.duree)}
                                                            </Tag>
                                                        )}
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <Text 
                                                            style={{ 
                                                                color: 'white', 
                                                                fontSize: 13,
                                                                lineHeight: 1.4,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                display: '-webkit-box'
                                                            }}
                                                        >
                                                            {v.titre}
                                                        </Text>
                                                        <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
                                                            <EyeOutlined /> {v.nombreVues || 0}
                                                        </Text>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    />
                                )}
                            </Card>
                        </Col>
                    </Row>
                </section>
            </main>
            <Footer />
        </>
    );
}
