'use client';

import { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Button, Input, Select, Empty, Spin, Typography, Space, Tabs } from 'antd';
import { FileTextOutlined, DownloadOutlined, SearchOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined } from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axiosInstance from '@/lib/axios';
import type { Document as DocType, TypeDocument } from '@/types';
import { TYPE_DOCUMENT_LABELS } from '@/types';

const { Title, Text, Paragraph } = Typography;

// Icône selon le format
const getFileIcon = (format?: string) => {
    switch (format?.toUpperCase()) {
        case 'PDF':
            return <FilePdfOutlined className="text-4xl text-red-500" />;
        case 'DOC':
        case 'DOCX':
            return <FileWordOutlined className="text-4xl text-blue-500" />;
        case 'XLS':
        case 'XLSX':
            return <FileExcelOutlined className="text-4xl text-green-500" />;
        default:
            return <FileTextOutlined className="text-4xl text-gray-500" />;
    }
};

// Formater la taille du fichier
const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<DocType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<TypeDocument | null>(null);

    useEffect(() => {
        fetchDocuments();
    }, [selectedType]);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const params: Record<string, string | number> = { annee: 2026 };
            if (selectedType) params.type = selectedType;

            const response = await axiosInstance.get<DocType[]>('/documents/public', { params });
            setDocuments(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des documents', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (doc: DocType) => {
        try {
            // Incrémenter le compteur de téléchargements
            await axiosInstance.get(`/documents/${doc.id}/download`);
            // Ouvrir le fichier dans un nouvel onglet
            window.open(doc.fichierUrl, '_blank');
        } catch (error) {
            console.error('Erreur lors du téléchargement', error);
        }
    };

    // Filtrer par recherche
    const filteredDocuments = documents.filter(doc =>
        doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Grouper par type
    const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
        const type = doc.type || 'AUTRE';
        if (!acc[type]) acc[type] = [];
        acc[type].push(doc);
        return acc;
    }, {} as Record<string, DocType[]>);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-800 to-teal-600 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Title level={1} className="!text-white !mb-4">
                            <FileTextOutlined className="mr-3" />
                            Documents
                        </Title>
                        <Paragraph className="text-white/90 text-lg max-w-2xl mx-auto">
                            Téléchargez les documents officiels du Congrès SMCD 2026 :
                            programme, brochures, formulaires et plus encore.
                        </Paragraph>
                    </div>
                </section>

                {/* Filtres */}
                <section className="py-6 border-b bg-white sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Row gutter={16} align="middle">
                            <Col xs={24} md={12}>
                                <Input
                                    placeholder="Rechercher un document..."
                                    prefix={<SearchOutlined />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    size="large"
                                    allowClear
                                />
                            </Col>
                            <Col xs={24} md={8}>
                                <Select
                                    placeholder="Filtrer par type"
                                    className="w-full"
                                    size="large"
                                    allowClear
                                    value={selectedType}
                                    onChange={(value) => setSelectedType(value)}
                                >
                                    {Object.entries(TYPE_DOCUMENT_LABELS).map(([key, label]) => (
                                        <Select.Option key={key} value={key}>{label}</Select.Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Contenu */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                            <div className="text-center py-12">
                                <Spin size="large" />
                            </div>
                        ) : filteredDocuments.length === 0 ? (
                            <Empty
                                description="Aucun document disponible"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        ) : (
                            <div className="space-y-12">
                                {Object.entries(groupedDocuments).map(([type, docs]) => (
                                    <div key={type}>
                                        <Title level={3} className="!mb-6 flex items-center gap-2">
                                            <Tag color="blue">{TYPE_DOCUMENT_LABELS[type as TypeDocument] || type}</Tag>
                                            <span className="text-gray-400 text-sm font-normal">({docs.length})</span>
                                        </Title>

                                        <Row gutter={[24, 24]}>
                                            {docs.map((doc) => (
                                                <Col key={doc.id} xs={24} md={12} lg={8}>
                                                    <Card
                                                        hoverable
                                                        className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                                    >
                                                        <div className="flex gap-4">
                                                            <div className="flex-shrink-0">
                                                                {getFileIcon(doc.formatFichier)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <Title level={5} className="!mb-1 line-clamp-2">
                                                                    {doc.titre}
                                                                </Title>
                                                                {doc.descriptionCourte && (
                                                                    <Text type="secondary" className="line-clamp-2 block mb-2">
                                                                        {doc.descriptionCourte}
                                                                    </Text>
                                                                )}
                                                                <Space size="small" wrap>
                                                                    <Tag>{doc.formatFichier}</Tag>
                                                                    <Tag>{formatFileSize(doc.tailleFichier)}</Tag>
                                                                    <Tag color="blue">{doc.langue}</Tag>
                                                                </Space>
                                                                <div className="mt-4 flex items-center justify-between">
                                                                    <Text type="secondary" className="text-xs">
                                                                        {doc.nombreTelechargements} téléchargements
                                                                    </Text>
                                                                    <Button
                                                                        type="primary"
                                                                        icon={<DownloadOutlined />}
                                                                        onClick={() => handleDownload(doc)}
                                                                    >
                                                                        Télécharger
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
