import { z } from "zod";
import {
  LOVE_LETTER_TEMPLATE_ID,
  VIRTUAL_GIFT_VIBES,
} from "@/lib/virtual-gifts/templates";

export const MAX_VIRTUAL_GIFT_MESSAGE_LENGTH = 2000;
export const MAX_VIRTUAL_GIFT_SENDER_NAME_LENGTH = 80;
export const MAX_VIRTUAL_GIFT_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIRTUAL_GIFT_AUDIO_BYTES = 15 * 1024 * 1024;

export const VIRTUAL_GIFT_IMAGE_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const VIRTUAL_GIFT_AUDIO_CONTENT_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/ogg",
] as const;

const imageExtensionByContentType = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

const audioExtensionByContentType: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/mp4": "m4a",
  "audio/m4a": "m4a",
  "audio/x-m4a": "m4a",
  "audio/ogg": "ogg",
};

export const virtualGiftPresignSchema = z.object({
  kind: z.enum(["image", "audio"]),
  contentType: z.string().trim().min(1),
  fileName: z.string().trim().min(1).max(180),
  size: z.number().int().positive(),
});

export const createVirtualGiftSchema = z.object({
  templateId: z.literal(LOVE_LETTER_TEMPLATE_ID),
  vibe: z.enum(VIRTUAL_GIFT_VIBES),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(MAX_VIRTUAL_GIFT_MESSAGE_LENGTH),
  senderName: z
    .string()
    .trim()
    .max(MAX_VIRTUAL_GIFT_SENDER_NAME_LENGTH)
    .optional()
    .nullable(),
  imageUrl: z.string().url().optional().nullable(),
  imageKey: z.string().trim().min(1).optional().nullable(),
  audioSource: z.enum(["none", "song", "upload"]),
  songId: z.string().uuid().optional().nullable(),
  audioUrl: z.string().url().optional().nullable(),
  audioKey: z.string().trim().min(1).optional().nullable(),
});

export type CreateVirtualGiftInput = z.infer<typeof createVirtualGiftSchema>;

export function getVirtualGiftImageExtension(
  contentType: string,
): string | null {
  return (
    imageExtensionByContentType[
      contentType as keyof typeof imageExtensionByContentType
    ] ?? null
  );
}

export function normalizeVirtualGiftAudioContentType(
  contentType: string,
): string | null {
  const normalized = contentType.trim().toLowerCase().split(";")[0]?.trim();
  if (!normalized) return null;
  if (
    !(VIRTUAL_GIFT_AUDIO_CONTENT_TYPES as readonly string[]).includes(
      normalized,
    )
  ) {
    return null;
  }
  if (normalized === "audio/mp3") return "audio/mpeg";
  if (normalized === "audio/x-wav") return "audio/wav";
  if (normalized === "audio/m4a" || normalized === "audio/x-m4a") {
    return "audio/mp4";
  }
  return normalized;
}

export function getVirtualGiftAudioExtension(
  contentType: string,
): string | null {
  return audioExtensionByContentType[contentType] ?? null;
}

export function extractR2KeyFromPublicUrl(url: string): string | null {
  const publicBase = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!publicBase || !url.startsWith(`${publicBase}/`)) {
    return null;
  }
  return url.slice(publicBase.length + 1);
}

export function isVirtualGiftAssetUrl(
  url: string,
  kind: "images" | "audio",
): boolean {
  const key = extractR2KeyFromPublicUrl(url);
  if (!key) return false;
  return key.startsWith(`virtual-gifts/${kind}/`);
}

export function isVirtualGiftAssetKey(
  key: string,
  kind: "images" | "audio",
): boolean {
  return key.startsWith(`virtual-gifts/${kind}/`);
}

export function validateCreateVirtualGiftAssets(
  input: CreateVirtualGiftInput,
): { ok: true } | { ok: false; error: string } {
  if (input.imageUrl || input.imageKey) {
    if (!input.imageUrl || !input.imageKey) {
      return { ok: false, error: "Image upload is incomplete." };
    }
    if (
      !isVirtualGiftAssetUrl(input.imageUrl, "images") ||
      !isVirtualGiftAssetKey(input.imageKey, "images")
    ) {
      return { ok: false, error: "Use an image uploaded for this gift." };
    }
    const keyFromUrl = extractR2KeyFromPublicUrl(input.imageUrl);
    if (keyFromUrl !== input.imageKey) {
      return { ok: false, error: "Image upload is incomplete." };
    }
  }

  if (input.audioSource === "none") {
    if (input.songId || input.audioUrl || input.audioKey) {
      return {
        ok: false,
        error: "Clear music fields when no music is selected.",
      };
    }
    return { ok: true };
  }

  if (input.audioSource === "song") {
    if (!input.songId) {
      return { ok: false, error: "Select one of your songs." };
    }
    if (input.audioKey) {
      return {
        ok: false,
        error: "Uploaded audio cannot be mixed with a song selection.",
      };
    }
    return { ok: true };
  }

  if (!input.audioUrl || !input.audioKey) {
    return { ok: false, error: "Audio upload is incomplete." };
  }
  if (
    !isVirtualGiftAssetUrl(input.audioUrl, "audio") ||
    !isVirtualGiftAssetKey(input.audioKey, "audio")
  ) {
    return { ok: false, error: "Use audio uploaded for this gift." };
  }
  const keyFromUrl = extractR2KeyFromPublicUrl(input.audioUrl);
  if (keyFromUrl !== input.audioKey) {
    return { ok: false, error: "Audio upload is incomplete." };
  }
  if (input.songId) {
    return {
      ok: false,
      error: "Uploaded audio cannot be mixed with a song selection.",
    };
  }

  return { ok: true };
}
