'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Table, Card, Row, Col, Statistic, Tag, Button, Space, Input, Select,
    Modal, Form, Upload, message, Typography, Popconfirm
} from 'antd';
import {
    FileTextOutlined, DownloadOutlined, DeleteOutlined,
    PlusOutlined, UploadOutlined, EditOutlined, SyncOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import axiosInstance from '@/lib/axios';
import type { Document as DocType, TypeDocument } from '@/types';
import { TYPE_DOCUMENT_LABELS } from '@/types';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function AdminDocumentsPage() {
    const [documents, setDocuments] = useState<DocType[]>([]);
    const [stats, setStats] = useState<{ total: number; totalTelechargements: number; parType: Record<string, number> } | null>(null);
    const [loading, setLoading] = useState(true);

    // Modal upload
    const [uploadModal, setUploadModal] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    const fetchDocuments = useCallback(async () => {
        setLoading(true);
        try {
            const [docsRes, statsRes] = await Promise.all([
                axiosInstance.get<DocType[]>('/documents'),
                axiosInstance.get('/documents/stats')
            ]);
            setDocuments(docsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            message.error('Erreur lors du chargement des documents');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    // Upload document
    const handleUpload = async (values: { titre: string; description?: string; type?: TypeDocument; langue?: string }) => {
        if (fileList.length === 0) {
            message.error('Veuillez sélectionner un fichier');
            return;
        }

        setUploadLoading(true);

        const formData = new FormData();
        formData.append('file', fileList[0].originFileObj as File);
        formData.append('titre', values.titre);
        if (values.description) formData.append('description', values.description);
        if (values.type) formData.append('type', values.type);
        if (values.langue) formData.append('langue', values.langue);
        formData.append('annee', '2026');

        try {
            await axiosInstance.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Document uploadé avec succès');
            setUploadModal(false);
            form.resetFields();
            setFileList([]);
            fetchDocuments();
        } catch (error) {
            message.error('Erreur lors de l\'upload');
        } finally {
            setUploadLoading(false);
        }
    };

    // Supprimer document
    const handleDelete = async (id: number) => {
        try {
            await axiosInstance.delete(`/documents/${id}`);
            message.success('Document supprimé');
            fetchDocuments();
        } catch (error) {
            message.error('Erreur lors de la suppression');
        }
    };

    // Formater la taille
    const formatSize = (bytes?: number) => {
        if (!bytes) return 'N/A';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const columns: ColumnsType<DocType> = [
        {
            title: 'Titre',
            dataIndex: 'titre',
            key: 'titre',
            ellipsis: true,
            render: (titre: string, record) => (
                <div>
                    <div className="font-medium">{titre}</div>
                    <div className="text-xs text-gray-500">{record.nomFichierOriginal}</div>
                </div>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 150,
            render: (type: TypeDocument) => (
                <Tag color="blue">{TYPE_DOCUMENT_LABELS[type] || type}</Tag>
            ),
        },
        {
            title: 'Format',
            dataIndex: 'formatFichier',
            key: 'formatFichier',
            width: 80,
            render: (format: string) => <Tag>{format}</Tag>,
        },
        {
            title: 'Taille',
            dataIndex: 'tailleFichier',
            key: 'tailleFichier',
            width: 100,
            render: formatSize,
        },
        {
            title: 'Téléch.',
            dataIndex: 'nombreTelechargements',
            key: 'nombreTelechargements',
            width: 80,
            align: 'center',
        },
        {
            title: 'Langue',
            dataIndex: 'langue',
            key: 'langue',
            width: 80,
            render: (langue: string) => <Tag>{langue}</Tag>,
        },
        {
            title: 'Date',
            dataIndex: 'datePublication',
            key: 'datePublication',
            width: 100,
            render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<DownloadOutlined />}
                        size="small"
                        onClick={() => window.open(record.fichierUrl, '_blank')}
                    />
                    <Popconfirm
                        title="Supprimer ce document ?"
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
                <Col xs={24} sm={12} lg={8}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Total documents"
                            value={stats?.total || 0}
                            prefix={<FileTextOutlined className="text-blue-600" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Téléchargements totaux"
                            value={stats?.totalTelechargements || 0}
                            prefix={<DownloadOutlined className="text-green-500" />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Tableau */}
            <Card
                title={<Title level={4} className="!mb-0">Gestion des documents</Title>}
                extra={
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchDocuments}>
                            Actualiser
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setUploadModal(true)}
                        >
                            Nouveau document
                        </Button>
                    </Space>
                }
                className="shadow-sm"
            >
                <Table
                    columns={columns}
                    dataSource={documents}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 20 }}
                />
            </Card>

            {/* Modal Upload */}
            <Modal
                title="Uploader un document"
                open={uploadModal}
                onCancel={() => {
                    setUploadModal(false);
                    form.resetFields();
                    setFileList([]);
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpload}
                >
                    <Form.Item
                        name="titre"
                        label="Titre"
                        rules={[{ required: true, message: 'Le titre est obligatoire' }]}
                    >
                        <Input placeholder="Titre du document" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <TextArea rows={3} placeholder="Description du document" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                            >
                                <Select placeholder="Sélectionner un type">
                                    {Object.entries(TYPE_DOCUMENT_LABELS).map(([key, label]) => (
                                        <Select.Option key={key} value={key}>{label}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="langue"
                                label="Langue"
                                initialValue="FR"
                            >
                                <Select>
                                    <Select.Option value="FR">Français</Select.Option>
                                    <Select.Option value="EN">English</Select.Option>
                                    <Select.Option value="AR">العربية</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Fichier"
                        required
                    >
                        <Upload
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            beforeUpload={() => false}
                            maxCount={1}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        >
                            <Button icon={<UploadOutlined />}>Sélectionner un fichier</Button>
                        </Upload>
                        <Text type="secondary" className="text-xs mt-1 block">
                            Formats acceptés : PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
                        </Text>
                    </Form.Item>

                    <Form.Item className="mb-0 text-right">
                        <Space>
                            <Button onClick={() => setUploadModal(false)}>
                                Annuler
                            </Button>
                            <Button type="primary" htmlType="submit" loading={uploadLoading}>
                                Uploader
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
