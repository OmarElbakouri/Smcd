'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Card,
    Button,
    Typography,
    Spin,
    Tag,
    Tabs,
    Divider,
    message,
    Space,
    Avatar,
} from 'antd';
import {
    ArrowLeftOutlined,
    GlobalOutlined,
    LinkedinOutlined,
    LinkOutlined,
    DownloadOutlined,
    StarFilled,
    MailOutlined,
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import api from '@/lib/axios';
import { type SpeakerPublic } from '@/types';

const { Title, Text, Paragraph } = Typography;

export default function SpeakerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [speaker, setSpeaker] = useState<SpeakerPublic | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchSpeaker();
        }
    }, [params.id]);

    const fetchSpeaker = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/speakers/${params.id}`);
            setSpeaker(response.data);
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Invité non trouvé');
            router.push('/speakers');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <Spin size="large" />
                </main>
                <Footer />
            </div>
        );
    }

    if (!speaker) {
        return null;
    }

    const bioTabs = [];
    if (speaker.bioCompleteFr) {
        bioTabs.push({
            key: 'fr',
            label: 'Français',
            children: (
                <div className="prose max-w-none">
                    <Paragraph className="text-gray-700 whitespace-pre-wrap">
                        {speaker.bioCompleteFr}
                    </Paragraph>
                </div>
            ),
        });
    }
    if (speaker.bioCompleteEn) {
        bioTabs.push({
            key: 'en',
            label: 'English',
            children: (
                <div className="prose max-w-none">
                    <Paragraph className="text-gray-700 whitespace-pre-wrap">
                        {speaker.bioCompleteEn}
                    </Paragraph>
                </div>
            ),
        });
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Navigation */}
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => router.push('/speakers')}
                        className="mb-6"
                    >
                        Retour à la liste
                    </Button>

                    <Card className="shadow-lg">
                        {/* Header avec photo et infos */}
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Photo */}
                            <div className="md:w-1/3">
                                <div className="relative">
                                    <img
                                        src={speaker.photoUrl || '/placeholder-speaker.jpg'}
                                        alt={speaker.nomComplet}
                                        className="w-full rounded-lg shadow-md"
                                    />
                                    {speaker.featured && (
                                        <div className="absolute top-2 right-2">
                                            <Tag color="gold" icon={<StarFilled />}>
                                                Invité d'honneur
                                            </Tag>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Informations */}
                            <div className="md:w-2/3">
                                <Title level={2} className="mb-2">
                                    {speaker.nomComplet}
                                </Title>

                                {speaker.specialite && (
                                    <Title level={4} className="text-blue-600 mt-0 mb-4">
                                        {speaker.specialite}
                                    </Title>
                                )}

                                {speaker.institution && (
                                    <Paragraph className="text-lg text-gray-600 mb-2">
                                        {speaker.institution}
                                    </Paragraph>
                                )}

                                {(speaker.ville || speaker.pays) && (
                                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                                        <GlobalOutlined />
                                        <span>{speaker.localisation}</span>
                                    </div>
                                )}

                                {/* Bio courte */}
                                {speaker.bioCourteFr && (
                                    <Paragraph className="text-gray-700 italic border-l-4 border-blue-500 pl-4 my-4">
                                        {speaker.bioCourteFr}
                                    </Paragraph>
                                )}

                                {/* Liens sociaux */}
                                <Space size="middle" className="mt-6">
                                    {speaker.linkedinUrl && (
                                        <Button
                                            icon={<LinkedinOutlined />}
                                            href={speaker.linkedinUrl}
                                            target="_blank"
                                        >
                                            LinkedIn
                                        </Button>
                                    )}
                                    {speaker.researchGateUrl && (
                                        <Button
                                            icon={<LinkOutlined />}
                                            href={speaker.researchGateUrl}
                                            target="_blank"
                                        >
                                            ResearchGate
                                        </Button>
                                    )}
                                    {speaker.siteWeb && (
                                        <Button
                                            icon={<GlobalOutlined />}
                                            href={speaker.siteWeb}
                                            target="_blank"
                                        >
                                            Site web
                                        </Button>
                                    )}
                                    {speaker.cvUrl && (
                                        <Button
                                            type="primary"
                                            icon={<DownloadOutlined />}
                                            href={speaker.cvUrl}
                                            target="_blank"
                                        >
                                            Télécharger le CV
                                        </Button>
                                    )}
                                </Space>
                            </div>
                        </div>

                        {/* Biographie complète */}
                        {bioTabs.length > 0 && (
                            <>
                                <Divider />
                                <Title level={4}>Biographie</Title>
                                {bioTabs.length > 1 ? (
                                    <Tabs items={bioTabs} />
                                ) : (
                                    bioTabs[0].children
                                )}
                            </>
                        )}
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
