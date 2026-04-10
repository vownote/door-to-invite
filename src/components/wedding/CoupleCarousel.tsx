import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CARD_COUNT = 8;
const ROTATION_SPEED = 0.3; // degrees per frame

const CoupleCarousel = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setRotation(prev => prev + ROTATION_SPEED);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const angleStep = 360 / CARD_COUNT;
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 300;

  return (
    <section className="py-24 md:py-32 px-4 bg-cream-dark relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4"
        >
          Moments Together
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-heading text-4xl md:text-5xl text-foreground"
        >
          Our Gallery
        </motion.h2>
      </div>

      <div className="flex justify-center items-center" style={{ perspective: '1000px', height: '400px' }}>
        <div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            width: '200px',
            height: '280px',
          }}
        >
          {Array.from({ length: CARD_COUNT }).map((_, i) => {
            const angle = i * angleStep;
            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="w-[160px] h-[220px] md:w-[200px] md:h-[280px] rounded-lg border-2 border-gold overflow-hidden shadow-xl bg-card">
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <div className="text-center p-4">
                      <svg viewBox="0 0 80 80" className="w-12 h-12 mx-auto mb-2 opacity-30">
                        <rect x="5" y="5" width="70" height="70" rx="8" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.5"/>
                        <circle cx="30" cy="30" r="8" fill="none" stroke="hsl(var(--gold))" strokeWidth="1"/>
                        <path d="M5 55 L25 35 L45 50 L55 42 L75 60 L75 75 L5 75Z" fill="hsl(var(--gold) / 0.15)"/>
                      </svg>
                      <p className="font-body text-xs text-muted-foreground">Photo {i + 1}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoupleCarousel;
