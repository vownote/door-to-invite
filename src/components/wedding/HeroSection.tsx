import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'idle' | 'playing' | 'ended';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');

  const handleTap = () => {
    if (phase === 'idle' && videoRef.current) {
      videoRef.current.play();
      setPhase('playing');
    }
  };

  return (
    <section
      className="relative overflow-hidden h-[100dvh] cursor-pointer select-none"
      onClick={handleTap}
    >
      {/* ── Video ───────────────────────────────────────────────────────────────
          poster= shows the first frame (doors closed) the instant the page loads
          so there is never a blank screen while the video file is fetching.
          preload="auto" hints the browser to buffer the file in the background.  */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster="/hero/door-to-invite-poster.jpg"
        onEnded={() => setPhase('ended')}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/hero/door-to-invite-mobile.mp4" type="video/mp4" />
      </video>

      {/* ── Tap-to-play overlay — visible only in idle phase ──────────────────── */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div
            key="tap-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {/* Icon group — pinned to door-knob focal point (x=50%, y≈45%) */}
            <motion.div
              className="absolute left-1/2 flex flex-col items-center gap-2 sm:gap-3"
              style={{ top: '53%', left: '51%', transform: 'translate(-50%, -50%)' }}
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Ghost circle — shrinks fluidly from lg → sm screens */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="
                  rounded-full flex items-center justify-center
                  [width:clamp(3.25rem,14vw,6rem)]
                  [height:clamp(3.25rem,14vw,6rem)]
                "
                style={{
                  background: 'rgba(255,255,255,0.13)',
                  border: '1px solid rgba(255,255,255,0.48)',
                  boxShadow: '0 0 24px rgba(0,0,0,0.25)',
                }}
              >
                {/* Hand SVG — always 46% of circle so it scales with it */}
                <svg
                  style={{ width: '46%', height: '46%' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Lucide "hand" — open palm, fingers up */}
                  <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
                  <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </motion.div>

              {/* Label — scales with screen too */}
              <span
                className="font-body tracking-[0.3em] [font-size:clamp(0.55rem,2vw,0.7rem)]"
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  textShadow: '0 1px 10px rgba(0,0,0,0.75)',
                }}
              >
                Tap to continue
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Invite content — appears inside the arch's cream white space ─────────
          The video's final frame shows a golden mandap arch with a large ivory
          blank interior. Content is constrained to that inner zone:
            • mobile  : w-[50vw]  (~50 % of video width that fills the screen)
            • desktop : md:w-[28vw] (the 9:16 arch column within the wider frame)
          Colors mirror the arch — deep maroon text, antique gold accents.        */}
      <AnimatePresence>
        {phase === 'ended' && (
          <motion.div
            key="invite-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="text-center w-[50vw] md:w-[28vw]">

              {/* "Together with their families" */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
                className="font-body uppercase"
                style={{
                  fontSize: 'clamp(0.5rem, 1.7vw, 0.7rem)',
                  letterSpacing: '0.22em',
                  color: '#7A1F1F',
                  marginBottom: '0.75rem',
                }}
              >
                Together with their families
              </motion.p>

              {/* Names */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
              >
                <h1
                  className="font-heading leading-none"
                  style={{ fontSize: 'clamp(1.75rem, 6.5vw, 3rem)', color: '#4A0F0F' }}
                >
                  Priya
                </h1>

                <motion.p
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.05, ease: 'backOut' }}
                  className="font-heading italic"
                  style={{ fontSize: 'clamp(1rem, 4vw, 1.75rem)', color: '#B8860B', margin: '0.15em 0' }}
                >
                  &
                </motion.p>

                <h1
                  className="font-heading leading-none"
                  style={{ fontSize: 'clamp(1.75rem, 6.5vw, 3rem)', color: '#4A0F0F' }}
                >
                  Arjun
                </h1>
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
                style={{ fontSize: 'clamp(0.45rem, 1.5vw, 0.65rem)', color: '#7A1F1F', lineHeight: 1.7 }}
              >
                Request the honour of your presence
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.1, ease: 'easeOut' }}
                className="font-body tracking-wide"
                style={{ fontSize: 'clamp(0.4rem, 1.35vw, 0.6rem)', color: '#7A1F1F', lineHeight: 1.7 }}
              >
                at the celebration of their marriage
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
