'use client';

import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { SendOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CONGRESS_INFO } from '@/lib/constants';
import axiosInstance from '@/lib/axios';

const { TextArea } = Input;

interface ContactFormData {
    nom: string;
    email: string;
    sujet: string;
    message: string;
}

export default function ContactPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: ContactFormData) => {
        setLoading(true);
        try {
            // Construire les params pour la requête
            const params = new URLSearchParams();
            params.append('nom', values.nom);
            params.append('email', values.email);
            params.append('sujet', values.sujet);
            params.append('message', values.message);

            await axiosInstance.post(`/public/contact?${params.toString()}`);
            message.success('Votre message a été envoyé avec succès !');
            form.resetFields();
        } catch (error) {
            message.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section - Style Homepage */}
                <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#1a365d] overflow-hidden">
                    {/* Particules décoratives */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-[10%] w-2 h-2 bg-cyan-400/30 rounded-full" />
                        <div className="absolute top-40 left-[20%] w-1 h-1 bg-white/20 rounded-full" />
                        <div className="absolute top-32 right-[15%] w-1.5 h-1.5 bg-teal-400/40 rounded-full" />
                        <div className="absolute bottom-20 left-[30%] w-1 h-1 bg-cyan-300/30 rounded-full" />
                        <div className="absolute bottom-32 right-[25%] w-2 h-2 bg-white/10 rounded-full" />
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
                            Contactez-nous
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Une question ? N&apos;hésitez pas à nous contacter. Notre équipe vous répondra dans les meilleurs délais.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-4">
                            <span>Home</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Contact</span>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Envoyez-nous un message
                                </h2>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    requiredMark={false}
                                >
                                    <Form.Item
                                        name="nom"
                                        label={<span className="font-medium text-gray-700">Nom complet</span>}
                                        rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
                                    >
                                        <Input
                                            placeholder="Dr. Mohammed Alami"
                                            size="large"
                                            className="rounded-lg"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        label={<span className="font-medium text-gray-700">Email</span>}
                                        rules={[
                                            { required: true, message: 'Veuillez entrer votre email' },
                                            { type: 'email', message: 'Veuillez entrer un email valide' }
                                        ]}
                                    >
                                        <Input
                                            placeholder="exemple@email.com"
                                            size="large"
                                            className="rounded-lg"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="sujet"
                                        label={<span className="font-medium text-gray-700">Sujet</span>}
                                        rules={[{ required: true, message: 'Veuillez entrer le sujet' }]}
                                    >
                                        <Input
                                            placeholder="Question sur le congrès"
                                            size="large"
                                            className="rounded-lg"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="message"
                                        label={<span className="font-medium text-gray-700">Message</span>}
                                        rules={[{ required: true, message: 'Veuillez entrer votre message' }]}
                                    >
                                        <TextArea
                                            placeholder="Votre message..."
                                            rows={5}
                                            className="rounded-lg"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            icon={<SendOutlined />}
                                            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 border-0 text-lg font-semibold"
                                        >
                                            Envoyer le message
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Informations de contact
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Vous pouvez également nous contacter directement via les coordonnées ci-dessous.
                                </p>

                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MailOutlined className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Email</h3>
                                            <a href={`mailto:${CONGRESS_INFO.email}`} className="text-blue-600 hover:underline">
                                                {CONGRESS_INFO.email}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone - President */}
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <PhoneOutlined className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Président</h3>
                                            <a href="tel:00212661176899" className="text-blue-600 hover:underline">
                                                00212 661 176 899
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone - Trésorier */}
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <PhoneOutlined className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Trésorier</h3>
                                            <a href="tel:00212661230833" className="text-blue-600 hover:underline">
                                                00212 661 230 833
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone - Trésorier adjoint */}
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <PhoneOutlined className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Trésorier adjoint</h3>
                                            <a href="tel:00212664286771" className="text-blue-600 hover:underline">
                                                00212 664 286 771
                                            </a>
                                        </div>
                                    </div>

                                    {/* Website */}
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Site web</h3>
                                            <a href="https://www.smcd.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                www.smcd.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <EnvironmentOutlined className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Adresse</h3>
                                            <p className="text-gray-600">CHU Ibn Rochd – Casablanca</p>
                                            <p className="text-gray-600">Rue des Hôpitaux, Casablanca</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Map placeholder */}
                                <div className="mt-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <EnvironmentOutlined className="text-4xl mb-2" />
                                        <p className="font-medium">Carte interactive</p>
                                        <p className="text-sm">Bientôt disponible</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 lg:py-24 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Questions fréquentes
                        </h2>

                        <div className="space-y-4">
                            {[
                                {
                                    question: "Comment soumettre un abstract ?",
                                    answer: "Vous pouvez soumettre votre abstract via notre plateforme en ligne. Connectez-vous ou créez un compte, puis suivez les instructions du formulaire de soumission."
                                },
                                {
                                    question: "Quelles sont les dates limites de soumission ?",
                                    answer: "Les dates limites seront communiquées prochainement. Inscrivez-vous à notre newsletter pour être informé."
                                },
                                {
                                    question: "Comment me faire rembourser en cas d'annulation ?",
                                    answer: "Veuillez nous contacter directement par email pour toute demande de remboursement. Nous traiterons votre demande dans les plus brefs délais."
                                },
                            ].map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
