import { motion } from 'framer-motion';

const ContactFooter = () => {
  return (
    <footer className="py-16 md:py-24 px-4 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-body text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4">
            For Any Queries
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground">Contact Us</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Bride's family */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-heading text-xl text-foreground mb-4">Bride's Family</h3>
            <div className="space-y-2 font-body text-muted-foreground">
              <p className="text-lg text-foreground">Mr. & Mrs. Rajesh Sharma</p>
              <p>+91 98765 43210</p>
              <p>sharma.family@email.com</p>
              <p className="text-sm mt-3">42, Athwa Lines, Surat, Gujarat</p>
            </div>
          </motion.div>

          {/* Groom's family */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-heading text-xl text-foreground mb-4">Groom's Family</h3>
            <div className="space-y-2 font-body text-muted-foreground">
              <p className="text-lg text-foreground">Mr. & Mrs. Vikram Patel</p>
              <p>+91 98765 12345</p>
              <p>patel.family@email.com</p>
              <p className="text-sm mt-3">15, Adajan, Surat, Gujarat</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-primary/30" />
            <span className="text-primary text-xl">✦</span>
            <div className="w-16 h-px bg-primary/30" />
          </div>
          <p className="font-heading text-lg text-primary italic">
            Priya & Arjun
          </p>
          <p className="font-body text-sm text-muted-foreground mt-2">
            15th December 2026 · Surat, India
          </p>
          <p className="font-body text-xs text-muted-foreground mt-4">
            Made with ♥
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default ContactFooter;
