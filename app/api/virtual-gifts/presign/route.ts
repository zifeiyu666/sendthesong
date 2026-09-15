import { apiResponse } from "@/lib/api-response";
import { createPresignedUploadUrl } from "@/lib/cloudflare/r2";
import { checkRateLimit, getClientIPFromRequest } from "@/lib/upstash";
import { REDIS_RATE_LIMIT_CONFIGS } from "@/lib/upstash/redis-rate-limit-configs";
import {
  getVirtualGiftAudioExtension,
  getVirtualGiftImageExtension,
  MAX_VIRTUAL_GIFT_AUDIO_BYTES,
  MAX_VIRTUAL_GIFT_IMAGE_BYTES,
  normalizeVirtualGiftAudioContentType,
  VIRTUAL_GIFT_IMAGE_CONTENT_TYPES,
  virtualGiftPresignSchema,
} from "@/lib/virtual-gifts/validation";

export async function POST(request: Request) {
  const clientIP = getClientIPFromRequest(request);
  const isAllowed = await checkRateLimit(
    clientIP,
    REDIS_RATE_LIMIT_CONFIGS.virtualGiftUpload,
  );
  if (!isAllowed) {
    return apiResponse.badRequest(
      `Rate limit exceeded. You can upload up to ${REDIS_RATE_LIMIT_CONFIGS.virtualGiftUpload.maxRequests} gift files per day.`,
    );
  }

  const parsed = virtualGiftPresignSchema.safeParse(await request.json());
  if (!parsed.success) {
    return apiResponse.badRequest(
      parsed.error.issues[0]?.message || "Invalid upload request.",
    );
  }

  const { kind, fileName, size } = parsed.data;

  if (kind === "image") {
    if (
      !(VIRTUAL_GIFT_IMAGE_CONTENT_TYPES as readonly string[]).includes(
        parsed.data.contentType,
      )
    ) {
      return apiResponse.badRequest("Use a JPEG, PNG, or WebP image.");
    }
    if (size > MAX_VIRTUAL_GIFT_IMAGE_BYTES) {
      return apiResponse.badRequest("Use an image under 10MB.");
    }

    const extension = getVirtualGiftImageExtension(parsed.data.contentType);
    if (!extension) {
      return apiResponse.badRequest("Use a JPEG, PNG, or WebP image.");
    }

    const key = `virtual-gifts/images/${crypto.randomUUID()}.${extension}`;
    try {
      const upload = await createPresignedUploadUrl({
        contentType: parsed.data.contentType,
        expiresIn: 300,
        key,
      });
      return apiResponse.success({
        contentType: parsed.data.contentType,
        key,
        presignedUrl: upload.presignedUrl,
        publicObjectUrl: upload.publicObjectUrl,
      });
    } catch (error) {
      return apiResponse.serverError(
        error instanceof Error
          ? error.message
          : "Unable to prepare image upload.",
      );
    }
  }

  const contentType = normalizeVirtualGiftAudioContentType(
    parsed.data.contentType,
  );
  if (!contentType) {
    return apiResponse.badRequest("Use an MP3, WAV, M4A, or OGG audio file.");
  }
  if (size > MAX_VIRTUAL_GIFT_AUDIO_BYTES) {
    return apiResponse.badRequest("Use an audio file under 15MB.");
  }

  const extension = getVirtualGiftAudioExtension(contentType);
  if (!extension) {
    return apiResponse.badRequest("Use an MP3, WAV, M4A, or OGG audio file.");
  }

  const key = `virtual-gifts/audio/${crypto.randomUUID()}.${extension}`;
  try {
    const upload = await createPresignedUploadUrl({
      contentType,
      expiresIn: 300,
      key,
    });
    return apiResponse.success({
      contentType,
      fileName,
      key,
      presignedUrl: upload.presignedUrl,
      publicObjectUrl: upload.publicObjectUrl,
    });
  } catch (error) {
    return apiResponse.serverError(
      error instanceof Error
        ? error.message
        : "Unable to prepare audio upload.",
    );
  }
}
