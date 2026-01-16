import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'E-Posters - Congrès SMCD 2026',
    description: 'Consultez et téléchargez les e-posters du Congrès National de Chirurgie Digestive 2026',
    keywords: ['e-posters', 'présentations', 'chirurgie digestive', 'SMCD', 'congrès'],
};

export default function EPostersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
