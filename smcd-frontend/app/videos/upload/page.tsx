'use client';

import { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Upload,
    message,
    Card,
    Typography,
    Progress,
    Result,
    Alert,
    Radio,
    Space,
} from 'antd';
import {
    InboxOutlined,
    VideoCameraOutlined,
    CheckCircleOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import api from '@/lib/axios';
import { RUBRIQUE_LABELS } from '@/types';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

export default function UploadVideoPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [uploadType, setUploadType] = useState<'file' | 'url'>('url'); // Par défaut URL

    const rubriquesOptions = Object.entries(RUBRIQUE_LABELS).map(([value, label]) => ({
        value,
        label,
    }));

    const validateFile = (file: File): boolean => {
        const isVideo = file.type.startsWith('video/') ||
            file.name.endsWith('.mp4') ||
            file.name.endsWith('.avi') ||
            file.name.endsWith('.mov') ||
            file.name.endsWith('.wmv') ||
            file.name.endsWith('.flv');

        if (!isVideo) {
            message.error('Seuls les fichiers vidéo (.mp4, .avi, .mov, .wmv, .flv) sont autorisés');
            return false;
        }

        const isLt500M = file.size / 1024 / 1024 < 500;
        if (!isLt500M) {
            message.error('Le fichier ne doit pas dépasser 500 MB');
            return false;
        }

        return true;
    };

    const handleSubmit = async (values: Record<string, unknown>) => {
        // Validation selon le type
        if (uploadType === 'file' && fileList.length === 0) {
            message.error('Veuillez sélectionner un fichier vidéo');
            return;
        }
        
        if (uploadType === 'url' && !values.videoUrl) {
            message.error('Veuillez entrer l\'URL de la vidéo');
            return;
        }

        setLoading(true);
        setUploadProgress(0);

        try {
            if (uploadType === 'url') {
                // Envoi avec URL
                const data = {
                    nomAuteur: values.nomAuteur,
                    prenomAuteur: values.prenomAuteur,
                    emailAuteur: values.emailAuteur,
                    titre: values.titre,
                    videoUrl: values.videoUrl,
                    rubrique: values.rubrique,
                    description: values.description,
                };

                await api.post('/videos/upload-url', data);
                message.success('Vidéo soumise avec succès!');
            } else {
                // Envoi avec fichier
                const formData = new FormData();
                formData.append('file', fileList[0].originFileObj as File);
                formData.append('nomAuteur', values.nomAuteur as string);
                formData.append('prenomAuteur', values.prenomAuteur as string);
                formData.append('emailAuteur', values.emailAuteur as string);
                formData.append('titre', values.titre as string);
                if (values.rubrique) {
                    formData.append('rubrique', values.rubrique as string);
                }
                if (values.description) {
                    formData.append('description', values.description as string);
                }

                await api.post('/videos/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = progressEvent.total
                            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            : 0;
                        setUploadProgress(progress);
                    },
                });
                message.success('Vidéo soumise avec succès!');
            }

            setSubmitted(true);
            form.resetFields();
            setFileList([]);
        } catch (error: unknown) {
            console.error('Erreur lors de l\'upload:', error);
            const err = error as { response?: { data?: { message?: string } } };
            message.error(err.response?.data?.message || 'Erreur lors de la soumission de la vidéo');
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        fileList,
        beforeUpload: (file: File) => {
            if (validateFile(file)) {
                setFileList([file as unknown as UploadFile]);
            }
            return false; // Empêche l'upload automatique
        },
        onRemove: () => {
            setFileList([]);
        },
    };

    if (submitted) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gray-50">
                    {/* Hero Section */}
                    <div className="relative bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#1a365d] text-white py-20 overflow-hidden">
                        {/* Animated particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
                            <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-1000"></div>
                            <div className="absolute w-80 h-80 bg-teal-400/40 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
                        </div>

                        <div className="container mx-auto px-4 relative z-10">
                            <div className="text-center max-w-3xl mx-auto">
                                <h1 className="text-5xl font-bold mb-4 italic" style={{ fontFamily: 'Georgia, serif' }}>
                                    Upload Communication Video
                                </h1>
                                <p className="text-xl text-gray-300">
                                    Soumettez votre communication vidéo
                                </p>
                                <div className="flex items-center justify-center gap-2 text-white/80 mt-6">
                                    <span>Accueil</span>
                                    <span>/</span>
                                    <span>E-Posters 2026</span>
                                    <span>/</span>
                                    <span className="text-cyan-400">Upload Communication Video</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-16">
                        <div className="max-w-2xl mx-auto">
                            <Result
                                status="success"
                                title="Vidéo soumise avec succès!"
                                subTitle="Votre communication vidéo a été envoyée et sera évaluée par le comité scientifique. Vous recevrez une confirmation par email."
                                extra={[
                                    <Button
                                        key="another"
                                        type="primary"
                                        onClick={() => setSubmitted(false)}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        Soumettre une autre vidéo
                                    </Button>,
                                    <Button key="home" href="/">
                                        Retour à l&apos;accueil
                                    </Button>,
                                ]}
                            />
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#1a365d] text-white py-20 overflow-hidden">
                    {/* Animated particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
                        <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-1000"></div>
                        <div className="absolute w-80 h-80 bg-teal-400/40 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-5xl font-bold mb-4 italic" style={{ fontFamily: 'Georgia, serif' }}>
                                Upload Communication Video
                            </h1>
                            <p className="text-xl text-gray-300">
                                Soumettez votre communication vidéo pour le congrès SMCD 2026
                            </p>
                            <div className="flex items-center justify-center gap-2 text-white/80 mt-6">
                                <span>Accueil</span>
                                <span>/</span>
                                <span>E-Posters 2026</span>
                                <span>/</span>
                                <span className="text-cyan-400">Upload Communication Video</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto">
                        <Alert
                            title="Choix de la méthode"
                            description={
                                <Space orientation="vertical" className="w-full">
                                    <Text>Choisissez la méthode qui vous convient :</Text>
                                    <ul className="list-disc list-inside">
                                        <li><strong>URL Bunny</strong> : Recommandé pour de meilleures performances et streaming rapide</li>
                                        <li><strong>Upload fichier</strong> : Pour uploader directement depuis votre ordinateur (max 500 MB)</li>
                                    </ul>
                                </Space>
                            }
                            type="info"
                            showIcon
                            className="mb-8"
                        />

                        <Card className="shadow-lg mb-6">
                            <Form.Item label="Méthode de soumission">
                                <Radio.Group
                                    value={uploadType}
                                    onChange={(e) => setUploadType(e.target.value)}
                                    className="w-full"
                                >
                                    <Space orientation="vertical" className="w-full">
                                        <Radio value="url">
                                            <Space>
                                                <LinkOutlined />
                                                <span>URL Bunny (Recommandé)</span>
                                            </Space>
                                        </Radio>
                                        <Radio value="file">
                                            <Space>
                                                <InboxOutlined />
                                                <span>Upload fichier vidéo</span>
                                            </Space>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Card>

                        <Card className="shadow-lg">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                className="space-y-6"
                            >
                                <Title level={3} className="!mb-6 flex items-center gap-2">
                                    <VideoCameraOutlined className="text-blue-600" />
                                    Informations de la Vidéo
                                </Title>

                                <Form.Item
                                    label="Nom de l'auteur"
                                    name="nomAuteur"
                                    rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
                                >
                                    <Input size="large" placeholder="Ex: Bennani" />
                                </Form.Item>

                                <Form.Item
                                    label="Prénom de l'auteur"
                                    name="prenomAuteur"
                                    rules={[{ required: true, message: 'Veuillez entrer votre prénom' }]}
                                >
                                    <Input size="large" placeholder="Ex: Ahmed" />
                                </Form.Item>

                                <Form.Item
                                    label="Email de l'auteur"
                                    name="emailAuteur"
                                    rules={[
                                        { required: true, message: 'Veuillez entrer votre email' },
                                        { type: 'email', message: 'Email invalide' },
                                    ]}
                                >
                                    <Input size="large" type="email" placeholder="Ex: ahmed.bennani@example.com" />
                                </Form.Item>

                                <Form.Item
                                    label="Titre de la communication"
                                    name="titre"
                                    rules={[{ required: true, message: 'Veuillez entrer le titre' }]}
                                >
                                    <Input size="large" placeholder="Ex: Nouvelles techniques en chirurgie digestive" />
                                </Form.Item>

                                <Form.Item
                                    label="Rubrique / Thématique"
                                    name="rubrique"
                                    rules={[{ required: true, message: 'Veuillez sélectionner une rubrique' }]}
                                >
                                    <Select
                                        size="large"
                                        placeholder="Sélectionnez une rubrique"
                                        options={rubriquesOptions}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Description (optionnel)"
                                    name="description"
                                >
                                    <Input.TextArea
                                        rows={4}
                                        placeholder="Brève description de votre communication vidéo..."
                                    />
                                </Form.Item>

                                {uploadType === 'url' ? (
                                    <Form.Item
                                        label="URL de la vidéo Bunny"
                                        name="videoUrl"
                                        rules={[
                                            { required: true, message: 'Veuillez entrer l\'URL de la vidéo' },
                                            { type: 'url', message: 'URL invalide' },
                                        ]}
                                        help="Collez l'URL de votre vidéo hébergée sur Bunny.net"
                                    >
                                        <Input
                                            size="large"
                                            prefix={<LinkOutlined />}
                                            placeholder="https://example.b-cdn.net/video.mp4"
                                        />
                                    </Form.Item>
                                ) : (
                                    <Form.Item
                                        label="Fichier Vidéo"
                                        required
                                        help="Formats acceptés : MP4, AVI, MOV, WMV, FLV (max 500 MB)"
                                    >
                                        <Dragger {...uploadProps} className="hover:border-blue-600">
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined className="text-blue-600" />
                                            </p>
                                            <p className="ant-upload-text">
                                                Cliquez ou glissez-déposez votre fichier vidéo ici
                                            </p>
                                            <p className="ant-upload-hint">
                                                Formats : MP4, AVI, MOV, WMV, FLV (max 500 MB)
                                            </p>
                                        </Dragger>
                                    </Form.Item>
                                )}

                                {loading && uploadProgress > 0 && uploadType === 'file' && (
                                    <div className="mb-4">
                                        <Progress
                                            percent={uploadProgress}
                                            status="active"
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                        <Text className="text-center block mt-2">
                                            Upload en cours... {uploadProgress}%
                                        </Text>
                                    </div>
                                )}

                                <Form.Item className="mb-0">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={loading}
                                        block
                                        icon={<CheckCircleOutlined />}
                                        className="bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold"
                                    >
                                        {loading ? 'Upload en cours...' : 'Soumettre la vidéo'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
