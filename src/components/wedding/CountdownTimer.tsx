import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { useCountdown } from '@/hooks/useCountdown';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const WEDDING_DATE = new Date('2026-12-02T15:30:00');

const CircleUnit = ({ value, label, max, delay }: { value: number; label: string; max: number; delay: number }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-28 h-28 md:w-36 md:h-36"
        style={{
          border: '1px solid rgba(122,31,31,0.2)',
          borderRadius: '50%',
        }}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="rgba(122,31,31,0.12)"
            strokeWidth="3.5"
          />
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="#7A1F1F"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-heading"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              color: '#7A1F1F',
              lineHeight: 1,
            }}
          >
            {value}
          </span>
        </div>
      </div>

      <p
        className="font-label font-semibold uppercase mt-3"
        style={{ letterSpacing: '0.15em', color: '#7A1F1F', fontSize: 'clamp(0.68rem, 0.9vw, 0.82rem)' }}
      >
        {label}
      </p>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isMobile = useIsMobile();

  return (
    <section
      ref={ref}
      className="relative py-12 lg:py-16 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #efca66 0%, #d8a60f 50%, #cc930d 100%)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #dfd791d6 0%, rgba(228,216,180,0.94) 40%, rgba(255,244,175,0.86) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <SectionTitle
          label="Shubh Muhurat"
          heading="Our Sacred Countdown"
          description="Every moment that passes brings us closer to our eternal union"
          dark={false}
        />

        {isInView && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            <CircleUnit value={days} label="Days" max={365} delay={0.2} />
            <CircleUnit value={hours} label="Hours" max={24} delay={0.4} />
            <CircleUnit value={minutes} label="Minutes" max={60} delay={0.6} />
            <CircleUnit value={seconds} label="Seconds" max={60} delay={0.8} />
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          justifyContent: 'center',
          marginTop: 'clamp(2rem, 5vw, 3.5rem)',
        }}
        className='hidden'
      >
        <img
          src="/assets/diya-divider.webp"
          alt="decorative diyas"
          style={{
            width: 'min(88vw, 680px)',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 0 18px rgba(212,175,55,0.35))',
          }}
        />
      </motion.div>
    </section>
  );
};

export default CountdownTimer;
