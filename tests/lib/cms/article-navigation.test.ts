import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, test } from "node:test";

import {
  isArticlesFooterGroup,
  withVisibleHeaderLinks,
} from "@/lib/cms/article-navigation-utils";

type MessageShape = {
  Header: { links: Array<{ href: string; items?: Array<{ href: string }> }> };
  Footer: {
    Links: {
      groups: Array<{
        id: string;
        links: Array<{ href?: string; isSubTitle?: boolean }>;
      }>;
    };
  };
};

function messages(locale: string) {
  return JSON.parse(
    readFileSync(
      resolve(process.cwd(), "i18n", "messages", locale, "common.json"),
      "utf8",
    ),
  ) as MessageShape;
}

function footerPaths(message: MessageShape) {
  return message.Footer.Links.groups.map((group) => ({
    id: group.id,
    paths: group.links
      .filter((link) => !link.isSubTitle)
      .map((link) => link.href),
  }));
}

function headerPaths(message: MessageShape) {
  return message.Header.links.map((link) => ({
    href: link.href,
    items: link.items?.map((item) => item.href) || [],
  }));
}

describe("localized article navigation", () => {
  test("keeps Spanish and Japanese navigation paths aligned with English", () => {
    const english = messages("en");

    for (const locale of ["es", "ja"]) {
      const localized = messages(locale);
      assert.deepEqual(footerPaths(localized), footerPaths(english));
      assert.deepEqual(headerPaths(localized), headerPaths(english));
    }
  });

  test("includes Gift Tools with virtual gifts in the header", () => {
    const english = messages("en");
    const giftTools = english.Header.links.find(
      (link) => link.href === "/virtual-gifts",
    );

    assert.ok(giftTools);
    assert.deepEqual(giftTools?.items?.map((item) => item.href), [
      "/virtual-gifts",
      "/virtual-gifts/love-letter",
      "/mygifts",
    ]);
  });

  test("hides account header links when the visitor is not signed in", () => {
    const links = [
      { name: "My Songs", href: "/songs" },
      { name: "My Samples", href: "/samples" },
      { name: "My Voices", href: "/voices" },
      { name: "Gift Ideas", href: "/music/personalized-gift" },
      {
        name: "Gift Tools",
        href: "/virtual-gifts",
        items: [
          { name: "Gifts and surprises", href: "/virtual-gifts" },
          { name: "Love letter", href: "/virtual-gifts/love-letter" },
          { name: "My gifts", href: "/mygifts" },
        ],
      },
    ];

    assert.deepEqual(
      withVisibleHeaderLinks(links, false).map((link) => link.href),
      ["/music/personalized-gift", "/virtual-gifts"],
    );
    assert.deepEqual(
      withVisibleHeaderLinks(links, false).find(
        (link) => link.href === "/virtual-gifts",
      )?.items?.map((item) => item.href),
      ["/virtual-gifts", "/virtual-gifts/love-letter"],
    );
    assert.deepEqual(
      withVisibleHeaderLinks(links, true).map((link) => link.href),
      [
        "/songs",
        "/samples",
        "/voices",
        "/music/personalized-gift",
        "/virtual-gifts",
      ],
    );
  });

  test("recognizes the articles footer group independently of its title", () => {
    assert.equal(
      isArticlesFooterGroup({ id: "articles", title: "記事", links: [] }),
      true,
    );
    assert.equal(
      isArticlesFooterGroup({ id: "gift-ideas", title: "記事", links: [] }),
      false,
    );
  });
});
