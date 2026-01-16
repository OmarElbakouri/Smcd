'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Card, Row, Col, Button, Space, Input, message, Typography, List, Modal, Form, Tabs
} from 'antd';
import {
    EditOutlined, SaveOutlined, SyncOutlined, FileTextOutlined
} from '@ant-design/icons';
import axiosInstance from '@/lib/axios';
import type { ContenuStatique } from '@/types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Clés prédéfinies avec labels
const CONTENU_KEYS = [
    { key: 'mot_president', label: 'Mot du président', icon: '👤' },
    { key: 'a_propos', label: 'À propos de la SMCD', icon: '📋' },
    { key: 'mission', label: 'Mission', icon: '🎯' },
    { key: 'vision', label: 'Vision', icon: '👁️' },
    { key: 'valeurs', label: 'Valeurs', icon: '💎' },
    { key: 'histoire', label: 'Historique', icon: '📚' },
    { key: 'comite_organisation', label: 'Comité d\'organisation', icon: '👥' },
    { key: 'comite_scientifique', label: 'Comité scientifique', icon: '🔬' },
    { key: 'mentions_legales', label: 'Mentions légales', icon: '⚖️' },
    { key: 'politique_confidentialite', label: 'Politique de confidentialité', icon: '🔒' },
    { key: 'cgu', label: 'Conditions générales', icon: '📄' },
];

export default function AdminContentPage() {
    const [contenus, setContenus] = useState<ContenuStatique[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal édition
    const [editModal, setEditModal] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [form] = Form.useForm();

    const fetchContenus = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<ContenuStatique[]>('/contenu');
            setContenus(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des contenus');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContenus();
    }, [fetchContenus]);

    // Ouvrir modal d'édition
    const handleEdit = (key: string) => {
        const contenu = contenus.find(c => c.cle === key);
        setCurrentKey(key);
        form.setFieldsValue({
            titreFr: contenu?.titreFr || '',
            titreEn: contenu?.titreEn || '',
            contenuFr: contenu?.contenuFr || '',
            contenuEn: contenu?.contenuEn || '',
        });
        setEditModal(true);
    };

    // Sauvegarder
    const handleSave = async (values: { titreFr: string; titreEn?: string; contenuFr: string; contenuEn?: string }) => {
        if (!currentKey) return;

        setEditLoading(true);

        const formData = new FormData();
        formData.append('titreFr', values.titreFr);
        if (values.titreEn) formData.append('titreEn', values.titreEn);
        formData.append('contenuFr', values.contenuFr);
        if (values.contenuEn) formData.append('contenuEn', values.contenuEn);

        try {
            await axiosInstance.put(`/contenu/${currentKey}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Contenu mis à jour');
            setEditModal(false);
            fetchContenus();
        } catch (error) {
            message.error('Erreur lors de la mise à jour');
        } finally {
            setEditLoading(false);
        }
    };

    // Trouver un contenu par clé
    const getContenu = (key: string) => contenus.find(c => c.cle === key);

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <Card className="shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <Title level={4} className="!mb-1">Gestion du contenu</Title>
                        <Text type="secondary">
                            Modifiez le contenu des pages statiques du site
                        </Text>
                    </div>
                    <Button icon={<SyncOutlined />} onClick={fetchContenus} loading={loading}>
                        Actualiser
                    </Button>
                </div>
            </Card>

            {/* Liste des contenus */}
            <Row gutter={[16, 16]}>
                {CONTENU_KEYS.map(({ key, label, icon }) => {
                    const contenu = getContenu(key);
                    const hasContent = contenu?.contenuFr && contenu.contenuFr !== '<p>Contenu à définir...</p>';

                    return (
                        <Col key={key} xs={24} md={12} lg={8}>
                            <Card
                                className={`shadow-sm h-full transition-all hover:shadow-md cursor-pointer ${hasContent ? 'border-green-200' : 'border-orange-200'
                                    }`}
                                onClick={() => handleEdit(key)}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <Title level={5} className="!mb-0">{label}</Title>
                                            <Button
                                                type="text"
                                                icon={<EditOutlined />}
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(key);
                                                }}
                                            />
                                        </div>
                                        <Text type="secondary" className="text-xs">
                                            {hasContent ? (
                                                <span className="text-green-600">✓ Contenu défini</span>
                                            ) : (
                                                <span className="text-orange-500">⚠ À compléter</span>
                                            )}
                                        </Text>
                                        {contenu?.dateModification && (
                                            <Text type="secondary" className="text-xs block mt-1">
                                                Modifié le {new Date(contenu.dateModification).toLocaleDateString('fr-FR')}
                                            </Text>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* Modal édition */}
            <Modal
                title={
                    <div className="flex items-center gap-2">
                        <FileTextOutlined />
                        Modifier : {CONTENU_KEYS.find(c => c.key === currentKey)?.label}
                    </div>
                }
                open={editModal}
                onCancel={() => setEditModal(false)}
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                >
                    <Tabs
                        items={[
                            {
                                key: 'fr',
                                label: '🇫🇷 Français',
                                children: (
                                    <>
                                        <Form.Item
                                            name="titreFr"
                                            label="Titre"
                                        >
                                            <Input placeholder="Titre du contenu" />
                                        </Form.Item>
                                        <Form.Item
                                            name="contenuFr"
                                            label="Contenu"
                                            rules={[{ required: true, message: 'Le contenu est obligatoire' }]}
                                        >
                                            <TextArea
                                                rows={12}
                                                placeholder="Contenu HTML ou texte..."
                                                className="font-mono text-sm"
                                            />
                                        </Form.Item>
                                    </>
                                ),
                            },
                            {
                                key: 'en',
                                label: '🇬🇧 English (optionnel)',
                                children: (
                                    <>
                                        <Form.Item
                                            name="titreEn"
                                            label="Title"
                                        >
                                            <Input placeholder="Content title" />
                                        </Form.Item>
                                        <Form.Item
                                            name="contenuEn"
                                            label="Content"
                                        >
                                            <TextArea
                                                rows={12}
                                                placeholder="HTML or text content..."
                                                className="font-mono text-sm"
                                            />
                                        </Form.Item>
                                    </>
                                ),
                            },
                        ]}
                    />

                    <div className="bg-gray-50 p-3 rounded text-sm mb-4">
                        <Text type="secondary">
                            💡 <strong>Conseil :</strong> Vous pouvez utiliser du HTML pour formater le contenu.
                            Exemple : &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;...
                        </Text>
                    </div>

                    <Form.Item className="mb-0 text-right">
                        <Space>
                            <Button onClick={() => setEditModal(false)}>
                                Annuler
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={editLoading}
                                icon={<SaveOutlined />}
                            >
                                Enregistrer
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
