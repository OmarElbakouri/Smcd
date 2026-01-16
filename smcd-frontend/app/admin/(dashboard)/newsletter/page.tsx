'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Table, Card, Row, Col, Statistic, Tag, Button, Space, message, Typography
} from 'antd';
import {
    MailOutlined, UserOutlined, SyncOutlined, DownloadOutlined,
    CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axiosInstance from '@/lib/axios';
import type { NewsletterSubscriber, NewsletterStats } from '@/types';

const { Title, Text } = Typography;

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [stats, setStats] = useState<NewsletterStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [subscribersRes, statsRes] = await Promise.all([
                axiosInstance.get<NewsletterSubscriber[]>('/newsletter/subscribers'),
                axiosInstance.get<NewsletterStats>('/newsletter/stats')
            ]);
            setSubscribers(subscribersRes.data);
            setStats(statsRes.data);
        } catch (error) {
            message.error('Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Export CSV
    const handleExportCSV = () => {
        const headers = ['Email', 'Nom', 'Prénom', 'Date inscription', 'Origine', 'Actif'];
        const rows = subscribers.map(s => [
            s.email,
            s.nom || '',
            s.prenom || '',
            new Date(s.dateInscription).toLocaleDateString('fr-FR'),
            s.origine || '',
            s.actif ? 'Oui' : 'Non'
        ]);

        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        message.success('Export CSV téléchargé');
    };

    const columns: ColumnsType<NewsletterSubscriber> = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email: string) => (
                <span className="font-medium">{email}</span>
            ),
        },
        {
            title: 'Nom',
            key: 'nom',
            render: (_, record) => (
                record.prenom || record.nom ?
                    `${record.prenom || ''} ${record.nom || ''}`.trim() :
                    <Text type="secondary">-</Text>
            ),
        },
        {
            title: 'Origine',
            dataIndex: 'origine',
            key: 'origine',
            width: 120,
            render: (origine: string) => (
                origine ? <Tag>{origine}</Tag> : <Text type="secondary">-</Text>
            ),
        },
        {
            title: 'Date inscription',
            dataIndex: 'dateInscription',
            key: 'dateInscription',
            width: 150,
            render: (date: string) => new Date(date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
        },
        {
            title: 'Statut',
            dataIndex: 'actif',
            key: 'actif',
            width: 100,
            render: (actif: boolean) => (
                <Tag
                    color={actif ? 'green' : 'red'}
                    icon={actif ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                >
                    {actif ? 'Actif' : 'Désinscrit'}
                </Tag>
            ),
        },
    ];

    const activeCount = subscribers.filter(s => s.actif).length;

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Abonnés actifs"
                            value={stats?.totalActifs || activeCount}
                            prefix={<MailOutlined className="text-green-500" />}
                            styles={{ content: { color: '#52c41a' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Nouveaux cette semaine"
                            value={stats?.nouveauxCetteSemaine || 0}
                            prefix={<UserOutlined className="text-blue-500" />}
                            styles={{ content: { color: '#1890ff' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Total inscriptions"
                            value={subscribers.length}
                            prefix={<UserOutlined className="text-purple-500" />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Tableau */}
            <Card
                title={<Title level={4} className="!mb-0">Abonnés Newsletter</Title>}
                extra={
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchData}>
                            Actualiser
                        </Button>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={handleExportCSV}
                            disabled={subscribers.length === 0}
                        >
                            Exporter CSV
                        </Button>
                    </Space>
                }
                className="shadow-sm"
            >
                <Table
                    columns={columns}
                    dataSource={subscribers}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 20,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} abonnés`
                    }}
                />
            </Card>

            {/* Info */}
            <Card className="bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                    <MailOutlined className="text-blue-500 text-xl mt-1" />
                    <div>
                        <Title level={5} className="!mb-1">Envoi de newsletter</Title>
                        <Text type="secondary">
                            La fonctionnalité d&apos;envoi de newsletter en masse sera disponible
                            dans une prochaine version. Pour l&apos;instant, vous pouvez exporter
                            la liste CSV et utiliser un service externe (Mailchimp, Brevo, etc.).
                        </Text>
                    </div>
                </div>
            </Card>
        </div>
    );
}
