import { cn } from "@/lib/utils";
import type { LoveLetterVibe } from "@/lib/virtual-gifts/templates";

const RIBBON_COLORS = ["#e11d2e", "#f4c430", "#ec4899", "#2a9d8f", "#3b82f6"];

export function BurstHeart({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
    >
      <path
        d="M32 56C32 56 6 40 6 22.5C6 13.5 13 8 20.5 8C26 8 29.5 11 32 15C34.5 11 38 8 43.5 8C51 8 58 13.5 58 22.5C58 40 32 56 32 56Z"
        fill="#e11d2e"
        stroke="#111111"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BurstStar({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
    >
      <path
        d="M32 6.5 39.1 24.4 58 25.4 43.4 37.6 48.4 56 32 45.8 15.6 56 20.6 37.6 6 25.4 24.9 24.4Z"
        fill="#f4c430"
        stroke="#111111"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BurstRibbon({
  size,
  colorIndex = 0,
  className,
}: {
  size: number;
  colorIndex?: number;
  className?: string;
}) {
  const fill = RIBBON_COLORS[Math.abs(colorIndex) % RIBBON_COLORS.length];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
    >
      <path
        d="M10 18c8-11 16 6 24-3 8-8 14 7 22-2 3-3 7 4 6 9-8 11-16-4-24 4-8 8-14-7-22 2-3 3-7-4-6-10Z"
        fill={fill}
        stroke="#111111"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M12 36c7-9 15 5 22-3 7-7 13 6 20-1 3-3 7 4 6 9-7 10-15-4-22 3-7 7-13-6-20 1-3 3-7-4-6-9Z"
        fill={fill}
        stroke="#111111"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BurstRose({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/virtual-gifts/rose.svg"
      alt=""
      width={size}
      height={size}
      className={cn("select-none", className)}
      draggable={false}
    />
  );
}

export function GiftMotifMark({
  motif,
  size = 36,
  className,
}: {
  motif: LoveLetterVibe;
  size?: number;
  className?: string;
}) {
  if (motif === "roses") return <BurstRose size={size} className={className} />;
  if (motif === "stars") return <BurstStar size={size} className={className} />;
  if (motif === "ribbons") {
    return <BurstRibbon size={size} className={className} />;
  }
  return <BurstHeart size={size} className={className} />;
}

export function BurstMotif({
  motif,
  size,
  colorIndex = 0,
}: {
  motif: LoveLetterVibe;
  size: number;
  colorIndex?: number;
}) {
  if (motif === "roses") return <BurstRose size={size} />;
  if (motif === "stars") return <BurstStar size={size} />;
  if (motif === "ribbons") {
    return <BurstRibbon size={size} colorIndex={colorIndex} />;
  }
  return <BurstHeart size={size} />;
}
