'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Result, Button, Card, Typography, Space } from 'antd';
import { CheckCircleOutlined, HomeOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const { Title, Paragraph, Text } = Typography;

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const numeroReference = searchParams.get('ref') || 'SMCD2026-XXX';

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="shadow-xl rounded-2xl overflow-hidden">
                    <Result
                        icon={
                            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <CheckCircleOutlined className="text-5xl text-white" />
                            </div>
                        }
                        title={
                            <Title level={2} className="!mb-0">
                                Soumission réussie !
                            </Title>
                        }
                        subTitle={
                            <Paragraph className="text-gray-600 text-lg">
                                Votre abstract a été soumis avec succès pour le Congrès National de Chirurgie Digestive 2026.
                            </Paragraph>
                        }
                        extra={
                            <Space orientation="vertical" size="large" className="w-full">
                                {/* Numéro de référence */}
                                <div className="bg-blue-50 p-6 rounded-xl text-center">
                                    <Text type="secondary" className="block mb-2">
                                        Numéro de référence
                                    </Text>
                                    <Title level={2} className="!mb-0 !text-blue-600">
                                        {numeroReference}
                                    </Title>
                                    <Text type="secondary" className="block mt-2 text-sm">
                                        Conservez ce numéro pour le suivi de votre soumission
                                    </Text>
                                </div>

                                {/* Informations */}
                                <div className="text-left space-y-4">
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <MailOutlined className="text-xl text-blue-600 mt-1" />
                                        <div>
                                            <Text strong className="block">Email de confirmation</Text>
                                            <Text type="secondary">
                                                Vous recevrez un email de confirmation avec votre abstract formaté en pièce jointe.
                                            </Text>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                        <Text strong className="block text-amber-800">
                                            Délai de révision
                                        </Text>
                                        <Text className="text-amber-700">
                                            Le comité scientifique examinera votre soumission dans un délai de 4 semaines.
                                            Vous recevrez une notification par email concernant la décision.
                                        </Text>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Link href="/abstracts/submit">
                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<PlusOutlined />}
                                            className="bg-gradient-to-r from-blue-600 to-teal-500 border-0 h-12 px-6"
                                        >
                                            Soumettre un autre abstract
                                        </Button>
                                    </Link>
                                    <Link href="/">
                                        <Button
                                            size="large"
                                            icon={<HomeOutlined />}
                                            className="h-12 px-6"
                                        >
                                            Retour à l&apos;accueil
                                        </Button>
                                    </Link>
                                </div>
                            </Space>
                        }
                    />
                </Card>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <>
            <Header />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            }>
                <ConfirmationContent />
            </Suspense>
            <Footer />
        </>
    );
}
