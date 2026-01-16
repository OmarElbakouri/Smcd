'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    Table,
    Button,
    Tag,
    Select,
    Input,
    Space,
    Modal,
    Typography,
    Statistic,
    Row,
    Col,
    message,
    Popconfirm,
    Form,
    Upload,
    Switch,
    Avatar,
    Drawer,
} from 'antd';
import {
    UserOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    UploadOutlined,
    StarFilled,
    GlobalOutlined,
    DragOutlined,
} from '@ant-design/icons';
import api from '@/lib/axios';
import {
    type SpeakerAdmin,
    type SpeakerStats,
    type SpeakerFilterOptions,
} from '@/types';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function AdminSpeakersPage() {
    const [speakers, setSpeakers] = useState<SpeakerAdmin[]>([]);
    const [stats, setStats] = useState<SpeakerStats | null>(null);
    const [filters, setFilters] = useState<SpeakerFilterOptions | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPays, setSelectedPays] = useState<string | null>(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [editingSpeaker, setEditingSpeaker] = useState<SpeakerAdmin | null>(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [photoFileList, setPhotoFileList] = useState<UploadFile[]>([]);
    const [cvFileList, setCvFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, [selectedPays]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('annee', '2026');
            if (selectedPays) params.append('pays', selectedPays);

            const [speakersRes, statsRes, filtersRes] = await Promise.all([
                api.get(`/speakers/admin?${params.toString()}`),
                api.get('/speakers/stats?annee=2026'),
                api.get('/speakers/filters'),
            ]);

            setSpeakers(speakersRes.data);
            setStats(statsRes.data);
            setFilters(filtersRes.data);
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDrawer = (speaker?: SpeakerAdmin) => {
        if (speaker) {
            setEditingSpeaker(speaker);
            form.setFieldsValue({
                titre: speaker.titre,
                nom: speaker.nom,
                prenom: speaker.prenom,
                specialite: speaker.specialite,
                institution: speaker.institution,
                pays: speaker.pays,
                ville: speaker.ville,
                bioCourteFr: speaker.bioCourteFr,
                bioCompleteFr: speaker.bioCompleteFr,
                bioCourteEn: speaker.bioCourteEn,
                bioCompleteEn: speaker.bioCompleteEn,
                email: speaker.email,
                telephone: speaker.telephone,
                siteWeb: speaker.siteWeb,
                linkedinUrl: speaker.linkedinUrl,
                researchGateUrl: speaker.researchGateUrl,
                featured: speaker.featured,
            });
            setPhotoFileList([]);
            setCvFileList([]);
        } else {
            setEditingSpeaker(null);
            form.resetFields();
            setPhotoFileList([]);
            setCvFileList([]);
        }
        setDrawerVisible(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSubmitLoading(true);

            const formData = new FormData();
            
            // Ajouter les champs
            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    formData.append(key, String(value));
                }
            });

            // Ajouter la photo
            if (photoFileList.length > 0 && photoFileList[0].originFileObj) {
                formData.append('photo', photoFileList[0].originFileObj);
            } else if (!editingSpeaker) {
                message.error('La photo est obligatoire');
                setSubmitLoading(false);
                return;
            }

            // Ajouter le CV
            if (cvFileList.length > 0 && cvFileList[0].originFileObj) {
                formData.append('cv', cvFileList[0].originFileObj);
            }

            if (editingSpeaker) {
                await api.put(`/speakers/${editingSpeaker.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Invité modifié avec succès');
            } else {
                await api.post('/speakers', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Invité ajouté avec succès');
            }

            setDrawerVisible(false);
            fetchData();
        } catch (error: unknown) {
            console.error('Erreur:', error);
            const err = error as { response?: { data?: { message?: string } } };
            message.error(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/speakers/${id}`);
            message.success('Invité supprimé');
            fetchData();
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Erreur lors de la suppression');
        }
    };

    const filteredSpeakers = speakers.filter((s) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            s.nom.toLowerCase().includes(term) ||
            s.prenom.toLowerCase().includes(term) ||
            s.specialite?.toLowerCase().includes(term) ||
            s.institution?.toLowerCase().includes(term)
        );
    });

    const columns = [
        {
            title: 'Photo',
            key: 'photo',
            width: 60,
            render: (_: unknown, record: SpeakerAdmin) => (
                <Avatar src={record.photoUrl} icon={<UserOutlined />} size={48} />
            ),
        },
        {
            title: 'Nom',
            key: 'nom',
            render: (_: unknown, record: SpeakerAdmin) => (
                <div>
                    <Text strong>
                        {record.featured && <StarFilled className="text-yellow-500 mr-1" />}
                        {record.nomComplet}
                    </Text>
                    <br />
                    <Text className="text-xs text-gray-500">{record.email}</Text>
                </div>
            ),
        },
        {
            title: 'Spécialité',
            dataIndex: 'specialite',
            key: 'specialite',
            render: (spec: string) => spec || '-',
        },
        {
            title: 'Institution',
            dataIndex: 'institution',
            key: 'institution',
            render: (inst: string) => (
                <Text className="line-clamp-2">{inst || '-'}</Text>
            ),
        },
        {
            title: 'Pays',
            key: 'pays',
            render: (_: unknown, record: SpeakerAdmin) => (
                <div className="flex items-center gap-1">
                    <GlobalOutlined />
                    <span>{record.localisation || '-'}</span>
                </div>
            ),
        },
        {
            title: 'Ordre',
            dataIndex: 'ordre',
            key: 'ordre',
            width: 70,
            align: 'center' as const,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: SpeakerAdmin) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleOpenDrawer(record)}
                    >
                        Modifier
                    </Button>
                    <Popconfirm
                        title="Supprimer cet invité ?"
                        description="Cette action est irréversible."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Supprimer"
                        cancelText="Annuler"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Title level={3}>
                    <UserOutlined className="mr-2" />
                    Gestion des Invités & Conférenciers
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenDrawer()}
                >
                    Ajouter un invité
                </Button>
            </div>

            {/* Stats */}
            {stats && (
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={8}>
                        <Card>
                            <Statistic
                                title="Total"
                                value={stats.total}
                                prefix={<UserOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Card>
                            <Statistic
                                title="Invités d'honneur"
                                value={stats.featured}
                                prefix={<StarFilled />}
                                styles={{ content: { color: '#faad14' } }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Card>
                            <Statistic
                                title="Pays représentés"
                                value={Object.keys(stats.parPays || {}).length}
                                prefix={<GlobalOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Filtres */}
            <Card>
                <div className="flex flex-wrap gap-4 items-center">
                    <Input
                        placeholder="Rechercher..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />

                    {filters && (
                        <Select
                            value={selectedPays}
                            onChange={setSelectedPays}
                            style={{ width: 180 }}
                            placeholder="Tous les pays"
                            allowClear
                            options={filters.pays.map((p) => ({ value: p, label: p }))}
                        />
                    )}

                    <Button onClick={fetchData}>Actualiser</Button>
                </div>
            </Card>

            {/* Tableau */}
            <Card>
                <Table
                    columns={columns}
                    dataSource={filteredSpeakers}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1000 }}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `${total} invité(s)`,
                    }}
                />
            </Card>

            {/* Drawer pour ajouter/modifier */}
            <Drawer
                title={editingSpeaker ? 'Modifier l\'invité' : 'Ajouter un invité'}
                open={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                size="large"
                extra={
                    <Space>
                        <Button onClick={() => setDrawerVisible(false)}>Annuler</Button>
                        <Button type="primary" onClick={handleSubmit} loading={submitLoading}>
                            {editingSpeaker ? 'Modifier' : 'Ajouter'}
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    {/* Photo */}
                    <Form.Item label="Photo" required={!editingSpeaker}>
                        {editingSpeaker && (
                            <div className="mb-2">
                                <Avatar src={editingSpeaker.photoUrl} size={64} icon={<UserOutlined />} />
                                <Text className="ml-2 text-gray-500">Photo actuelle</Text>
                            </div>
                        )}
                        <Upload
                            listType="picture-card"
                            fileList={photoFileList}
                            beforeUpload={(file) => {
                                setPhotoFileList([{
                                    uid: '-1',
                                    name: file.name,
                                    status: 'done',
                                    originFileObj: file,
                                }]);
                                return false;
                            }}
                            onRemove={() => setPhotoFileList([])}
                            accept="image/*"
                            maxCount={1}
                        >
                            {photoFileList.length === 0 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>
                                        {editingSpeaker ? 'Changer' : 'Upload'}
                                    </div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    {/* Informations de base */}
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="titre" label="Titre">
                                <Select
                                    placeholder="Titre"
                                    options={[
                                        { value: 'Dr.', label: 'Dr.' },
                                        { value: 'Pr.', label: 'Pr.' },
                                        { value: 'Prof.', label: 'Prof.' },
                                    ]}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="prenom"
                                label="Prénom"
                                rules={[{ required: true, message: 'Requis' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="nom"
                                label="Nom"
                                rules={[{ required: true, message: 'Requis' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="specialite" label="Spécialité">
                        <Input placeholder="Ex: Chirurgie hépato-biliaire" />
                    </Form.Item>

                    <Form.Item name="institution" label="Institution">
                        <Input placeholder="Ex: CHU Ibn Rochd, Casablanca" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="pays" label="Pays">
                                <Input placeholder="Ex: Maroc" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="ville" label="Ville">
                                <Input placeholder="Ex: Casablanca" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="bioCourteFr" label="Bio courte (FR)" extra="Max 500 caractères">
                        <TextArea rows={3} maxLength={500} showCount />
                    </Form.Item>

                    <Form.Item name="bioCompleteFr" label="Bio complète (FR)">
                        <TextArea rows={6} />
                    </Form.Item>

                    <Form.Item name="bioCourteEn" label="Bio courte (EN)" extra="Optionnel">
                        <TextArea rows={3} maxLength={500} showCount />
                    </Form.Item>

                    <Form.Item name="bioCompleteEn" label="Bio complète (EN)" extra="Optionnel">
                        <TextArea rows={6} />
                    </Form.Item>

                    {/* Contact */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="email" label="Email (privé)">
                                <Input type="email" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="telephone" label="Téléphone (privé)">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Liens */}
                    <Form.Item name="siteWeb" label="Site web">
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item name="linkedinUrl" label="LinkedIn">
                        <Input placeholder="https://linkedin.com/in/..." />
                    </Form.Item>

                    <Form.Item name="researchGateUrl" label="ResearchGate">
                        <Input placeholder="https://researchgate.net/..." />
                    </Form.Item>

                    {/* CV */}
                    <Form.Item label="CV (PDF)">
                        {editingSpeaker?.cvUrl && (
                            <div className="mb-2">
                                <a href={editingSpeaker.cvUrl} target="_blank" rel="noopener noreferrer">
                                    CV actuel
                                </a>
                            </div>
                        )}
                        <Upload
                            fileList={cvFileList}
                            beforeUpload={(file) => {
                                if (file.type !== 'application/pdf') {
                                    message.error('Seuls les PDF sont acceptés');
                                    return false;
                                }
                                setCvFileList([{
                                    uid: '-1',
                                    name: file.name,
                                    status: 'done',
                                    originFileObj: file,
                                }]);
                                return false;
                            }}
                            onRemove={() => setCvFileList([])}
                            accept=".pdf"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>
                                {editingSpeaker?.cvUrl ? 'Changer le CV' : 'Upload CV'}
                            </Button>
                        </Upload>
                    </Form.Item>

                    {/* Featured */}
                    <Form.Item
                        name="featured"
                        label="Invité d'honneur"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Oui" unCheckedChildren="Non" />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}
