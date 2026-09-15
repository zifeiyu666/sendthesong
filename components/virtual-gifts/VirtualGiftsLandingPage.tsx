import FAQ from "@/components/home/FAQ";
import OccasionHeroVisual from "@/components/occasions/OccasionHeroVisual";
import HowItWorksSection from "@/components/shared/HowItWorksSection";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { VirtualGiftPicker } from "@/components/virtual-gifts/VirtualGiftPicker";
import { Link as I18nLink } from "@/i18n/routing";
import {
  ArrowRight,
  CakeSlice,
  Clock3,
  Gift,
  Heart,
  HeartHandshake,
  Music2,
  PartyPopper,
  PlayCircle,
  Repeat,
  Send,
  Sparkles,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type CopyItem = {
  id: string;
  title: string;
  description: string;
};

type StepItem = {
  kicker: string;
  title: string;
  description: string;
};

type CompareRow = {
  format: string;
  personal: string;
  speed: string;
  keepsake: string;
  highlighted?: boolean;
};

type MoreLink = {
  href: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const whyIcons = {
  instant: Clock3,
  personal: Heart,
  music: Music2,
  replay: Repeat,
} as const;

const occasionIcons = {
  birthday: CakeSlice,
  anniversary: Heart,
  distance: Send,
  thankyou: Gift,
  apology: HeartHandshake,
  holiday: PartyPopper,
} as const;

function Stars() {
  return (
    <span
      className="flex items-center gap-0.5 text-[#f6be32]"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="text-sm leading-none">
          ★
        </span>
      ))}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#bf3f5d]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight text-[#261712] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6f625c] md:text-lg">
        {description}
      </p>
    </div>
  );
}

function IconCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-[#f0e3dc] bg-white p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)]">
      <div className="flex size-11 items-center justify-center rounded-full bg-[#fff2eb] text-[#bf3f5d]">
        {icon}
      </div>
      <h3 className="mt-5 font-sans text-xl font-black leading-tight text-[#261712]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#74665f]">{description}</p>
    </article>
  );
}

