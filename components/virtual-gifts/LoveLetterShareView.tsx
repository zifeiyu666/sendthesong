"use client";

import { HeartBurst } from "@/components/virtual-gifts/HeartBurst";
import { LoveLetterEnvelope } from "@/components/virtual-gifts/LoveLetterEnvelope";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import type { LoveLetterVibe } from "@/lib/virtual-gifts/templates";
import { cn } from "@/lib/utils";
import { MailOpen, Pause, Play, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export type LoveLetterShareData = {
  vibe: LoveLetterVibe;
  message: string;
  senderName: string | null;
  imageUrl: string | null;
  audioUrl: string | null;
};

type Phase = "idle" | "bursting" | "revealed";

function MessageCard({
  title,
  message,
  senderName,
  fromLabel,
  imageUrl,
  className,
}: {
  title: string;
  message: string;
  senderName: string | null;
  fromLabel?: string;
  imageUrl: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-3xl border border-stone-200 bg-[#fffaf7] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-8",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2 text-primary">
        <MailOpen className="size-5" aria-hidden />
        <span className="font-serif text-lg font-semibold text-stone-800">
          {title}
        </span>
      </div>
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="mb-5 aspect-[4/3] w-full rounded-2xl object-cover"
        />
      ) : null}
      <p className="whitespace-pre-wrap font-serif text-lg leading-8 text-stone-800 sm:text-xl">
        {message}
      </p>
      {senderName ? (
        <p className="mt-6 text-right font-serif italic text-stone-600">
          {fromLabel || `— ${senderName}`}
        </p>
      ) : null}
    </div>
  );
}

export function LoveLetterShareView({ gift }: { gift: LoveLetterShareData }) {
  const t = useTranslations("VirtualGifts.share");
  const [phase, setPhase] = useState<Phase>("idle");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!gift.audioUrl) return;
    const audio = new Audio(gift.audioUrl);
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
      if (revealTimerRef.current) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, [gift.audioUrl]);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    await startMusic();
  };

  const handleOpen = async () => {
    if (phase !== "idle") return;
    setPhase("bursting");
    void startMusic();
    revealTimerRef.current = window.setTimeout(() => {
      setPhase("revealed");
    }, 1200);
  };

  const showHearts = phase === "bursting" || phase === "revealed";
  const showCard = phase === "revealed";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#f7f4ef] text-stone-900">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z' fill='%23000'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <HeartBurst active={showHearts} motif={gift.vibe} className="z-20" />

      {!showCard ? (
        <div className="relative z-40 mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            {t("title")}
          </p>
          <div className="mt-8 flex flex-1 items-center justify-center">
            <LoveLetterEnvelope
              vibe={gift.vibe}
              onOpen={handleOpen}
              tapLabel={t("tapToOpen")}
              disabled={phase !== "idle"}
            />
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {showCard ? (
          <motion.div
            key="reveal-layer"
            className="relative z-40 flex min-h-screen flex-col"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
              <motion.div
                className="w-full max-w-md"
                initial={{ y: "-120vh", opacity: 0.85, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 16,
                  mass: 1,
                }}
              >
                <MessageCard
                  title={t("title")}
                  message={gift.message}
                  senderName={gift.senderName}
                  fromLabel={
                    gift.senderName
                      ? t("from", { name: gift.senderName })
                      : undefined
                  }
                  imageUrl={gift.imageUrl}
                />
              </motion.div>
            </div>

            <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 pb-10 sm:px-6">
              {gift.audioUrl ? (
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full bg-white/90 shadow-md backdrop-blur"
                    onClick={toggleMusic}
                  >
                    {playing ? (
                      <>
                        <Pause className="size-4" />
                        {t("pauseMusic")}
                      </>
                    ) : (
                      <>
                        <Play className="size-4" />
                        {t("playMusic")}
                      </>
                    )}
                  </Button>
                </div>
              ) : null}

              <section className="rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-md backdrop-blur">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-stone-900">
                      {t("ctaTitle")}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {t("ctaDescription")}
                    </p>
                    <Button asChild className="mt-4 rounded-full" size="sm">
                      <Link href="/create-song">{t("ctaButton")}</Link>
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
