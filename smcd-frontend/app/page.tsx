'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CONGRESS_INFO } from '@/lib/constants';
import { API_URL } from '@/lib/constants';

interface Speaker {
  id: number;
  nom: string;
  prenom: string;
  titre: string;
  specialite: string;
  institution: string;
  photoUrl: string;
  nomComplet?: string;
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
  const [stats] = useState({ abstracts: 150, speakers: 25, videos: 80, participants: 500 });

  // Date du congrès - 26 juin 2026
  const congressDate = new Date('2026-06-26T09:00:00');

  useEffect(() => {
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
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get(`${API_URL}/speakers?featured=true&annee=2026`);
        // Exclure le président de la liste des speakers featured
        const speakersData = response.data.filter((s: Speaker & { isPresident?: boolean }) => !s.isPresident);
        setSpeakers(speakersData.slice(0, 6));
      } catch (error) {
        console.error('Erreur chargement speakers:', error);
      }
    };

    const fetchPresident = async () => {
      try {
        const response = await axios.get(`${API_URL}/speakers/president?annee=2026`);
        setPresident(response.data);
      } catch (error) {
        console.error('Erreur chargement président:', error);
      }
    };

    fetchSpeakers();
    fetchPresident();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section avec Countdown */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background avec overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 64, 175, 0.85) 50%, rgba(6, 95, 70, 0.9) 100%)`,
            }}
          />
          
          {/* Particules animées - positions fixes pour éviter hydration mismatch */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { left: 10, top: 20, delay: 0, duration: 8 },
              { left: 25, top: 60, delay: 1, duration: 12 },
              { left: 40, top: 15, delay: 2, duration: 10 },
              { left: 55, top: 75, delay: 0.5, duration: 9 },
              { left: 70, top: 30, delay: 3, duration: 11 },
              { left: 85, top: 50, delay: 1.5, duration: 7 },
              { left: 15, top: 80, delay: 2.5, duration: 13 },
              { left: 60, top: 10, delay: 4, duration: 8 },
              { left: 90, top: 70, delay: 0.8, duration: 10 },
              { left: 35, top: 45, delay: 3.5, duration: 12 },
            ].map((particle, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animation: `float ${particle.duration}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            {/* Logo/Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center mb-6">
                <Image 
                  src="/smcd-logo.svg" 
                  alt="SMCD Logo" 
                  width={120} 
                  height={120}
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Congrès National de
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Chirurgie Digestive
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-light">
              {CONGRESS_INFO.year} • {CONGRESS_INFO.location}
            </p>

            <p className="text-lg text-teal-300 mb-12 font-medium">
              26-27 Juin 2026 • Casablanca
            </p>

            {/* Countdown */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
              {[
                { value: timeLeft.days, label: 'Jours' },
                { value: timeLeft.hours, label: 'Heures' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Secondes' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 min-w-[80px] sm:min-w-[100px]"
                >
                  <span className="text-3xl sm:text-5xl font-bold text-white">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-gray-300 mt-1">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/abstracts/submit"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-400 hover:to-cyan-300 transition-all duration-300 shadow-lg hover:shadow-teal-500/50 transform hover:-translate-y-1"
              >
                Soumettre un Abstract
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/videos"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
              >
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Voir les Vidéos
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Mot du Président */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image du président */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[3/4] max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl transform rotate-3"></div>
                  <div className="relative bg-gray-200 rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 h-full">
                    {president?.photoUrl ? (
                      <Image
                        src={president.photoUrl}
                        alt={president.nomComplet || 'Président'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center mb-4">
                            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <p className="text-gray-500 font-medium">Photo du Président</p>
                          <p className="text-gray-400 text-sm mt-1">À configurer dans l'admin</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Message du Président
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Mot du
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Président</span>
                </h2>

                {president ? (
                  <>
                    <p className="text-xl text-teal-600 font-medium mb-4">
                      {president.nomComplet}
                    </p>
                    <p className="text-gray-500 mb-6">{president.specialite} • {president.institution}</p>
                    <div className="prose prose-lg text-gray-600 mb-8">
                      <p className="text-lg leading-relaxed whitespace-pre-line">
                        {president.messagePresident || "Le message du président sera bientôt disponible."}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="prose prose-lg text-gray-600 mb-8">
                    <p className="text-lg leading-relaxed mb-4">
                      Chers collègues, c'est avec un immense plaisir que je vous accueille au Congrès National 
                      de Chirurgie Digestive {CONGRESS_INFO.year}. Cette édition s'annonce exceptionnelle avec 
                      des thématiques à la pointe de l'innovation.
                    </p>
                    <p className="text-sm text-gray-400 italic">
                      (Configurez le président dans l'admin pour personnaliser ce message)
                    </p>
                  </div>
                )}

                <Link
                  href="/about"
                  className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors group"
                >
                  Lire la suite
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: stats.abstracts, label: 'Abstracts', icon: '📄', suffix: '+' },
                { value: stats.speakers, label: 'Intervenants', icon: '👨‍⚕️', suffix: '+' },
                { value: stats.videos, label: 'Vidéos', icon: '🎬', suffix: '+' },
                { value: stats.participants, label: 'Participants', icon: '👥', suffix: '+' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Invités */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Édition 2026
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Invités</span> d'Honneur
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                D'éminents chirurgiens de différentes spécialités ont été invités pour partager 
                leur expertise lors de notre congrès.
              </p>
            </div>

            {/* Grille des speakers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.length > 0 ? speakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200">
                    {speaker.photoUrl ? (
                      <Image
                        src={speaker.photoUrl}
                        alt={`${speaker.prenom} ${speaker.nom}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {speaker.prenom?.[0]}{speaker.nom?.[0]}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {speaker.titre} {speaker.prenom} {speaker.nom}
                    </h3>
                    <p className="text-teal-600 font-medium mb-2">{speaker.specialite}</p>
                    <p className="text-gray-500 text-sm">{speaker.institution}</p>
                  </div>
                </div>
              )) : (
                [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Invité {i + 1}</h3>
                      <p className="text-teal-600 font-medium mb-2">Spécialité</p>
                      <p className="text-gray-500 text-sm">Institution</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/speakers"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Voir tous les intervenants
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Thématiques du Congrès */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Thématiques du <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Congrès</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🤖',
                  title: 'Chirurgie Robotique',
                  description: 'La robotique en chirurgie viscérale et digestive, au service de la précision et du geste sûr.',
                  color: 'from-purple-500 to-indigo-600',
                },
                {
                  icon: '🧠',
                  title: 'Intelligence Artificielle',
                  description: 'L\'IA comme partenaire du chirurgien pour mieux analyser, anticiper et décider.',
                  color: 'from-teal-500 to-cyan-600',
                },
                {
                  icon: '⚡',
                  title: 'Nouvelles Technologies',
                  description: 'Les nouvelles sources d\'énergie et le laser en chirurgie colorectale et proctologique.',
                  color: 'from-orange-500 to-red-600',
                },
              ].map((theme, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.color}`} />
                  <div className="text-5xl mb-6">{theme.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{theme.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{theme.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(6, 95, 70, 0.95) 0%, rgba(30, 64, 175, 0.95) 100%)`,
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Rejoignez-nous pour le Congrès {CONGRESS_INFO.year}
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Inscrivez-vous dès maintenant et soumettez vos travaux pour participer 
              à cet événement incontournable de la chirurgie digestive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/abstracts/submit"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full bg-white text-teal-700 hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Soumettre un Abstract
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
