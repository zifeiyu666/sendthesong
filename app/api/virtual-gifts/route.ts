import { apiResponse } from "@/lib/api-response";
import { getSession } from "@/lib/auth/server";
import { checkRateLimit, getClientIPFromRequest } from "@/lib/upstash";
import { REDIS_RATE_LIMIT_CONFIGS } from "@/lib/upstash/redis-rate-limit-configs";
import { createVirtualGift } from "@/lib/virtual-gifts/store";
import { createVirtualGiftSchema } from "@/lib/virtual-gifts/validation";

export async function POST(request: Request) {
  const clientIP = getClientIPFromRequest(request);
  const isAllowed = await checkRateLimit(
    clientIP,
    REDIS_RATE_LIMIT_CONFIGS.virtualGiftCreate,
  );
  if (!isAllowed) {
    return apiResponse.badRequest(
      `Rate limit exceeded. You can create up to ${REDIS_RATE_LIMIT_CONFIGS.virtualGiftCreate.maxRequests} virtual gifts per day.`,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiResponse.badRequest("Invalid JSON body.");
  }

  const parsed = createVirtualGiftSchema.safeParse(body);
  if (!parsed.success) {
    return apiResponse.badRequest(
      parsed.error.issues[0]?.message || "Invalid gift details.",
    );
  }

  const session = await getSession();
  const result = await createVirtualGift(parsed.data, {
    userId: session?.user?.id ?? null,
  });

  if (!result.success) {
    if (result.status === 401) return apiResponse.unauthorized(result.error);
    if (result.status === 404) return apiResponse.notFound(result.error);
    if (result.status === 500) return apiResponse.serverError(result.error);
    return apiResponse.badRequest(result.error);
  }

  return apiResponse.success(
    {
      id: result.gift.id,
      shareToken: result.shareToken,
      shareUrl: result.shareUrl,
    },
    201,
  );
}
