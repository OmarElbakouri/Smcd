'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { isAuthenticated, verifySession } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Vérifier si le token existe
            if (!isAuthenticated()) {
                router.replace(ROUTES.ADMIN_LOGIN);
                return;
            }

            // Vérifier la validité du token auprès du serveur
            try {
                await verifySession();
                setLoading(false);
            } catch {
                router.replace(ROUTES.ADMIN_LOGIN);
            }
        };

        checkAuth();
    }, [router]);

    // Afficher un loader pendant la vérification
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="large" tip="Vérification de la session..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <AdminSidebar collapsed={collapsed} />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <AdminHeader
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed(!collapsed)}
                />

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
