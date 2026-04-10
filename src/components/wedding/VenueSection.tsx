import { motion } from 'framer-motion';

const VenueSection = () => {
  return (
    <section className="py-24 md:py-32 px-4 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4"
          >
            The Celebration Awaits At
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl text-foreground mb-4"
          >
            Summer Palace
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-body text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A majestic venue nestled in the heart of Surat, where timeless elegance
            meets modern grandeur — the perfect setting for our union.
          </motion.p>
        </div>

        {/* Venue illustration placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12 rounded-2xl border-2 border-gold overflow-hidden shadow-lg"
        >
          <div className="aspect-[21/9] bg-secondary flex items-center justify-center">
            <div className="text-center p-8">
              <svg viewBox="0 0 120 80" className="w-24 h-16 mx-auto mb-4 opacity-30">
                <path d="M10 70 L30 30 L50 50 L70 20 L110 70Z" fill="hsl(var(--gold) / 0.2)" stroke="hsl(var(--gold))" strokeWidth="1"/>
                <circle cx="90" cy="25" r="10" fill="hsl(var(--gold) / 0.2)" stroke="hsl(var(--gold))" strokeWidth="1"/>
              </svg>
              <p className="font-body text-muted-foreground text-lg">Venue Illustration Placeholder</p>
              <p className="font-body text-sm text-muted-foreground mt-1">/public/assets/illustrations/venue.jpg</p>
            </div>
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12"
        >
          <p className="font-body text-lg text-foreground">Summer Palace</p>
          <p className="font-body text-muted-foreground">Vesu, Surat, Gujarat 395007</p>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="rounded-2xl overflow-hidden border-2 border-gold shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1251.040952407684!2d72.71778471191968!3d21.08572202753931!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0532e4a01a64f%3A0x19e8cd4aaa84508f!2sSummer%20Palace!5e1!3m2!1sen!2sin!4v1775637860057!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue — Summer Palace"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
