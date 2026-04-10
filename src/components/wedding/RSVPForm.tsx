import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { toast } from 'sonner';

const rsvpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(15),
  attendance: z.enum(['accept', 'decline']),
});

type RSVPData = z.infer<typeof rsvpSchema>;

const RSVPForm = () => {
  const [form, setForm] = useState<RSVPData>({
    name: '', email: '', phone: '', attendance: 'accept',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof RSVPData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = rsvpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RSVPData, string>> = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as keyof RSVPData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // Placeholder submit
    console.log('RSVP submitted:', result.data);
    setSubmitted(true);
    toast.success('Thank you for your RSVP!', {
      description: form.attendance === 'accept'
        ? 'We are delighted that you will be joining us.'
        : 'We will miss you. Thank you for letting us know.',
    });
  };

  if (submitted) {
    return (
      <section className="py-24 md:py-32 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <p className="text-4xl mb-4">💌</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Response Received</h2>
          <p className="font-body text-xl text-muted-foreground">
            {form.attendance === 'accept'
              ? 'We are overjoyed and look forward to celebrating with you!'
              : 'We understand and will miss your presence dearly.'}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-4 bg-background relative overflow-hidden">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4"
          >
            Kindly Respond
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl text-foreground"
          >
            RSVP
          </motion.h2>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-card rounded-2xl border border-gold/30 p-8 md:p-12 shadow-lg space-y-8"
        >
          {/* Name */}
          <div>
            <label className="font-body text-sm text-muted-foreground tracking-[0.2em] uppercase block mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 font-body text-lg text-foreground transition-colors placeholder:text-muted-foreground/50"
              placeholder="Full Name"
            />
            {errors.name && <p className="font-body text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="font-body text-sm text-muted-foreground tracking-[0.2em] uppercase block mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 font-body text-lg text-foreground transition-colors placeholder:text-muted-foreground/50"
              placeholder="your@email.com"
            />
            {errors.email && <p className="font-body text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="font-body text-sm text-muted-foreground tracking-[0.2em] uppercase block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 font-body text-lg text-foreground transition-colors placeholder:text-muted-foreground/50"
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && <p className="font-body text-sm text-destructive mt-1">{errors.phone}</p>}
          </div>

          {/* Attendance */}
          <div>
            <label className="font-body text-sm text-muted-foreground tracking-[0.2em] uppercase block mb-4">
              Will You Be Joining Us?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleChange('attendance', 'accept')}
                className={`flex-1 py-4 rounded-xl border-2 font-body text-lg transition-all ${
                  form.attendance === 'accept'
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                Joyfully Accept
              </button>
              <button
                type="button"
                onClick={() => handleChange('attendance', 'decline')}
                className={`flex-1 py-4 rounded-xl border-2 font-body text-lg transition-all ${
                  form.attendance === 'decline'
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-accent/50'
                }`}
              >
                Regretfully Decline
              </button>
            </div>
            {errors.attendance && <p className="font-body text-sm text-destructive mt-1">{errors.attendance}</p>}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-heading text-lg tracking-wider hover:opacity-90 transition-opacity"
          >
            Send Response
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPForm;
