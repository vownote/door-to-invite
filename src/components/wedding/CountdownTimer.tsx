import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WEDDING_DATE = new Date('2026-12-15T10:00:00');

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
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="hsl(var(--gold))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-3xl md:text-4xl text-foreground">{value}</span>
        </div>
      </div>
      <p className="font-body text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase mt-3">{label}</p>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 bg-background relative overflow-hidden">
      {/* Mandala backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 400 400" className="w-[60vmin] h-[60vmin]">
          {[...Array(8)].map((_, i) => (
            <rect
              key={i} x="150" y="150" width="100" height="100" rx="10"
              fill="none" stroke="hsl(var(--gold))" strokeWidth="0.5"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4"
        >
          Counting Down To
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-heading text-4xl md:text-5xl text-foreground mb-12"
        >
          Our Special Day
        </motion.h2>

        {isInView && (
          <div className="flex justify-center gap-6 md:gap-12">
            <CircleUnit value={days} label="Days" max={365} delay={0.2} />
            <CircleUnit value={hours} label="Hours" max={24} delay={0.4} />
            <CircleUnit value={minutes} label="Minutes" max={60} delay={0.6} />
            <CircleUnit value={seconds} label="Seconds" max={60} delay={0.8} />
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="font-body text-xl text-muted-foreground mt-12"
        >
          15th December 2026 · Summer Palace, Surat
        </motion.p>
      </div>
    </section>
  );
};

export default CountdownTimer;
