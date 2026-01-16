'use client';

import { useState } from 'react';
import { Card, Row, Col, Typography, Form, Input, Button, Switch, message, Divider } from 'antd';
import { SettingOutlined, SaveOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        // Simulation de sauvegarde
        setTimeout(() => {
            message.success('Paramètres enregistrés');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <Title level={3}>
                <SettingOutlined className="mr-2" />
                Paramètres
            </Title>

            <Row gutter={[24, 24]}>
                {/* Configuration générale */}
                <Col xs={24} lg={12}>
                    <Card title="Configuration du Congrès" className="shadow-sm h-full">
                        <Form layout="vertical">
                            <Form.Item label="Nom du congrès">
                                <Input defaultValue="Congrès National de Chirurgie Digestive 2026" />
                            </Form.Item>
                            <Form.Item label="Année">
                                <Input defaultValue="2026" type="number" />
                            </Form.Item>
                            <Form.Item label="Lieu">
                                <Input defaultValue="Casablanca, Maroc" />
                            </Form.Item>
                            <Form.Item label="Dates">
                                <Input defaultValue="À confirmer" />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                {/* Contact */}
                <Col xs={24} lg={12}>
                    <Card title="Informations de contact" className="shadow-sm h-full">
                        <Form layout="vertical">
                            <Form.Item label="Email de contact">
                                <Input
                                    prefix={<MailOutlined />}
                                    defaultValue="contact@smcd.ma"
                                />
                            </Form.Item>
                            <Form.Item label="Téléphone">
                                <Input defaultValue="+212 5XX-XXXXXX" />
                            </Form.Item>
                            <Form.Item label="Site web">
                                <Input
                                    prefix={<GlobalOutlined />}
                                    defaultValue="https://smcd.ma"
                                />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                {/* Options */}
                <Col xs={24}>
                    <Card title="Options" className="shadow-sm">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Text strong>Inscriptions ouvertes</Text>
                                    <Paragraph type="secondary" className="!mb-0">
                                        Permettre les nouvelles inscriptions au congrès
                                    </Paragraph>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between">
                                <div>
                                    <Text strong>Soumission d'abstracts</Text>
                                    <Paragraph type="secondary" className="!mb-0">
                                        Accepter les nouvelles soumissions d'abstracts
                                    </Paragraph>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between">
                                <div>
                                    <Text strong>Upload d'e-posters</Text>
                                    <Paragraph type="secondary" className="!mb-0">
                                        Permettre l'upload de nouveaux e-posters
                                    </Paragraph>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end">
                <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    size="large"
                    loading={loading}
                    onClick={handleSave}
                >
                    Enregistrer les paramètres
                </Button>
            </div>
        </div>
    );
}
