'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Table, Card, Row, Col, Statistic, Tag, Button, Space, Input, Select,
    DatePicker, Modal, Tabs, Typography, message, Tooltip, Badge, Descriptions
} from 'antd';
import {
    FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined,
    CloseCircleOutlined, SearchOutlined, FilterOutlined,
    DownloadOutlined, EyeOutlined, EditOutlined, ReloadOutlined,
    SyncOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axiosInstance from '@/lib/axios';
import type {
    AbstractResponse, AbstractStats, StatutSoumission, Rubrique, UpdateStatus
} from '@/types';
import { STATUT_LABELS, STATUT_COLORS, RUBRIQUE_LABELS } from '@/types';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function AdminAbstractsPage() {
    const [abstracts, setAbstracts] = useState<AbstractResponse[]>([]);
    const [stats, setStats] = useState<AbstractStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

    // Filtres
    const [filters, setFilters] = useState({
        statut: null as StatutSoumission | null,
        rubrique: null as Rubrique | null,
        search: '',
        dateRange: null as [string, string] | null,
    });

    // Modal détails
    const [detailModal, setDetailModal] = useState(false);
    const [selectedAbstract, setSelectedAbstract] = useState<AbstractResponse | null>(null);

    // Modal changement statut
    const [statusModal, setStatusModal] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [newStatus, setNewStatus] = useState<UpdateStatus>({
        statut: 'EN_ATTENTE',
        commentaires: '',
        envoyerEmail: true,
    });

    // Charger les statistiques
    const fetchStats = useCallback(async () => {
        try {
            const response = await axiosInstance.get<AbstractStats>('/abstracts/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des statistiques', error);
        }
    }, []);

    // Charger les abstracts
    const fetchAbstracts = useCallback(async () => {
        setLoading(true);
        try {
            const params: Record<string, string | number> = {
                page: pagination.current - 1,
                size: pagination.pageSize,
            };

            if (filters.statut) params.statut = filters.statut;
            if (filters.rubrique) params.rubrique = filters.rubrique;
            if (filters.search) params.search = filters.search;
            if (filters.dateRange) {
                params.dateDebut = filters.dateRange[0];
                params.dateFin = filters.dateRange[1];
            }

            const response = await axiosInstance.get('/abstracts', { params });
            setAbstracts(response.data.content || []);
            setPagination(prev => ({ ...prev, total: response.data.totalElements || 0 }));
        } catch (error) {
            console.error('Erreur lors du chargement des abstracts', error);
            message.error('Erreur lors du chargement des abstracts');
        } finally {
            setLoading(false);
        }
    }, [pagination.current, pagination.pageSize, filters]);

    useEffect(() => {
        fetchStats();
        fetchAbstracts();
    }, [fetchStats, fetchAbstracts]);

    // Ouvrir le modal de détails
    const openDetailModal = (record: AbstractResponse) => {
        setSelectedAbstract(record);
        setDetailModal(true);
    };

    // Ouvrir le modal de changement de statut
    const openStatusModal = (record: AbstractResponse) => {
        setSelectedAbstract(record);
        setNewStatus({
            statut: record.statut,
            commentaires: record.commentairesComite || '',
            envoyerEmail: true,
        });
        setStatusModal(true);
    };

    // Mettre à jour le statut
    const handleUpdateStatus = async () => {
        if (!selectedAbstract) return;

        setStatusLoading(true);
        try {
            await axiosInstance.put(`/abstracts/${selectedAbstract.id}/status`, newStatus);
            message.success('Statut mis à jour avec succès');
            setStatusModal(false);
            fetchAbstracts();
            fetchStats();
        } catch (error) {
            message.error('Erreur lors de la mise à jour du statut');
        } finally {
            setStatusLoading(false);
        }
    };

    // Réinitialiser les filtres
    const resetFilters = () => {
        setFilters({
            statut: null,
            rubrique: null,
            search: '',
            dateRange: null,
        });
    };

    // Colonnes du tableau
    const columns: ColumnsType<AbstractResponse> = [
        {
            title: 'Référence',
            dataIndex: 'numeroReference',
            key: 'numeroReference',
            width: 130,
            render: (ref: string) => <Tag color="blue">{ref}</Tag>,
        },
        {
            title: 'Auteur',
            key: 'auteur',
            width: 150,
            render: (_, record) => (
                <div>
                    <div className="font-medium">{record.nom} {record.prenom}</div>
                    <div className="text-xs text-gray-500">{record.email}</div>
                </div>
            ),
        },
        {
            title: 'Titre',
            dataIndex: 'titre',
            key: 'titre',
            ellipsis: true,
            render: (titre: string) => (
                <Tooltip title={titre}>
                    <span>{titre.substring(0, 50)}{titre.length > 50 ? '...' : ''}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Rubrique',
            dataIndex: 'rubriqueLabel',
            key: 'rubrique',
            width: 180,
            render: (label: string) => <Tag>{label}</Tag>,
        },
        {
            title: 'Type',
            dataIndex: 'typeLabel',
            key: 'type',
            width: 140,
        },
        {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            width: 150,
            render: (statut: StatutSoumission) => (
                <Tag color={STATUT_COLORS[statut]}>{STATUT_LABELS[statut]}</Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'dateSoumission',
            key: 'dateSoumission',
            width: 100,
            render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Tooltip title="Voir détails">
                        <Button
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={() => openDetailModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Changer statut">
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => openStatusModal(record)}
                        />
                    </Tooltip>
                    {record.wordFileUrl && (
                        <Tooltip title="Télécharger Word">
                            <Button
                                icon={<DownloadOutlined />}
                                size="small"
                                onClick={() => window.open(record.wordFileUrl, '_blank')}
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Total soumissions"
                            value={stats?.total || 0}
                            prefix={<FileTextOutlined className="text-blue-600" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="En attente"
                            value={stats?.enAttente || 0}
                            prefix={<ClockCircleOutlined className="text-yellow-500" />}
                            styles={{ content: { color: '#EAB308' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Acceptés"
                            value={stats?.acceptes || 0}
                            prefix={<CheckCircleOutlined className="text-green-500" />}
                            styles={{ content: { color: '#22C55E' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Refusés"
                            value={stats?.refuses || 0}
                            prefix={<CloseCircleOutlined className="text-red-500" />}
                            styles={{ content: { color: '#EF4444' } }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Filtres */}
            <Card className="shadow-sm">
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} md={6}>
                        <Input
                            placeholder="Rechercher..."
                            prefix={<SearchOutlined />}
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            onPressEnter={fetchAbstracts}
                        />
                    </Col>
                    <Col xs={24} md={5}>
                        <Select
                            placeholder="Statut"
                            allowClear
                            className="w-full"
                            value={filters.statut}
                            onChange={(value) => setFilters(prev => ({ ...prev, statut: value }))}
                        >
                            {Object.entries(STATUT_LABELS).map(([key, label]) => (
                                <Select.Option key={key} value={key}>{label}</Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} md={6}>
                        <Select
                            placeholder="Rubrique"
                            allowClear
                            className="w-full"
                            value={filters.rubrique}
                            onChange={(value) => setFilters(prev => ({ ...prev, rubrique: value }))}
                        >
                            {Object.entries(RUBRIQUE_LABELS).map(([key, label]) => (
                                <Select.Option key={key} value={key}>{label}</Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} md={5}>
                        <Space>
                            <Button
                                type="primary"
                                icon={<FilterOutlined />}
                                onClick={fetchAbstracts}
                            >
                                Filtrer
                            </Button>
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={resetFilters}
                            >
                                Réinitialiser
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* Tableau */}
            <Card
                title={<Title level={4} className="!mb-0">Liste des abstracts</Title>}
                extra={
                    <Button
                        icon={<SyncOutlined />}
                        onClick={() => { fetchAbstracts(); fetchStats(); }}
                    >
                        Actualiser
                    </Button>
                }
                className="shadow-sm"
            >
                <Table
                    columns={columns}
                    dataSource={abstracts}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showTotal: (total) => `${total} abstract(s)`,
                        onChange: (page, pageSize) => setPagination({ ...pagination, current: page, pageSize }),
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            {/* Modal Détails */}
            <Modal
                title={`Détails - ${selectedAbstract?.numeroReference}`}
                open={detailModal}
                onCancel={() => setDetailModal(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailModal(false)}>
                        Fermer
                    </Button>,
                    selectedAbstract?.wordFileUrl && (
                        <Button
                            key="download"
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={() => window.open(selectedAbstract.wordFileUrl, '_blank')}
                        >
                            Télécharger Word
                        </Button>
                    ),
                ]}
                width={800}
            >
                {selectedAbstract && (
                    <Tabs
                        items={[
                            {
                                key: 'info',
                                label: 'Informations',
                                children: (
                                    <Descriptions column={2} bordered size="small">
                                        <Descriptions.Item label="Nom">{selectedAbstract.nom}</Descriptions.Item>
                                        <Descriptions.Item label="Prénom">{selectedAbstract.prenom}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{selectedAbstract.email}</Descriptions.Item>
                                        <Descriptions.Item label="Téléphone">{selectedAbstract.telephone || '-'}</Descriptions.Item>
                                        <Descriptions.Item label="Auteurs" span={2}>{selectedAbstract.auteurs}</Descriptions.Item>
                                        <Descriptions.Item label="Affiliation" span={2}>{selectedAbstract.affiliation}</Descriptions.Item>
                                        <Descriptions.Item label="Type">{selectedAbstract.typeLabel}</Descriptions.Item>
                                        <Descriptions.Item label="Rubrique">{selectedAbstract.rubriqueLabel}</Descriptions.Item>
                                        <Descriptions.Item label="Statut">
                                            <Tag color={STATUT_COLORS[selectedAbstract.statut]}>
                                                {selectedAbstract.statutLabel}
                                            </Tag>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Date">
                                            {new Date(selectedAbstract.dateSoumission).toLocaleString('fr-FR')}
                                        </Descriptions.Item>
                                    </Descriptions>
                                ),
                            },
                            {
                                key: 'titre',
                                label: 'Titre',
                                children: (
                                    <div className="p-4 bg-gray-50 rounded">
                                        <Title level={4}>{selectedAbstract.titre}</Title>
                                        {selectedAbstract.motsCles && (
                                            <Text type="secondary" italic>
                                                Mots-clés : {selectedAbstract.motsCles}
                                            </Text>
                                        )}
                                    </div>
                                ),
                            },
                            {
                                key: 'introduction',
                                label: 'Introduction',
                                children: <Paragraph className="whitespace-pre-wrap">{selectedAbstract.introduction}</Paragraph>,
                            },
                            {
                                key: 'materiel',
                                label: 'Matériel & Méthodes',
                                children: <Paragraph className="whitespace-pre-wrap">{selectedAbstract.materielMethodes}</Paragraph>,
                            },
                            {
                                key: 'resultats',
                                label: 'Résultats',
                                children: <Paragraph className="whitespace-pre-wrap">{selectedAbstract.resultats}</Paragraph>,
                            },
                            {
                                key: 'discussion',
                                label: 'Discussion',
                                children: <Paragraph className="whitespace-pre-wrap">{selectedAbstract.discussion}</Paragraph>,
                            },
                            {
                                key: 'conclusion',
                                label: 'Conclusion',
                                children: <Paragraph className="whitespace-pre-wrap">{selectedAbstract.conclusion}</Paragraph>,
                            },
                        ]}
                    />
                )}
            </Modal>

            {/* Modal Changement Statut */}
            <Modal
                title="Changer le statut"
                open={statusModal}
                onCancel={() => setStatusModal(false)}
                onOk={handleUpdateStatus}
                confirmLoading={statusLoading}
                okText="Enregistrer"
                cancelText="Annuler"
            >
                <div className="space-y-4">
                    <div>
                        <Text strong className="block mb-2">Nouveau statut</Text>
                        <Select
                            className="w-full"
                            value={newStatus.statut}
                            onChange={(value) => setNewStatus(prev => ({ ...prev, statut: value }))}
                        >
                            {Object.entries(STATUT_LABELS).map(([key, label]) => (
                                <Select.Option key={key} value={key}>{label}</Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Text strong className="block mb-2">Commentaires (optionnel)</Text>
                        <TextArea
                            rows={4}
                            placeholder="Commentaires du comité scientifique..."
                            value={newStatus.commentaires}
                            onChange={(e) => setNewStatus(prev => ({ ...prev, commentaires: e.target.value }))}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="envoyerEmail"
                            checked={newStatus.envoyerEmail}
                            onChange={(e) => setNewStatus(prev => ({ ...prev, envoyerEmail: e.target.checked }))}
                        />
                        <label htmlFor="envoyerEmail">Envoyer un email de notification à l&apos;auteur</label>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
