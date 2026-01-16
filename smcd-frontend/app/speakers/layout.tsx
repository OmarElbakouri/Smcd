import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invités et Conférenciers - Congrès SMCD 2026',
    description: 'Découvrez les experts internationaux et nationaux qui interviendront au Congrès National de Chirurgie Digestive 2026',
    keywords: ['conférenciers', 'invités', 'experts', 'chirurgie digestive', 'SMCD'],
};

export default function SpeakersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
