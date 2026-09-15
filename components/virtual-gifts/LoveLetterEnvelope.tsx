"use client";

import { GiftMotifMark } from "@/components/virtual-gifts/GiftMotif";
import type { LoveLetterVibe } from "@/lib/virtual-gifts/templates";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type LoveLetterEnvelopeProps = {
  vibe: LoveLetterVibe;
  onOpen?: () => void;
  tapLabel?: string;
  disabled?: boolean;
  className?: string;
};

function EnvelopeArtwork({ vibe }: { vibe: LoveLetterVibe }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className="h-auto w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      aria-hidden
    >
      <path
        d="M28 78h264v132c0 10-8 18-18 18H46c-10 0-18-8-18-18V78Z"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M28 78l132 88L292 78"
        fill="none"
        stroke="#111111"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M28 78l132-52 132 52"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      {vibe === "hearts" ? (
        <>
          <circle
            cx="160"
            cy="148"
            r="22"
            fill="#e11d2e"
            stroke="#111111"
            strokeWidth="6"
          />
          <path
            d="M160 158c0 0-12-8-12-15.5C148 137 152 134 156 134c2.5 0 4 1.5 4 3.5C160 135.5 161.5 134 164 134c4 0 8 3 8 8.5C172 150 160 158 160 158Z"
            fill="#ffffff"
          />
        </>
      ) : null}
    </svg>
  );
}

function EnvelopeMotion({
  vibe,
  tapLabel,
  shrinking,
  interactive,
}: {
  vibe: LoveLetterVibe;
  tapLabel?: string;
  shrinking?: boolean;
  interactive?: boolean;
}) {
  return (
    <motion.div
      className="relative"
      whileHover={
        interactive && !shrinking ? { y: -4, scale: 1.02 } : undefined
      }
      whileTap={interactive && !shrinking ? { scale: 0.98 } : undefined}
      animate={
        shrinking
          ? { scale: [1, 1.04, 0.92], opacity: [1, 1, 0] }
          : { y: [0, -6, 0] }
      }
      transition={
        shrinking
          ? { duration: 0.55, ease: "easeIn" }
          : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <EnvelopeArtwork vibe={vibe} />
      {vibe !== "hearts" ? (
        <span className="pointer-events-none absolute left-1/2 top-[58%] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:size-16">
          <GiftMotifMark motif={vibe} size={56} />
        </span>
      ) : null}
      {tapLabel ? (
        <span className="mt-5 block text-center font-serif text-lg font-semibold tracking-tight text-stone-700 sm:text-xl">
          {tapLabel}
        </span>
      ) : null}
    </motion.div>
  );
}

export function LoveLetterEnvelope({
  vibe,
  onOpen,
  tapLabel,
  disabled,
  className,
}: LoveLetterEnvelopeProps) {
  const body: ReactNode = (
    <EnvelopeMotion
      vibe={vibe}
      tapLabel={tapLabel}
      shrinking={Boolean(onOpen) && disabled}
      interactive={Boolean(onOpen)}
    />
  );

  if (!onOpen) {
    return (
      <div
        className={cn(
          "relative mx-auto w-full max-w-[280px] sm:max-w-[320px]",
          className,
        )}
      >
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={disabled}
      className={cn(
        "group relative mx-auto w-full max-w-[280px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-default sm:max-w-[320px]",
        className,
      )}
      aria-label={tapLabel}
    >
      {body}
    </button>
  );
}
