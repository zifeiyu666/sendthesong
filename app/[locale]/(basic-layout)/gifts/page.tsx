import { PageHero } from "@/components/shared/PageHero";
import { Locale, LOCALES } from "@/i18n/routing";
import { getAllOccasionLandingConfigs } from "@/lib/occasion-landing-pages";
import { constructMetadata } from "@/lib/metadata";
import { ArrowUpRight, Church, Gift, Heart, MessageCircleHeart, Music2 } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GiftHub" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    locale: locale as Locale,
    path: "/gifts",
  });
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function GiftsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GiftHub" });
  const occasions = getAllOccasionLandingConfigs(locale).filter(
    (config) => !["birthday", "anniversary"].includes(config.slug),
  );

  const coreCards = [
    { href: "/create-song", title: t("core.create"), description: t("core.createDescription"), icon: Music2 },
    { href: "/occasions/custom-happy-birthday-song", title: t("core.birthday"), description: t("core.birthdayDescription"), icon: Gift },
    { href: "/occasions/anniversary", title: t("core.anniversary"), description: t("core.anniversaryDescription"), icon: Heart },
    { href: "/gifts/song-message", title: t("core.songMessage"), description: t("core.songMessageDescription"), icon: MessageCircleHeart },
    { href: "/occasions/custom-song-for-wife", title: t("core.wife"), description: t("core.wifeDescription"), icon: Heart },
    { href: "/occasions/custom-song-for-husband", title: t("core.husband"), description: t("core.husbandDescription"), icon: Heart },
    { href: "/prayer-song", title: t("core.prayerSong"), description: t("core.prayerSongDescription"), icon: Church },
  ];

  return (
    <main className="min-h-screen w-full bg-[#fbfaf7] text-foreground">
      <PageHero
        badge={{ icon: <Gift className="size-4" />, label: t("badge") }}
        backgroundClassName="bg-[#f3eadf]"
        titleLines={[t("heroLine1"), t("heroLine2")]}
        description={t("description")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">{t("coreLabel")}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-950">{t("coreTitle")}</h2>
          </div>
          <Link href="/create-song" className="inline-flex items-center gap-2 self-start rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-stone-800 sm:self-auto">
            {t("cta")} <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {coreCards.map(({ href, title, description, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-black text-stone-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">{t("explore")} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">{t("occasionLabel")}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-950">{t("occasionTitle")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((config) => (
              <Link key={config.slug} href={`/occasions/${config.slug}`} className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-primary/40 hover:shadow-md">
                <h3 className="font-bold text-stone-950">{config.metadata.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">{config.metadata.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{t("explore")} <ArrowUpRight className="size-4" /></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">{t("formatLabel")}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-950">{t("formatTitle")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["/music/personalized-gift", t("formats.music"), t("formats.musicDescription")],
              ["/playlists", t("formats.playlists"), t("formats.playlistsDescription")],
              ["/free-custom-song-lyric-gifts", t("formats.lyrics"), t("formats.lyricsDescription")],
            ].map(([href, title, description]) => (
              <Link key={href} href={href} className="rounded-2xl border border-stone-200 bg-[#fffaf2] p-5 transition hover:border-primary/40 hover:shadow-md">
                <h3 className="font-bold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
