import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

const root = process.cwd();

function read(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("virtual gifts routes", () => {
  test("registers picker and love-letter editor pages", () => {
    const picker = read(
      "app/[locale]/(basic-layout)/virtual-gifts/page.tsx",
    );
    const editor = read(
      "app/[locale]/(basic-layout)/virtual-gifts/love-letter/page.tsx",
    );
    const share = read("app/[locale]/g/[shareToken]/page.tsx");

    assert.match(picker, /VirtualGiftsLandingPage/);
    assert.match(picker, /const path = "\/virtual-gifts"/);
    assert.match(picker, /"@type": "FAQPage"/);
    assert.match(picker, /"@type": "HowTo"/);
    assert.match(picker, /metaTitle/);
    assert.match(editor, /LoveLetterLandingPage/);
    assert.match(editor, /getFinalSongsForOwner/);
    assert.match(editor, /"@type": "FAQPage"/);
    assert.match(editor, /"@type": "HowTo"/);
    assert.match(editor, /VirtualGifts.loveLetter/);
    assert.match(share, /LoveLetterShareView/);
    assert.match(share, /noIndex: true/);
  });

  test("registers mygifts library page", () => {
    const page = read("app/[locale]/(basic-layout)/mygifts/page.tsx");
    const landing = read(
      "components/virtual-gifts/VirtualGiftsLandingPage.tsx",
    );
    const editor = read("components/virtual-gifts/LoveLetterEditor.tsx");
    const enCommon = read("i18n/messages/en/common.json");
    const enGifts = read("i18n/messages/en/VirtualGifts.json");

    assert.match(page, /getVirtualGiftsForOwner/);
    assert.match(page, /path: "\/mygifts"/);
    assert.match(page, /noIndex: true/);
    assert.match(page, /MyGiftCard/);
    assert.match(enGifts, /"href": "\/mygifts"/);
    assert.match(landing, /href="#choose-gift"/);
    assert.match(editor, /href="\/mygifts"/);
    assert.match(editor, /isLoggedIn \?/);
    assert.match(editor, /embedded/);
    assert.match(enCommon, /"href": "\/mygifts"/);
  });

  test("my gift cards copy from the cover and share with the song dialog", () => {
    const card = read(
      "components/virtual-gifts/MyGiftCard.tsx",
    );

    assert.match(card, /ShareLinkDialog/);
    assert.match(card, /absolute right-3 top-3/);
    assert.match(card, /shareLabel/);
    assert.doesNotMatch(card, /Music2/);
    assert.doesNotMatch(card, /absolute bottom-4 right-3/);
  });

  test("picker keeps coming soon templates non-navigable", () => {
    const templates = read("lib/virtual-gifts/templates.ts");
    const picker = read("components/virtual-gifts/VirtualGiftPicker.tsx");

    assert.match(templates, /comingSoon: true/);
    assert.match(templates, /href: "\/virtual-gifts\/love-letter"/);
    assert.match(picker, /comingSoonToast/);
    assert.match(picker, /toast\.message/);
  });

  test("sitemap and gift hub expose virtual gifts entry", () => {
    const sitemap = read("app/sitemap.ts");
    const giftsPage = read("app/[locale]/(basic-layout)/gifts/page.tsx");
    const enCommon = read("i18n/messages/en/common.json");

    assert.match(sitemap, /\/virtual-gifts/);
    assert.match(sitemap, /\/virtual-gifts\/love-letter/);
    assert.match(giftsPage, /\/virtual-gifts/);
    assert.match(giftsPage, /VirtualGifts/);
    assert.match(enCommon, /"\/virtual-gifts"/);
  });

  test("registers VirtualGifts i18n namespaces", () => {
    const messages = read("i18n/messages.ts");
    assert.match(messages, /VirtualGifts\.json/);
    assert.match(messages, /VirtualGifts: virtualGifts/);
    assert.match(messages, /spanishVirtualGifts/);
    assert.match(messages, /japaneseVirtualGifts/);
  });

  test("api routes exist for create and presign", () => {
    const create = read("app/api/virtual-gifts/route.ts");
    const presign = read("app/api/virtual-gifts/presign/route.ts");
    assert.match(create, /createVirtualGift/);
    assert.match(create, /virtualGiftCreate/);
    assert.match(presign, /virtualGiftUpload/);
    assert.match(presign, /virtual-gifts\/images/);
    assert.match(presign, /virtual-gifts\/audio/);
  });

  test("targets gifts and surprises as the primary SEO keyword", () => {
    const landingCopy = read("i18n/messages/en/VirtualGifts.json");
    const landingPage = read(
      "components/virtual-gifts/VirtualGiftsLandingPage.tsx",
    );

    assert.match(
      landingCopy,
      /"metaTitle": "Gifts and Surprises You Can Send Instantly"/,
    );
    assert.match(landingCopy, /"gifts and surprises"/);
    assert.match(landingCopy, /"faq"/);
    assert.match(landingPage, /VirtualGiftPicker/);
    assert.match(landingPage, /HowItWorksSection/);
    assert.match(landingPage, /FAQ/);
    assert.match(landingPage, /https:\/\/en\.wikipedia\.org\/wiki\/Gift/);
    assert.match(landingPage, /OccasionHeroVisual/);
    assert.match(landingPage, /lg:grid-cols-\[0.9fr_1fr\]/);
  });

  test("love letter subpage has dedicated landing copy, hero, and FAQ", () => {
    const copy = read("i18n/messages/en/VirtualGifts.json");
    const landing = read(
      "components/virtual-gifts/LoveLetterLandingPage.tsx",
    );
    const editor = read(
      "components/virtual-gifts/LoveLetterEditor.tsx",
    );

    assert.match(copy, /"h1": "Virtual Love Letter"/);
    assert.match(copy, /"Who can see my virtual love letter\?"/);
    assert.match(copy, /"Where can I find all my gifts\?"/);
    assert.match(landing, /VirtualGifts.loveLetter/);
    assert.doesNotMatch(landing, /backToGifts/);
    assert.match(landing, /OccasionHeroVisual/);
    assert.match(landing, /id="create"/);
    assert.ok(landing.indexOf("heroCta") < landing.indexOf('id="create"'));
    assert.ok(landing.indexOf('id="create"') < landing.indexOf("introEyebrow"));
    assert.match(landing, /HowItWorksSection/);
    assert.match(landing, /FAQ/);
    assert.match(landing, /https:\/\/en\.wikipedia\.org\/wiki\/Love_letter/);
    assert.match(landing, /embedded/);
    assert.match(editor, /embedded \? "h2" : "h1"/);
    assert.match(editor, /LoveLetterPreview/);
    assert.match(editor, /lg:grid-cols-\[minmax\(0,1fr\)_minmax\(18rem,28rem\)\]/);

    const preview = read(
      "components/virtual-gifts/LoveLetterPreview.tsx",
    );
    const heartBurst = read("components/virtual-gifts/HeartBurst.tsx");
    assert.match(preview, /setDevice\("phone"\)/);
    assert.match(preview, /setDevice\("desktop"\)/);
    assert.match(preview, /setPhase\("bursting"\)/);
    assert.match(preview, /HeartBurst/);
    assert.match(heartBurst, /cqw/);
    assert.match(heartBurst, /cqh/);
    assert.doesNotMatch(preview, /h-screen w-screen/);
  });
});
