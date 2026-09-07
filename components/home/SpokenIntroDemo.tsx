"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

const AUDIO_URL =
  "https://cdn.customsong.top/songs/generated/8de2cf6c-75ea-4205-9a60-b9d2ed6fb42c/d4f673f296340a201910fa3434ed42bf/0c5904f4-bad2-4018-8a60-785a75cc7ba2/audio.mp3";
const INTRO_END_SECONDS = 12.06;

const introLines = [
  { text: "Hey May,", start: 2.7, end: 4.68 },
  { text: "happy Valentine's Day.", start: 4.73, end: 7.54 },
  {
    text: "Out of all the songs in the world, you're still my favorite melody.",
    start: 7.58,
    end: INTRO_END_SECONDS,
  },
];

export default function SpokenIntroDemo({
  className,
  compact = false,
  playOnCardClick = false,
}: {
  className?: string;
  compact?: boolean;
  playOnCardClick?: boolean;
}) {
  const t = useTranslations("Landing.VoicePersonalization");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const isIntroComplete = currentTime >= INTRO_END_SECONDS;
  const introProgress = Math.min(currentTime / INTRO_END_SECONDS, 1) * 100;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  const playIcon = isPlaying ? (
    <Pause className="size-4 fill-current" aria-hidden="true" />
  ) : (
    <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
  );
  const playControlClassName = cn(
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ff725d] text-[#2a120d] shadow-[0_10px_24px_rgba(255,114,93,0.28)] transition hover:scale-105 hover:bg-[#ff8c7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#21130f]",
    compact && "size-10",
  );

  return (
    <div
      className={cn(
        "mt-7 overflow-hidden rounded-xl border border-[#42271f] bg-[#21130f] text-white shadow-[0_16px_34px_rgba(54,38,27,0.15)]",
        playOnCardClick && "cursor-pointer",
        className,
      )}
      onClick={playOnCardClick ? togglePlayback : undefined}
      onKeyDown={
        playOnCardClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                void togglePlayback();
              }
            }
          : undefined
      }
      role={playOnCardClick ? "button" : undefined}
      tabIndex={playOnCardClick ? 0 : undefined}
      aria-label={
        playOnCardClick
          ? isPlaying
            ? t("items.spokenIntro.demo.pause")
            : t("items.spokenIntro.demo.play")
          : undefined
      }
    >
      <audio
        ref={audioRef}
        preload="metadata"
        src={AUDIO_URL}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
      />

      <div
        className={cn(
          "relative overflow-hidden px-5 pb-5 pt-4 sm:px-6",
          compact && "px-4 pb-4 pt-3.5 sm:px-5",
        )}
      >
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffb4a4]">
              {t("items.spokenIntro.demo.eyebrow")}
            </p>
            <p className="mt-1 truncate text-sm font-bold text-white">
              {t("items.spokenIntro.demo.title")}
            </p>
          </div>
          {playOnCardClick ? (
            <span className={playControlClassName} aria-hidden="true">
              {playIcon}
            </span>
          ) : (
            <button
              type="button"
              title={
                isPlaying
                  ? t("items.spokenIntro.demo.pause")
                  : t("items.spokenIntro.demo.play")
              }
              aria-label={
                isPlaying
                  ? t("items.spokenIntro.demo.pause")
                  : t("items.spokenIntro.demo.play")
              }
              onClick={togglePlayback}
              className={playControlClassName}
            >
              {playIcon}
            </button>
          )}
        </div>

        <div
          className={cn(
            "relative mt-5 border-l border-[#ff8c7b]/55 pl-4",
            compact && "mt-4",
          )}
        >
          <p className="text-xs font-semibold text-[#ffb4a4]">
            {t("items.spokenIntro.demo.label")}
          </p>
          <blockquote
            className={cn(
              "mt-2 text-pretty font-semibold text-white",
              compact
                ? "text-sm leading-6 sm:text-[0.95rem]"
                : "text-[1.05rem] leading-7 sm:text-lg",
            )}
          >
            {introLines.map((line) => {
              const isActive =
                currentTime >= line.start && currentTime < line.end;
              const isComplete = currentTime >= line.end;

              return (
                <span
                  key={line.text}
                  className={
                    isActive || isComplete ? "text-white" : "text-white/38"
                  }
                >
                  {line.text}{" "}
                </span>
              );
            })}
          </blockquote>
        </div>

        <div
          className={cn(
            "relative mt-5 h-1 overflow-hidden rounded-full bg-white/15",
            compact && "mt-4",
          )}
        >
          <div
            className="h-full rounded-full bg-[#ff725d] shadow-[0_0_12px_rgba(255,114,93,0.8)] transition-[width] duration-150"
            style={{ width: `${introProgress}%` }}
          />
        </div>
        <p className="relative mt-3 flex items-center gap-2 text-xs font-medium text-white/65">
          <Volume2 className="size-3.5 text-[#ffb4a4]" aria-hidden="true" />
          {isIntroComplete
            ? t("items.spokenIntro.demo.songStarts")
            : t("items.spokenIntro.demo.introPlaying")}
        </p>
      </div>
    </div>
  );
}
