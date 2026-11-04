import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'idle' | 'playing' | 'ended';

interface HeroSectionProps {
  onStart: () => void;
  onComplete: () => void;
}

const HeroSection = ({ onStart, onComplete }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [videoReady, setVideoReady] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

  const handleTap = () => {
    if (phase === 'idle' && videoRef.current) {
      videoRef.current.currentTime = 0.1; // t=0.1s is the first real keyframe
      videoRef.current.play();
      setPhase('playing');
      onStart();
      window.dispatchEvent(new Event('doorTap'));
    }
  };

  useEffect(() => {
    if (phase !== 'ended' || hasAutoScrolled) return;
    const timer = window.setTimeout(() => {
      window.scrollBy({ top: 120, behavior: 'smooth' });
      setHasAutoScrolled(true);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [phase, hasAutoScrolled]);

  return (
    <section
      className="relative overflow-hidden h-[100dvh] select-none"
      onClick={handleTap}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {/* ── Video ───────────────────────────────────────────────────────────────
          poster= shows the first frame (doors closed) the instant the page loads
          so there is never a blank screen while the video file is fetching.
          preload="auto" hints the browser to buffer the file in the background.  */}
      <video
        ref={videoRef}
        muted
        playsInline
        {...{ 'webkit-playsinline': 'true' }}
        preload="auto"
        poster="/hero/main-door.webp"
        onPlaying={() => setVideoReady(true)}
        onEnded={() => {
          setPhase('ended');
          onComplete();
        }}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        <source src="/hero/door-to-invite-mobile.mp4" type="video/mp4" />
      </video>

      {/* ── Poster overlay — hides video until the playing event fires ──────────
          !videoReady means it stays visible through seek + decoder spin-up.
          Fades out in 0.25s once the browser is actually outputting frames.   */}
      <AnimatePresence>
        {!videoReady && (
          <motion.img
            key="poster-overlay"
            src="/hero/main-door.webp"
            alt=""
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ── Tap-to-play overlay — visible only in idle phase ──────────────────── */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div
            key="tap-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-20 cursor-pointer"
          >
            {/* Icon group — pinned to door-knob focal point (x=50%, y≈45%) */}
            <div
              className="absolute left-1/2 flex flex-col items-center gap-3"
              style={{ top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {/* Solid circle with stronger emphasis */}
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 'clamp(5.5rem, 16vw, 6.5rem)',
                  height: 'clamp(5.5rem, 16vw, 6.5rem)',
                  background: 'rgba(255,255,255,0.16)',
                  border: '2px solid rgba(255,255,255,0.85)',
                  boxShadow: '0 0 28px rgba(255,255,255,0.28)',
                }}
              >
                <svg
                  style={{ width: '64%', height: '64%' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
                  <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>

              {/* Label — bold and heavy */}
              <span
                className="font-heading uppercase tracking-[0.35em] text-center"
                style={{
                  color: 'white',
                  fontWeight: 500,
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  textShadow: '0 2px 16px rgba(255,255,0,0.65)',
                }}
              >
                Tap to continue
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Invite content — appears inside the arch's cream white space ─────────
          Arch inner zone ≈ 64 vw (video always fills viewport width via object-cover).
          Container set to 58 vw mobile / 40 vw desktop — safely inside arch borders.
          Font sizes use vw with raised clamp maxima so large screens are filled.    */}
      <AnimatePresence>
        {phase === 'ended' && (
          <motion.div
            key="invite-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 flex items-center justify-center z-10 select-text"
          >
            <div className="text-center w-[70vw] md:w-[40vw]">

              {/* Mahavir Bhagwan — kankotri header emblem */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
                className="flex flex-col items-center pb-3"
                style={{ marginBottom: '0.6rem' }}
              >
                <img
                  src="/assets/mahavir-bhagwan.png"
                  alt="Mahavir Bhagwan"
                  className='w-[19%] h-auto block mx-auto my-0'
                />
                <p
                  className="font-heading"
                  style={{
                    fontWeight: 500,
                    fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
                    color: '#B8860B',
                    marginTop: '0.3rem',
                    textShadow: '0 1px 4px rgba(255,240,210,0.9)',
                  }}
                >
                  श्री महावीराय नमः
                </p>

                {/* Vakratunda shloka — hidden for this invite
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                  className="font-heading italic"
                  style={{
                    fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
                    fontWeight: 600,
                    color: '#9A6E10',
                    letterSpacing: '0.04em',
                    lineHeight: 1.8,
                    marginTop: '0.5rem',
                    textShadow: '0 1px 6px rgba(255,240,210,0.95)',
                    maxWidth: '90%',
                  }}
                >
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
                  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                </motion.p> */}
              </motion.div>

              {/* "Wedding Invitation" */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
                className="font-body uppercase mb-[0.6rem] md:mb-[1rem] font-bold"
                style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.4rem)',
                  letterSpacing: '0.22em',
                  color: '#7A1F1F',
                  textShadow: '0 1px 6px rgba(255,240,210,0.8)',
                }}
              >
                Wedding Invitation
              </motion.p>

              {/* Names */}
              {/*
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
              >
                <h1
                  className="font-heading leading-none"
                  style={{ fontSize: 'clamp(3.2rem, 7vw, 8rem)', color: '#4A0F0F' }}
                >
                  Divya
                </h1>

                <motion.p
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.05, ease: 'backOut' }}
                  className="font-heading italic leading-none mt-3"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 4rem)', color: '#B8860B' }}
                >
                  &
                </motion.p>

                <h1
                  className="font-heading leading-none"
                  style={{ fontSize: 'clamp(3.2rem, 7vw, 8rem)', color: '#4A0F0F' }}
                >
                  Rishabh
                </h1>
              </motion.div>
              */}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
                className="flex justify-center"
              >
                <img
                  src="/assets/dr-logo.png"
                  alt="Divya & Rishabh"
                  style={{
                    width: 'clamp(10rem, 24vw, 16rem)',
                    height: 'auto',
                    filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.25))',
                  }}
                />
              </motion.div>

              {/* Gold gradient divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.4, ease: 'easeOut' }}
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #B8860B 30%, #B8860B 70%, transparent)',
                  width: '60%',
                  margin: '0.8rem auto',
                }}
              />

              {/* Invite lines */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.8, ease: 'easeOut' }}
                className="font-body tracking-wide"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.4rem)', color: '#7a1f1f', lineHeight: 1.7, textShadow: '0 1px 6px rgba(255,240,210,0.8)' }}
              >
                Request the honour of your presence
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.1, ease: 'easeOut' }}
                className="font-body tracking-wide"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.4rem)', color: '#7a1f1f', lineHeight: 1.7, textShadow: '0 1px 6px rgba(255,240,210,0.8)' }}
              >
                at the celebration of their marriage
              </motion.p>
            </div>

            <div
              className="absolute left-1/2 bottom-8 flex flex-col items-center gap-1 text-center"
              style={{ transform: 'translateX(-50%)' }}
            >
              <span
                className="font-heading uppercase font-bold bg-[#7A1F1F] py-2 px-4 rounded-full"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  color: '#F8F1DF',
                  textShadow: '0 2px 16px rgba(0,0,0,0.45)',
                }}
              >
                Scroll Down
              </span>
              <span
                className="text-3xl"
                style={{ color: '#F8F1DF', lineHeight: 1 }}
              >
                ↓
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
