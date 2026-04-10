import { motion } from 'framer-motion';

const ThankYou = () => {
  return (
    <section className="py-24 md:py-32 px-4 bg-cream-dark relative overflow-hidden">
      {/* Floating decorative elements */}
      {['✦', '✧', '❋', '✦', '❋'].map((char, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl text-primary/20 pointer-events-none"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          {char}
        </motion.span>
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="font-body text-lg text-muted-foreground tracking-[0.3em] uppercase">With Love & Gratitude</p>
          <h2 className="font-heading text-4xl md:text-6xl text-foreground">Thank You</h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-32 h-px bg-primary mx-auto"
          />

          <p className="font-body text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Your presence at our wedding would be the greatest gift of all. We are truly blessed to have
            you in our lives and cannot wait to celebrate this joyous occasion with you.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="font-heading text-2xl md:text-3xl text-primary italic"
          >
            With all our love,
          </motion.p>
          <p className="font-heading text-3xl md:text-4xl text-foreground">
            Priya & Arjun
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThankYou;
