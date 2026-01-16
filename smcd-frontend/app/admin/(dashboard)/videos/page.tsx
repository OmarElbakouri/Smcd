'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
    Card, Table, Button, Space, Tag, Modal, Form, Input, Select, 
    Upload, message, Popconfirm, Tabs, Typography, Row, Col, Statistic,
    Collapse, Avatar, Switch, InputNumber, DatePicker, TimePicker, Tooltip,
    Empty, Spin, ColorPicker, Divider, Badge, Progress
} from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined,
    VideoCameraOutlined, FolderOutlined, PlayCircleOutlined,
    EyeOutlined, ClockCircleOutlined, DragOutlined, ReloadOutlined,
    CloudUploadOutlined, CheckCircleOutlined, CloseCircleOutlined,
    MenuOutlined, ArrowLeftOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { adminAxios } from '@/lib/axios';
import { 
    Room, Chapter, Video, VideoStats, RoomDTO, ChapterDTO, VideoDTO,
    VisibiliteVideo, VISIBILITE_LABELS, VISIBILITE_COLORS 
} from '@/types';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { Color } from 'antd/es/color-picker';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

export default function AdminVideosPage() {
    const router = useRouter();
    
    // États principaux
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const [stats, setStats] = useState<VideoStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('rooms');
    
    // États des modals
    const [roomModalVisible, setRoomModalVisible] = useState(false);
    const [chapterModalVisible, setChapterModalVisible] = useState(false);
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
    const [editingVideo, setEditingVideo] = useState<Video | null>(null);
    
    // États upload
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageFile, setImageFile] = useState<UploadFile | null>(null);
    const [videoFile, setVideoFile] = useState<UploadFile | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile | null>(null);
    
    // Forms
    const [roomForm] = Form.useForm();
    const [chapterForm] = Form.useForm();
    const [videoForm] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [roomsRes, statsRes] = await Promise.all([
                adminAxios.get('/admin/rooms'),
                adminAxios.get('/admin/videos/stats')
            ]);
            setRooms(roomsRes.data || []);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
            message.error('Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    };

    const fetchChapters = async (roomId: number) => {
        try {
            const response = await adminAxios.get(`/admin/rooms/${roomId}/chapters`);
            setChapters(response.data.chapters || response.data || []);
        } catch (error) {
            console.error('Erreur lors du chargement des chapitres:', error);
        }
    };

    const fetchVideos = async (chapterId: number) => {
        try {
            const response = await adminAxios.get(`/admin/chapters/${chapterId}/videos`);
            setVideos(response.data.videos || response.data || []);
        } catch (error) {
            console.error('Erreur lors du chargement des vidéos:', error);
        }
    };

    // ============ GESTION DES ROOMS ============
    
    const handleSaveRoom = async (values: RoomDTO) => {
        try {
            setUploading(true);
            const formData = new FormData();
            
            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'couleur') {
                    formData.append(key, String(value));
                }
            });
            
            // Gérer la couleur (ColorPicker retourne un objet)
            if (values.couleur) {
                const colorValue = typeof values.couleur === 'string' 
                    ? values.couleur 
                    : (values.couleur as any).toHexString?.() || '#1890ff';
                formData.append('couleur', colorValue);
            }
            
            if (imageFile?.originFileObj) {
                formData.append('image', imageFile.originFileObj);
            }
            
            if (editingRoom) {
                await adminAxios.put(`/admin/rooms/${editingRoom.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Salle modifiée avec succès');
            } else {
                await adminAxios.post('/admin/rooms', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Salle créée avec succès');
            }
            
            setRoomModalVisible(false);
            roomForm.resetFields();
            setImageFile(null);
            setEditingRoom(null);
            fetchData();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteRoom = async (room: Room) => {
        try {
            await adminAxios.delete(`/admin/rooms/${room.id}`);
            message.success('Salle supprimée avec succès');
            fetchData();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Erreur lors de la suppression');
        }
    };

    const handleToggleRoom = async (room: Room) => {
        try {
            await adminAxios.patch(`/admin/rooms/${room.id}/toggle`);
            message.success(`Salle ${room.active ? 'désactivée' : 'activée'}`);
            fetchData();
        } catch (error) {
            message.error('Erreur lors du changement de statut');
        }
    };

    const openRoomModal = (room?: Room) => {
        setEditingRoom(room || null);
        if (room) {
            roomForm.setFieldsValue({
                ...room,
                couleur: room.couleur || '#1890ff'
            });
        } else {
            roomForm.resetFields();
            roomForm.setFieldsValue({ annee: new Date().getFullYear(), active: true });
        }
        setImageFile(null);
        setRoomModalVisible(true);
    };

    // ============ GESTION DES CHAPITRES ============
    
    const handleSaveChapter = async (values: ChapterDTO) => {
        try {
            setUploading(true);
            
            const data = {
                ...values,
                roomId: selectedRoom?.id,
                dateSession: values.dateSession ? dayjs(values.dateSession).format('YYYY-MM-DD') : null,
                heureDebut: values.heureDebut ? dayjs(values.heureDebut).format('HH:mm') : null,
                heureFin: values.heureFin ? dayjs(values.heureFin).format('HH:mm') : null
            };
            
            if (editingChapter) {
                await adminAxios.put(`/admin/chapters/${editingChapter.id}`, data);
                message.success('Session modifiée avec succès');
            } else {
                await adminAxios.post('/admin/chapters', data);
                message.success('Session créée avec succès');
            }
            
            setChapterModalVisible(false);
            chapterForm.resetFields();
            setEditingChapter(null);
            if (selectedRoom) fetchChapters(selectedRoom.id);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteChapter = async (chapter: Chapter) => {
        try {
            await adminAxios.delete(`/admin/chapters/${chapter.id}`);
            message.success('Session supprimée avec succès');
            if (selectedRoom) fetchChapters(selectedRoom.id);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Erreur lors de la suppression');
        }
    };

    const openChapterModal = (chapter?: Chapter) => {
        setEditingChapter(chapter || null);
        if (chapter) {
            chapterForm.setFieldsValue({
                ...chapter,
                dateSession: chapter.dateSession ? dayjs(chapter.dateSession) : null,
                heureDebut: chapter.heureDebut ? dayjs(chapter.heureDebut, 'HH:mm') : null,
                heureFin: chapter.heureFin ? dayjs(chapter.heureFin, 'HH:mm') : null
            });
        } else {
            chapterForm.resetFields();
        }
        setChapterModalVisible(true);
    };

    // ============ GESTION DES VIDÉOS ============
    
    const handleSaveVideo = async (values: VideoDTO) => {
        try {
            setUploading(true);
            
            if (editingVideo) {
                // Modification
                await adminAxios.put(`/admin/videos/${editingVideo.id}`, values);
                message.success('Vidéo modifiée avec succès');
            } else {
                // Création avec upload
                if (!videoFile?.originFileObj) {
                    message.error('Veuillez sélectionner une vidéo');
                    return;
                }
                
                const formData = new FormData();
                formData.append('video', videoFile.originFileObj);
                
                if (thumbnailFile?.originFileObj) {
                    formData.append('thumbnail', thumbnailFile.originFileObj);
                }
                
                Object.entries(values).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formData.append(key, String(value));
                    }
                });
                
                formData.append('chapterId', String(selectedChapter?.id));
                
                await adminAxios.post('/admin/videos', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent: { loaded: number; total?: number }) => {
                        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                        setUploadProgress(percent);
                    }
                });
                message.success('Vidéo uploadée avec succès');
            }
            
            setVideoModalVisible(false);
            videoForm.resetFields();
            setVideoFile(null);
            setThumbnailFile(null);
            setUploadProgress(0);
            setEditingVideo(null);
            if (selectedChapter) fetchVideos(selectedChapter.id);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteVideo = async (video: Video) => {
        try {
            await adminAxios.delete(`/admin/videos/${video.id}`);
            message.success('Vidéo supprimée avec succès');
            if (selectedChapter) fetchVideos(selectedChapter.id);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Erreur lors de la suppression');
        }
    };

    const handleTogglePublish = async (video: Video) => {
        try {
            if (video.publie) {
                await adminAxios.patch(`/admin/videos/${video.id}/unpublish`);
                message.success('Vidéo dépubliée');
            } else {
                await adminAxios.patch(`/admin/videos/${video.id}/publish`);
                message.success('Vidéo publiée');
            }
            if (selectedChapter) fetchVideos(selectedChapter.id);
        } catch (error) {
            message.error('Erreur lors du changement de statut');
        }
    };

    const openVideoModal = (video?: Video) => {
        setEditingVideo(video || null);
        if (video) {
            videoForm.setFieldsValue(video);
        } else {
            videoForm.resetFields();
            videoForm.setFieldsValue({ 
                visibilite: 'PUBLIC',
                langue: 'fr'
            });
        }
        setVideoFile(null);
        setThumbnailFile(null);
        setUploadProgress(0);
        setVideoModalVisible(true);
    };

    // ============ COLONNES DES TABLES ============

    const roomColumns = [
        {
            title: 'Salle',
            key: 'nom',
            render: (_: any, record: Room) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {record.imageUrl ? (
                        <Avatar src={record.imageUrl} size={48} shape="square" />
                    ) : (
                        <Avatar 
                            icon={<VideoCameraOutlined />} 
                            size={48} 
                            shape="square"
                            style={{ background: record.couleur || '#1890ff' }}
                        />
                    )}
                    <div>
                        <Text strong>{record.nom}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            {record.nombreChapitres || 0} sessions • {record.nombreVideos || 0} vidéos
                        </Text>
                    </div>
                </div>
            )
        },
        {
            title: 'Année',
            dataIndex: 'annee',
            key: 'annee',
            width: 100,
            render: (annee: number) => <Tag color="blue">{annee}</Tag>
        },
        {
            title: 'Statut',
            key: 'active',
            width: 100,
            render: (_: any, record: Room) => (
                <Switch 
                    checked={record.active} 
                    onChange={() => handleToggleRoom(record)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (_: any, record: Room) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<FolderOutlined />}
                        onClick={() => {
                            setSelectedRoom(record);
                            fetchChapters(record.id);
                            setActiveTab('chapters');
                        }}
                    >
                        Sessions
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openRoomModal(record)}
                    />
                    <Popconfirm
                        title="Supprimer cette salle ?"
                        description="Toutes les sessions et vidéos seront supprimées"
                        onConfirm={() => handleDeleteRoom(record)}
                        okText="Supprimer"
                        cancelText="Annuler"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const chapterColumns = [
        {
            title: 'Session',
            key: 'titre',
            render: (_: any, record: Chapter) => (
                <div>
                    <Text strong>{record.titre}</Text>
                    {record.moderateur && (
                        <>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Modérateur: {record.moderateur}
                            </Text>
                        </>
                    )}
                </div>
            )
        },
        {
            title: 'Date',
            key: 'date',
            width: 200,
            render: (_: any, record: Chapter) => (
                <div>
                    {record.dateSession && (
                        <Tag>{dayjs(record.dateSession).format('DD/MM/YYYY')}</Tag>
                    )}
                    {record.horaireSession && (
                        <Tag icon={<ClockCircleOutlined />}>{record.horaireSession}</Tag>
                    )}
                </div>
            )
        },
        {
            title: 'Vidéos',
            dataIndex: 'nombreVideos',
            key: 'nombreVideos',
            width: 100,
            render: (count: number) => <Badge count={count || 0} showZero color="#1890ff" />
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (_: any, record: Chapter) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        onClick={() => {
                            setSelectedChapter(record);
                            fetchVideos(record.id);
                            setActiveTab('videos');
                        }}
                    >
                        Vidéos
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openChapterModal(record)}
                    />
                    <Popconfirm
                        title="Supprimer cette session ?"
                        description="Toutes les vidéos seront supprimées"
                        onConfirm={() => handleDeleteChapter(record)}
                        okText="Supprimer"
                        cancelText="Annuler"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const videoColumns = [
        {
            title: 'Vidéo',
            key: 'titre',
            render: (_: any, record: Video) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 80,
                        height: 45,
                        background: record.thumbnailUrl 
                            ? `url(${record.thumbnailUrl}) center/cover`
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {!record.thumbnailUrl && (
                            <PlayCircleOutlined style={{ color: 'white', fontSize: 20 }} />
                        )}
                    </div>
                    <div>
                        <Text strong ellipsis style={{ maxWidth: 300 }}>{record.titre}</Text>
                        {record.intervenant && (
                            <>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {record.intervenant}
                                </Text>
                            </>
                        )}
                    </div>
                </div>
            )
        },
        {
            title: 'Durée',
            key: 'duree',
            width: 100,
            render: (_: any, record: Video) => record.dureeFr || record.dureeFormatee || '-'
        },
        {
            title: 'Visibilité',
            dataIndex: 'visibilite',
            key: 'visibilite',
            width: 120,
            render: (visibilite: VisibiliteVideo) => (
                <Tag color={VISIBILITE_COLORS[visibilite]}>
                    {VISIBILITE_LABELS[visibilite]}
                </Tag>
            )
        },
        {
            title: 'Vues',
            dataIndex: 'nombreVues',
            key: 'nombreVues',
            width: 80,
            render: (vues: number) => (
                <span><EyeOutlined /> {vues || 0}</span>
            )
        },
        {
            title: 'Statut',
            key: 'publie',
            width: 100,
            render: (_: any, record: Video) => (
                <Switch
                    checked={record.publie}
                    onChange={() => handleTogglePublish(record)}
                    checkedChildren={<CheckCircleOutlined />}
                    unCheckedChildren={<CloseCircleOutlined />}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            render: (_: any, record: Video) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openVideoModal(record)}
                    />
                    <Popconfirm
                        title="Supprimer cette vidéo ?"
                        onConfirm={() => handleDeleteVideo(record)}
                        okText="Supprimer"
                        cancelText="Annuler"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // ============ RENDER ============

    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>
                    <VideoCameraOutlined /> Gestion des Vidéos
                </Title>
            </div>
            
            {/* Statistiques */}
            {stats && (
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic 
                                title="Salles" 
                                value={stats.totalSalles} 
                                prefix={<FolderOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic 
                                title="Sessions" 
                                value={stats.totalChapitres} 
                                prefix={<MenuOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic 
                                title="Vidéos" 
                                value={stats.totalVideos}
                                suffix={<Text type="secondary" style={{ fontSize: 14 }}>
                                    ({stats.videosPubliees} publiées)
                                </Text>}
                                prefix={<PlayCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic 
                                title="Vues totales" 
                                value={stats.totalVues} 
                                prefix={<EyeOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
            )}
            
            {/* Tabs de navigation */}
            <Card>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: 'rooms',
                            label: (
                                <span>
                                    <FolderOutlined /> Salles
                                </span>
                            ),
                            children: (
                                <div>
                                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                                        <Button 
                                            type="primary" 
                                            icon={<PlusOutlined />}
                                            onClick={() => openRoomModal()}
                                        >
                                            Nouvelle salle
                                        </Button>
                                        <Button 
                                            icon={<ReloadOutlined />}
                                            onClick={fetchData}
                                        >
                                            Actualiser
                                        </Button>
                                    </div>
                                    <Table
                                        columns={roomColumns}
                                        dataSource={rooms}
                                        rowKey="id"
                                        loading={loading}
                                        pagination={{ pageSize: 10 }}
                                    />
                                </div>
                            )
                        },
                        {
                            key: 'chapters',
                            label: (
                                <span>
                                    <MenuOutlined /> Sessions
                                    {selectedRoom && <Tag style={{ marginLeft: 8 }}>{selectedRoom.nom}</Tag>}
                                </span>
                            ),
                            disabled: !selectedRoom,
                            children: (
                                <div>
                                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Space>
                                            <Button 
                                                icon={<ArrowLeftOutlined />}
                                                onClick={() => {
                                                    setSelectedRoom(null);
                                                    setChapters([]);
                                                    setActiveTab('rooms');
                                                }}
                                            >
                                                Retour aux salles
                                            </Button>
                                            <Button 
                                                type="primary" 
                                                icon={<PlusOutlined />}
                                                onClick={() => openChapterModal()}
                                            >
                                                Nouvelle session
                                            </Button>
                                        </Space>
                                    </div>
                                    <Table
                                        columns={chapterColumns}
                                        dataSource={chapters}
                                        rowKey="id"
                                        pagination={{ pageSize: 10 }}
                                    />
                                </div>
                            )
                        },
                        {
                            key: 'videos',
                            label: (
                                <span>
                                    <PlayCircleOutlined /> Vidéos
                                    {selectedChapter && <Tag style={{ marginLeft: 8 }}>{selectedChapter.titre}</Tag>}
                                </span>
                            ),
                            disabled: !selectedChapter,
                            children: (
                                <div>
                                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Space>
                                            <Button 
                                                icon={<ArrowLeftOutlined />}
                                                onClick={() => {
                                                    setSelectedChapter(null);
                                                    setVideos([]);
                                                    setActiveTab('chapters');
                                                }}
                                            >
                                                Retour aux sessions
                                            </Button>
                                            <Button 
                                                type="primary" 
                                                icon={<CloudUploadOutlined />}
                                                onClick={() => openVideoModal()}
                                            >
                                                Uploader une vidéo
                                            </Button>
                                        </Space>
                                    </div>
                                    <Table
                                        columns={videoColumns}
                                        dataSource={videos}
                                        rowKey="id"
                                        pagination={{ pageSize: 10 }}
                                    />
                                </div>
                            )
                        }
                    ]}
                />
            </Card>
            
            {/* Modal Salle */}
            <Modal
                title={editingRoom ? 'Modifier la salle' : 'Nouvelle salle'}
                open={roomModalVisible}
                onCancel={() => {
                    setRoomModalVisible(false);
                    setEditingRoom(null);
                    roomForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={roomForm}
                    layout="vertical"
                    onFinish={handleSaveRoom}
                >
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                name="nom"
                                label="Nom de la salle"
                                rules={[{ required: true, message: 'Le nom est requis' }]}
                            >
                                <Input placeholder="Ex: Salle Plénière" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="nomCourt"
                                label="Nom court"
                            >
                                <Input placeholder="Ex: Plénière" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} placeholder="Description de la salle..." />
                    </Form.Item>
                    
                    <Form.Item name="descriptionCourte" label="Description courte">
                        <Input placeholder="Résumé en une phrase" />
                    </Form.Item>
                    
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="annee" label="Année">
                                <InputNumber style={{ width: '100%' }} min={2020} max={2030} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="couleur" label="Couleur">
                                <ColorPicker />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="icone" label="Icône">
                                <Input placeholder="Ex: video" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item label="Image de couverture">
                        <Upload
                            listType="picture-card"
                            fileList={imageFile ? [imageFile] : []}
                            onChange={({ fileList }) => setImageFile(fileList[0] || null)}
                            beforeUpload={() => false}
                            maxCount={1}
                            accept="image/*"
                        >
                            {!imageFile && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Ajouter</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    
                    <Form.Item name="active" valuePropName="checked" initialValue={true}>
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                    
                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setRoomModalVisible(false)}>
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit" loading={uploading}>
                                {editingRoom ? 'Modifier' : 'Créer'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            
            {/* Modal Session */}
            <Modal
                title={editingChapter ? 'Modifier la session' : 'Nouvelle session'}
                open={chapterModalVisible}
                onCancel={() => {
                    setChapterModalVisible(false);
                    setEditingChapter(null);
                    chapterForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={chapterForm}
                    layout="vertical"
                    onFinish={handleSaveChapter}
                >
                    <Form.Item
                        name="titre"
                        label="Titre de la session"
                        rules={[{ required: true, message: 'Le titre est requis' }]}
                    >
                        <Input placeholder="Ex: Session d'ouverture" />
                    </Form.Item>
                    
                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} placeholder="Description de la session..." />
                    </Form.Item>
                    
                    <Form.Item name="moderateur" label="Modérateur">
                        <Input placeholder="Nom du modérateur" />
                    </Form.Item>
                    
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="dateSession" label="Date">
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="heureDebut" label="Heure début">
                                <TimePicker style={{ width: '100%' }} format="HH:mm" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="heureFin" label="Heure fin">
                                <TimePicker style={{ width: '100%' }} format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setChapterModalVisible(false)}>
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit" loading={uploading}>
                                {editingChapter ? 'Modifier' : 'Créer'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            
            {/* Modal Vidéo */}
            <Modal
                title={editingVideo ? 'Modifier la vidéo' : 'Uploader une vidéo'}
                open={videoModalVisible}
                onCancel={() => {
                    setVideoModalVisible(false);
                    setEditingVideo(null);
                    videoForm.resetFields();
                    setVideoFile(null);
                    setThumbnailFile(null);
                    setUploadProgress(0);
                }}
                footer={null}
                width={700}
            >
                <Form
                    form={videoForm}
                    layout="vertical"
                    onFinish={handleSaveVideo}
                >
                    <Form.Item
                        name="titre"
                        label="Titre"
                        rules={[{ required: true, message: 'Le titre est requis' }]}
                    >
                        <Input placeholder="Titre de la vidéo" />
                    </Form.Item>
                    
                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} placeholder="Description..." />
                    </Form.Item>
                    
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="intervenant" label="Intervenant principal">
                                <Input placeholder="Nom de l'intervenant" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="coIntervenants" label="Co-intervenants">
                                <Input placeholder="Autres intervenants (séparés par des virgules)" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="visibilite" label="Visibilité">
                                <Select>
                                    <Select.Option value="PUBLIC">Public</Select.Option>
                                    <Select.Option value="INSCRITS">Inscrits uniquement</Select.Option>
                                    <Select.Option value="PREMIUM">Premium</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="langue" label="Langue">
                                <Select>
                                    <Select.Option value="fr">Français</Select.Option>
                                    <Select.Option value="en">Anglais</Select.Option>
                                    <Select.Option value="ar">Arabe</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="tags" label="Tags">
                                <Input placeholder="tag1, tag2, tag3" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {!editingVideo && (
                        <>
                            <Divider>Fichiers</Divider>
                            
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item 
                                        label="Fichier vidéo"
                                        required
                                        help="Formats: MP4, MOV, AVI, MKV"
                                    >
                                        <Upload
                                            fileList={videoFile ? [videoFile] : []}
                                            onChange={({ fileList }) => setVideoFile(fileList[0] || null)}
                                            beforeUpload={() => false}
                                            maxCount={1}
                                            accept="video/*"
                                        >
                                            <Button icon={<UploadOutlined />}>
                                                Sélectionner la vidéo
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item 
                                        label="Miniature (optionnel)"
                                        help="Image de prévisualisation"
                                    >
                                        <Upload
                                            listType="picture"
                                            fileList={thumbnailFile ? [thumbnailFile] : []}
                                            onChange={({ fileList }) => setThumbnailFile(fileList[0] || null)}
                                            beforeUpload={() => false}
                                            maxCount={1}
                                            accept="image/*"
                                        >
                                            <Button icon={<PlusOutlined />}>
                                                Ajouter une miniature
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <Progress percent={uploadProgress} status="active" />
                            )}
                        </>
                    )}
                    
                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setVideoModalVisible(false)}>
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit" loading={uploading}>
                                {editingVideo ? 'Modifier' : 'Uploader'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
