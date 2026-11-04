import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Confetti particles (CSS-based, no external lib) ─────────────────────────

const CONFETTI_COLORS = ['#FF8C00', '#D4AF37', '#B8860B', '#8B1A2B', '#E8C84C'];

const confettiParticles = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.9,
  duration: 2.0 + Math.random() * 2.0,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  size: 5 + Math.random() * 7,
  isCircle: Math.random() > 0.5,
  rotate: Math.random() * 720 - 360,
}));

// ─── Main component ───────────────────────────────────────────────────────────

const ScratchRevealDateSingleBox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const sparkleId = useRef(0);
  const hasRevealed = useRef(false);

  // ── Initialise canvas fill ──────────────────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gold gradient fill
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#E8C84C');
    gradient.addColorStop(0.4, '#D4AF37');
    gradient.addColorStop(0.7, '#C9A96E');
    gradient.addColorStop(1, '#B8935A');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle noise texture via tiny dots
    for (let i = 0; i < 1200; i++) {
      const tx = Math.random() * canvas.width;
      const ty = Math.random() * canvas.height;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '0,0,0'},${Math.random() * 0.07})`;
      ctx.fillRect(tx, ty, 1.5, 1.5);
    }

    // "Scratch to reveal the date" hint
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `500 ${Math.max(26, canvas.height * 0.14)}px "Cormorant Garamond", serif`;
    ctx.fillStyle = 'rgba(74,15,15)';
    ctx.fillText('✦  Scratch to reveal the date  ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    const onResize = () => { if (!hasRevealed.current) initCanvas(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [initCanvas]);

  // ── Scratch logic ───────────────────────────────────────────────────────────
  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealed.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';

    // Smooth line between last and current point
    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(cx, cy);
      ctx.lineWidth = 52;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.stroke();
    }

    // Soft radial eraser blob at current point
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
    grd.addColorStop(0, 'rgba(0,0,0,1)');
    grd.addColorStop(0.6, 'rgba(0,0,0,0.85)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    lastPos.current = { x: cx, y: cy };

    // Sparkle particles
    if (Math.random() > 0.65) {
      const newSparkle = {
        id: sparkleId.current++,
        x: clientX - rect.left + (Math.random() - 0.5) * 36,
        y: clientY - rect.top + (Math.random() - 0.5) * 36,
      };
      setSparkles(prev => [...prev.slice(-5), newSparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 550);
    }

    // Check reveal percentage (sample every ~100 calls is expensive; check on mouseUp instead)
  }, []);

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealed.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) transparent++;
    }
    const pct = transparent / (data.length / 4);
    if (pct > 0.42) {
      hasRevealed.current = true;
      setRevealed(true);
    }
  }, []);

  // ── Mouse handlers ──────────────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };
  const handleMouseUp = () => {
    setIsScratching(false);
    lastPos.current = null;
    checkReveal();
  };

  // ── Touch handlers ──────────────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };
  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPos.current = null;
    checkReveal();
  };

  return (
    <>
      <section
        className="relative w-full py-24 lg:py-20 flex flex-col items-center justify-center px-4"
        style={{
          background: 'linear-gradient(160deg, #2D0808 0%, #4A1010 50%, #3A0C0C 100%)',
        }}
      >

        {/* OM symbol */}
        {/* <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: '#B8860B', marginBottom: '0.5rem', lineHeight: 1 }}
        >
          ॐ
        </motion.p> */}

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-heading text-3xl md:text-4xl text-center"
          // style={{ color: '#4A0F0F', marginBottom: '0.75rem' }}
          style={{ color: '#F5E8D0', marginBottom: '0.75rem' }}
        >
          Save the Date
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-body font-semibold text-center"
          style={{ color: '#B8860B', marginBottom: '2.5rem', fontSize: 'clamp(0.85rem, 1.4vw, 1.2rem)' }}
        >
          Scratch the seal to reveal our wedding date
        </motion.p>

        {/* Scratch card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          ref={containerRef}
          className="relative mx-auto rounded-[2rem] overflow-hidden border border-[#D4AF37]/40 shadow-2xl shadow-yellow-200/50"
          style={{
            width: 'clamp(280px, 78vw, 560px)',
            height: 'clamp(120px, 30vw, 220px)',
            backgroundColor: revealed ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Sparkle effects (positioned relative to container) */}
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              className="absolute pointer-events-none z-30"
              style={{ left: sparkle.x, top: sparkle.y, fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              ✨
            </motion.div>
          ))}

          {/* Date content revealed beneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: '0.5rem' }}>
            <p
              className="font-heading"
              style={{
                fontSize: 'clamp(1.6rem, 4.4vw, 3rem)',
                color: '#f5e8d0',
                letterSpacing: '0.04em',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              02 December 2026
            </p>
            <p
              className="font-body font-bold text-center uppercase"
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1rem)',
                color: '#f5e8d0',
                marginTop: '0.3rem',
              }}
            >
              Wednesday
            </p>
          </div>

          {/* Gold foil scratch canvas */}
          <AnimatePresence>
            {!revealed && (
              <motion.canvas
                ref={canvasRef}
                className="scratch-canvas absolute inset-0 w-full h-full z-20"
                style={{ cursor: 'pointer', touchAction: 'none' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Revealed blessing */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="blessing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ marginTop: '1.75rem', textAlign: 'center' }}
            >
              <p className="font-heading text-xl md:text-3xl italic" style={{ color: '#F5E8D0' }}>
                We're getting married!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CSS confetti burst on reveal */}
        <AnimatePresence>
          {revealed && confettiParticles.map(p => (
            <motion.div
              key={p.id}
              initial={{ y: '-5vh', x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: '110vh', opacity: 0, rotate: p.rotate }}
              transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.isCircle ? '50%' : '2px',
                pointerEvents: 'none',
                zIndex: 50,
              }}
            />
          ))}
        </AnimatePresence>
      </section>
    </>
  );
};

export default ScratchRevealDateSingleBox;
