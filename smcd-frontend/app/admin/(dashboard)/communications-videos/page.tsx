'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Tag,
    Space,
    Modal,
    message,
    Popconfirm,
    Input,
    Select,
    Card,
    Statistic,
    Row,
    Col,
} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EyeOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import api from '@/lib/axios';
import type { ColumnsType } from 'antd/es/table';

const { TextArea } = Input;

interface CommunicationVideo {
    id: number;
    nomAuteur: string;
    prenomAuteur: string;
    emailAuteur: string;
    titre: string;
    description?: string;
    rubrique?: string;
    videoUrl: string;
    format?: string;
    tailleFichier?: number;
    duree?: number;
    statut: 'EN_ATTENTE' | 'APPROUVE' | 'REJETE';
    commentairesAdmin?: string;
    annee: number;
    nombreVues: number;
    nombreTelechargements: number;
    dateUpload: string;
    dateValidation?: string;
}

export default function CommunicationsVideosAdminPage() {
    const [videos, setVideos] = useState<CommunicationVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<CommunicationVideo | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [commentaires, setCommentaires] = useState('');
    const [actionType, setActionType] = useState<'approuver' | 'rejeter' | null>(null);

    const stats = {
        enAttente: videos.filter(v => v.statut === 'EN_ATTENTE').length,
        approuve: videos.filter(v => v.statut === 'APPROUVE').length,
        rejete: videos.filter(v => v.statut === 'REJETE').length,
        total: videos.length,
    };

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/videos/admin/all');
            setVideos(response.data);
        } catch (error) {
            console.error('Erreur chargement vidéos:', error);
            message.error('Erreur lors du chargement des vidéos');
        } finally {
            setLoading(false);
        }
    };

    const handleApprouver = async () => {
        if (!selectedVideo) return;

        try {
            await api.post(`/videos/admin/${selectedVideo.id}/approuver`, {
                commentaires,
            });
            message.success('Vidéo approuvée avec succès');
            setIsModalVisible(false);
            setCommentaires('');
            setSelectedVideo(null);
            loadVideos();
        } catch (error) {
            console.error('Erreur approbation:', error);
            message.error('Erreur lors de l\'approbation');
        }
    };

    const handleRejeter = async () => {
        if (!selectedVideo) return;

        try {
            await api.post(`/videos/admin/${selectedVideo.id}/rejeter`, {
                commentaires,
            });
            message.success('Vidéo rejetée');
            setIsModalVisible(false);
            setCommentaires('');
            setSelectedVideo(null);
            loadVideos();
        } catch (error) {
            console.error('Erreur rejet:', error);
            message.error('Erreur lors du rejet');
        }
    };

    const handleSupprimer = async (id: number) => {
        try {
            await api.delete(`/videos/admin/${id}`);
            message.success('Vidéo supprimée');
            loadVideos();
        } catch (error) {
            console.error('Erreur suppression:', error);
            message.error('Erreur lors de la suppression');
        }
    };

    const openActionModal = (video: CommunicationVideo, action: 'approuver' | 'rejeter') => {
        setSelectedVideo(video);
        setActionType(action);
        setCommentaires(video.commentairesAdmin || '');
        setIsModalVisible(true);
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return 'N/A';
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    const columns: ColumnsType<CommunicationVideo> = [
        {
            title: 'Référence',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (id) => `#${id}`,
        },
        {
            title: 'Titre',
            dataIndex: 'titre',
            key: 'titre',
            ellipsis: true,
        },
        {
            title: 'Auteur',
            key: 'auteur',
            render: (_, record) => `${record.prenomAuteur} ${record.nomAuteur}`,
        },
        {
            title: 'Email',
            dataIndex: 'emailAuteur',
            key: 'emailAuteur',
            ellipsis: true,
        },
        {
            title: 'Format',
            dataIndex: 'format',
            key: 'format',
            width: 80,
        },
        {
            title: 'Taille',
            dataIndex: 'tailleFichier',
            key: 'tailleFichier',
            width: 100,
            render: formatFileSize,
        },
        {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            width: 120,
            render: (statut) => {
                const config = {
                    EN_ATTENTE: { color: 'orange', text: 'En attente' },
                    APPROUVE: { color: 'green', text: 'Approuvé' },
                    REJETE: { color: 'red', text: 'Rejeté' },
                };
                const { color, text } = config[statut as keyof typeof config];
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Vues',
            dataIndex: 'nombreVues',
            key: 'nombreVues',
            width: 70,
        },
        {
            title: 'Date',
            dataIndex: 'dateUpload',
            key: 'dateUpload',
            width: 110,
            render: (date) => new Date(date).toLocaleDateString('fr-FR'),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 220,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => window.open(record.videoUrl, '_blank')}
                    >
                        Voir
                    </Button>
                    {record.statut === 'EN_ATTENTE' && (
                        <>
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                size="small"
                                onClick={() => openActionModal(record, 'approuver')}
                            >
                                Approuver
                            </Button>
                            <Button
                                danger
                                icon={<CloseCircleOutlined />}
                                size="small"
                                onClick={() => openActionModal(record, 'rejeter')}
                            >
                                Rejeter
                            </Button>
                        </>
                    )}
                    <Popconfirm
                        title="Supprimer cette vidéo ?"
                        description="Cette action est irréversible"
                        onConfirm={() => handleSupprimer(record.id)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <VideoCameraOutlined className="text-blue-600" />
                    Gestion des Communications Vidéo
                </h1>

                <Row gutter={16} className="mb-6">
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="En attente"
                                value={stats.enAttente}
                                styles={{ content: { color: '#ff9800' } }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Approuvées"
                                value={stats.approuve}
                                styles={{ content: { color: '#52c41a' } }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Rejetées"
                                value={stats.rejete}
                                styles={{ content: { color: '#f5222d' } }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total" value={stats.total} />
                        </Card>
                    </Col>
                </Row>
            </div>

            <Table
                columns={columns}
                dataSource={videos}
                loading={loading}
                rowKey="id"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Total: ${total} vidéos`,
                }}
            />

            <Modal
                title={actionType === 'approuver' ? 'Approuver la vidéo' : 'Rejeter la vidéo'}
                open={isModalVisible}
                onOk={actionType === 'approuver' ? handleApprouver : handleRejeter}
                onCancel={() => {
                    setIsModalVisible(false);
                    setCommentaires('');
                    setSelectedVideo(null);
                }}
                okText={actionType === 'approuver' ? 'Approuver' : 'Rejeter'}
                cancelText="Annuler"
                okButtonProps={{ danger: actionType === 'rejeter' }}
            >
                {selectedVideo && (
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold">Titre:</p>
                            <p>{selectedVideo.titre}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Auteur:</p>
                            <p>{selectedVideo.prenomAuteur} {selectedVideo.nomAuteur}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Commentaires (optionnel):</p>
                            <TextArea
                                rows={4}
                                value={commentaires}
                                onChange={(e) => setCommentaires(e.target.value)}
                                placeholder={
                                    actionType === 'approuver'
                                        ? 'Félicitations, votre vidéo a été approuvée...'
                                        : 'Raison du rejet...'
                                }
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
