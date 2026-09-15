"use client";

import { GiftMotifMark } from "@/components/virtual-gifts/GiftMotif";
import { LoveLetterPreview } from "@/components/virtual-gifts/LoveLetterPreview";
import {
  VirtualGiftMusicPicker,
  type MusicSelection,
} from "@/components/virtual-gifts/VirtualGiftMusicPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/routing";
import type { VirtualGiftSongOption } from "@/lib/virtual-gifts/song-options";
import {
  LOVE_LETTER_TEMPLATE_ID,
  VIRTUAL_GIFT_VIBES,
  type LoveLetterVibe,
} from "@/lib/virtual-gifts/templates";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, Copy, ImagePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DRAFT_KEY = "virtual-gift-draft-v2";

type DraftState = {
  vibe: LoveLetterVibe;
  message: string;
  senderName: string;
  imageUrl: string | null;
  imageKey: string | null;
  music: MusicSelection;
};

type LoveLetterEditorProps = {
  songs: VirtualGiftSongOption[];
  isLoggedIn: boolean;
  embedded?: boolean;
};

async function uploadVirtualGiftFile(
  kind: "image" | "audio",
  file: File,
): Promise<{ publicObjectUrl: string; key: string }> {
  const presignResponse = await fetch("/api/virtual-gifts/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      kind,
      contentType: file.type || (kind === "image" ? "image/jpeg" : "audio/mpeg"),
      fileName: file.name,
      size: file.size,
    }),
  });
  const presignJson = await presignResponse.json();
  if (!presignResponse.ok || !presignJson.success) {
    throw new Error(presignJson.error || "Upload failed");
  }

  const { presignedUrl, publicObjectUrl, key } = presignJson.data;
  const put = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type":
        file.type || (kind === "image" ? "image/jpeg" : "audio/mpeg"),
    },
    body: file,
  });
  if (!put.ok) {
    throw new Error("Upload failed");
  }

  return { publicObjectUrl, key };
}

