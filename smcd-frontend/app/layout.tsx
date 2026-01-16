import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SMCD - Société Marocaine de Chirurgie Digestive',
    template: '%s | SMCD 2026',
  },
  description: 'Congrès National de Chirurgie Digestive 2026 - Société Marocaine de Chirurgie Digestive. Soumission d\'abstracts, e-posters et programme scientifique.',
  keywords: ['chirurgie', 'digestive', 'congrès', 'Maroc', 'SMCD', 'médecine', 'chirurgien', 'abstract', 'poster'],
  authors: [{ name: 'SMCD' }],
  creator: 'Société Marocaine de Chirurgie Digestive',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://smcd.ma',
    siteName: 'SMCD Congrès 2026',
    title: 'SMCD - Congrès National de Chirurgie Digestive 2026',
    description: 'Rejoignez-nous pour le Congrès National de Chirurgie Digestive 2026 à Casablanca, Maroc.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
