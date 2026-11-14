/**
 * Sticker brand pieces. Stickers are rewards and markers, never decoration:
 * keep to one per screen (the countdown starburst on the dashboard, a flame for the streak).
 * Sticker colours stay fixed in both themes; outlines follow --outline.
 */

const STAR_POINTS =
  "60.0,16.0 69.1,26.2 82.0,21.9 84.7,35.3 98.1,38.0 93.8,50.9 104.0,60.0 93.8,69.1 98.1,82.0 84.7,84.7 82.0,98.1 69.1,93.8 60.0,104.0 50.9,93.8 38.0,98.1 35.3,84.7 21.9,82.0 26.2,69.1 16.0,60.0 26.2,50.9 21.9,38.0 35.3,35.3 38.0,21.9 50.9,26.2";

/** "BG" in marker strokes, drawn rather than typeset so it renders the same everywhere */
function MarkerLetters() {
  return (
    <g transform="translate(60 60) scale(0.92) translate(-60 -60)" fill="none" stroke="#000" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M31 42 V78" />
      <path d="M31 42 H40 A9 9 0 0 1 40 60 H31" />
      <path d="M31 60 H42 A9 9 0 0 1 42 78 H31" />
      <path d="M85.3 49.7 A16 16 0 1 0 88.9 61.4 H76" />
    </g>
  );
}

/** The app icon: a sunshine starburst on a cobalt tile */
export function StickerMark({ size = 32, title }: { size?: number; title?: string }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} className="shrink-0">
      <rect width="120" height="120" rx="30" fill="#2F5BFF" />
      <g transform="rotate(-10 60 60)">
        <polygon points={STAR_POINTS} fill="#FFD43B" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
        <MarkerLetters />
      </g>
    </svg>
  );
}

/** Tomato marker underline used under the wordmark */
export function Squiggle({ width = 170, className = "" }: { width?: number; className?: string }) {
  return (
    <svg viewBox="0 0 170 10" width={width} height={(width / 170) * 10} aria-hidden="true" className={className}>
      <path d="M2 6 C 20 1, 34 9, 52 5 S 86 1, 104 5 S 140 9, 168 3" stroke="#FF5C47" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** "Boards Grind" set in the display face, with the optional marker underline */
export function Wordmark({ size = 20, underline = false }: { size?: number; underline?: boolean }) {
  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <span className="font-display font-extrabold tracking-[-0.02em] leading-none whitespace-nowrap" style={{ fontSize: size, color: "var(--text)" }}>
        Boards Grind
      </span>
      {underline && <Squiggle width={size * 6.4} />}
    </span>
  );
}

/** A starburst sticker with content on top, e.g. the paper date on the countdown */
export function Starburst({ size = 132, rotate = 10, children }: { size?: number; rotate?: number; children?: React.ReactNode }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
        <polygon
          points="60.0,4.0 71.6,17.0 88.0,11.5 91.5,28.5 108.5,32.0 103.0,48.4 116.0,60.0 103.0,71.6 108.5,88.0 91.5,91.5 88.0,108.5 71.6,103.0 60.0,116.0 48.4,103.0 32.0,108.5 28.5,91.5 11.5,88.0 17.0,71.6 4.0,60.0 17.0,48.4 11.5,32.0 28.5,28.5 32.0,11.5 48.4,17.0"
          fill="#FFD43B"
          stroke="#000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ color: "#000" }}>
        {children}
      </div>
    </div>
  );
}

/** Reward stickers */
export function FlameSticker({ size = 56 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden="true" className="shrink-0">
      <g transform="rotate(-6 40 40)">
        <path d="M40 8 C46 22 60 28 60 46 C60 60 50 70 40 70 C30 70 20 60 20 46 C20 36 26 30 30 24 C32 32 36 34 38 34 C36 24 36 16 40 8 Z" fill="#FF5C47" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
        <path d="M40 44 C44 50 48 52 48 58 C48 63 44 66 40 66 C36 66 32 63 32 58 C32 53 36 50 40 44 Z" fill="#FFD43B" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function StarSticker({ size = 56 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden="true" className="shrink-0">
      <g transform="rotate(8 40 40)">
        <polygon points="40,8 49,29 72,31 54,46 60,69 40,56 20,69 26,46 8,31 31,29" fill="#FFD43B" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function CheckSticker({ size = 56 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden="true" className="shrink-0">
      <g transform="rotate(-4 40 40)">
        <rect x="12" y="12" width="56" height="56" rx="16" fill="#45D69B" stroke="#000" strokeWidth="3" />
        <path d="M27 41 L36 50 L54 30" stroke="#000" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
