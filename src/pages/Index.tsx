import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/wedding/HeroSection';
import ScratchReveal from '@/components/wedding/ScratchReveal';
import ScratchRevealDateSingleBox from '@/components/wedding/ScratchRevealDateSingleBox';
import CountdownTimer from '@/components/wedding/CountdownTimer';
import CoupleCarousel from '@/components/wedding/CoupleCarousel';
import LenticularCard from '@/components/wedding/LenticularCard';
import VenueSection from '@/components/wedding/VenueSection';
import Timeline from '@/components/wedding/Timeline';
import RSVPForm from '@/components/wedding/RSVPForm';
import CalendarButton from '@/components/wedding/CalendarButton';
import ThankYou from '@/components/wedding/ThankYou';
import TornEdge from '@/components/wedding/TornEdge';
import FloatingParticles from '@/components/wedding/FloatingParticles';
import MusicPlayer from '@/components/wedding/MusicPlayer';

const Index = () => {
  const [heroComplete, setHeroComplete] = useState(false);
  const [heroStarted, setHeroStarted] = useState(false);

  useEffect(() => {
    // Always start from top on load/refresh — disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <>
      <FloatingParticles />
      <MusicPlayer canPlay={heroStarted} />

      <main className="relative">
        <HeroSection onStart={() => setHeroStarted(true)} onComplete={() => setHeroComplete(true)} />
        {/* <TornEdge index={0} /> */}

        <AnimatePresence>
          {heroComplete && (
            <motion.div
              key="main-sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* <ScratchReveal /> */}
              <ScratchRevealDateSingleBox />
              <CountdownTimer />
              {/* <CoupleCarousel /> */}
              {/* <LenticularCard /> */}
              <VenueSection />
              <Timeline />
              {/* <RSVPForm /> */}
              <CalendarButton />
              <ThankYou />

              {/* VowNote Branding — same pattern as morning-rose footer */}
              <footer
                style={{
                  background: '#4A0F0F',
                  borderTop: '1px solid rgba(184,134,11,0.2)',
                }}
                className="py-4 text-center"
              >
                <div className="inline-flex items-center gap-3">
                  <div>
                    <span
                      className="font-body text-md font-bold italic"
                      style={{ color: '#F5E8D0', fontWeight: 700 }}
                    >
                      Crafted with <span className='mr-1' style={{ color: '#e05252' }}>❤</span> by
                    </span>
                    <a
                      href="http://vownote.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body italic transition-colors ml-1"
                      style={{ color: '#F5E8D0', fontWeight: 800, textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#B8860B')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#F5E8D0')}
                    >
                      VowNote
                    </a>
                  </div>

                  {/* Separator dot */}
                  <span style={{ color: 'rgba(184,134,11,0.4)', fontSize: '0.5rem' }}>●</span>

                  {/* Globe / website icon */}
                  <a
                    href="http://vownote.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Visit VowNote"
                    style={{ color: '#B8860B', display: 'flex', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5E8D0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#B8860B')}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </a>

                  {/* Instagram icon */}
                  <a
                    href="https://www.instagram.com/vownote.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="VowNote on Instagram"
                    style={{ color: '#B8860B', display: 'flex', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5E8D0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#B8860B')}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Index;
