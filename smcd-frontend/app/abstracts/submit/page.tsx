'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Form, Input, Select, Button, Card, Row, Col, Typography, message,
    Progress, Alert, Divider, Space
} from 'antd';
import {
    UserOutlined, MailOutlined, PhoneOutlined, TeamOutlined,
    BankOutlined, FileTextOutlined, SendOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axiosInstance from '@/lib/axios';
import type { AbstractSubmission, SubmitResponse, TypeCommunication, Rubrique } from '@/types';
import { TYPE_LABELS, RUBRIQUE_LABELS } from '@/types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Deadline du congrès
const DEADLINE = new Date('2026-06-15T23:59:59');

export default function SubmitAbstractPage() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showVideoUrl, setShowVideoUrl] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState(0);

    // Calculer les jours restants jusqu'à la deadline
    useEffect(() => {
        const now = new Date();
        const diff = DEADLINE.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        setDaysRemaining(days > 0 ? days : 0);
    }, []);

    // Charger le brouillon depuis localStorage
    useEffect(() => {
        const draft = localStorage.getItem('abstract_draft');
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                form.setFieldsValue(parsed);
                calculateProgress(parsed);
            } catch (e) {
                // Ignorer les erreurs de parsing
            }
        }
    }, [form]);

    // Calculer la progression du formulaire
    const calculateProgress = (values: Partial<AbstractSubmission>) => {
        const requiredFields = [
            'nom', 'prenom', 'email', 'auteurs', 'affiliation',
            'type', 'rubrique', 'titre', 'introduction',
            'materielMethodes', 'resultats', 'discussion', 'conclusion'
        ];
        const filledFields = requiredFields.filter(field => {
            const value = values[field as keyof AbstractSubmission];
            return value && String(value).trim().length > 0;
        });
        setProgress(Math.round((filledFields.length / requiredFields.length) * 100));
    };

    // Sauvegarder le brouillon
    const saveDraft = () => {
        const values = form.getFieldsValue();
        localStorage.setItem('abstract_draft', JSON.stringify(values));
        calculateProgress(values);
    };

    // Gérer le changement de type de communication
    const handleTypeChange = (value: TypeCommunication) => {
        setShowVideoUrl(value === 'PRESENTATION_VIDEO');
        saveDraft();
    };

    // Soumettre le formulaire
    const handleSubmit = async (values: AbstractSubmission) => {
        setLoading(true);

        try {
            const response = await axiosInstance.post<SubmitResponse>('/abstracts/submit', values);

            if (response.data.success) {
                // Supprimer le brouillon
                localStorage.removeItem('abstract_draft');

                message.success('Abstract soumis avec succès !');

                // Rediriger vers la page de confirmation
                router.push(`/abstracts/confirmation?ref=${response.data.numeroReference}`);
            } else {
                message.error(response.data.message || 'Erreur lors de la soumission');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Erreur lors de la soumission';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* En-tête */}
                    <div className="text-center mb-8">
                        <Title level={1} className="!mb-2">
                            <FileTextOutlined className="mr-3 text-blue-600" />
                            Soumettre un Abstract
                        </Title>
                        <Paragraph className="text-gray-600 text-lg">
                            Congrès National de Chirurgie Digestive 2026
                        </Paragraph>

                        {/* Countdown */}
                        <Alert
                            title={
                                <Space>
                                    <ClockCircleOutlined />
                                    <span>
                                        <strong>{daysRemaining} jours</strong> restants avant la deadline (15 juin 2026)
                                    </span>
                                </Space>
                            }
                            type={daysRemaining > 30 ? 'info' : daysRemaining > 7 ? 'warning' : 'error'}
                            showIcon={false}
                            className="inline-block mt-4"
                        />
                    </div>

                    {/* Progression */}
                    <Card className="mb-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <Text strong>Progression du formulaire</Text>
                            <Text>{progress}%</Text>
                        </div>
                        <Progress
                            percent={progress}
                            strokeColor={{ '0%': '#1E40AF', '100%': '#0D9488' }}
                            showInfo={false}
                        />
                    </Card>

                    {/* Formulaire */}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        onValuesChange={saveDraft}
                        size="large"
                    >
                        {/* Informations Personnelles */}
                        <Card
                            title={<><UserOutlined className="mr-2" />Informations Personnelles</>}
                            className="mb-6 shadow-sm"
                        >
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="nom"
                                        label="Nom"
                                        rules={[{ required: true, message: 'Le nom est obligatoire' }]}
                                    >
                                        <Input prefix={<UserOutlined />} placeholder="Votre nom" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="prenom"
                                        label="Prénom"
                                        rules={[{ required: true, message: 'Le prénom est obligatoire' }]}
                                    >
                                        <Input prefix={<UserOutlined />} placeholder="Votre prénom" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            { required: true, message: 'L\'email est obligatoire' },
                                            { type: 'email', message: 'Email invalide' }
                                        ]}
                                    >
                                        <Input prefix={<MailOutlined />} placeholder="votre.email@exemple.com" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="telephone"
                                        label="Téléphone (optionnel)"
                                    >
                                        <Input prefix={<PhoneOutlined />} placeholder="+212 6XX XXX XXX" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Informations Scientifiques */}
                        <Card
                            title={<><TeamOutlined className="mr-2" />Informations Scientifiques</>}
                            className="mb-6 shadow-sm"
                        >
                            <Form.Item
                                name="auteurs"
                                label="Liste des auteurs"
                                rules={[{ required: true, message: 'La liste des auteurs est obligatoire' }]}
                                extra="Format: Nom1 A., Nom2 B., Nom3 C., etc."
                            >
                                <Input
                                    prefix={<TeamOutlined />}
                                    placeholder="Nom1 A., Nom2 B., Nom3 C."
                                />
                            </Form.Item>
                            <Form.Item
                                name="affiliation"
                                label="Affiliation"
                                rules={[{ required: true, message: 'L\'affiliation est obligatoire' }]}
                            >
                                <Input
                                    prefix={<BankOutlined />}
                                    placeholder="Service de Chirurgie, CHU Mohammed VI, Marrakech"
                                />
                            </Form.Item>
                        </Card>

                        {/* Type et Catégorie */}
                        <Card
                            title={<><FileTextOutlined className="mr-2" />Type et Catégorie</>}
                            className="mb-6 shadow-sm"
                        >
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="type"
                                        label="Type de communication"
                                        rules={[{ required: true, message: 'Sélectionnez un type' }]}
                                    >
                                        <Select
                                            placeholder="Sélectionnez un type"
                                            onChange={handleTypeChange}
                                        >
                                            {Object.entries(TYPE_LABELS).map(([value, label]) => (
                                                <Option key={value} value={value}>{label}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="rubrique"
                                        label="Rubrique"
                                        rules={[{ required: true, message: 'Sélectionnez une rubrique' }]}
                                    >
                                        <Select placeholder="Sélectionnez une rubrique">
                                            {Object.entries(RUBRIQUE_LABELS).map(([value, label]) => (
                                                <Option key={value} value={value}>{label}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {showVideoUrl && (
                                <Form.Item
                                    name="urlVideo"
                                    label="URL de la vidéo"
                                    rules={[
                                        { required: true, message: 'L\'URL de la vidéo est obligatoire' },
                                        { type: 'url', message: 'URL invalide' }
                                    ]}
                                >
                                    <Input placeholder="https://..." />
                                </Form.Item>
                            )}
                        </Card>

                        {/* Contenu Scientifique */}
                        <Card
                            title={<><FileTextOutlined className="mr-2" />Contenu Scientifique</>}
                            className="mb-6 shadow-sm"
                        >
                            <Form.Item
                                name="titre"
                                label="Titre de l'abstract"
                                rules={[
                                    { required: true, message: 'Le titre est obligatoire' },
                                    { max: 300, message: 'Maximum 300 caractères' }
                                ]}
                            >
                                <Input
                                    placeholder="Titre de votre abstract"
                                    showCount
                                    maxLength={300}
                                />
                            </Form.Item>

                            <Form.Item
                                name="motsCles"
                                label="Mots-clés (optionnel)"
                            >
                                <Input placeholder="Mots-clés séparés par des virgules" />
                            </Form.Item>

                            <Divider />

                            <Form.Item
                                name="introduction"
                                label="Introduction"
                                rules={[
                                    { required: true, message: 'L\'introduction est obligatoire' },
                                    { min: 50, message: 'Minimum 50 caractères' }
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Contexte et objectifs de l'étude..."
                                    showCount
                                />
                            </Form.Item>

                            <Form.Item
                                name="materielMethodes"
                                label="Matériel et méthodes"
                                rules={[
                                    { required: true, message: 'Le matériel et méthodes est obligatoire' },
                                    { min: 50, message: 'Minimum 50 caractères' }
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Type d'étude, population, méthodes..."
                                    showCount
                                />
                            </Form.Item>

                            <Form.Item
                                name="resultats"
                                label="Résultats"
                                rules={[
                                    { required: true, message: 'Les résultats sont obligatoires' },
                                    { min: 50, message: 'Minimum 50 caractères' }
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Principaux résultats de l'étude..."
                                    showCount
                                />
                            </Form.Item>

                            <Form.Item
                                name="discussion"
                                label="Discussion"
                                rules={[
                                    { required: true, message: 'La discussion est obligatoire' },
                                    { min: 50, message: 'Minimum 50 caractères' }
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Interprétation des résultats, comparaison avec la littérature..."
                                    showCount
                                />
                            </Form.Item>

                            <Form.Item
                                name="conclusion"
                                label="Conclusion"
                                rules={[
                                    { required: true, message: 'La conclusion est obligatoire' },
                                    { min: 50, message: 'Minimum 50 caractères' }
                                ]}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Conclusions principales de l'étude..."
                                    showCount
                                />
                            </Form.Item>

                            <Form.Item
                                name="references"
                                label="Références (optionnel)"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="1. Auteur A, et al. Titre. Journal. 2024;&#10;2. Auteur B, et al. Titre. Journal. 2023;"
                                />
                            </Form.Item>
                        </Card>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                icon={<SendOutlined />}
                                className="bg-gradient-to-r from-blue-600 to-teal-500 border-0 h-12 px-8"
                            >
                                {loading ? 'Soumission en cours...' : 'Soumettre l\'abstract'}
                            </Button>
                            <Button
                                size="large"
                                onClick={() => form.resetFields()}
                                className="h-12 px-8"
                            >
                                Réinitialiser
                            </Button>
                        </div>

                        <Text type="secondary" className="block text-center mt-4">
                            Vos données sont sauvegardées automatiquement en local.
                        </Text>
                    </Form>
                </div>
            </main>
            <Footer />
        </>
    );
}
