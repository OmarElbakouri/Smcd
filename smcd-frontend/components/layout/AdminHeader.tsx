'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Button, Avatar, message } from 'antd';
import type { MenuProps } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { logout, getCurrentUser } from '@/lib/auth';

interface AdminHeaderProps {
    collapsed: boolean;
    onToggleCollapse: () => void;
}

/**
 * Header de l'espace admin
 * Affiche le bouton de collapse, les notifications et le menu utilisateur
 */
export default function AdminHeader({ collapsed, onToggleCollapse }: AdminHeaderProps) {
    const router = useRouter();
    const user = getCurrentUser();
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        try {
            logout();
            message.success('Déconnexion réussie');
        } catch {
            message.error('Erreur lors de la déconnexion');
            setLoading(false);
        }
    };

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Mon profil',
            onClick: () => router.push('/admin/settings'),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Déconnexion',
            onClick: handleLogout,
            danger: true,
        },
    ];

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
            {/* Left side - Toggle button */}
            <div className="flex items-center space-x-4">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={onToggleCollapse}
                    className="text-lg"
                />
            </div>

            {/* Right side - Notifications and User menu */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button
                    type="text"
                    icon={<BellOutlined />}
                    className="text-lg relative"
                >
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                        3
                    </span>
                </Button>

                {/* User Dropdown */}
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
                        <Avatar
                            size="default"
                            icon={<UserOutlined />}
                            className="bg-gradient-to-r from-blue-500 to-teal-400"
                        />
                        <div className="hidden sm:block">
                            <div className="text-sm font-medium text-gray-900">
                                {user?.prenom} {user?.nom}
                            </div>
                            <div className="text-xs text-gray-500">{user?.role}</div>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </header>
    );
}
