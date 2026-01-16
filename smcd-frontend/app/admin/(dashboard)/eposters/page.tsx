'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    Table,
    Button,
    Tag,
    Select,
    Input,
    Space,
    Modal,
    Typography,
    Statistic,
    Row,
    Col,
    message,
    Popconfirm,
    Form,
    Radio,
} from 'antd';
import {
    FileOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    EyeOutlined,
    DownloadOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import api from '@/lib/axios';
import {
    RUBRIQUE_LABELS,
    STATUT_EPOSTER_COLORS,
    STATUT_EPOSTER_LABELS,
    type EPosterAdmin,
    type EPosterStats,
    type StatutEPoster,
} from '@/types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function AdminEPostersPage() {
    const [ePosters, setEPosters] = useState<EPosterAdmin[]>([]);
    const [stats, setStats] = useState<EPosterStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedStatut, setSelectedStatut] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEPoster, setSelectedEPoster] = useState<EPosterAdmin | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [form] = Form.useForm();

    const years = [2026, 2025, 2024];

    useEffect(() => {
        fetchData();
    }, [selectedStatut, selectedYear]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedStatut) params.append('statut', selectedStatut);
            if (selectedYear) params.append('annee', selectedYear.toString());

            const [ePostersRes, statsRes] = await Promise.all([
                api.get(`/eposters/admin?${params.toString()}`),
                api.get('/eposters/stats'),
            ]);

            setEPosters(ePostersRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (ePoster: EPosterAdmin) => {
        setSelectedEPoster(ePoster);
        form.setFieldsValue({
            action: ePoster.statut === 'EN_ATTENTE' ? 'APPROUVE' : ePoster.statut,
            commentaires: ePoster.commentairesAdmin || '',
        });
        setModalVisible(true);
    };

    const handleValidation = async () => {
        try {
            const values = await form.validateFields();
            setActionLoading(true);

            if (values.action === 'APPROUVE') {
                await api.put(`/eposters/${selectedEPoster?.id}/approve`, {
                    commentaires: values.commentaires,
                });
                message.success('E-Poster approuvé avec succès');
            } else if (values.action === 'REJETE') {
                if (!values.commentaires) {
                    message.error('La raison du rejet est obligatoire');
                    setActionLoading(false);
                    return;
                }
                await api.put(`/eposters/${selectedEPoster?.id}/reject`, {
                    raison: values.commentaires,
                });
                message.success('E-Poster rejeté');
            }

            setModalVisible(false);
            fetchData();
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Erreur lors de la validation');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/eposters/${id}`);
            message.success('E-Poster supprimé');
            fetchData();
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Erreur lors de la suppression');
        }
    };

    const filteredEPosters = ePosters.filter((ep) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            ep.titre.toLowerCase().includes(term) ||
            ep.nomAuteur.toLowerCase().includes(term) ||
            ep.prenomAuteur.toLowerCase().includes(term) ||
            ep.emailAuteur.toLowerCase().includes(term)
        );
    });

    const columns = [
        {
            title: 'Titre',
            dataIndex: 'titre',
            key: 'titre',
            width: 250,
            render: (titre: string) => (
                <Text className="line-clamp-2" title={titre}>
                    {titre}
                </Text>
            ),
        },
        {
            title: 'Auteur',
            key: 'auteur',
            render: (_: unknown, record: EPosterAdmin) => (
                <div>
                    <Text strong>{record.prenomAuteur} {record.nomAuteur}</Text>
                    <br />
                    <Text className="text-xs text-gray-500">{record.emailAuteur}</Text>
                </div>
            ),
        },
        {
            title: 'Rubrique',
            dataIndex: 'rubriqueLabel',
            key: 'rubrique',
            render: (label: string) => label ? <Tag color="blue">{label}</Tag> : '-',
        },
        {
            title: 'Taille',
            dataIndex: 'tailleFichierFormatee',
            key: 'taille',
        },
        {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            render: (statut: StatutEPoster) => (
                <Tag color={STATUT_EPOSTER_COLORS[statut]}>
                    {STATUT_EPOSTER_LABELS[statut]}
                </Tag>
            ),
        },
        {
            title: 'Date upload',
            dataIndex: 'dateUpload',
            key: 'dateUpload',
        },
        {
            title: 'Téléch.',
            dataIndex: 'nombreTelechargements',
            key: 'telechargements',
            align: 'center' as const,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: EPosterAdmin) => (
                <Space>
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => window.open(record.fichierUrl, '_blank')}
                        title="Prévisualiser"
                    />
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => handleOpenModal(record)}
                    >
                        Valider
                    </Button>
                    <Popconfirm
                        title="Supprimer cet e-poster ?"
                        description="Cette action est irréversible."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Supprimer"
                        cancelText="Annuler"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <Title level={3}>
                <FileOutlined className="mr-2" />
                Gestion des E-Posters
            </Title>

            {/* Stats */}
            {stats && (
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Total"
                                value={stats.total}
                                prefix={<FileOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="En attente"
                                value={stats.enAttente}
                                prefix={<ClockCircleOutlined />}
                                styles={{ content: { color: '#faad14' } }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Approuvés"
                                value={stats.approuves}
                                prefix={<CheckCircleOutlined />}
                                styles={{ content: { color: '#52c41a' } }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Rejetés"
                                value={stats.rejetes}
                                prefix={<CloseCircleOutlined />}
                                styles={{ content: { color: '#ff4d4f' } }}
                            />
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Filtres */}
            <Card>
                <div className="flex flex-wrap gap-4 items-center">
                    <Select
                        value={selectedStatut}
                        onChange={setSelectedStatut}
                        style={{ width: 200 }}
                        placeholder="Tous les statuts"
                        allowClear
                        options={[
                            { value: 'EN_ATTENTE', label: 'En attente' },
                            { value: 'APPROUVE', label: 'Approuvé' },
                            { value: 'REJETE', label: 'Rejeté' },
                        ]}
                    />

                    <Select
                        value={selectedYear}
                        onChange={setSelectedYear}
                        style={{ width: 120 }}
                        placeholder="Année"
                        allowClear
                        options={years.map((y) => ({ value: y, label: y.toString() }))}
                    />

                    <Input
                        placeholder="Rechercher..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />

                    <Button onClick={fetchData}>Actualiser</Button>
                </div>
            </Card>

            {/* Tableau */}
            <Card>
                <Table
                    columns={columns}
                    dataSource={filteredEPosters}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1200 }}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `${total} e-poster(s)`,
                    }}
                />
            </Card>

            {/* Modal de validation */}
            <Modal
                title="Validation de l'E-Poster"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleValidation}
                confirmLoading={actionLoading}
                okText="Valider"
                cancelText="Annuler"
                width={600}
            >
                {selectedEPoster && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <Paragraph strong>{selectedEPoster.titre}</Paragraph>
                            <Text className="text-gray-600">
                                Par {selectedEPoster.prenomAuteur} {selectedEPoster.nomAuteur}
                            </Text>
                            <br />
                            <Text className="text-gray-500 text-sm">
                                {selectedEPoster.emailAuteur}
                            </Text>
                        </div>

                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() => window.open(selectedEPoster.fichierUrl, '_blank')}
                        >
                            Télécharger pour vérifier
                        </Button>

                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="action"
                                label="Décision"
                                rules={[{ required: true }]}
                            >
                                <Radio.Group>
                                    <Radio.Button value="APPROUVE">
                                        <CheckCircleOutlined /> Approuver
                                    </Radio.Button>
                                    <Radio.Button value="REJETE">
                                        <CloseCircleOutlined /> Rejeter
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="commentaires"
                                label="Commentaires / Raison du rejet"
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Commentaires optionnels (obligatoire en cas de rejet)"
                                />
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>
        </div>
    );
}
