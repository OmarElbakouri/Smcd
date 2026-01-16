'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CONGRESS_INFO, ROUTES } from '@/lib/constants';

interface NavItem {
    label: string;
    path?: string;
    children?: { label: string; path: string }[];
}

/**
 * Premium Header - Clean, Minimal, Professional
 */
export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Simplified navigation - cleaner, more professional
    const navItems: NavItem[] = [
        { label: 'Accueil', path: ROUTES.HOME },
        {
            label: 'Le Congrès',
            children: [
                { label: 'À propos', path: '/about' },
                { label: 'Thématiques', path: '/thematiques' },
                { label: 'Programme', path: '/programme' },
                { label: 'Comité Scientifique', path: '/comite-scientifique' },
                { label: 'Comité d\'Organisation', path: '/comite-organisation' },
            ]
        },
        { label: 'Intervenants', path: ROUTES.SPEAKERS },
        {
            label: 'Ressources',
            children: [
                { label: 'Vidéothèque', path: ROUTES.VIDEOS },
                { label: 'E-Posters 2026', path: ROUTES.EPOSTERS },
                { label: 'Documents', path: '/documents' },
                { label: 'Archives', path: '/archives' },
            ]
        },
        { label: 'Partenaires', path: ROUTES.SPONSORS },
        { label: 'Contact', path: ROUTES.CONTACT },
    ];

    const isActive = (path: string) => pathname === path;
    const isHomePage = pathname === '/';

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100'
                    : isHomePage
                        ? 'bg-transparent'
                        : 'bg-[#0A1628]'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <Link href={ROUTES.HOME} className="flex items-center group">
                            <div className="h-14 w-auto flex items-center">
                                <Image
                                    src="/smcd-logo.png"
                                    alt="SMCD - Société Marocaine de Chirurgie Digestive"
                                    width={140}
                                    height={56}
                                    className="object-contain h-14 w-auto"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                item.children ? (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => handleMouseEnter(item.label)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button
                                            className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isScrolled
                                                ? 'text-gray-600 hover:text-[#0A1628] hover:bg-gray-50'
                                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {item.label}
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Dropdown */}
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${openDropdown === item.label
                                                ? 'opacity-100 visible translate-y-0'
                                                : 'opacity-0 invisible -translate-y-2'
                                                }`}
                                        >
                                            <div className="py-2">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        href={child.path}
                                                        className={`block px-4 py-3 text-sm transition-colors ${pathname === child.path
                                                            ? 'bg-[#00D4AA]/10 text-[#00D4AA] font-medium'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#0A1628]'
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
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive(item.path!)
                                            ? isScrolled
                                                ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                                                : 'bg-white/10 text-white'
                                            : isScrolled
                                                ? 'text-gray-600 hover:text-[#0A1628] hover:bg-gray-50'
                                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}
                        </nav>

                        {/* CTA & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/abstracts/submit"
                                className={`hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${isScrolled
                                    ? 'bg-[#00D4AA] text-[#0A1628] hover:bg-[#00B894] shadow-sm hover:shadow-md'
                                    : 'bg-white text-[#0A1628] hover:bg-gray-100'
                                    }`}
                            >
                                Soumettre
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${isScrolled
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
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="bg-white border-t border-gray-100">
                        <nav className="max-w-7xl mx-auto px-6 py-6 space-y-2">
                            {navItems.map((item) => (
                                item.children ? (
                                    <div key={item.label} className="space-y-1">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {item.label}
                                        </div>
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.path}
                                                href={child.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`block px-4 py-3 rounded-lg text-sm font-medium ${pathname === child.path
                                                    ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.path}
                                        href={item.path!}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-lg text-sm font-medium ${isActive(item.path!)
                                            ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}
                            <Link
                                href="/abstracts/submit"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 mt-4 text-center rounded-full text-sm font-semibold bg-[#00D4AA] text-[#0A1628]"
                            >
                                Soumettre un Abstract
                            </Link>
                        </nav>
                    </div>
                </div>
            </header >

            {/* Spacer for non-homepage */}
            {!isHomePage && <div className="h-20" />}
        </>
    );
}
