import OccasionHeroVisual from "@/components/occasions/OccasionHeroVisual";
import SongfinchComparison from "@/components/home/SongfinchComparison";
import FAQ from "@/components/home/FAQ";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link as I18nLink } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Heart, Sparkles } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type WhoItem = {
  title: string;
  description: string;
};

export default async function SongfinchAlternativePage() {
  const t = await getTranslations("Landing.SongfinchAlternative");
  const faqItems = t.raw("faq") as FaqItem[];
  const whoItems = t.raw("who") as WhoItem[];
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }).replaceAll("<", "\\u003c");

  return (
    <div className="w-full overflow-hidden bg-[#fffdfb] text-[#2b1710]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <section className="relative isolate px-6 pb-14 pt-10 sm:px-8 md:pb-16 md:pt-14 lg:px-12 xl:px-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_13%_16%,#fff1f3,transparent_32%),radial-gradient(circle_at_86%_18%,#f6eee8,transparent_35%),linear-gradient(115deg,#fffdfb_0%,#ffffff_48%,#fff1f3_100%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-9 lg:grid-cols-[0.9fr_1fr] lg:gap-11">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-white/75 px-4 py-2 text-sm font-bold text-[#695851] shadow-[0_18px_40px_rgba(70,45,32,0.08)]">
              {t("hero.badge")}
            </p>
            <h1 className="mt-5 max-w-[14ch] text-balance font-sans text-[2.5rem] font-black leading-[0.98] tracking-normal min-[420px]:text-[2.9rem] sm:text-[3.7rem] lg:text-[4.3rem]">
              {t("hero.h1")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#6c5f59] sm:text-lg">
              {t("hero.description")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href="/create-song"
                size="sm"
                trailingArrow
                className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
              >
                {t("hero.cta")}
              </MagneticButton>
              <MagneticButton
                href="#songfinch-comparison"
                prefetch={false}
                variant="light"
                size="sm"
                className="border-[#ead7cf] bg-white px-6 font-bold text-[#2b1710] hover:border-[#d8c4ba]"
              >
                {t("hero.secondaryCta")}
              </MagneticButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <I18nLink
                href="/occasions/love-song"
                className="inline-flex items-center gap-1.5 text-[#c23d4b] underline-offset-4 hover:underline"
              >
                <Heart className="size-3.5" />
                {t("loveSongCta")}
              </I18nLink>
              <I18nLink
                href="/occasions/loved-one"
                className="inline-flex items-center gap-1.5 text-[#c23d4b] underline-offset-4 hover:underline"
              >
                <Sparkles className="size-3.5" />
                {t("lovedOneCta")}
              </I18nLink>
            </div>
          </div>
          <OccasionHeroVisual
            image="/images/alternatives/songfinch-alternative-hero.webp"
            imageAlt={t("hero.imageAlt")}
            cardTitle={t("hero.cardTitle")}
            cardDescription={t("hero.cardDescription")}
            accent="#c23d4b"
          />
        </div>
      </section>

      <SongfinchComparison showFullComparisonLink={false} />

      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c23d4b]">
            Songfinch
          </p>
          <h2 className="mt-3 max-w-3xl text-balance font-sans text-3xl font-black leading-tight sm:text-4xl">
            {t("whoTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#6f625c] md:text-lg">
            {t("whoDescription")}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {whoItems.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-black/[0.07] bg-white p-6 shadow-[0_14px_38px_rgba(45,31,24,0.05)]"
              >
                <h3 className="text-xl font-black leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#74665f]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        title={t("faqTitle")}
        description={t("faqDescription")}
        items={faqItems}
        ctaTitle={t("faqCtaTitle")}
        ctaDescription={t("faqCtaDescription")}
        ctaButtonLabel={t("hero.cta")}
      />
    </div>
  );
}
