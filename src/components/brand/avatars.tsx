import { avatarFor, type AvatarKey } from "@/lib/identity";

/**
 * Sticker avatars: one family, so every character shares the same face (dot eyes, small
 * smile, blush) and chunky black outlines that still read at 28px. Colours are sticker
 * colours and stay fixed in both themes.
 */

const INK = "#000";
const COBALT = "#2F5BFF";
const SUN = "#FFD43B";
const TOMATO = "#FF5C47";
const MINT = "#45D69B";
const PAPER = "#F3F3EE";

function Face({ y = 44, wide = false }: { y?: number; wide?: boolean }) {
  const gap = wide ? 6 : 5;
  return (
    <g>
      <circle cx={40 - gap} cy={y} r="2.7" fill={INK} />
      <circle cx={40 + gap} cy={y} r="2.7" fill={INK} />
      <ellipse cx={40 - gap - 5} cy={y + 5} rx="2.6" ry="1.6" fill="#FF8FA3" opacity="0.85" />
      <ellipse cx={40 + gap + 5} cy={y + 5} rx="2.6" ry="1.6" fill="#FF8FA3" opacity="0.85" />
      <path d={`M${40 - 3.5} ${y + 5.5} Q40 ${y + 9} ${40 + 3.5} ${y + 5.5}`} stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
  );
}

const S = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

const ART: Record<AvatarKey, { bg: string; body: React.ReactNode }> = {
  ghost: {
    bg: COBALT,
    body: (
      <>
        <path d="M25 64 V40 a15 15 0 0 1 30 0 V64 l-5 -4.5 l-5 4.5 l-5 -4.5 l-5 4.5 l-5 -4.5 Z" fill="#FFFFFF" {...S} />
        <Face y={41} />
      </>
    ),
  },
  cloud: {
    bg: MINT,
    body: (
      <>
        <path d="M24 57 a8 8 0 0 1 1 -16 a11 11 0 0 1 20 -7 a10 10 0 0 1 14 8 a7.5 7.5 0 0 1 -1 15 Z" fill="#FFFFFF" {...S} />
        <Face y={45} />
      </>
    ),
  },
  toast: {
    bg: TOMATO,
    body: (
      <>
        <path d="M25 63 V38 a8.5 8.5 0 0 1 3 -16 h24 a8.5 8.5 0 0 1 3 16 V63 Z" fill="#F5C77E" {...S} />
        <path d="M30 59 V37 a5 5 0 0 1 2 -10 h16 a5 5 0 0 1 2 10 V59 Z" fill="#FCE7BE" />
        <Face y={43} />
      </>
    ),
  },
  cat: {
    bg: SUN,
    body: (
      <>
        <path d="M23 63 V38 L26 21 L36 30 H44 L54 21 L57 38 V63 Z" fill={TOMATO} {...S} />
        <path d="M19 49 H28 M20 54 L28 52.5 M61 49 H52 M60 54 L52 52.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <Face y={44} />
      </>
    ),
  },
  frog: {
    bg: SUN,
    body: (
      <>
        <circle cx="30" cy="36" r="8" fill={MINT} {...S} />
        <circle cx="50" cy="36" r="8" fill={MINT} {...S} />
        <ellipse cx="40" cy="51" rx="21" ry="14" fill={MINT} {...S} />
        <circle cx="30" cy="36" r="4" fill="#FFFFFF" />
        <circle cx="50" cy="36" r="4" fill="#FFFFFF" />
        <circle cx="30.5" cy="36.5" r="2.2" fill={INK} />
        <circle cx="50.5" cy="36.5" r="2.2" fill={INK} />
        <path d="M31 53 Q40 59 49 53" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="26" cy="52" rx="2.6" ry="1.6" fill="#FF8FA3" opacity="0.85" />
        <ellipse cx="54" cy="52" rx="2.6" ry="1.6" fill="#FF8FA3" opacity="0.85" />
      </>
    ),
  },
  samosa: {
    bg: MINT,
    body: (
      <>
        <path d="M40 20 L62 61 H18 Z" fill="#F2B544" {...S} />
        <path d="M24 56 l3 -4 M30 56 l3 -4 M36 56 l3 -4 M42 56 l3 -4 M48 56 l3 -4" stroke="#C98A22" strokeWidth="1.6" strokeLinecap="round" />
        <Face y={44} />
      </>
    ),
  },
  chai: {
    bg: TOMATO,
    body: (
      <>
        <path d="M33 30 q-3 -4 0 -8 M41 30 q-3 -4 0 -8" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M52 42 h3.5 a5.5 5.5 0 0 1 0 11 h-3.5" fill="none" {...S} />
        <path d="M23 36 H53 V52 a12 12 0 0 1 -12 12 h-6 a12 12 0 0 1 -12 -12 Z" fill="#FFFFFF" {...S} />
        <path d="M25.5 39 H50.5 V43 H25.5 Z" fill="#C47A3D" />
        <Face y={50} />
      </>
    ),
  },
  star: {
    bg: PAPER,
    body: (
      <>
        <polygon points="40.0,22.0 46.8,35.7 61.9,37.9 50.9,48.6 53.5,63.6 40.0,56.5 26.5,63.6 29.1,48.6 18.1,37.9 33.2,35.7" fill={SUN} {...S} />
        <Face y={44} />
      </>
    ),
  },
  moon: {
    bg: COBALT,
    body: (
      <>
        <path d="M47 21 a21 21 0 1 0 14 34 a17 17 0 0 1 -14 -34 Z" fill={SUN} {...S} />
        <circle cx="58" cy="26" r="2.2" fill="#FFFFFF" />
        <circle cx="62" cy="38" r="1.6" fill="#FFFFFF" />
        <g transform="translate(-10 2) scale(0.9) translate(4.4 4.9)">
          <Face y={44} />
        </g>
      </>
    ),
  },
  blob: {
    bg: PAPER,
    body: (
      <>
        <path d="M24 56 C18 44 26 26 41 27 C57 28 63 44 57 55 C52 64 30 66 24 56 Z" fill={TOMATO} {...S} />
        <Face y={45} />
      </>
    ),
  },
};

/** A student's sticker avatar. Pass `seed` (their name) so a student without a pick still gets a stable sticker */
export function StickerAvatar({
  avatar,
  seed,
  size = 32,
  tilt = 0,
  label,
}: {
  avatar?: string | null;
  seed?: string | null;
  size?: number;
  tilt?: number;
  label?: string;
}) {
  const key = avatarFor(avatar, seed);
  const art = ART[key];
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className="shrink-0"
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="40" cy="40" r="37" fill={art.bg} stroke={INK} strokeWidth="3" />
      {art.body}
    </svg>
  );
}
