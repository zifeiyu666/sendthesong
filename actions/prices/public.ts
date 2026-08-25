'use server';

import { actionResponse, ActionResult } from '@/lib/action-response';
import { db, isDatabaseEnabled } from '@/lib/db';
import { pricingPlans as pricingPlansSchema } from '@/lib/db/schema';
import { getErrorMessage } from '@/lib/error-utils';
import { and, asc, eq } from 'drizzle-orm';
import 'server-only';

type PricingPlan = typeof pricingPlansSchema.$inferSelect

/**
 * Public List - Returns all active pricing plans for the current environment
 * Filtering by groupSlug is handled on the frontend for better flexibility and caching
 */
export async function getPublicPricingPlans(): Promise<ActionResult<PricingPlan[]>> {
  if (!isDatabaseEnabled) {
    return actionResponse.success([])
  }

  const siteKey = process.env.PRICING_SITE_KEY?.trim()
  if (!siteKey) {
    console.error('PRICING_SITE_KEY is not set')
    return actionResponse.error('Pricing site is not configured')
  }

  const configuredEnvironment = process.env.PRICING_ENV?.trim()
  const environment =
    configuredEnvironment ||
    (process.env.NODE_ENV === 'production' ? 'live' : 'test')

  if (environment !== 'test' && environment !== 'live') {
    console.error('PRICING_ENV must be either "test" or "live"')
    return actionResponse.error('Pricing environment is not configured correctly')
  }

  try {
    const plans = await db
      .select()
      .from(pricingPlansSchema)
      .where(
        and(
          eq(pricingPlansSchema.siteKey, siteKey),
          eq(pricingPlansSchema.environment, environment),
          eq(pricingPlansSchema.isActive, true)
        )
      )
      .orderBy(asc(pricingPlansSchema.displayOrder))

    return actionResponse.success((plans as unknown as PricingPlan[]) || [])
  } catch (error) {
    console.error('Unexpected error in getPublicPricingPlans:', error)
    return actionResponse.error(getErrorMessage(error))
  }
}
