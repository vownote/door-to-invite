

# Hindu Wedding Invitation — Cinematic Digital Experience

## Design System
- **Palette**: Cream (#FDF6E3, #FAF0DC) + Gold (#C9A84C, #D4AF37) + Deep Burgundy accents (#8B1A2B)
- **Fonts**: Playfair Display (headings), Cormorant Garamond (body/subheadings)
- **Animations**: Framer Motion for scroll reveals, parallax, entrance animations throughout
- **Ornamental dividers**: SVG-based zigzag/torn-edge/floral separators between every section

## Sections (in scroll order)

### 1. Hero Section
Full-viewport cinematic entrance with couple names (placeholder), "Together with their families…" text, animated mandala/floral border, fade-in staggered typography, floating petal particles

### 2. Scratch-to-Reveal Date (Full-Screen Overlay)
Canvas-based scratch card overlay that blocks scrolling. Gold foil texture scratch layer, "Scratch to reveal the date" instruction. On ~60% reveal: confetti burst animation, shows wedding date + "We're Getting Married" text, overlay fades and scroll unlocks. Touch + mouse support.

### 3. Countdown Timer
Elegant circular/radial countdown (days, hours, minutes, seconds) with SVG ring animations, gold gradient strokes, decorative mandala backdrop

### 4. Couple Gallery — 3D Cylindrical Carousel
CSS 3D perspective carousel with 8 placeholder photo cards rotating on a cylinder. Infinite autoplay, subtle floating/bobbing motion, gold frame borders, depth-of-field blur on back cards

### 5. Venue & Location
Elegant venue name + address typography, placeholder illustration area, embedded Google Maps (satellite mode) with the provided iframe, ornamental border frame

### 6. Full Schedule — Vertical Timeline
Based on the CodyHouse CodePen reference:
- Central vertical line with alternating left/right event cards
- 5-6 events: Haldi, Mehndi, Sangeet, Baraat, Wedding Ceremony, Reception
- Scroll-triggered reveal animations (bounce-in)
- Animated floral vine growing along the center line on scroll
- Hanging photo card animations (swinging on scroll entry) inspired by reference video
- Each card has event name, date/time, venue, and placeholder image

### 7. RSVP Section
Minimal, card-based elegant form (not a traditional form look). Fields: Name, Email, Phone, Attendance (Joyfully Accept / Regretfully Decline). Zod validation, placeholder submit function, sonner toast on success. Gold-accented inputs.

### 8. Add to Google Calendar
Styled gold button immediately below RSVP that generates a Google Calendar link with placeholder event details

### 9. Thank You Section
Refined closing message with animated typography, floating decorative elements (diyas/petals), gratitude text

### 10. Contact / Footer
Family contact details (both sides), subtle mandala motifs, floral garland divider connecting to footer

## Cross-Cutting Features
- **Floating particles**: Subtle falling petals/diya particles throughout using a lightweight canvas/CSS particle system
- **Background music**: Auto-play soft audio (placeholder file path), play/pause toggle fixed at bottom-right
- **Ornamental dividers**: 4-5 unique SVG divider styles used between sections
- **Smooth scroll**: CSS scroll-behavior smooth + Framer Motion scroll-triggered animations on every section
- **Parallax**: Subtle parallax on hero background and decorative elements
- **Mobile-first**: Fully responsive, timeline stacks to single column on mobile, carousel scales, scratch card touch-optimized

## Asset Structure
```
/public/assets/images/       — couple photos, venue, event placeholders
/public/assets/audio/        — background music placeholder
/public/assets/icons/        — mandala, diya, om SVG icons
/public/assets/illustrations/ — venue illustration, floral elements
```

## Component Architecture
- `HeroSection`, `ScratchReveal`, `CountdownTimer`, `CoupleCarousel`, `VenueSection`, `Timeline`, `TimelineEvent`, `RSVPForm`, `CalendarButton`, `ThankYou`, `ContactFooter`
- `OrnamentalDivider` (reusable, multiple variants)
- `FloatingParticles` (global overlay)
- `MusicPlayer` (fixed toggle)
- Custom hooks: `useScrollLock`, `useScratchCanvas`, `useCountdown`

