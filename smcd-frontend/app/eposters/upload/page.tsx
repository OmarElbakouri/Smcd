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
} from 'antd';
import {
    InboxOutlined,
    FileOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import api from '@/lib/axios';
import { RUBRIQUE_LABELS } from '@/types';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

export default function UploadEPosterPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const rubriquesOptions = Object.entries(RUBRIQUE_LABELS).map(([value, label]) => ({
        value,
        label,
    }));

    const validateFile = (file: File): boolean => {
        const isPPT = file.type === 'application/vnd.ms-powerpoint' ||
            file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
            file.name.endsWith('.ppt') ||
            file.name.endsWith('.pptx');

        if (!isPPT) {
            message.error('Seuls les fichiers PowerPoint (.ppt, .pptx) sont autorisés');
            return false;
        }

        const isLt50M = file.size / 1024 / 1024 < 50;
        if (!isLt50M) {
            message.error('Le fichier ne doit pas dépasser 50 MB');
            return false;
        }

        return true;
    };

    const handleSubmit = async (values: Record<string, unknown>) => {
        if (fileList.length === 0) {
            message.error('Veuillez sélectionner un fichier PowerPoint');
            return;
        }

        setLoading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', fileList[0].originFileObj as File);
        formData.append('nomAuteur', values.nomAuteur as string);
        formData.append('prenomAuteur', values.prenomAuteur as string);
        formData.append('emailAuteur', values.emailAuteur as string);
        formData.append('titre', values.titre as string);
        if (values.rubrique) {
            formData.append('rubrique', values.rubrique as string);
        }

        try {
            await api.post('/eposters/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setUploadProgress(percent);
                },
            });

            setSubmitted(true);
            message.success('E-poster uploadé avec succès !');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            message.error(err.response?.data?.message || 'Erreur lors de l\'upload');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow bg-gray-50 py-12">
                    <div className="max-w-2xl mx-auto px-4">
                        <Result
                            status="success"
                            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                            title="E-Poster uploadé avec succès !"
                            subTitle="Votre e-poster a été soumis et sera examiné par l'équipe d'organisation. Vous recevrez un email de confirmation."
                            extra={[
                                <Button type="primary" key="gallery" href="/eposters">
                                    Voir la galerie
                                </Button>,
                                <Button key="new" onClick={() => {
                                    setSubmitted(false);
                                    setFileList([]);
                                    form.resetFields();
                                }}>
                                    Soumettre un autre
                                </Button>,
                            ]}
                        />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Title level={2}>
                            <FileOutlined className="mr-2" />
                            Uploader un E-Poster
                        </Title>
                        <Text className="text-gray-600">
                            Partagez votre présentation avec la communauté SMCD
                        </Text>
                    </div>

                    {/* Instructions */}
                    <Alert
                        title="Instructions"
                        description={
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Formats acceptés : <strong>PPT, PPTX</strong> (PowerPoint)</li>
                                <li>Taille maximale : <strong>50 MB</strong></li>
                                <li>Votre e-poster sera examiné avant publication</li>
                                <li>Vous recevrez un email de notification sous 48h</li>
                            </ul>
                        }
                        type="info"
                        showIcon
                        className="mb-6"
                    />

                    <Card className="shadow-lg">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            disabled={loading}
                        >
                            {/* Informations personnelles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    label="Nom"
                                    name="nomAuteur"
                                    rules={[{ required: true, message: 'Le nom est obligatoire' }]}
                                >
                                    <Input placeholder="Votre nom" />
                                </Form.Item>

                                <Form.Item
                                    label="Prénom"
                                    name="prenomAuteur"
                                    rules={[{ required: true, message: 'Le prénom est obligatoire' }]}
                                >
                                    <Input placeholder="Votre prénom" />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Email"
                                name="emailAuteur"
                                rules={[
                                    { required: true, message: 'L\'email est obligatoire' },
                                    { type: 'email', message: 'Email invalide' },
                                ]}
                            >
                                <Input placeholder="votre.email@exemple.com" />
                            </Form.Item>

                            <Form.Item
                                label="Titre de l'e-poster"
                                name="titre"
                                rules={[
                                    { required: true, message: 'Le titre est obligatoire' },
                                    { max: 300, message: 'Le titre ne peut pas dépasser 300 caractères' },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Titre de votre e-poster"
                                    rows={2}
                                    showCount
                                    maxLength={300}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Rubrique"
                                name="rubrique"
                            >
                                <Select
                                    placeholder="Sélectionnez une rubrique (optionnel)"
                                    options={rubriquesOptions}
                                    allowClear
                                />
                            </Form.Item>

                            {/* Upload */}
                            <Form.Item
                                label="Fichier PowerPoint"
                                required
                            >
                                <Dragger
                                    name="file"
                                    fileList={fileList}
                                    maxCount={1}
                                    beforeUpload={(file) => {
                                        if (validateFile(file)) {
                                            setFileList([{
                                                uid: '-1',
                                                name: file.name,
                                                status: 'done',
                                                originFileObj: file,
                                                size: file.size,
                                            }]);
                                        }
                                        return false; // Prevent auto upload
                                    }}
                                    onRemove={() => {
                                        setFileList([]);
                                    }}
                                    accept=".ppt,.pptx"
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Cliquez ou glissez-déposez votre fichier ici
                                    </p>
                                    <p className="ant-upload-hint">
                                        Fichiers PowerPoint (.ppt, .pptx) - Max 50 MB
                                    </p>
                                </Dragger>
                            </Form.Item>

                            {/* Progress */}
                            {loading && uploadProgress > 0 && (
                                <div className="mb-4">
                                    <Paragraph className="text-center mb-2">
                                        Upload en cours...
                                    </Paragraph>
                                    <Progress
                                        percent={uploadProgress}
                                        status="active"
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                    />
                                </div>
                            )}

                            {/* Submit */}
                            <Form.Item className="mb-0">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    loading={loading}
                                    disabled={fileList.length === 0}
                                >
                                    {loading ? 'Upload en cours...' : 'Uploader l\'e-poster'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
