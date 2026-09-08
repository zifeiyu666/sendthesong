import PrayerSongLandingPage, {
  prayerSongFaqs,
} from "@/components/gifts/PrayerSongLandingPage";
import { siteConfig } from "@/config/site";
import { type Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

type Params = Promise<{ locale: string }>;

const path = "/prayer-song";
const title = "Turn Your Prayer Into a Personalized Prayer Song";
const description =
  "Create a custom prayer song from a blessing, testimony, or hope you want someone to hear. Preview it free, refine the lyrics, and share a personalized prayer song gift.";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title,
    description,
    keywords: [
      "prayer song",
      "prayersong",
      "custom prayer song",
      "personalized prayer song",
      "christian custom song",
      "prayer song gift",
    ],
    locale: "en" as Locale,
    path,
    canonicalUrl: path,
    images: ["/images/occasions/prayer-song-hero.webp"],
    availableLocales: ["en"],
    noIndex: locale !== "en",
  });
}

export default async function PrayerSongPage({ params }: { params: Params }) {
  const { locale } = await params;

  if (locale !== "en") {
    permanentRedirect(path);
  }

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: prayerSongFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
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
        name: "Custom Prayer Song",
        item: `${siteConfig.url}${path}`,
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
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <PrayerSongLandingPage />
    </>
  );
}
