import { useEffect, useState, useCallback, TouchEvent } from 'react';
import { motion } from 'framer-motion';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const IMAGE_ONE = '/gallery/lenticular-1.webp';
const IMAGE_TWO = '/gallery/lenticular-2.webp';

const LenticularCard = () => {
  const [tilt, setTilt] = useState({ x: 0.5, y: 0.5 });
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'unsupported'>('prompt');

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const gamma = event.gamma ?? 0; // left-right
    const beta = event.beta ?? 0; // front-back
    const normalizedX = clamp((gamma + 30) / 60, 0, 1);
    const normalizedY = clamp((beta + 30) / 60, 0, 1);
    setTilt({ x: normalizedX, y: normalizedY });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const supportsPermission = typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent;

    if (supportsPermission) {
      setPermissionState('prompt');
      return;
    }

    const handler = (event: DeviceOrientationEvent) => {
      handleOrientation(event);
      setPermissionState('granted');
    };

    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handler);
      return () => window.removeEventListener('deviceorientation', handler);
    }

    setPermissionState('unsupported');
  }, [handleOrientation]);

  const requestMotionPermission = async () => {
    if (typeof DeviceOrientationEvent === 'undefined' || !('requestPermission' in DeviceOrientationEvent)) {
      setPermissionState('unsupported');
      return;
    }

    try {
      const permission = await (DeviceOrientationEvent as any).requestPermission();
      if (permission === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
        setPermissionState('granted');
      } else {
        // Keep button visible for denied state so user can retry
        setPermissionState('denied');
      }
    } catch (error) {
      setPermissionState('unsupported');
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = clamp((touch.clientX - bounds.left) / bounds.width, 0, 1);
    const normalizedY = clamp((touch.clientY - bounds.top) / bounds.height, 0, 1);
    setTilt({ x: normalizedX, y: normalizedY });
  };

  const overlayOpacity = tilt.x;
  const offsetX = (tilt.x - 0.5) * 14;
  const offsetY = (tilt.y - 0.5) * 10;

  return (
    // Mobile only — same cream background as the gallery above so the two read as one block
    <section
      className="md:hidden relative pb-12 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FAF3E0 0%, #F0E6C8 50%, #FAF3E0 100%)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full overflow-hidden"
          style={{
            borderRadius: '2rem',
            border: '1px solid rgba(212,175,55,0.35)',
            boxShadow: '0 20px 50px rgba(45,8,8,0.16)',
            background: '#F0E6C8',
          }}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          onTouchEnd={() => setTilt({ x: 0.5, y: 0.5 })}
        >
          <div className="relative overflow-hidden aspect-[4/5]">
            <motion.img
              src={IMAGE_ONE}
              alt="Divya & Rishabh portrait"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-200"
              style={{ transform: `translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)` }}
              initial={false}
            />
            <motion.img
              src={IMAGE_TWO}
              alt="Divya & Rishabh portrait overlay"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: overlayOpacity, scale: 1.02, x: offsetX, y: offsetY }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
        </motion.div>

        <div className="text-center mt-6">
          <p className="font-body font-semibold" style={{ color: '#7A1F1F', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Tilt your phone to blend the two portraits.
          </p>

          {(permissionState === 'prompt' || permissionState === 'denied') && (
            <button
              type="button"
              onClick={requestMotionPermission}
              className="mt-4 inline-flex items-center justify-center font-body uppercase"
              style={{
                padding: '0.7rem 1.6rem',
                border: '1px solid rgba(212,175,55,0.55)',
                borderRadius: '100px',
                background: '#F7E2B8',
                color: '#8B1A1A',
                fontSize: '0.8rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
              }}
            >
              {permissionState === 'denied' ? 'Retry Motion Access' : 'Enable Motion'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default LenticularCard;
