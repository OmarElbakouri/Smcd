'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    DashboardOutlined,
    FileTextOutlined,
    PictureOutlined,
    VideoCameraOutlined,
    TeamOutlined,
    FolderOutlined,
    SettingOutlined,
    TrophyOutlined,
} from '@ant-design/icons';
import { ROUTES } from '@/lib/constants';

interface MenuItem {
    key: string;
    icon: React.ReactNode;
    label: string;
    path: string;
}

const menuItems: MenuItem[] = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Tableau de bord',
        path: ROUTES.ADMIN_DASHBOARD,
    },
    {
        key: 'abstracts',
        icon: <FileTextOutlined />,
        label: 'Abstracts',
        path: ROUTES.ADMIN_ABSTRACTS,
    },
    {
        key: 'eposters',
        icon: <PictureOutlined />,
        label: 'E-Posters',
        path: ROUTES.ADMIN_EPOSTERS,
    },
    {
        key: 'communications-videos',
        icon: <VideoCameraOutlined />,
        label: 'Communications Vidéo',
        path: '/admin/communications-videos',
    },
    {
        key: 'speakers',
        icon: <TeamOutlined />,
        label: 'Intervenants',
        path: ROUTES.ADMIN_SPEAKERS,
    },
    {
        key: 'videos',
        icon: <VideoCameraOutlined />,
        label: 'Vidéothèque',
        path: ROUTES.ADMIN_VIDEOS,
    },
    {
        key: 'documents',
        icon: <FolderOutlined />,
        label: 'Documents',
        path: ROUTES.ADMIN_DOCUMENTS,
    },
    {
        key: 'sponsors',
        icon: <TrophyOutlined />,
        label: 'Partenaires',
        path: ROUTES.ADMIN_SPONSORS,
    },
    {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Paramètres',
        path: ROUTES.ADMIN_SETTINGS,
    },
];

interface AdminSidebarProps {
    collapsed?: boolean;
}

/**
 * Sidebar de l'espace admin
 * Navigation verticale avec icônes et indication de la page active
 */
export default function AdminSidebar({ collapsed = false }: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <aside className={`bg-gray-900 text-white h-full transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/* Logo */}
            <div className="h-16 flex items-center justify-center border-b border-gray-800">
                <Link href={ROUTES.ADMIN_DASHBOARD} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    {!collapsed && (
                        <div>
                            <span className="text-lg font-bold">SMCD</span>
                            <span className="text-xs text-gray-400 block">Administration</span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="mt-4 px-2">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.key}>
                            <Link
                                href={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                        ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                title={collapsed ? item.label : undefined}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {!collapsed && <span className="font-medium">{item.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Version */}
            {!collapsed && (
                <div className="absolute bottom-4 left-0 right-0 px-4">
                    <div className="text-center text-xs text-gray-500">
                        SMCD Congress v1.0.0
                    </div>
                </div>
            )}
        </aside>
    );
}
