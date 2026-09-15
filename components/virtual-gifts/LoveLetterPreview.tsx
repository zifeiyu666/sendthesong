"use client";

import { HeartBurst } from "@/components/virtual-gifts/HeartBurst";
import { LoveLetterEnvelope } from "@/components/virtual-gifts/LoveLetterEnvelope";
import type { LoveLetterVibe } from "@/lib/virtual-gifts/templates";
import { cn } from "@/lib/utils";
import { MailOpen, Monitor, Smartphone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type PreviewDevice = "phone" | "desktop";
type PreviewPhase = "idle" | "bursting" | "revealed";

type LoveLetterPreviewProps = {
  vibe: LoveLetterVibe;
  message: string;
  senderName: string;
  imageUrl: string | null;
};

function PreviewMessageCard({
  title,
  message,
  senderName,
  fromLabel,
  imageUrl,
}: {
  title: string;
  message: string;
  senderName: string;
  fromLabel?: string;
  imageUrl: string | null;
}) {
  return (
    <div className="w-full rounded-2xl border border-stone-200 bg-[#fffaf7] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-primary">
        <MailOpen className="size-4" aria-hidden />
        <span className="font-serif text-sm font-semibold text-stone-800">
          {title}
        </span>
      </div>
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="mb-3 aspect-4/3 w-full rounded-xl object-cover"
        />
      ) : null}
      <p className="whitespace-pre-wrap font-serif text-sm leading-6 text-stone-800">
        {message}
      </p>
      {senderName ? (
        <p className="mt-4 text-right font-serif text-sm italic text-stone-600">
          {fromLabel || `— ${senderName}`}
        </p>
      ) : null}
    </div>
  );
}

export function LoveLetterPreview({
  vibe,
  message,
  senderName,
  imageUrl,
}: LoveLetterPreviewProps) {
  const t = useTranslations("VirtualGifts.editor");
  const shareT = useTranslations("VirtualGifts.share");
  const reduceMotion = useReducedMotion();
  const [device, setDevice] = useState<PreviewDevice>("phone");
  const [phase, setPhase] = useState<PreviewPhase>("idle");
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("revealed");
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const run = async () => {
      while (!cancelled) {
        setPhase("idle");
        setCycleKey((key) => key + 1);
        await wait(1800);
        if (cancelled) return;
        setPhase("bursting");
        await wait(1200);
        if (cancelled) return;
        setPhase("revealed");
        await wait(3800);
      }
    };

    void run();

    return () => {
      cancelled = true;
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [vibe, reduceMotion]);

  const previewMessage = message.trim() || t("previewSampleMessage");
  const showHearts = phase === "bursting" || phase === "revealed";
  const showCard = phase === "revealed";
  const isPhone = device === "phone";

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-flex rounded-full border border-[#ead7cf] bg-white p-1"
        role="group"
        aria-label={t("previewDeviceLabel")}
      >
        <button
          type="button"
          onClick={() => setDevice("phone")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition",
            isPhone
              ? "bg-[#261712] text-white"
              : "text-[#6c5f59] hover:text-[#261712]",
          )}
          aria-pressed={isPhone}
        >
          <Smartphone className="size-3.5" />
          {t("previewPhone")}
        </button>
        <button
          type="button"
          onClick={() => setDevice("desktop")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition",
            !isPhone
              ? "bg-[#261712] text-white"
              : "text-[#6c5f59] hover:text-[#261712]",
          )}
          aria-pressed={!isPhone}
        >
          <Monitor className="size-3.5" />
          {t("previewDesktop")}
        </button>
      </div>

      <div
        className={cn(
          "mt-4 overflow-hidden border-[7px] border-[#1c1210] bg-[#1c1210] shadow-[0_28px_70px_rgba(48,24,16,0.28)]",
          isPhone
            ? "w-[min(100%,280px)] rounded-[2.15rem]"
            : "w-full rounded-[1.15rem]",
        )}
      >
        {isPhone ? null : (
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#2a1b16] px-3 py-2">
            <span className="size-2 rounded-full bg-[#e25c4a]" />
            <span className="size-2 rounded-full bg-[#f0c14b]" />
            <span className="size-2 rounded-full bg-[#63c074]" />
            <span className="ml-2 truncate rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/55">
              onecustomsong.com/g
            </span>
          </div>
        )}
        <div
          className={cn(
            "relative overflow-hidden bg-[#f7f4ef]",
            isPhone ? "aspect-[9/17.2]" : "aspect-16/10 min-h-[360px]",
          )}
        >
          {isPhone ? (
            <div className="absolute left-1/2 top-2 z-30 h-5 w-18 -translate-x-1/2 rounded-full bg-[#1c1210]" />
          ) : null}

          <HeartBurst
            active={showHearts}
            className="z-40"
            key={`${vibe}-${cycleKey}`}
            motif={vibe}
          />

          {!showCard ? (
            <div className="relative z-30 flex h-full flex-col items-center justify-center px-5 pt-8">
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                {shareT("title")}
              </p>
              <div className="mt-4 w-full max-w-[210px] pointer-events-none">
                <LoveLetterEnvelope
                  className="max-w-none sm:max-w-none"
                  disabled={phase !== "idle"}
                  key={`envelope-${vibe}-${cycleKey}`}
                  onOpen={() => undefined}
                  tapLabel={shareT("tapToOpen")}
                  vibe={vibe}
                />
              </div>
            </div>
          ) : null}

          <AnimatePresence>
            {showCard ? (
              <motion.div
                animate={{ opacity: 1 }}
                className="relative z-30 flex h-full items-center justify-center px-4 py-8"
                initial={{ opacity: 1 }}
                key={`card-${vibe}-${cycleKey}`}
              >
                <motion.div
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  className="w-full max-w-sm"
                  initial={
                    reduceMotion
                      ? { y: 0, opacity: 1, rotate: 0 }
                      : { y: "-70%", opacity: 0.85, rotate: -2 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 16,
                    mass: 1,
                  }}
                >
                  <PreviewMessageCard
                    fromLabel={
                      senderName.trim()
                        ? shareT("from", { name: senderName.trim() })
                        : undefined
                    }
                    imageUrl={imageUrl}
                    message={previewMessage}
                    senderName={senderName.trim()}
                    title={shareT("title")}
                  />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