export default async function VirtualGiftsLandingPage() {
  const t = await getTranslations("VirtualGifts.landing");
  const pickerT = await getTranslations("VirtualGifts.picker");
  const whyItems = t.raw("whyItems") as CopyItem[];
  const occasions = t.raw("occasions") as CopyItem[];
  const steps = t.raw("steps") as StepItem[];
  const compareHeaders = t.raw("compareHeaders") as {
    format: string;
    personal: string;
    speed: string;
    keepsake: string;
  };
  const compareRows = t.raw("compareRows") as CompareRow[];
  const moreLinks = t.raw("moreLinks") as MoreLink[];
  const faqItems = t.raw("faq") as FaqItem[];
  const definitionPoints = t.raw("definitionPoints") as string[];

  return (
    <div className="w-full overflow-hidden bg-[#fffdfb] text-[#2b1710]">
      <section className="relative isolate bg-[#fffaf7] px-6 pb-12 pt-10 sm:px-8 md:pb-14 md:pt-14 lg:px-12 xl:px-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_16%,rgba(246,190,50,0.2),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(194,61,75,0.12),transparent_34%),linear-gradient(115deg,rgba(255,247,239,0.98)_0%,rgba(255,255,255,0.96)_46%,rgba(255,239,229,0.72)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-white/72" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1fr] lg:gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-white/58 px-4 py-2 text-sm text-[#695851] shadow-[0_18px_40px_rgba(92,48,28,0.08),0_2px_10px_rgba(255,255,255,0.35),inset_0_1px_0_rgba(255,255,255,0.78),inset_0_-1px_0_rgba(214,189,176,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/42">
              <Stars />
              <span className="font-bold text-[#261712]">{t("heroRating")}</span>
              <span className="text-[#d8c6bd]">/</span>
              <span>{t("badge")}</span>
            </div>
            <h1 className="mt-5 text-balance font-sans text-[2.5rem] font-black leading-[0.98] tracking-normal text-[#250f0b] min-[420px]:text-[2.9rem] sm:text-[3.7rem] lg:text-[4.45rem]">
              <span className="block max-w-[12ch]">{t("h1Line1")}</span>
              <span className="mt-1 block max-w-[16ch]">{t("h1Line2")}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#6c5f59] sm:text-lg">
              {t("heroDescription")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href="/virtual-gifts/love-letter"
                size="sm"
                trailingArrow
                className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white shadow-[0_18px_38px_rgba(194,61,75,0.28)] hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
              >
                {t("heroCta")}
              </MagneticButton>
              <MagneticButton
                href="#choose-gift"
                prefetch={false}
                variant="light"
                size="sm"
                className="border-[#d7b9aa] bg-white px-6 font-bold text-[#923328] shadow-[0_14px_30px_rgba(88,45,28,0.1)] hover:border-[#caa995] hover:bg-[#fff2eb] hover:text-[#73251e]"
              >
                <PlayCircle className="size-4" />
                {t("heroFormatsCta")}
              </MagneticButton>
            </div>
          </div>
          <OccasionHeroVisual
            accent="#c23d4b"
            cardDescription={t("heroCardDescription")}
            cardIcon={<Gift className="size-4" />}
            cardTitle={t("heroCardTitle")}
            image="/images/occasions/song-for-a-loved-one-hero.webp"
            imageAlt={t("heroImageAlt")}
          />
        </div>
      </section>

      <section
        className="px-6 py-16 sm:px-8 md:py-20 lg:px-12"
        id="choose-gift"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description={t("pickerDescription")}
            eyebrow={t("pickerEyebrow")}
            title={t("pickerTitle")}
          />
          <div className="mt-12">
            <VirtualGiftPicker />
          </div>
          <p className="mt-6 text-center text-sm text-[#74665f]">
            {pickerT("description")}
          </p>
        </div>
      </section>

      <section className="bg-[#351d17] px-6 py-14 text-[#fff9f1] sm:px-8 md:py-18 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ef9a83]">
            {t("definitionEyebrow")}
          </p>
          <h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {t("definitionTitle")}
          </h2>
          <p className="mt-5 text-base leading-8 text-white/72">{t("definition")}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {definitionPoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm text-white/82"
              >
                <Sparkles className="size-4 shrink-0 text-[#ef9a83]" />
                {item}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-white/55">
            {t("definitionNote")}{" "}
            <a
              className="font-semibold text-[#ef9a83] underline-offset-4 hover:underline"
              href="https://en.wikipedia.org/wiki/Gift"
              rel="noreferrer"
              target="_blank"
            >
              {t("sourcePrefix")} {t("definitionSourceLabel")}
            </a>
          </p>
        </div>
      </section>

      <section className="px-6 py-18 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description={t("whyDescription")}
            eyebrow={t("whyEyebrow")}
            title={t("whyTitle")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {whyItems.map((item) => {
              const Icon =
                whyIcons[item.id as keyof typeof whyIcons] ?? Sparkles;
              return (
                <IconCard
                  key={item.id}
                  description={item.description}
                  icon={<Icon className="size-5" />}
                  title={item.title}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] px-6 py-18 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description={t("occasionsDescription")}
            eyebrow={t("occasionsEyebrow")}
            title={t("occasionsTitle")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((item) => {
              const Icon =
                occasionIcons[item.id as keyof typeof occasionIcons] ?? Gift;
              return (
                <IconCard
                  key={item.id}
                  description={item.description}
                  icon={<Icon className="size-5" />}
                  title={item.title}
                />
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorksSection
        cardClassName="rounded-lg border-[#f0e3dc] bg-white shadow-[0_14px_38px_rgba(59,31,18,0.05)]"
        description={t("howDescription")}
        eyebrow={t("howEyebrow")}
        kickerClassName="bg-[#c23d4b]"
        mobileCarousel
        sectionClassName="bg-[#f4e5dc]"
        steps={steps}
        title={t("howTitle")}
        titleClassName="mt-3 text-balance font-sans text-3xl font-black leading-tight text-[#261712] sm:text-4xl md:text-5xl"
      />

      <section className="bg-[#fffdf9] px-6 py-18 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description={t("compareDescription")}
            eyebrow={t("compareEyebrow")}
            title={t("compareTitle")}
          />
          <div className="mt-12 overflow-hidden rounded-[1.4rem] border border-[#e5cfc4] bg-white shadow-[0_22px_70px_rgba(78,45,33,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#351d17] text-white">
                  <tr>
                    <th className="px-5 py-4 font-bold">{compareHeaders.format}</th>
                    <th className="px-5 py-4 font-bold">{compareHeaders.personal}</th>
                    <th className="px-5 py-4 font-bold">{compareHeaders.speed}</th>
                    <th className="px-5 py-4 font-bold">{compareHeaders.keepsake}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ecdcd4]">
                  {compareRows.map((row) => (
                    <tr
                      key={row.format}
                      className={row.highlighted ? "bg-[#fff2ea]" : "bg-white"}
                    >
                      <th className="px-5 py-5 font-bold text-[#3b211a]">
                        {row.format}
                      </th>
                      <td className="px-5 py-5 leading-6 text-[#735f57]">
                        {row.personal}
                      </td>
                      <td className="px-5 py-5 leading-6 text-[#735f57]">
                        {row.speed}
                      </td>
                      <td className="px-5 py-5 leading-6 text-[#735f57]">
                        {row.keepsake}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4e5dc] px-6 py-18 sm:px-8 md:py-22 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description={t("moreDescription")}
            eyebrow={t("moreEyebrow")}
            title={t("moreTitle")}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {moreLinks.map((article) => (
              <article
                key={article.href}
                className="rounded-3xl border border-[#f0e3dc] bg-white p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)]"
              >
                <Gift className="size-5 text-[#c23d4b]" />
                <h3 className="mt-5 font-sans text-xl font-black text-[#261712]">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#74665f]">
                  {article.description}
                </p>
                <I18nLink
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#c23d4b] hover:text-[#9b2c39]"
                  href={article.href}
                >
                  {t("moreCta")}
                  <ArrowRight className="size-4" />
                </I18nLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        ctaButtonLabel={t("faqCtaButton")}
        ctaDescription={t("faqCtaDescription")}
        ctaHref="/virtual-gifts/love-letter"
        ctaTitle={t("faqCtaTitle")}
        description={t("faqDescription")}
        items={faqItems}
        title={t("faqTitle")}
      />

      <section className="relative isolate overflow-hidden bg-[#351d17] px-6 py-18 text-center text-white sm:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(233,130,101,0.32),transparent_42%)]" />
        <Sparkles className="mx-auto size-7 text-[#ef9a83]" />
        <h2 className="mx-auto mt-5 max-w-3xl text-balance font-sans text-4xl font-black leading-tight sm:text-5xl">
          {t("closingTitle")}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/66">
          {t("closingDescription")}
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton
            className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
            href="/virtual-gifts/love-letter"
            size="sm"
            trailingArrow
          >
            {t("closingCta")}
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
