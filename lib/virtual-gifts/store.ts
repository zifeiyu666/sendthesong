import { db } from "@/lib/db";
import {
  songs as songsSchema,
  virtualGifts as virtualGiftsSchema,
  type NewVirtualGift,
  type VirtualGift,
} from "@/lib/db/schema";
import { getURL } from "@/lib/url";
import { createVirtualGiftShareToken } from "@/lib/virtual-gifts/token";
import {
  createVirtualGiftSchema,
  validateCreateVirtualGiftAssets,
  type CreateVirtualGiftInput,
} from "@/lib/virtual-gifts/validation";
import { and, desc, eq } from "drizzle-orm";

type VirtualGiftsDbClient = {
  select: () => any;
  insert: (table: any) => any;
};

export type CreateVirtualGiftResult =
  | {
      success: true;
      gift: VirtualGift;
      shareUrl: string;
      shareToken: string;
    }
  | { success: false; status: 400 | 401 | 404 | 500; error: string };

export function buildVirtualGiftShareUrl(shareToken: string): string {
  return getURL(`g/${shareToken}`);
}

export async function getVirtualGiftByShareToken(
  shareToken: string,
  { dbClient = db }: { dbClient?: VirtualGiftsDbClient } = {},
): Promise<VirtualGift | null> {
  const [gift] = await dbClient
    .select()
    .from(virtualGiftsSchema)
    .where(eq(virtualGiftsSchema.shareToken, shareToken))
    .limit(1);

  return gift ?? null;
}

export async function getVirtualGiftsForOwner(
  userId: string,
  {
    dbClient = db,
    limit = 60,
  }: {
    dbClient?: VirtualGiftsDbClient;
    limit?: number;
  } = {},
): Promise<VirtualGift[]> {
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 100);

  return dbClient
    .select()
    .from(virtualGiftsSchema)
    .where(eq(virtualGiftsSchema.userId, userId))
    .orderBy(desc(virtualGiftsSchema.createdAt))
    .limit(safeLimit);
}

export async function createVirtualGift(
  input: CreateVirtualGiftInput,
  {
    userId = null,
    dbClient = db,
  }: {
    userId?: string | null;
    dbClient?: VirtualGiftsDbClient;
  } = {},
): Promise<CreateVirtualGiftResult> {
  const parsed = createVirtualGiftSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      error: parsed.error.issues[0]?.message || "Invalid gift details.",
    };
  }

  const assets = validateCreateVirtualGiftAssets(parsed.data);
  if (!assets.ok) {
    return { success: false, status: 400, error: assets.error };
  }

  let audioUrl = parsed.data.audioUrl ?? null;
  let audioKey = parsed.data.audioKey ?? null;
  let songId = parsed.data.songId ?? null;

  if (parsed.data.audioSource === "song") {
    if (!userId) {
      return {
        success: false,
        status: 401,
        error: "Please sign in to use one of your songs.",
      };
    }

    const [song] = await dbClient
      .select()
      .from(songsSchema)
      .where(
        and(
          eq(songsSchema.id, parsed.data.songId!),
          eq(songsSchema.userId, userId),
          eq(songsSchema.status, "ready"),
        ),
      )
      .limit(1);

    if (!song) {
      return {
        success: false,
        status: 404,
        error: "Song not found in your library.",
      };
    }

    audioUrl = song.audioUrl;
    audioKey = null;
    songId = song.id;
  }

  const shareToken = createVirtualGiftShareToken();
  const values: NewVirtualGift = {
    userId: userId ?? null,
    templateId: parsed.data.templateId,
    vibe: parsed.data.vibe,
    senderName: parsed.data.senderName?.trim() || null,
    message: parsed.data.message.trim(),
    imageUrl: parsed.data.imageUrl ?? null,
    imageKey: parsed.data.imageKey ?? null,
    audioSource: parsed.data.audioSource,
    songId,
    audioUrl,
    audioKey,
    shareToken,
  };

  try {
    const [gift] = await dbClient
      .insert(virtualGiftsSchema)
      .values(values)
      .returning();

    if (!gift) {
      return {
        success: false,
        status: 500,
        error: "Unable to create virtual gift.",
      };
    }

    return {
      success: true,
      gift,
      shareToken,
      shareUrl: buildVirtualGiftShareUrl(shareToken),
    };
  } catch (error) {
    console.error("Failed to create virtual gift:", error);
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : "Unable to create virtual gift.",
    };
  }
}
