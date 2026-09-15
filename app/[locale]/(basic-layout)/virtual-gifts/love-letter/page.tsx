import LoveLetterLandingPage from "@/components/virtual-gifts/LoveLetterLandingPage";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, Locale, LOCALES } from "@/i18n/routing";
import { getFinalSongsForOwner } from "@/lib/ai/final-song";
import { getSession } from "@/lib/auth/server";
import { constructMetadata } from "@/lib/metadata";
import { toVirtualGiftSongOptions } from "@/lib/virtual-gifts/song-options";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

const path = "/virtual-gifts/love-letter";

type FaqItem = {
  question: string;
  answer: string;
};

type StepItem = {
  title: string;
  description: string;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "VirtualGifts.loveLetter",
  });

  return constructMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t.raw("keywords") as string[],
    locale: locale as Locale,
    path,
    images: ["/images/occasions/personalized-love-song-hero.webp"],
  });
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LoveLetterEditorPage({
  params,
}: {
  params: Params;
}) {
  const { locale } = await params;
  const sessionPromise = getSession();
  const t = await getTranslations({
    locale,
    namespace: "VirtualGifts.loveLetter",
  });
  const session = await sessionPromise;
  const songs = session?.user
    ? toVirtualGiftSongOptions(await getFinalSongsForOwner(session.user.id))
    : [];
  const faqItems = t.raw("faq") as FaqItem[];
  const steps = t.raw("steps") as StepItem[];
  const pageUrl = `${siteConfig.url}${locale === DEFAULT_LOCALE ? "" : `/${locale}`}${path}`;

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }).replaceAll("<", "\\u003c");

  const howToSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("howTitle"),
    description: t("howDescription"),
    totalTime: "PT5M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
      url: `${pageUrl}#how-it-works`,
    })),
  }).replaceAll("<", "\\u003c");

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gift ideas",
        item: `${siteConfig.url}/gifts`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gifts and surprises",
        item: `${siteConfig.url}${locale === DEFAULT_LOCALE ? "" : `/${locale}`}/virtual-gifts`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: t("h1"),
        item: pageUrl,
      },
    ],
  }).replaceAll("<", "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: howToSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <LoveLetterLandingPage
        isLoggedIn={Boolean(session?.user)}
        songs={songs}
      />
    </>
  );
}
