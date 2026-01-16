'use client';

import { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Typography } from 'antd';
import {
    FileTextOutlined,
    PictureOutlined,
    VideoCameraOutlined,
    TeamOutlined,
    RiseOutlined,
} from '@ant-design/icons';
import { getCurrentUser } from '@/lib/auth';
import type { User, DashboardStats } from '@/types';

const { Title, Text } = Typography;

export default function AdminDashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<DashboardStats>({
        abstractsSoumis: 0,
        ePostersUploades: 0,
        videosPubliees: 0,
        invitesConfirmes: 0,
    });

    useEffect(() => {
        // Récupérer les infos de l'utilisateur
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // TODO: Récupérer les vraies statistiques depuis l'API
        // Pour l'instant, on utilise des valeurs de démonstration
        setStats({
            abstractsSoumis: 0,
            ePostersUploades: 0,
            videosPubliees: 0,
            invitesConfirmes: 0,
        });
    }, []);

    const statCards = [
        {
            title: 'Abstracts soumis',
            value: stats.abstractsSoumis,
            icon: <FileTextOutlined />,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
        },
        {
            title: 'E-Posters uploadés',
            value: stats.ePostersUploades,
            icon: <PictureOutlined />,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
        },
        {
            title: 'Vidéos publiées',
            value: stats.videosPubliees,
            icon: <VideoCameraOutlined />,
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-50',
            textColor: 'text-teal-600',
        },
        {
            title: 'Invités confirmés',
            value: stats.invitesConfirmes,
            icon: <TeamOutlined />,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-white shadow-xl">
                <Title level={2} className="!text-white !mb-2">
                    Bienvenue, {user?.prenom} {user?.nom} 👋
                </Title>
                <Text className="text-blue-100 text-lg">
                    Voici un aperçu de l'état actuel du congrès SMCD 2026
                </Text>
            </div>

            {/* Stats Cards */}
            <Row gutter={[24, 24]}>
                {statCards.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card
                            className="h-full hover:shadow-lg transition-shadow rounded-xl border-0 shadow-md"
                            styles={{ body: { padding: '24px' } }}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <Text className="text-gray-500 text-sm font-medium block mb-2">
                                        {stat.title}
                                    </Text>
                                    <Statistic
                                        value={stat.value}
                                        styles={{
                                            content: {
                                                fontSize: '2.5rem',
                                                fontWeight: 'bold',
                                                color: '#1f2937'
                                            }
                                        }}
                                    />
                                </div>
                                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                    <span className="text-white text-2xl">{stat.icon}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <RiseOutlined className="text-green-500 mr-1" />
                                <span className="text-green-500 font-medium">0%</span>
                                <span className="text-gray-400 ml-1">vs mois dernier</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Quick Actions */}
            <Card
                title={<span className="text-xl font-bold">Actions rapides</span>}
                className="rounded-xl border-0 shadow-md"
            >
                <Row gutter={[16, 16]}>
                    {[
                        {
                            title: 'Gérer les Abstracts',
                            description: 'Voir et modérer les soumissions',
                            href: '/admin/abstracts',
                            color: 'blue'
                        },
                        {
                            title: 'Gérer les E-Posters',
                            description: 'Approuver les nouveaux posters',
                            href: '/admin/eposters',
                            color: 'purple'
                        },
                        {
                            title: 'Ajouter une Vidéo',
                            description: 'Uploader du contenu chirurgical',
                            href: '/admin/videos',
                            color: 'teal'
                        },
                        {
                            title: 'Gérer les Invités',
                            description: 'Confirmer les conférenciers',
                            href: '/admin/speakers',
                            color: 'orange'
                        },
                    ].map((action, index) => (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <a
                                href={action.href}
                                className={`block p-6 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors group`}
                            >
                                <h3 className={`font-semibold text-${action.color}-700 group-hover:text-${action.color}-800 mb-1`}>
                                    {action.title}
                                </h3>
                                <p className="text-gray-500 text-sm">{action.description}</p>
                            </a>
                        </Col>
                    ))}
                </Row>
            </Card>

            {/* Recent Activity Placeholder */}
            <Card
                title={<span className="text-xl font-bold">Activité récente</span>}
                className="rounded-xl border-0 shadow-md"
            >
                <div className="py-12 text-center text-gray-400">
                    <FileTextOutlined className="text-4xl mb-4" />
                    <p>Aucune activité récente à afficher</p>
                    <p className="text-sm">Les nouvelles soumissions apparaîtront ici</p>
                </div>
            </Card>
        </div>
    );
}
