/**
 * Public feature flags that affect rendered marketing content.
 *
 * These sections are disabled unless explicitly enabled so review
 * environments do not accidentally expose illustrative customer content.
 */
export const isTestimonialsEnabled =
  process.env.NEXT_PUBLIC_TESTIMONIALS_ENABLED === "true";

export const isCustomerReactionsEnabled =
  process.env.NEXT_PUBLIC_CUSTOMER_REACTIONS_ENABLED === "true";
