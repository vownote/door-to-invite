import { motion } from 'framer-motion';

const CalendarButton = () => {
  const googleCalendarUrl = (() => {
    const title = encodeURIComponent('Priya & Arjun Wedding');
    const details = encodeURIComponent('You are cordially invited to the wedding ceremony of Priya & Arjun at Summer Palace, Surat.');
    const location = encodeURIComponent('Summer Palace, Vesu, Surat, Gujarat 395007');
    const startDate = '20261215T053000Z'; // 11:00 AM IST = 5:30 AM UTC
    const endDate = '20261215T143000Z';   // 8:00 PM IST
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  })();

  return (
    <section className="py-16 px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto text-center"
      >
        <p className="font-body text-lg text-muted-foreground mb-6">
          Don't forget to mark your calendar
        </p>
        <motion.a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-heading text-lg tracking-wider hover:opacity-90 transition-opacity shadow-lg"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add to Google Calendar
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CalendarButton;
