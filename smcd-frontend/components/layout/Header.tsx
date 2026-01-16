'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CONGRESS_INFO, ROUTES } from '@/lib/constants';

// Types pour les items de navigation
interface NavItem {
    label: string;
    path?: string;
    children?: { label: string; path: string }[];
}

/**
 * Header public du site - Design moderne avec effet scroll et dropdowns
 * Affiche le logo, la navigation avec sous-menus et un CTA
 */
export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Gestion du dropdown avec délai pour éviter les fermetures accidentelles
    const handleMouseEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    const navItems: NavItem[] = [
        { label: 'Accueil', path: ROUTES.HOME },
        { 
            label: `Le Congrès ${CONGRESS_INFO.year}`,
            children: [
                { label: 'Comité D\'organisation', path: '/comite-organisation' },
                { label: 'Comité Scientifique', path: '/comite-scientifique' },
                { label: 'Thématiques', path: '/thematiques' },
                { label: 'Invités, Conférenciers', path: '/invites' },
            ]
        },
        { label: 'Programme Du Congrès', path: '/programme' },
        { 
            label: 'E-Posters 2026',
            children: [
                { label: 'Upload E-Poster', path: '/eposters/upload' },
                { label: 'Upload Communication Video', path: '/videos/upload' },
                { label: 'Visualiser Les E-Poster 2025', path: '/archives/eposters/2025' },
                { label: 'Visualiser Les E-Poster 2024', path: '/archives/eposters/2024' },
            ]
        },
        { label: 'Vidéos', path: ROUTES.VIDEOS },
        { label: 'ARCHIVES', path: '/archives' },
        { label: 'Intervenants', path: ROUTES.SPEAKERS },
        { label: 'Partenaires', path: ROUTES.SPONSORS },
        { label: 'Contact', path: ROUTES.CONTACT },
    ];

    const isActive = (path: string) => pathname === path;
    const isHomePage = pathname === '/';

    return (
        <>
            <header 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled || !isHomePage
                        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo et titre */}
                        <Link href={ROUTES.HOME} className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
                                <Image 
                                    src="/smcd-logo.svg" 
                                    alt="SMCD Logo" 
                                    width={48} 
                                    height={48}
                                    className="object-contain drop-shadow-lg"
                                />
                            </div>
                            <div>
                                <span className={`text-xl font-bold transition-colors duration-300 ${
                                    isScrolled || !isHomePage ? 'text-gray-900' : 'text-white'
                                }`}>
                                    SMCD
                                </span>
                                <span className={`hidden sm:block text-xs transition-colors duration-300 ${
                                    isScrolled || !isHomePage ? 'text-gray-500' : 'text-white/70'
                                }`}>
                                    Congrès {CONGRESS_INFO.year}
                                </span>
                            </div>
                        </Link>

                        {/* Navigation desktop */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item) => (
                                item.children ? (
                                    // Item avec dropdown
                                    <div 
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => handleMouseEnter(item.label)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button
                                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                                isScrolled || !isHomePage
                                                    ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`}
                                        >
                                            {item.label}
                                            <svg 
                                                className={`ml-1 w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Dropdown menu */}
                                        <div 
                                            className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                                                openDropdown === item.label 
                                                    ? 'opacity-100 visible translate-y-0' 
                                                    : 'opacity-0 invisible -translate-y-2'
                                            }`}
                                        >
                                            <div className="py-2">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        href={child.path}
                                                        className={`block px-4 py-3 text-sm transition-colors ${
                                                            pathname === child.path
                                                                ? 'bg-teal-50 text-teal-600 font-medium'
                                                                : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'
                                                        }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Item simple
                                    <Link
                                        key={item.path}
                                        href={item.path!}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            isActive(item.path!)
                                                ? isScrolled || !isHomePage
                                                    ? 'bg-teal-50 text-teal-600'
                                                    : 'bg-white/20 text-white'
                                                : isScrolled || !isHomePage
                                                    ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/abstracts/submit"
                                className={`hidden md:inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                                    isScrolled || !isHomePage
                                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400'
                                        : 'bg-white text-teal-700 hover:bg-gray-100'
                                }`}
                            >
                                Soumettre un Abstract
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>

                            {/* Menu mobile button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                                    isScrolled || !isHomePage
                                        ? 'text-gray-600 hover:bg-gray-100'
                                        : 'text-white hover:bg-white/10'
                                }`}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div 
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${
                        isMobileMenuOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="bg-white border-t border-gray-100 shadow-xl">
                        <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                            {navItems.map((item) => (
                                item.children ? (
                                    // Item mobile avec sous-menu
                                    <div key={item.label}>
                                        <button
                                            onClick={() => setMobileOpenDropdown(mobileOpenDropdown === item.label ? null : item.label)}
                                            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            {item.label}
                                            <svg 
                                                className={`w-4 h-4 transition-transform duration-200 ${mobileOpenDropdown === item.label ? 'rotate-180' : ''}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-200 ${mobileOpenDropdown === item.label ? 'max-h-64' : 'max-h-0'}`}>
                                            <div className="pl-4 space-y-1 py-2">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        href={child.path}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={`block px-4 py-2 rounded-lg text-sm ${
                                                            pathname === child.path
                                                                ? 'bg-teal-50 text-teal-600 font-medium'
                                                                : 'text-gray-500 hover:bg-gray-50 hover:text-teal-600'
                                                        }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.path}
                                        href={item.path!}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                            isActive(item.path!)
                                                ? 'bg-teal-50 text-teal-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}
                            <Link
                                href="/abstracts/submit"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white mt-4"
                            >
                                Soumettre un Abstract
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            
            {/* Spacer pour le header fixe (seulement sur les pages non-homepage) */}
            {!isHomePage && <div className="h-20" />}
        </>
    );
}
