import SongfinchAlternativePage from "@/components/alternatives/SongfinchAlternativePage";
import { Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Landing.SongfinchAlternative",
  });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    keywords: [
      "songfinch alternative",
      "songfinch vs",
      "custom song cheaper than songfinch",
      "preview custom song before paying",
    ],
    images: ["/images/alternatives/songfinch-alternative-hero.webp"],
    locale: locale as Locale,
    path: "/alternatives/songfinch",
  });
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function SongfinchAlternativeRoute() {
  return <SongfinchAlternativePage />;
}
