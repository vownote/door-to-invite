import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TimelineEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  icon: string;
}

const events: TimelineEvent[] = [
  {
    title: 'Haldi Ceremony',
    date: '13th December 2026',
    time: '10:00 AM',
    venue: 'Family Residence',
    description: 'A vibrant celebration where turmeric paste is applied to the couple, symbolizing purification and blessings for the journey ahead.',
    icon: '☀️',
  },
  {
    title: 'Mehndi Night',
    date: '13th December 2026',
    time: '6:00 PM',
    venue: 'Summer Palace — Lotus Garden',
    description: 'An enchanting evening of intricate henna artistry, music, and dance as we adorn the bride with beautiful mehndi designs.',
    icon: '🌿',
  },
  {
    title: 'Sangeet & Cocktails',
    date: '14th December 2026',
    time: '7:00 PM',
    venue: 'Summer Palace — Grand Ballroom',
    description: 'A glittering night of performances, music, and celebration as both families come together to dance the night away.',
    icon: '🎶',
  },
  {
    title: 'Baraat Procession',
    date: '15th December 2026',
    time: '9:00 AM',
    venue: 'Summer Palace — Main Entrance',
    description: "The groom's grand arrival with a joyous procession of music, dance, and celebration leading to the wedding venue.",
    icon: '🐴',
  },
  {
    title: 'Wedding Ceremony',
    date: '15th December 2026',
    time: '11:00 AM',
    venue: 'Summer Palace — Sacred Mandap',
    description: 'The sacred union under the mandap, where vows are exchanged around the holy fire in the presence of loved ones.',
    icon: '🔥',
  },
  {
    title: 'Grand Reception',
    date: '15th December 2026',
    time: '7:00 PM',
    venue: 'Summer Palace — Crystal Hall',
    description: 'An elegant evening reception with dinner, toasts, and dancing as we celebrate the newly married couple.',
    icon: '✨',
  },
];

const TimelineCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex w-full mb-12 md:mb-16 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-gold items-center justify-center z-10 text-xl"
      >
        {event.icon}
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, rotate: isLeft ? -3 : 3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`w-full md:w-[45%] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
      >
        <div className="animate-swing bg-card rounded-xl border border-gold/30 p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow relative">
          {/* Hanging string effect */}
          <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gold/40" />

          <div className="flex items-center gap-3 mb-3 md:hidden">
            <span className="text-xl">{event.icon}</span>
            <h3 className="font-heading text-xl text-foreground">{event.title}</h3>
          </div>
          <h3 className="hidden md:block font-heading text-2xl text-foreground mb-3">{event.title}</h3>

          <div className="space-y-1 mb-4">
            <p className="font-body text-sm text-primary tracking-wider">{event.date}</p>
            <p className="font-body text-sm text-muted-foreground">{event.time} · {event.venue}</p>
          </div>

          <p className="font-body text-base text-muted-foreground leading-relaxed">{event.description}</p>

          {/* Placeholder image */}
          <div className="mt-4 rounded-lg overflow-hidden border border-border aspect-[16/9] bg-secondary flex items-center justify-center">
            <p className="font-body text-xs text-muted-foreground">Event Photo Placeholder</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const vineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-4 bg-cream-dark relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4"
          >
            The Celebrations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl text-foreground"
          >
            Wedding Schedule
          </motion.h2>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Animated vine */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-gold via-gold-light to-gold origin-top"
            style={{ height: vineHeight }}
          />

          {/* Decorative leaves along vine */}
          {events.map((_, i) => (
            <motion.div
              key={`leaf-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`hidden md:block absolute left-1/2 w-4 h-4 ${i % 2 === 0 ? '-translate-x-6' : 'translate-x-3'}`}
              style={{ top: `${(i / events.length) * 100}%` }}
            >
              <svg viewBox="0 0 20 20" fill="hsl(var(--gold) / 0.5)">
                <path d="M10 0 C15 5 20 10 10 20 C0 10 5 5 10 0Z" />
              </svg>
            </motion.div>
          ))}

          {events.map((event, index) => (
            <TimelineCard key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