function loadDraft(): DraftState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftState;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveDraft(draft: DraftState) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // ignore quota errors
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export function LoveLetterEditor({
  songs,
  isLoggedIn,
  embedded = false,
}: LoveLetterEditorProps) {
  const t = useTranslations("VirtualGifts.editor");
  const [hydrated, setHydrated] = useState(false);
  const [vibe, setVibe] = useState<LoveLetterVibe>("hearts");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [music, setMusic] = useState<MusicSelection>({ source: "none" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [creating, setCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      if (VIRTUAL_GIFT_VIBES.includes(draft.vibe)) setVibe(draft.vibe);
      if (typeof draft.message === "string") setMessage(draft.message);
      if (typeof draft.senderName === "string") setSenderName(draft.senderName);
      if (draft.imageUrl) setImageUrl(draft.imageUrl);
      if (draft.imageKey) setImageKey(draft.imageKey);
      if (draft.music?.source) setMusic(draft.music);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || shareUrl) return;
    saveDraft({
      vibe,
      message,
      senderName,
      imageUrl,
      imageKey,
      music,
    });
  }, [
    hydrated,
    vibe,
    message,
    senderName,
    imageUrl,
    imageKey,
    music,
    shareUrl,
  ]);

  const handleCreate = async () => {
    if (!message.trim()) {
      toast.error(t("messageRequired"));
      return;
    }

    setCreating(true);
    try {
      const body = {
        templateId: LOVE_LETTER_TEMPLATE_ID,
        vibe,
        message: message.trim(),
        senderName: senderName.trim() || null,
        imageUrl,
        imageKey,
        audioSource: music.source,
        songId: music.source === "song" ? music.songId : null,
        audioUrl: music.source === "upload" ? music.audioUrl : null,
        audioKey: music.source === "upload" ? music.audioKey : null,
      };

      const response = await fetch("/api/virtual-gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || t("createFailed"));
      }

      clearDraft();
      setShareUrl(json.data.shareUrl);
      toast.success(t("createdTitle"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("createFailed"),
      );
    } finally {
      setCreating(false);
    }
  };

  const Wrapper = embedded ? "div" : "main";
  const CreatedHeading = embedded ? "h2" : "h1";

  return (
    <Wrapper
      className={
        embedded
          ? "w-full bg-transparent text-foreground"
          : "min-h-screen w-full bg-[#fbfaf7] text-foreground"
      }
    >
      <div
        className={
          embedded
            ? "mx-auto w-full px-0 py-0"
            : "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
        }
      >
        {embedded ? null : (
          <>
            <Link
              href="/virtual-gifts"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition hover:text-stone-900"
            >
              <ArrowLeft className="size-4" />
              {t("backToPicker")}
            </Link>
            <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {t("description")}
            </p>
          </>
        )}

        <div className="mt-0 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] xl:grid-cols-[minmax(0,1fr)_minmax(22rem,32rem)]">
          <div className="order-2 min-w-0 lg:order-1">
            {shareUrl ? (
              <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
                <CreatedHeading className="font-serif text-3xl font-bold text-stone-950">
                  {t("createdTitle")}
                </CreatedHeading>
                <p className="mt-3 text-sm text-stone-600">
                  {t("createdDescription")}
                </p>
                <p className="mt-6 break-all rounded-xl bg-stone-50 px-4 py-3 text-left text-sm text-stone-700">
                  {shareUrl}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    type="button"
                    className="rounded-full"
                    onClick={async () => {
                      await navigator.clipboard.writeText(shareUrl);
                      setCopied(true);
                      toast.success(t("copied"));
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    {t("copyLink")}
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={shareUrl} target="_blank" rel="noreferrer">
                      {t("openGift")}
                    </a>
                  </Button>
                </div>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShareUrl(null);
                      setMessage("");
                      setSenderName("");
                      setImageUrl(null);
                      setImageKey(null);
                      setMusic({ source: "none" });
                      setVibe("hearts");
                    }}
                  >
                    {t("createAnother")}
                  </Button>
                  {isLoggedIn ? (
                    <Button asChild variant="link">
                      <Link href="/mygifts">{t("viewMyGifts")}</Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <section>
                  <h2 className="font-serif text-xl italic text-stone-800">
                    {t("chooseVibe")}
                  </h2>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {VIRTUAL_GIFT_VIBES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setVibe(option)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-2xl border-2 bg-white px-2 py-3 text-center text-xs font-semibold text-stone-800 transition",
                          vibe === option
                            ? "border-stone-900 ring-2 ring-stone-900 ring-offset-2"
                            : "border-stone-200 opacity-90 hover:border-stone-400 hover:opacity-100",
                        )}
                      >
                        <GiftMotifMark motif={option} size={36} />
                        {t(`vibes.${option}`)}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="mt-8 space-y-4">
                  <div>
                    <label
                      htmlFor="virtual-gift-message"
                      className="text-sm font-semibold text-stone-800"
                    >
                      {t("messageLabel")}
                    </label>
                    <Textarea
                      id="virtual-gift-message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={t("messagePlaceholder")}
                      rows={5}
                      maxLength={2000}
                      className="mt-2 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="virtual-gift-sender"
                      className="text-sm font-semibold text-stone-800"
                    >
                      {t("senderLabel")}
                    </label>
                    <Input
                      id="virtual-gift-sender"
                      value={senderName}
                      onChange={(event) => setSenderName(event.target.value)}
                      placeholder={t("senderPlaceholder")}
                      maxLength={80}
                      className="mt-2 rounded-full"
                    />
                  </div>
                </section>

                <section className="mt-8">
                  <p className="text-sm font-semibold text-stone-800">
                    {t("photoLabel")}
                  </p>
                  {imageUrl ? (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt=""
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <div className="flex gap-2 border-t border-stone-100 p-3">
                        <label className="inline-flex">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="sr-only"
                            disabled={uploadingImage}
                            onChange={async (event) => {
                              const file = event.target.files?.[0];
                              event.target.value = "";
                              if (!file) return;
                              setUploadingImage(true);
                              try {
                                const upload = await uploadVirtualGiftFile(
                                  "image",
                                  file,
                                );
                                setImageUrl(upload.publicObjectUrl);
                                setImageKey(upload.key);
                              } catch (error) {
                                toast.error(
                                  error instanceof Error
                                    ? error.message
                                    : t("uploadFailed"),
                                );
                              } finally {
                                setUploadingImage(false);
                              }
                            }}
                          />
                          <span className="inline-flex h-8 cursor-pointer items-center rounded-full border px-3 text-sm font-medium">
                            {t("changePhoto")}
                          </span>
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setImageUrl(null);
                            setImageKey(null);
                          }}
                        >
                          {t("removePhoto")}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-10 text-stone-600 transition hover:border-primary/40 hover:bg-[#fffaf8]">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        disabled={uploadingImage}
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          event.target.value = "";
                          if (!file) return;
                          setUploadingImage(true);
                          try {
                            const upload =
                              await uploadVirtualGiftFile("image", file);
                            setImageUrl(upload.publicObjectUrl);
                            setImageKey(upload.key);
                          } catch (error) {
                            toast.error(
                              error instanceof Error
                                ? error.message
                                : t("uploadFailed"),
                            );
                          } finally {
                            setUploadingImage(false);
                          }
                        }}
                      />
                      <ImagePlus className="size-6" aria-hidden />
                      <span className="text-sm font-medium">
                        {uploadingImage ? "…" : t("uploadPhoto")}
                      </span>
                    </label>
                  )}
                </section>

                <section className="mt-8">
                  <VirtualGiftMusicPicker
                    songs={songs}
                    isLoggedIn={isLoggedIn}
                    selection={music}
                    onChange={setMusic}
                    uploading={uploadingAudio}
                    onUploadAudio={async (file) => {
                      setUploadingAudio(true);
                      try {
                        const upload = await uploadVirtualGiftFile(
                          "audio",
                          file,
                        );
                        setMusic({
                          source: "upload",
                          audioUrl: upload.publicObjectUrl,
                          audioKey: upload.key,
                        });
                      } catch (error) {
                        toast.error(
                          error instanceof Error
                            ? error.message
                            : t("uploadFailed"),
                        );
                      } finally {
                        setUploadingAudio(false);
                      }
                    }}
                  />
                </section>

                <Button
                  type="button"
                  size="lg"
                  className="mt-10 w-full rounded-full"
                  disabled={creating || uploadingImage || uploadingAudio}
                  onClick={handleCreate}
                >
                  {creating ? t("creating") : t("createGift")}
                </Button>
              </>
            )}
          </div>

          <div className="order-1 lg:sticky lg:top-24 lg:order-2">
            <LoveLetterPreview
              imageUrl={imageUrl}
              message={message}
              senderName={senderName}
              vibe={vibe}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
