import { motion } from 'framer-motion';

const FAMILY_NAME = 'Shah family';
const GROOM_NAME = 'Rishabh';
const GROOM_GRANDPARENTS = 'Harakchandji & Padmadevi Shah';
const GROOM_PARENTS = 'Pradeep ji & Manju ji Shah';
const BRIDE_NAME = 'Divya';
const BRIDE_GRANDPARENTS = 'Harakchandji & Pyaribai Patodi';
const BRIDE_PARENTS = 'Anil & Roshni Patodi';
// Contact block is hidden while this list is empty.
const CONTACTS: { name: string; phone: string }[] = [
  { name: 'Pradeep Shah', phone: '+91 98970 37856' },
  { name: 'Manju Shah', phone: '+91 99975 55229' },
];

const ThankYou = () => {
  return (
    <footer
      className="relative px-4 overflow-hidden  flex flex-col items-center justify-center py-6"
      style={{
        background: 'linear-gradient(160deg, #FAF3E0 0%, #F0E6C8 50%, #FAF3E0 100%)',
      }}
    >
      <style>{`
        @font-face {
          font-family: 'madelican';
          src: url('/madelican.regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
      {/* Mehndi dot texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">

        {/* ── Mahavir Bhagwan illustration ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ marginBottom: '1rem' }}
        >
          <img
            src="/assets/mahavir-bhagwan.png"
            alt="Mahavir Bhagwan — Divine Blessing"
            style={{
              width: 'min(46vw, 300px)',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              objectFit: 'contain',
              // multiply: white bg blends into cream, illustration stays vivid
              mixBlendMode: 'multiply',
            }}
          />
        </motion.div>

        {/* ── // Shubh Vivah // ──────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-heading italic font-medium mb-5"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#B8860B',
            letterSpacing: '0.12em',
          }}
        >
          // Shubh Vivah //
        </motion.p>

        {/* ── Thank You heading ─────────────────────────────────────────────── */}
        {/* <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-heading mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            color: '#2D0808',
            lineHeight: 1.1,
          }}
        >
          Thank You
        </motion.h2> */}

        {/* ── Thank You heading ─────────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-heading mb-6"
          style={{
            fontSize: '2.2rem',
            // color: '#2D0808',
            color: '#154734',
            lineHeight: 1.1,
          }}
        >
          Jai Jinendra
        </motion.h2>

        {/* ── Gold divider ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span style={{ flex: 1, maxWidth: '6rem', height: '1px', background: 'rgba(184,134,11,0.4)', display: 'block' }} />
          <span className="font-body text-xs" style={{ color: '#B8860B' }}>✦</span>
          <span style={{ flex: 1, maxWidth: '6rem', height: '1px', background: 'rgba(184,134,11,0.4)', display: 'block' }} />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden mb-10 rounded-[2rem] border border-white/10"
          style={{ background: '#7A1F1F', padding: '2rem 1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.16)' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              // background: 'radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.06), transparent 60%)',
              background: 'linear-gradient(160deg, #2D0808 0%, #4A1010 50%, #3A0C0C 100%)',
              pointerEvents: 'none',
            }}
          />
          <div className="relative text-center max-w-3xl mx-auto">
            {FAMILY_NAME && <p
              className="font-label uppercase"
              style={{
                color: '#F8E7D0',
                letterSpacing: '0.26em',
                fontSize: 'clamp(1rem, 1vw, 0.9rem)',
                marginBottom: '0.8rem',
                opacity: 0.9,
                fontWeight: 700,
              }}
            >
              {FAMILY_NAME}
            </p>}

            <p
              className="font-heading"
              style={{
                color: '#F5E8D0',
                fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                lineHeight: 1.3,
                // fontWeight: 700,
                marginBottom: '1.2rem',
              }}
            >
              Cordially invites you to celebrate the wedding ceremony of
            </p>

            <div
              style={{
                display: 'grid',
                gap: '1rem',
                alignItems: 'start',
                justifyItems: 'center',
                marginTop: "4rem",
              }}
            >
              <div style={{ maxWidth: '30rem' }}>
                <p
                  className="font-heading"
                  style={{
                    color: '#F8E7D0',
                    fontSize: 'clamp(3rem, 3vw, 2.3rem)',
                    lineHeight: 1.1,
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                    fontFamily: '"Italianno", cursive',
                  }}
                >
                  {GROOM_NAME}
                </p>
                <p
                  className="font-body"
                  style={{
                    color: '#F2D9B8',
                    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                    lineHeight: 1.7,
                    letterSpacing: '0.03em',
                  }}
                >
                  {GROOM_GRANDPARENTS && <>Grandson of {GROOM_GRANDPARENTS}<br /></>}
                  {GROOM_PARENTS && <>S/O {GROOM_PARENTS}</>}
                </p>
              </div>

              <div style={{ maxWidth: '30rem' }}>
                <p
                  className="font-heading"
                  style={{
                    color: '#F8E7D0',
                    fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
                    lineHeight: 1.1,
                    fontWeight: 800,
                    marginBottom: '1.2rem',
                  }}
                >
                  &amp;
                </p>
              </div>

              <div style={{ maxWidth: '30rem', textAlign: 'center' }}>
                <p
                  className="font-heading"
                  style={{
                    color: '#F8E7D0',
                    fontSize: 'clamp(3rem, 3vw, 2.3rem)',
                    lineHeight: 1.1,
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                    fontFamily: '"Italianno", cursive',
                  }}
                >
                  {BRIDE_NAME}
                </p>
                <p
                  className="font-body"
                  style={{
                    color: '#F2D9B8',
                    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                    lineHeight: 1.7,
                    letterSpacing: '0.03em',
                  }}
                >
                  {BRIDE_GRANDPARENTS && <>Granddaughter of {BRIDE_GRANDPARENTS}<br /></>}
                  {BRIDE_PARENTS && <>D/O {BRIDE_PARENTS}</>}
                </p>
              </div>

            </div>
          </div>
        </motion.section>

        {/* ── For any queries ───────────────────────────────────────────────── */}
        {CONTACTS.length > 0 && <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          style={{ marginBottom: '2rem' }}
        >
          <p
            className="font-label font-semibold uppercase mb-3"
            style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', letterSpacing: '0.2em', color: '#B8860B' }}
          >
            For Any Queries
          </p>
          <p className="font-body" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', color: 'rgba(45,8,8,0.85)', lineHeight: 1.8 }}>
            {CONTACTS.map(({ name, phone }, i) => (
              <span key={name}>
                {i > 0 && <br />}
                {name} · <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-sans tracking-wide">{phone}</a>
              </span>
            ))}
          </p>
        </motion.div>}

        {/* ── Gold divider ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <span style={{ flex: 1, maxWidth: '4rem', height: '1px', background: 'rgba(184,134,11,0.65)', display: 'block' }} />
          <span className="font-body text-xs" style={{ color: 'rgba(184,134,11,0.85)' }}>✦</span>
          <span style={{ flex: 1, maxWidth: '4rem', height: '1px', background: 'rgba(184,134,11,0.65)', display: 'block' }} />
        </motion.div>

        {/* ── Sanskrit shloka ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
          className="font-heading italic"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(45,8,8,0.82)',
            lineHeight: 1.9,
            maxWidth: '28rem',
            margin: '0 auto',
          }}
        >
          सप्तपदी — सात फेरों का वचन
          <br />
          <span style={{ fontSize: '0.88em', letterSpacing: '0.04em' }}>
            "एक दूजे के साथ, सात जन्मों तक"
          </span>
        </motion.p>

        {/* ── Couple names ──────────────────────────────────────────────────── */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85 }}
          className="font-heading mt-8"
          style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
            color: '#2D0808',
            letterSpacing: '0.06em',
          }}
        >
          Rishabh &amp; Divya
        </motion.p> */}

      </div>
    </footer>
  );
};

export default ThankYou;
