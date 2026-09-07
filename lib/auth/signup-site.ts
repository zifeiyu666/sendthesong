export const DEFAULT_SIGNUP_SITE_KEY = "onecustomsong";

export const SIGNUP_SITE_KEY =
  process.env.SIGNUP_SITE_KEY?.trim() || DEFAULT_SIGNUP_SITE_KEY;

const SIGNUP_SITE_LABELS: Record<string, string> = {
  onecustomsong: "One Custom Song",
};

export function getSignupSiteLabel(site: string | null | undefined): string {
  if (!site) {
    return "Unknown";
  }

  return SIGNUP_SITE_LABELS[site] ?? site;
}
