import type { FooterLink, HeaderLink } from "@/types/common";

const AUTH_REQUIRED_HEADER_HREFS = new Set([
  "/songs",
  "/samples",
  "/voices",
  "/mygifts",
]);

export function isArticlesHeaderLink(link: HeaderLink) {
  return link.id === "articles";
}

export function isAuthRequiredHeaderLink(link: HeaderLink) {
  return AUTH_REQUIRED_HEADER_HREFS.has(link.href);
}

export function withVisibleHeaderLinks(
  headerLinks: HeaderLink[],
  isAuthenticated: boolean
): HeaderLink[] {
  if (isAuthenticated) {
    return headerLinks;
  }

  return headerLinks
    .filter((link) => !isAuthRequiredHeaderLink(link))
    .map((link) =>
      link.items
        ? {
            ...link,
            items: link.items.filter(
              (item) => !AUTH_REQUIRED_HEADER_HREFS.has(item.href)
            ),
          }
        : link
    );
}

export function isArticlesFooterGroup(group: FooterLink) {
  return group.id === "articles";
}
