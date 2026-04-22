import { useEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';

// ── Constants ────────────────────────────────────────────────────────────────
const CARD_COUNT  = 8;
const MAX_ANGLE   = 52;   // max rotateY at viewport edges (degrees)
const DEPTH       = 150;  // max Z push-back for edge cards (px)
const BOWL_DROP   = 32;   // max downward Y shift at edges (px)
// pixels per second — consistent regardless of display refresh rate
const SPEED_DESKTOP = 90; // px/s on desktop
const SPEED_MOBILE  = 70; // px/s on mobile (slightly slower — cards are smaller, same visual pace)

const GALLERY_PHOTOS = [
  {
    src: 'https://images.pexels.com/photos/19733687/pexels-photo-19733687.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'Indian wedding couple portrait, Surat',
  },
  {
    src: 'https://images.pexels.com/photos/36836726/pexels-photo-36836726.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'Indian wedding couple under mandap',
  },
  {
    src: 'https://images.pexels.com/photos/36098383/pexels-photo-36098383.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'Vibrant Indian wedding couple in traditional attire',
  },
  {
    src: 'https://images.pexels.com/photos/30171219/pexels-photo-30171219.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'Traditional Indian wedding ceremony portrait',
  },
  {
    src: 'https://images.pexels.com/photos/19230329/pexels-photo-19230329.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'Bengali couple at Indian wedding ceremony',
  },
  {
    src: 'https://images.pexels.com/photos/34479834/pexels-photo-34479834.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'Beautiful Indian wedding couple in traditional attire',
  },
  {
    src: 'https://images.pexels.com/photos/28210870/pexels-photo-28210870.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'Bride and groom in traditional Indian attire',
  },
  {
    src: 'https://images.pexels.com/photos/7694286/pexels-photo-7694286.jpeg?auto=compress&cs=tinysrgb&w=420&h=600&fit=crop',
    alt: 'South Indian couple in traditional wedding attire',
  },
];

// Gradient placeholders — one per card, shown when no real photo exists
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(145deg, #7C2020 0%, #D4AF37 100%)',
  'linear-gradient(145deg, #2D0808 0%, #B8860B 100%)',
  'linear-gradient(145deg, #4A1010 0%, #D4AF37 80%)',
  'linear-gradient(145deg, #2D0808 0%, #7C2020 100%)',
  'linear-gradient(145deg, #B8860B 0%, #2D0808 100%)',
  'linear-gradient(145deg, #3A0C0C 0%, #D4AF37 100%)',
  'linear-gradient(145deg, #7C2020 0%, #4A1010 100%)',
  'linear-gradient(145deg, #D4AF37 0%, #2D0808 100%)',
];

// ── Placeholder card icon ────────────────────────────────────────────────────
const PlaceholderIcon = () => (
  <svg viewBox="0 0 80 80" width="40" height="40" style={{ display: 'block', margin: '0 auto 8px' }}>
    <rect x="5" y="5" width="70" height="70" rx="8" fill="none" stroke="rgba(184,134,11,0.4)" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="8" fill="none" stroke="rgba(184,134,11,0.4)" strokeWidth="1" />
    <path d="M5 55 L25 35 L45 50 L55 42 L75 60 L75 75 L5 75Z" fill="rgba(184,134,11,0.1)" />
  </svg>
);

// ── Component ────────────────────────────────────────────────────────────────
const CoupleCarousel = () => {
  // Lazy init reads window immediately — no flash on first render for mobile
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // All DOM refs — zero React re-renders at 60 fps
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef    = useRef(0);
  const rafRef       = useRef<number>(0);
  const lastTimeRef  = useRef<number>(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cardW     = isMobile ? 170 : 240;
  const cardH     = isMobile ? 238 : 336;
  const gap       = 20;
  const slotWidth = cardW + gap;            // one card + its trailing gap
  const loopWidth = CARD_COUNT * slotWidth; // width of one full card set (seamless reset point)

  // ── rAF animation loop ───────────────────────────────────────────────────
  // Architecture:
  //   • Track slides left continuously; resets every loopWidth px (seamless — doubled cards)
  //   • Per-card rotateY is computed each frame from the card's CURRENT viewport X position
  //   • left-of-center cards → +rotateY (right edge closer) = concave inward ✓
  //   • right-of-center cards → -rotateY (left edge closer) = concave inward ✓
  useEffect(() => {
    const tick = (timestamp: number) => {
      // Initialise on first frame
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }
      // Delta capped at 50ms — prevents a huge jump after tab focus returns
      const delta = Math.min(timestamp - lastTimeRef.current, 50);
      lastTimeRef.current = timestamp;

      const speed = isMobile ? SPEED_MOBILE : SPEED_DESKTOP;
      offsetRef.current = (offsetRef.current + (speed * delta) / 1000) % loopWidth;

      // Slide the track
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
      }

      // Dynamic per-card concave rotation
      const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth;
      const viewportCenter = containerWidth / 2;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Card's center X position in the viewport (accounts for current scroll offset)
        const cardCenterInViewport = i * slotWidth + cardW / 2 - offsetRef.current;

        // Distance from viewport center: negative = left of center, positive = right
        const distFromCenter = cardCenterInViewport - viewportCenter;

        // Normalize distance: -1 = far left edge, 0 = center, +1 = far right edge
        const normalizedDist = distFromCenter / (viewportCenter + cardW * 0.6);
        const clamped = Math.max(-1.4, Math.min(1.4, normalizedDist));

        // rotateY: left cards lean right (positive), right cards lean left (negative)
        const angle = -clamped * MAX_ANGLE;
        const clampedAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle));

        // translateZ: push edge cards back — creates depth falloff
        const tz = -Math.abs(clamped) * DEPTH;

        // translateY: quadratic bowl curve — edge cards dip down gently
        const ty = Math.pow(Math.abs(clamped), 1.6) * BOWL_DROP;

        card.style.transform = `rotateY(${clampedAngle}deg) translateZ(${tz}px) translateY(${ty}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cardW, slotWidth, loopWidth]); // restart loop when dimensions change on resize

  // Double the cards for a seamless infinite loop (second set is visually identical to first)
  const cards = Array.from({ length: CARD_COUNT * 2 });

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FAF3E0 0%, #F0E6C8 50%, #FAF3E0 100%)',
      }}
    >
      {/* Mehndi dot texture overlay — gold dots visible on cream bg */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Section title */}
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <SectionTitle
          label="Yadein"
          heading="Our Gallery"
          description="Glimpses of the moments that brought us here"
          dark={false}
        />
      </div>

      {/* ── Curved sliding gallery ──────────────────────────────────────────
          Container: perspective creates the 3D depth — closer (center) cards
          appear larger, angled edge cards appear narrower due to rotateY.
          All cards slide together; each card's rotateY updates every frame.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative z-10 h-[360px] md:h-[480px]"
        style={{ overflow: 'hidden', perspective: '850px', perspectiveOrigin: '50% 35%' }}
      >
        {/* Sliding track — zero-top origin, centred vertically via marginTop */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            position: 'absolute',
            top: '50%',
            left: 0,
            marginTop: -(cardH / 2),
            transform: 'translateX(0px)', // rAF overrides this every frame
            willChange: 'transform',
          }}
        >
          {cards.map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                flex: '0 0 auto',
                width: cardW,
                height: cardH,
                transform: 'rotateY(0deg)',
                willChange: 'transform',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(45,8,8,0.2), 0 2px 8px rgba(212,175,55,0.12)',
                flexShrink: 0,
              }}
            >
              <img
                src={GALLERY_PHOTOS[i % CARD_COUNT].src}
                alt={GALLERY_PHOTOS[i % CARD_COUNT].alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  borderRadius: 'inherit',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Left fade mask */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: isMobile ? '60px' : '100px',
          background: 'linear-gradient(to right, #F0E6C8 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Right fade mask */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: isMobile ? '60px' : '100px',
          background: 'linear-gradient(to left, #F0E6C8 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
      </div>
    </section>
  );
};

export default CoupleCarousel;
