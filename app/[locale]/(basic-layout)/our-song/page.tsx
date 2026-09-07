import OurSongPage from "@/components/occasions/OurSongPage";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: "Our Song Personalised | One Special Custom Song",
    description:
      "Create a personalised our song from your names, a shared memory, and the line you still mean. Preview one special song free, then keep it.",
    keywords: [
      "our song personalised",
      "our song personalized",
      "one special song",
      "personalised our song",
      "couple custom song",
    ],
    images: ["/images/occasions/our-song-hero.webp"],
    locale: locale as Locale,
    path: "/our-song",
    availableLocales: ["en"],
    noIndex: locale !== "en",
  });
}

export default async function OurSongRoute({ params }: { params: Params }) {
  await params;
  return <OurSongPage />;
}
