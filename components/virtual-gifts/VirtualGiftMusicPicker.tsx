"use client";

import LoginDialog from "@/components/auth/LoginDialog";
import { Button } from "@/components/ui/button";
import type { VirtualGiftSongOption } from "@/lib/virtual-gifts/song-options";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { Music2, Sparkles, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type MusicSelection =
  | { source: "none" }
  | { source: "song"; songId: string; title: string; audioUrl: string }
  | { source: "upload"; audioUrl: string; audioKey: string };

type VirtualGiftMusicPickerProps = {
  songs: VirtualGiftSongOption[];
  isLoggedIn: boolean;
  selection: MusicSelection;
  onChange: (selection: MusicSelection) => void;
  onUploadAudio: (file: File) => Promise<void>;
  uploading?: boolean;
};

export function VirtualGiftMusicPicker({
  songs,
  isLoggedIn,
  selection,
  onChange,
  onUploadAudio,
  uploading = false,
}: VirtualGiftMusicPickerProps) {
  const t = useTranslations("VirtualGifts.editor");
  const [loginOpen, setLoginOpen] = useState(false);
  const [showSongList, setShowSongList] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-stone-800">{t("musicLabel")}</p>

      <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-[#fff5f3] to-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-stone-950">
              {t("musicCreateTitle")}
            </h3>
            <p className="mt-1 text-sm leading-5 text-stone-600">
              {t("musicCreateDescription")}
            </p>
            <Button asChild className="mt-3 rounded-full" size="sm">
              <Link href="/create-song">{t("musicCreateCta")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700">
            <Music2 className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-stone-950">
              {t("musicLibraryTitle")}
            </h3>
            <p className="mt-1 text-sm leading-5 text-stone-600">
              {t("musicLibraryDescription")}
            </p>
            {selection.source === "song" ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-stone-800">
                  {t("selectedSong", { title: selection.title })}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange({ source: "none" })}
                >
                  {t("musicClear")}
                </Button>
              </div>
            ) : null}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 rounded-full"
              onClick={() => {
                if (!isLoggedIn) {
                  setLoginOpen(true);
                  return;
                }
                if (songs.length === 0) {
                  setShowSongList(true);
                  return;
                }
                setShowSongList((open) => !open);
              }}
            >
              {isLoggedIn ? t("musicLibraryCta") : t("musicLibrarySignIn")}
            </Button>
            {showSongList && isLoggedIn ? (
              <div className="mt-3 max-h-48 space-y-1 overflow-y-auto rounded-xl border border-stone-100 p-2">
                {songs.length === 0 ? (
                  <p className="px-2 py-3 text-sm text-stone-500">
                    {t("musicLibraryEmpty")}
                  </p>
                ) : (
                  songs.map((song) => (
                    <button
                      key={song.id}
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-stone-50",
                        selection.source === "song" &&
                          selection.songId === song.id &&
                          "bg-primary/10",
                      )}
                      onClick={() => {
                        onChange({
                          source: "song",
                          songId: song.id,
                          title: song.title,
                          audioUrl: song.audioUrl,
                        });
                        setShowSongList(false);
                      }}
                    >
                      {song.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={song.imageUrl}
                          alt=""
                          className="size-9 rounded-md object-cover"
                        />
                      ) : (
                        <span className="flex size-9 items-center justify-center rounded-md bg-stone-100">
                          <Music2 className="size-4 text-stone-500" />
                        </span>
                      )}
                      <span className="truncate font-medium text-stone-800">
                        {song.title}
                      </span>
                    </button>
                  ))
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700">
            <Upload className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-stone-950">
              {t("musicUploadTitle")}
            </h3>
            <p className="mt-1 text-sm leading-5 text-stone-600">
              {t("musicUploadDescription")}
            </p>
            {selection.source === "upload" ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-stone-800">
                  {t("selectedUpload")}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange({ source: "none" })}
                >
                  {t("musicClear")}
                </Button>
              </div>
            ) : null}
            <label className="mt-3 inline-flex">
              <input
                type="file"
                accept="audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/mp4,audio/m4a,audio/x-m4a,audio/ogg,.mp3,.wav,.m4a,.ogg"
                className="sr-only"
                disabled={uploading}
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  await onUploadAudio(file);
                }}
              />
              <span className="inline-flex h-8 cursor-pointer items-center rounded-full border border-input bg-background px-3 text-sm font-medium shadow-sm transition hover:bg-accent hover:text-accent-foreground">
                {uploading ? "…" : t("musicUploadCta")}
              </span>
            </label>
          </div>
        </div>
      </div>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        callbackPath="/virtual-gifts/love-letter"
      />
    </div>
  );
}

export type { MusicSelection };
