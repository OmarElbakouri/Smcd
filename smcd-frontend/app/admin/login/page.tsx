'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Input, Button, message, Card, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, LoadingOutlined } from '@ant-design/icons';
import { login, isAuthenticated } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';
import type { LoginRequest } from '@/types';

// Composant de login interne qui utilise useSearchParams
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Rediriger si déjà connecté
    useEffect(() => {
        if (isAuthenticated()) {
            const redirect = searchParams.get('redirect') || ROUTES.ADMIN_DASHBOARD;
            router.replace(redirect);
        }
    }, [router, searchParams]);

    const onFinish = async (values: LoginRequest) => {
        setLoading(true);
        try {
            await login(values);
            message.success('Connexion réussie !');

            // Rediriger vers la page demandée ou le dashboard
            const redirect = searchParams.get('redirect') || ROUTES.ADMIN_DASHBOARD;
            router.push(redirect);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Email ou mot de passe incorrect';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-2xl rounded-2xl border-0">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                size="large"
            >
                <Form.Item
                    name="email"
                    label={<span className="font-medium text-gray-700">Adresse email</span>}
                    rules={[
                        { required: true, message: 'Veuillez entrer votre email' },
                        { type: 'email', message: 'Veuillez entrer un email valide' }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="admin@smcd.ma"
                        className="rounded-lg h-12"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={<span className="font-medium text-gray-700">Mot de passe</span>}
                    rules={[{ required: true, message: 'Veuillez entrer votre mot de passe' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="••••••••"
                        className="rounded-lg h-12"
                    />
                </Form.Item>

                <Form.Item className="mb-0 mt-6">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<LoginOutlined />}
                        className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 border-0 text-lg font-semibold hover:from-blue-700 hover:to-teal-600"
                    >
                        Se connecter
                    </Button>
                </Form.Item>
            </Form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Identifiants de démonstration :</p>
                <p className="text-sm text-blue-600">
                    Email: <code className="bg-blue-100 px-1 rounded">admin@smcd.ma</code>
                </p>
                <p className="text-sm text-blue-600">
                    Mot de passe: <code className="bg-blue-100 px-1 rounded">Admin123!</code>
                </p>
            </div>
        </Card>
    );
}

// Fallback pendant le chargement
function LoginFormFallback() {
    return (
        <Card className="shadow-2xl rounded-2xl border-0">
            <div className="flex justify-center items-center py-16">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        </Card>
    );
}

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center p-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                            SMCD
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
                    <p className="text-blue-100">Connectez-vous pour accéder au tableau de bord</p>
                </div>

                {/* Login Form avec Suspense */}
                <Suspense fallback={<LoginFormFallback />}>
                    <LoginForm />
                </Suspense>

                {/* Footer */}
                <p className="text-center text-blue-200 text-sm mt-6">
                    © 2026 Société Marocaine de Chirurgie Digestive
                </p>
            </div>
        </div>
    );
}
