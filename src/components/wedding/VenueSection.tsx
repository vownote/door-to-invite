import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

// ── Detail card data ──────────────────────────────────────────────────────────
const DETAILS = [
  {
    label: 'Venue',
    title: 'Varay Grande',
    detail: 'Ujjain, Madhya Pradesh',
  },
  {
    label: 'Date',
    title: 'December 02, 2026',
    detail: 'Wednesday',
  },
  {
    label: 'Time',
    title: '12:30 PM Onwards',
    detail: 'Reception & Celebrations',
  },
];

const MAPS_URL =
  'https://maps.google.com/?cid=16776912553755572118';

// ── Component ─────────────────────────────────────────────────────────────────
const VenueSection = () => {
  return (
    <section
      className="relative py-12 lg:py-16 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0B3A40 0%, #14555B 50%, #0F4449 100%)',
      }}
    >
      {/* Mehndi dot texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Mandala backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <svg viewBox="0 0 400 400" className="w-[60vmin] h-[60vmin]">
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="150" y="150" width="100" height="100" rx="10"
              fill="none" stroke="#D4AF37" strokeWidth="0.5"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Section title ─────────────────────────────────────────────────── */}
        <div className="text-center">
          <SectionTitle
            label="Vivah Sthal"
            heading="Our Venue"
            dark={true}
          />
        </div>

        {/* ── Venue illustration in parchment frame ─────────────────────────── */}
        {/* ── Venue illustration — floats directly on dark bg via screen blend ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.9 }}
          style={{
            marginTop: '1rem'
          }}
        >
          <img
            className='w-full md:w-[70%] xl:w-[75%]'
            src="/assets/custom-venue-final.png"
            alt="Varay Grande — Our Wedding Venue"
            style={{
              maxWidth: '860px',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              objectFit: 'contain',
              // screen blend: black pixels become transparent,
              // white line art floats on the maroon section background
              mixBlendMode: 'screen',
              opacity: 1,
              overflow: 'visible'
            }}
          />
        </motion.div>

        {/* ── Three detail cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {DETAILS.map(({ label, title, detail }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="text-center"
              style={{
                padding: '1.5rem 1rem',
                border: '1px solid rgba(212,175,55,0.12)',
                borderRadius: '8px',
                background: 'rgba(212,175,55,0.04)',
              }}
            >
              {/* Card label */}
              <p
                className="font-label font-black uppercase mb-2"
                style={{ letterSpacing: '0.18em', color: 'rgba(212,175,55,0.85)', fontSize: '0.9rem' }}
              >
                {label}
              </p>

              {/* Thin separator */}
              <div
                style={{
                  width: '2rem',
                  height: '1px',
                  background: 'rgba(212,175,55,0.25)',
                  margin: '0 auto 0.75rem',
                }}
              />

              {/* Card title */}
              <p
                className="font-heading mb-1"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', color: '#F5E8D0' }}
              >
                {title}
              </p>

              {/* Card detail */}
              <p
                className="font-body font-medium"
                style={{ color: 'rgba(245,232,208,0.72)', letterSpacing: '0.05em', fontSize: 'clamp(0.9rem, 1.1vw, 0.9rem)' }}
              >
                {detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Gold ornament divider ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span
            style={{
              flex: 1,
              maxWidth: '6rem',
              height: '1px',
              background: 'rgba(212,175,55,0.25)',
              display: 'block',
            }}
          />
          <span className="font-body text-xs" style={{ color: '#B8860B' }}>✦</span>
          <span
            style={{
              flex: 1,
              maxWidth: '6rem',
              height: '1px',
              background: 'rgba(212,175,55,0.25)',
              display: 'block',
            }}
          />
        </motion.div>

        {/* ── Get Directions button ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
          className="flex justify-center"
        >
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 font-body uppercase"
            style={{
              padding: '1rem 2.75rem',
              border: '1px solid rgba(212,175,55,0.55)',
              borderRadius: '100px',
              background: '#F7E2B8',
              color: '#14555B',
              fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
              boxShadow: '0 18px 40px rgba(15,68,73,0.12)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = '#F4D99F';
              el.style.transform = 'translateY(-1px)';
              el.style.boxShadow = '0 22px 50px rgba(15,68,73,0.18)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = '#F7E2B8';
              el.style.transform = 'none';
              el.style.boxShadow = '0 18px 40px rgba(15,68,73,0.12)';
            }}
          >
            {/* Map pin icon */}
            <svg
              width="18" height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Get Directions
            {/* Arrow */}
            <svg
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'transform 0.3s ease' }}
              className="group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default VenueSection;
