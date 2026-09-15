"use client";

import { BurstMotif } from "@/components/virtual-gifts/GiftMotif";
import type { LoveLetterVibe } from "@/lib/virtual-gifts/templates";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { memo, useMemo, type CSSProperties } from "react";

type HeartBurstProps = {
  active: boolean;
  motif?: LoveLetterVibe;
  className?: string;
};

type HeartParticle = {
  id: number;
  size: number;
  x: number;
  y: number;
  rotate: number;
  delay: number;
  duration: number;
  floatX: number;
  floatY: number;
  floatRotate: number;
  floatDuration: number;
  floatVariant: "a" | "b" | "c";
};

function createParticles(count: number): HeartParticle[] {
  const particles: HeartParticle[] = [];
  const cols = 12;
  const variants: Array<HeartParticle["floatVariant"]> = ["a", "b", "c"];
  for (let i = 0; i < count; i += 1) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jitterX = ((i * 17) % 9) - 4;
    const jitterY = ((i * 13) % 7) - 3;
    const dirX = i % 2 === 0 ? 1 : -1;
    const dirR = i % 3 === 0 ? -1 : 1;
    particles.push({
      id: i,
      size: 48 + ((i * 23) % 110),
      x: -55 + col * 10 + jitterX * 0.6,
      y: -88 + row * 11.5 + jitterY * 0.7,
      rotate: ((i * 47) % 56) - 28,
      delay: (i % 16) * 0.022,
      duration: 0.65 + (i % 8) * 0.055,
      floatX: (12 + ((i * 31) % 22)) * dirX,
      floatY: 18 + ((i * 19) % 28),
      floatRotate: (4 + ((i * 11) % 8)) * dirR,
      floatDuration: 5.2 + ((i * 13) % 58) / 10,
      floatVariant: variants[i % 3],
    });
  }
  return particles;
}

const BurstHeartParticle = memo(function BurstHeartParticle({
  heart,
  motif,
}: {
  heart: HeartParticle;
  motif: LoveLetterVibe;
}) {
  const floatStyle = {
    "--vg-fx": `${heart.floatX}px`,
    "--vg-fy": `${heart.floatY}px`,
    "--vg-fr": `${heart.floatRotate}deg`,
    "--vg-fd": `${heart.floatDuration}s`,
    "--vg-fdelay": `${0.08 + heart.delay + heart.duration}s`,
  } as CSSProperties;

  return (
    <motion.div
      className="absolute left-1/2 top-[62%] will-change-transform"
      initial={{
        opacity: 0,
        x: "-50%",
        y: 0,
        scale: 0.08,
        rotate: 0,
      }}
      animate={{
        opacity: 1,
        x: `calc(-50% + ${heart.x}cqw)`,
        y: `${heart.y}cqh`,
        scale: 1,
        rotate: heart.rotate,
      }}
      transition={{
        delay: 0.08 + heart.delay,
        duration: heart.duration,
        ease: [0.12, 0.8, 0.2, 1],
      }}
    >
      <div
        className={cn(
          "vg-heart-float",
          heart.floatVariant === "a" && "vg-heart-float-a",
          heart.floatVariant === "b" && "vg-heart-float-b",
          heart.floatVariant === "c" && "vg-heart-float-c",
        )}
        style={floatStyle}
      >
        <BurstMotif motif={motif} size={heart.size} colorIndex={heart.id} />
      </div>
    </motion.div>
  );
});

export function HeartBurst({
  active,
  motif = "hearts",
  className,
}: HeartBurstProps) {
  const particles = useMemo(() => createParticles(120), []);

  if (!active) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden @container-[size]",
        className,
      )}
      aria-hidden
    >
      {particles.map((heart) => (
        <BurstHeartParticle key={heart.id} heart={heart} motif={motif} />
      ))}
    </div>
  );
}
