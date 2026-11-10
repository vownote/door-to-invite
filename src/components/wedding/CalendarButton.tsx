import { motion } from 'framer-motion';

const CalendarButton = () => {
  const googleCalendarUrl = (() => {
    const title = encodeURIComponent('Rishabh & Divya Wedding');
    const details = encodeURIComponent('You are cordially invited to the wedding of Rishabh & Divya at Varay Grande, Ujjain.\nMehendi (29 Nov): 1:00 PM onwards, Shakun Playfit, Jaipur\nDinner (29 Nov): 5:00 PM onwards, Shakun Playfit, Jaipur\nCarnival (1 Dec): 2:30 PM onwards, Pool Area\nSangeet (1 Dec): 7:00 PM onwards\nBarat (2 Dec): 12:15 PM onwards\nReception (2 Dec): 1:30 PM onwards\nWedding Ceremony (2 Dec): 3:30 PM onwards');
    const location = encodeURIComponent('Shakun Playfit, Jaipur (29 Nov) | Varay Grande, Ujjain, Madhya Pradesh (1-2 Dec)');
    const startDate = '20261129'; // all-day entry covering every function
    const endDate = '20261203';   // Google all-day end date is exclusive
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  })();

  return (
    <section
      className="relative py-12 lg:py-16 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #2D0808 0%, #4A1010 50%, #3A0C0C 100%)',
      }}
    >
      {/* Mehndi dot texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Mandala backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <svg viewBox="0 0 400 400" className="w-[50vmin] h-[50vmin]">
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto text-center relative z-10"
      >
        {/* Gold ornament row */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span style={{ flex: 1, maxWidth: '5rem', height: '1px', background: '#B8860B', display: 'block' }} />
          <span className="font-body text-xs" style={{ color: '#B8860B' }}>✦</span>
          <span style={{ flex: 1, maxWidth: '5rem', height: '1px', background: '#B8860B', display: 'block' }} />
        </div>

        {/* Label */}
        <p
          className="font-label uppercase mb-3"
          style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', letterSpacing: '0.2em', color: 'rgba(212,175,55,1)' }}
        >
          Yaad Rakhein
        </p>

        {/* Heading */}
        <h2
          className="font-heading mb-3"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: '#F5E8D0' }}
        >
          Don't Forget to Mark
        </h2>
        <h2
          className="font-heading mb-6"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: '#D4AF37', fontStyle: 'italic' }}
        >
          Your Calendar
        </h2>

        {/* Date reminder */}
        <p
          className="font-body mb-8"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)', color: 'rgba(245,232,208,0.92)', letterSpacing: '0.08em' }}
        >
          November 29th — Shakun Playfit<br />
          December 1st – 2nd — Varay Grande
        </p>

        {/* Add to calendar button */}
        <motion.a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-4 font-body uppercase"
          style={{
            padding: '1rem 2.5rem',
            border: '1px solid rgba(212,175,55,0.55)',
            borderRadius: '100px',
            background: '#F7E2B8',
            color: '#8B1A1A',
            fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
            letterSpacing: '0.2em',
            textDecoration: 'none',
            fontWeight: 700,
            transition: 'background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
            boxShadow: '0 16px 40px rgba(139,26,26,0.14)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = '#F4D99F';
            el.style.transform = 'translateY(-1px)';
            el.style.boxShadow = '0 20px 46px rgba(139,26,26,0.18)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = '#F7E2B8';
            el.style.transform = 'none';
            el.style.boxShadow = '0 16px 40px rgba(139,26,26,0.14)';
          }}
        >
          {/* Calendar icon */}
          <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2.2" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          Add to Google Calendar
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CalendarButton;
