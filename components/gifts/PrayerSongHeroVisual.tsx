"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";

import {
  getPrayerSongSamplePlayerTrack,
  prayerSongHeroSample,
} from "@/components/gifts/prayerSongOccasionCards";
import { useGlobalMusicPlayer } from "@/lib/music-player/global-player-store";
import { cn } from "@/lib/utils";

const heroSampleTrack = getPrayerSongSamplePlayerTrack(prayerSongHeroSample);

export default function PrayerSongHeroVisual() {
  const { isPlaying, playTrack, toggle, track } = useGlobalMusicPlayer();
  const isCurrentTrack =
    track?.id === heroSampleTrack.id &&
    track.audioUrl === heroSampleTrack.audioUrl;
  const isCurrentTrackPlaying = isCurrentTrack && isPlaying;
  const actionLabel = isCurrentTrackPlaying
    ? `Pause sample song: ${heroSampleTrack.title}`
    : `Play sample song: ${heroSampleTrack.title}`;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_62%_24%,rgba(255,255,255,0.56),transparent_42%)] blur-2xl" />
      <div className="relative aspect-[1.6] overflow-hidden rounded-2xl bg-[#32192b] shadow-[0_28px_80px_rgba(69,34,54,0.24)] ring-1 ring-white/80 lg:aspect-[1.42]">
        <Image
          alt="Someone listening to a custom prayer song by a sunlit window"
          className="object-cover object-center"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          src="/images/occasions/prayer-song-hero.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.1),transparent_42%,rgba(46,12,34,0.22))]" />
      </div>

      <div className="absolute -bottom-5 left-5 right-5 md:left-auto md:w-[300px]">
        <button
          type="button"
          aria-label={actionLabel}
          className="w-full rounded-lg border border-white/70 bg-white/88 p-3.5 text-left shadow-[0_22px_56px_rgba(65,34,50,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf3f5d]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf7]"
          onClick={() => {
            if (isCurrentTrack) {
              toggle();
              return;
            }

            playTrack(heroSampleTrack);
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#ffe0e7] text-[#bf3f5d] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
                isCurrentTrackPlaying && "bg-[#bf3f5d] text-white",
              )}
            >
              {isCurrentTrackPlaying ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="ml-0.5 size-4 fill-current" />
              )}
            </span>
            <div>
              <p className="text-sm font-black text-[#261712]">
                A prayer they can hear
              </p>
              <p className="mt-1 text-xs leading-5 text-[#6f625c]">
                Names, a blessing, and the hope you want carried in the chorus.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
