'use client';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
    size?: 'small' | 'default' | 'large';
    tip?: string;
    fullScreen?: boolean;
}

/**
 * Composant de chargement réutilisable
 * Peut être affiché en plein écran ou inline
 */
export default function LoadingSpinner({
    size = 'large',
    tip = 'Chargement...',
    fullScreen = false
}: LoadingSpinnerProps) {
    const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 48 : size === 'default' ? 32 : 24 }} spin />;

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50">
                <div className="text-center">
                    <Spin indicator={antIcon} size={size} />
                    <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">{tip}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <Spin indicator={antIcon} size={size} />
            <p className="mt-4 text-gray-600 font-medium">{tip}</p>
        </div>
    );
}
