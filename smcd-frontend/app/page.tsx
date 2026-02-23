'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CONGRESS_INFO, API_URL } from '@/lib/constants';

interface Speaker {
  id: number;
  nom: string;
  prenom: string;
  titre: string;
  specialite: string;
  institution: string;
  photoUrl: string;
  pays?: string;
}

interface President {
  id: number;
  nom: string;
  prenom: string;
  titre: string;
  nomComplet: string;
  specialite: string;
  institution: string;
  photoUrl: string;
  messagePresident: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [president, setPresident] = useState<President | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const congressDate = new Date('2026-06-26T09:00:00');

  useEffect(() => {
    setIsVisible(true);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = congressDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speakersRes, presidentRes] = await Promise.all([
          axios.get(`${API_URL}/speakers?featured=true&annee=2026`).catch(() => ({ data: [] })),
          axios.get(`${API_URL}/speakers/president?annee=2026`).catch(() => ({ data: null }))
        ]);

        const speakersData = speakersRes.data.filter((s: Speaker & { isPresident?: boolean }) => !s.isPresident);
        setSpeakers(speakersData.slice(0, 4));
        if (presidentRes.data) setPresident(presidentRes.data);
      } catch (error) {
        console.error('Erreur chargement données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1628]">
      <Header />

      <main className="flex-grow">
        {/* ================================================
            HERO SECTION - Congress Poster Style
            ================================================ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/afficheSmcd.png)' }}
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/50 via-[#0A1628]/40 to-[#0A1628]/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/50 via-transparent to-[#0A1628]/60" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent" />
          </div>

          {/* Poster Content */}
          <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Top Bar - Organization Logos */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12">
              {/* Appel à communications Box removed from here to avoid duplication */}

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Image src="/logoSmcd.png" alt="SMCD" width={50} height={50} className="object-contain" />
                <div className="text-left">
                  <p className="text-white text-xs font-bold leading-tight">الجمعية المغربية</p>
                  <p className="text-white text-xs font-bold leading-tight">لجراحة الجهاز الهضمي</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Image src="/smcd-logo.png" alt="SMCD Logo" width={50} height={50} className="object-contain" />
                <div className="text-left">
                  <p className="text-white text-xs font-bold leading-tight">Société Marocaine de</p>
                  <p className="text-white text-xs font-bold leading-tight">Chirurgie Digestive</p>
                </div>
              </div>
            </div>

            {/* Main Poster Grid - Title Left / Themes Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">

              {/* Left Side - Congress Title */}
              <div className="text-left">
                <div className="mb-8 pr-4">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-tight uppercase">
                    Appel à <br />
                    <span className="gradient-text animate-[pulse_2s_ease-in-out_infinite]">communications</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium mt-1">(Orale, affichée et vidéo (7min))</p>
                  <div className="inline-block bg-[#00D4AA] text-[#0A1628] px-5 py-2 rounded-lg font-black text-lg md:text-2xl mt-4 animate-bounce shadow-[0_0_20px_rgba(0,212,170,0.5)]">
                    Date limite: 31 Mars 2026
                  </div>
                </div>

                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80 leading-tight mb-4">
                  Congrès de<br />
                  <span className="text-2xl md:text-3xl lg:text-4xl">Chirurgie SMCD 2026</span>
                </h1>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#00D4AA] to-cyan-400 rounded-full mt-4 mb-6" />
                <p className="text-lg text-white/50 font-light max-w-md">
                  L&apos;événement incontournable de la chirurgie digestive au Maroc.
                  Innovation, Excellence, Partage.
                </p>
              </div>

              {/* Right Side - Event Themes */}
              <div className="space-y-6">
                {/* Séances plénières */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-[#00D4AA] mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                    Séances plénières :
                  </h3>
                  <ul className="space-y-1.5 text-white/80 text-sm ml-7">
                    <li>- Le cancer de l&apos;estomac</li>
                    <li>- Les urgences biliaires lithiasiques</li>
                  </ul>
                </div>

                {/* Séances thématiques */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-[#FF6B35] mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                    Séances thématiques :
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-white/80 text-sm ml-7">
                    <li>- Hepatobiliaire</li>
                    <li>- Colorectale</li>
                    <li>- Pancreas</li>
                    <li>- Œsogastrique</li>
                    <li>- Pariétale</li>
                    <li>- Robotique</li>
                    <li>- Bariatrique</li>
                    <li>- Urgences</li>
                    <li>- Endocrinienne</li>
                    <li>- Autres</li>
                  </ul>
                </div>

                {/* Pré-Programme */}
                <Link
                  href="/programme"
                  className="block bg-gradient-to-r from-[#00D4AA]/20 to-cyan-500/15 backdrop-blur-sm rounded-2xl p-5 border border-[#00D4AA]/30 hover:border-[#00D4AA]/60 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#00D4AA] flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" /></svg>
                      Pré-Programme
                    </h3>
                    <svg className="w-5 h-5 text-[#00D4AA] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>

                {/* Venue Card */}
                <div className="bg-gradient-to-r from-[#00D4AA]/15 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-[#00D4AA]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-[#00D4AA]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    <div>
                      <p className="text-white font-bold text-lg">{CONGRESS_INFO.venue}</p>
                      <p className="text-white/60 text-sm">{CONGRESS_INFO.location}</p>
                    </div>
                  </div>
                  <p className="text-[#00D4AA] font-bold text-xl tracking-wide text-center">{CONGRESS_INFO.dates}</p>
                </div>

                {/* Inscription Button */}
                <Link
                  href="/sponsoring#autres-tarifs"
                  className="block bg-[#00D4AA] hover:bg-[#00C49A] text-[#0A1628] text-center font-bold text-lg rounded-2xl p-4 transition-all duration-300 shadow-[0_0_20px_rgba(0,212,170,0.3)] hover:shadow-[0_0_30px_rgba(0,212,170,0.5)] group"
                >
                  Inscription
                  <svg className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
              {[
                { value: timeLeft.days, label: 'Jours' },
                { value: timeLeft.hours, label: 'Heures' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Secondes' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center p-5 md:p-7 glass-card min-w-[90px] md:min-w-[120px] transition-all duration-300 hover:bg-white/10"
                >
                  <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider mt-2 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/abstracts/submit" className="btn-primary group">
                Soumettre un Abstract
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/videos" className="btn-secondary group">
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Voir les Vidéos
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-white/30">
              <span className="text-xs uppercase tracking-widest">Découvrir</span>
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-white/40 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            KEY THEMES - Bento Grid Style
            ================================================ */}
        <section className="relative py-32 bg-[#0A1628]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-widest text-[#00D4AA] bg-[#00D4AA]/10 rounded-full">
                Thématiques 2026
              </span>
              <h2 className="heading-lg text-white mb-6">
                Au Cœur de <span className="gradient-text">l'Innovation</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-white/50">
                Trois axes majeurs qui façonnent l'avenir de la chirurgie digestive
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 - Large - Cancer de l'estomac */}
              <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A5F] to-[#0D2847] p-8 md:p-12 border border-white/5 transition-all duration-500 hover:border-[#00D4AA]/30">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D4AA]/10 rounded-full blur-[100px] transition-all duration-500 group-hover:bg-[#00D4AA]/20" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-8 rounded-2xl bg-[#00D4AA]/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#00D4AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Le Cancer de l'Estomac</h3>
                </div>
              </div>

              {/* Card 2 - Urgences biliaires */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A5F] to-[#0D2847] p-8 border border-white/5 transition-all duration-500 hover:border-[#FF6B35]/30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6B35]/10 rounded-full blur-[80px] transition-all duration-500 group-hover:bg-[#FF6B35]/20" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-6 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Les Urgences Biliaires Lithiasiques</h3>
                </div>
              </div>

              {/* Card 3 - Approche multidisciplinaire */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A5F] to-[#0D2847] p-8 border border-white/5 transition-all duration-500 hover:border-purple-500/30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px] transition-all duration-500 group-hover:bg-purple-500/20" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-6 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Approche Multidisciplinaire</h3>
                </div>
              </div>

              {/* Attentes du Congrès Header */}
              <div className="lg:col-span-3 text-center mt-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Attentes du <span className="gradient-text">Congrès :</span>
                </h3>
              </div>

              {/* Card 4 - Stats */}
              <div className="lg:col-span-3 rounded-3xl bg-gradient-to-r from-[#00D4AA]/10 to-[#00D4AA]/5 p-8 md:p-12 border border-[#00D4AA]/20 max-w-3xl mx-auto w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: '300+', label: 'Participants' },
                    { value: '+30', label: 'Sponsors' },
                    { value: '80%', label: 'Chirurgiens' },
                    { value: '2', label: 'Jours' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            PRESIDENT MESSAGE - Elegant Layout
            ================================================ */}
        <section className="relative py-32 bg-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#F8FAFC] to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D4AA]/5 rounded-full blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Image Column */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
                  {/* Background decoration */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#00D4AA] to-[#1E3A5F] rounded-[2rem] opacity-20 blur-2xl" />

                  {/* Main image container */}
                  <div className="relative h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
                    <Image
                      src={president?.photoUrl || '/president-fadil.jpg'}
                      alt={president?.nomComplet || 'Pr. Abdelaziz FADIL'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="order-1 lg:order-2">
                <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-widest text-[#00D4AA] bg-[#00D4AA]/10 rounded-full">
                  Mot du Président
                </span>

                <h2 className="heading-lg text-[#0A1628] mb-6">
                  Bienvenue au <span className="gradient-text">Congrès 2026</span>
                </h2>

                <p className="text-2xl font-semibold text-[#1E3A5F] mb-2">
                  {president?.nomComplet || 'Pr. Abdelaziz FADIL'}
                </p>
                <p className="text-gray-500 mb-8">
                  {president ? `${president.specialite} • ${president.institution}` : 'Président de la Société Marocaine de Chirurgie Digestive (SMCD)'}
                </p>
                <div className="prose prose-lg text-gray-600 mb-8 max-h-[400px] overflow-y-auto pr-2">
                  <p className="leading-relaxed text-base text-justify">
                    {president?.messagePresident || `C'est avec un engagement fort et une conviction partagée que je vous annonce, en tant que Président de la Société Marocaine de Chirurgie Digestive (SMCD), la tenue de notre Congrès de Chirurgie, qui se déroulera à l'hôtel Mariott de Casablanca, les 26 et 27 juin 2026. Cet événement scientifique majeur se veut un lieu de convergence entre innovation technologique, expertise clinique et exigences du terrain, au service d'une chirurgie digestive moderne, efficace et responsable.

Le programme de cette édition réunira des experts reconnus, de jeunes talents prometteurs et l'ensemble des acteurs de l'écosystème chirurgical autour de sessions scientifiques de haut niveau, de démonstrations pratiques et de débats structurants, favorisant le dialogue entre cliniciens, chercheurs et partenaires industriels.

Notre discipline connaît une transformation profonde portée par des avancées technologiques rapides : chirurgie mini-invasive avancée, robotique, imagerie per-opératoire, modélisation 3D, analyse de données et intelligence artificielle, qui redéfinissent nos stratégies opératoires et nos standards de qualité.

Une attention particulière sera portée au cancer de l'estomac, pathologie exigeante par sa complexité technique et son enjeu pronostique. Les évolutions récentes en matière de stadification, de stratégies péri-opératoires, de techniques mini-invasives et robot-assistées, ainsi que l'optimisation des parcours de soins, feront l'objet de riches discussions multidisciplinaires avec des experts nationaux et internationaux.

Parallèlement, le congrès revendique un ancrage résolument pratique, en accordant une place centrale aux urgences biliaires lithiasiques : indications opératoires, timing, choix techniques, gestion des complications et organisation des parcours en contexte d'urgence.

En complément, d'autres séances thématiques seront organisées autour des chirurgies, pancréatique, hépato-biliaire, colo-rectale, oeso-gastrique, pariétale, métabolique et des urgences digestives, avec une séance dédiée à la place de la robotique en chirurgie digestive.

Enfin, la réussite de ce congrès reposera sur la qualité des échanges entre tous les acteurs, notamment les partenaires industriels, technologiques et pharmaceutiques, dont le rôle est essentiel pour soutenir l'innovation, améliorer les pratiques et répondre aux enjeux cliniques actuels. Je vous remercie sincèrement de l'intérêt porté à cet événement et de la confiance accordée à la SMCD, et serais honoré de pouvoir compter sur votre engagement pour faire de cette édition un événement de référence.

Au plaisir de vous retrouver bientôt.`}
                  </p>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center text-[#00D4AA] font-semibold hover:text-[#00B894] transition-colors group"
                >
                  En savoir plus
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            SPEAKERS - Premium Grid
            ================================================ */}
        <section className="relative py-32 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-widest text-[#1E3A5F] bg-[#1E3A5F]/10 rounded-full">
                  Édition 2026
                </span>
                <h2 className="heading-lg text-[#0A1628]">
                  Nos <span className="gradient-text">Invités</span> d'Honneur
                </h2>
              </div>
              <Link
                href="/speakers"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-[#1E3A5F] bg-white border border-gray-200 rounded-full hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] transition-all duration-300 shadow-sm"
              >
                Voir tous les intervenants
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Speakers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(speakers.length > 0 ? speakers : Array(4).fill(null)).map((speaker, index) => (
                <div
                  key={speaker?.id || index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 card-hover"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {speaker?.photoUrl ? (
                      <Image
                        src={speaker.photoUrl}
                        alt={`${speaker.prenom} ${speaker.nom}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1E3A5F] to-[#0A1628]">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                          <svg className="w-10 h-10 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0A1628] mb-1">
                      {speaker ? `${speaker.titre || ''} ${speaker.prenom} ${speaker.nom}` : `Invité ${index + 1}`}
                    </h3>
                    <p className="text-[#00D4AA] font-medium text-sm mb-1">
                      {speaker?.specialite || 'Spécialité'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {speaker?.institution || 'Institution'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================
            FINAL CTA - Bold & Impactful
            ================================================ */}
        <section className="relative py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#0A1628]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Decorative orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#00D4AA]/20 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF6B35]/10 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="heading-lg text-white mb-6">
              Rejoignez-nous pour le <span className="gradient-text">Congrès 2026</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Inscrivez-vous dès maintenant et soumettez vos travaux pour participer
              à cet événement incontournable de la chirurgie digestive au Maroc.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/abstracts/submit" className="btn-primary">
                Soumettre un Abstract
              </Link>
              <Link href="/contact" className="btn-secondary">
                Nous Contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
