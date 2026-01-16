'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Table, Card, Row, Col, Statistic, Tag, Button, Space, Input, Select,
    Modal, Form, Upload, message, Typography, Popconfirm, Image
} from 'antd';
import {
    TrophyOutlined, DeleteOutlined,
    PlusOutlined, UploadOutlined, EditOutlined, SyncOutlined, LinkOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import axiosInstance from '@/lib/axios';
import type { Sponsor, NiveauSponsor } from '@/types';
import { NIVEAU_SPONSOR_LABELS, NIVEAU_SPONSOR_COLORS } from '@/types';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function AdminSponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [stats, setStats] = useState<{ total: number; parNiveau: Record<string, number> } | null>(null);
    const [loading, setLoading] = useState(true);

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    const fetchSponsors = useCallback(async () => {
        setLoading(true);
        try {
            const [sponsorsRes, statsRes] = await Promise.all([
                axiosInstance.get<Sponsor[]>('/sponsors/all', { params: { annee: 2026 } }),
                axiosInstance.get('/sponsors/stats')
            ]);
            setSponsors(sponsorsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            message.error('Erreur lors du chargement des sponsors');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSponsors();
    }, [fetchSponsors]);

    // Créer sponsor
    const handleCreate = async (values: { nom: string; niveau: NiveauSponsor; description?: string; siteWeb?: string }) => {
        if (fileList.length === 0) {
            message.error('Veuillez sélectionner un logo');
            return;
        }

        setModalLoading(true);

        const formData = new FormData();
        formData.append('logo', fileList[0].originFileObj as File);
        formData.append('nom', values.nom);
        formData.append('niveau', values.niveau);
        if (values.description) formData.append('description', values.description);
        if (values.siteWeb) formData.append('siteWeb', values.siteWeb);
        formData.append('annee', '2026');

        try {
            await axiosInstance.post('/sponsors', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Sponsor créé avec succès');
            setModalOpen(false);
            form.resetFields();
            setFileList([]);
            fetchSponsors();
        } catch (error) {
            message.error('Erreur lors de la création');
        } finally {
            setModalLoading(false);
        }
    };

    // Supprimer sponsor
    const handleDelete = async (id: number) => {
        try {
            await axiosInstance.delete(`/sponsors/${id}`);
            message.success('Sponsor supprimé');
            fetchSponsors();
        } catch (error) {
            message.error('Erreur lors de la suppression');
        }
    };

    const columns: ColumnsType<Sponsor> = [
        {
            title: 'Logo',
            dataIndex: 'logoUrl',
            key: 'logoUrl',
            width: 80,
            render: (url: string) => (
                <Image
                    src={url}
                    alt="Logo"
                    width={60}
                    height={40}
                    className="object-contain"
                    fallback="/placeholder.png"
                />
            ),
        },
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            ellipsis: true,
        },
        {
            title: 'Niveau',
            dataIndex: 'niveau',
            key: 'niveau',
            width: 120,
            render: (niveau: NiveauSponsor) => (
                <Tag
                    color={NIVEAU_SPONSOR_COLORS[niveau]}
                    style={{ color: niveau === 'PLATINE' || niveau === 'ARGENT' ? '#333' : undefined }}
                >
                    {NIVEAU_SPONSOR_LABELS[niveau]}
                </Tag>
            ),
        },
        {
            title: 'Site Web',
            dataIndex: 'siteWeb',
            key: 'siteWeb',
            ellipsis: true,
            render: (url: string) => url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    <LinkOutlined /> {url}
                </a>
            ) : '-',
        },
        {
            title: 'Clics',
            dataIndex: 'nombreClics',
            key: 'nombreClics',
            width: 80,
            align: 'center',
        },
        {
            title: 'Statut',
            dataIndex: 'active',
            key: 'active',
            width: 80,
            render: (active: boolean) => (
                <Tag color={active ? 'green' : 'red'}>
                    {active ? 'Actif' : 'Inactif'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Supprimer ce sponsor ?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button icon={<DeleteOutlined />} size="small" danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={4}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Total"
                            value={stats?.total || 0}
                            prefix={<TrophyOutlined className="text-blue-500" />}
                        />
                    </Card>
                </Col>
                {Object.entries(NIVEAU_SPONSOR_LABELS).map(([niveau, label]) => (
                    <Col key={niveau} xs={12} sm={8} lg={4}>
                        <Card className="shadow-sm">
                            <Statistic
                                title={label}
                                value={stats?.parNiveau?.[label] || 0}
                                styles={{ content: { color: NIVEAU_SPONSOR_COLORS[niveau as NiveauSponsor] } }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Tableau */}
            <Card
                title={<Title level={4} className="!mb-0">Gestion des sponsors</Title>}
                extra={
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchSponsors}>
                            Actualiser
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setModalOpen(true)}
                        >
                            Nouveau sponsor
                        </Button>
                    </Space>
                }
                className="shadow-sm"
            >
                <Table
                    columns={columns}
                    dataSource={sponsors}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 20 }}
                />
            </Card>

            {/* Modal Création */}
            <Modal
                title="Ajouter un sponsor"
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    form.resetFields();
                    setFileList([]);
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                >
                    <Form.Item
                        name="nom"
                        label="Nom du sponsor"
                        rules={[{ required: true, message: 'Le nom est obligatoire' }]}
                    >
                        <Input placeholder="Nom complet" />
                    </Form.Item>

                    <Form.Item
                        name="niveau"
                        label="Niveau de partenariat"
                        rules={[{ required: true, message: 'Le niveau est obligatoire' }]}
                    >
                        <Select placeholder="Sélectionner un niveau">
                            {Object.entries(NIVEAU_SPONSOR_LABELS).map(([key, label]) => (
                                <Select.Option key={key} value={key}>{label}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <TextArea rows={3} placeholder="Description du sponsor" />
                    </Form.Item>

                    <Form.Item
                        name="siteWeb"
                        label="Site web"
                    >
                        <Input placeholder="https://example.com" />
                    </Form.Item>

                    <Form.Item
                        label="Logo"
                        required
                    >
                        <Upload
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            beforeUpload={() => false}
                            maxCount={1}
                            accept="image/*"
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Sélectionner un logo</Button>
                        </Upload>
                        <Text type="secondary" className="text-xs mt-1 block">
                            Format : PNG, JPG, SVG. Recommandé : 400x200px
                        </Text>
                    </Form.Item>

                    <Form.Item className="mb-0 text-right">
                        <Space>
                            <Button onClick={() => setModalOpen(false)}>
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit" loading={modalLoading}>
                                Créer
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
