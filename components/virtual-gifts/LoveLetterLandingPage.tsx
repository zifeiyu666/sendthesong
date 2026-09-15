import FAQ from "@/components/home/FAQ";
import OccasionHeroVisual from "@/components/occasions/OccasionHeroVisual";
import HowItWorksSection from "@/components/shared/HowItWorksSection";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LoveLetterEditor } from "@/components/virtual-gifts/LoveLetterEditor";
import { Link as I18nLink } from "@/i18n/routing";
import type { VirtualGiftSongOption } from "@/lib/virtual-gifts/song-options";
import {
  Camera,
  Heart,
  Link2,
  Mail,
  Music2,
  PenLine,
  PlayCircle,
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

type FaqItem = {
  question: string;
  answer: string;
};

type MoreLink = {
  href: string;
  title: string;
  description: string;
};

const introIcons = {
  write: PenLine,
  photo: Camera,
  music: Music2,
  share: Link2,
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

export default async function LoveLetterLandingPage({
  songs,
  isLoggedIn,
}: {
  songs: VirtualGiftSongOption[];
  isLoggedIn: boolean;
}) {
  const t = await getTranslations("VirtualGifts.loveLetter");
  const introPoints = t.raw("introPoints") as CopyItem[];
  const steps = t.raw("steps") as StepItem[];
  const moreLinks = t.raw("moreLinks") as MoreLink[];
  const faqItems = t.raw("faq") as FaqItem[];
  const writingStartItems = t.raw("writingStartItems") as string[];
  const writingTemplateLines = t.raw("writingTemplateLines") as string[];
  const writingIdeasItems = t.raw("writingIdeasItems") as string[];

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
            <h1 className="mt-5 max-w-[11ch] text-balance font-sans text-[2.5rem] font-black leading-[0.98] tracking-normal text-[#250f0b] min-[420px]:text-[2.9rem] sm:text-[3.7rem] lg:text-[4.45rem]">
              {t("h1")}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#6c5f59] sm:text-lg">
              {t("heroDescription")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href="#create"
                prefetch={false}
                size="sm"
                trailingArrow
                className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white shadow-[0_18px_38px_rgba(194,61,75,0.28)] hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
              >
                {t("heroCta")}
              </MagneticButton>
              <MagneticButton
                href="#how-it-works"
                prefetch={false}
                variant="light"
                size="sm"
                className="border-[#d7b9aa] bg-white px-6 font-bold text-[#923328] shadow-[0_14px_30px_rgba(88,45,28,0.1)] hover:border-[#caa995] hover:bg-[#fff2eb] hover:text-[#73251e]"
              >
                <PlayCircle className="size-4" />
                {t("heroHowCta")}
              </MagneticButton>
            </div>
          </div>
          <OccasionHeroVisual
            accent="#c23d4b"
            cardDescription={t("heroCardDescription")}
            cardIcon={<Mail className="size-4" />}
            cardTitle={t("heroCardTitle")}
            image="/images/occasions/personalized-love-song-hero.webp"
            imageAlt={t("heroImageAlt")}
          />
        </div>
      </section>

      <section
        className="px-5 pb-16 pt-4 sm:px-6 md:px-8 md:pb-20 lg:px-8 xl:px-10"
        id="create"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#bf3f5d]">
            {t("editorEyebrow")}
          </p>
          <h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight text-[#261712] sm:text-4xl">
            {t("editorTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#6f625c]">
            {t("editorDescription")}
          </p>
          <div className="mt-8 rounded-[1.6rem] border border-[#f0e3dc] bg-[#fffdf9] px-4 py-6 shadow-[0_18px_48px_rgba(59,31,18,0.06)] sm:px-6 sm:py-8 lg:px-8">
            <LoveLetterEditor
              embedded
              isLoggedIn={isLoggedIn}
              songs={songs}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#351d17] px-6 py-14 text-[#fff9f1] sm:px-8 md:py-18 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ef9a83]">
            {t("introEyebrow")}
          </p>
          <h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {t("introTitle")}
          </h2>
          <p className="mt-5 text-base leading-8 text-white/72">{t("intro")}</p>
          <p className="mt-4 text-base leading-8 text-white/72">{t("introHow")}</p>
          <p className="mt-8 text-sm leading-6 text-white/55">
            {t("introNote")}{" "}
            <a
              className="font-semibold text-[#ef9a83] underline-offset-4 hover:underline"
              href="https://en.wikipedia.org/wiki/Love_letter"
              rel="noreferrer"
              target="_blank"
            >
              {t("sourcePrefix")} {t("introSourceLabel")}
            </a>
          </p>
        </div>
      </section>

      <section className="px-6 py-18 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description={t("craftDescription")}
            eyebrow={t("craftEyebrow")}
            title={t("craftTitle")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {introPoints.map((item) => {
              const Icon =
                introIcons[item.id as keyof typeof introIcons] ?? Heart;
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

      <section
        className="px-6 py-18 sm:px-8 md:py-24 lg:px-12"
        id="writing-help"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            description={t("writingDescription")}
            eyebrow={t("writingEyebrow")}
            title={t("writingTitle")}
          />
          <div className="mt-12 space-y-6">
            <article className="rounded-3xl border border-[#f0e3dc] bg-white p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)] sm:p-8">
              <h3 className="font-sans text-2xl font-black leading-tight text-[#261712]">
                {t("writingStartTitle")}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#74665f] sm:text-base sm:leading-7">
                {t("writingStartDescription")}
              </p>
              <ul className="mt-5 space-y-3">
                {writingStartItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-[#fff6f0] px-4 py-3 text-sm italic leading-6 text-[#7a4a3d] sm:text-base sm:leading-7"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-[#f0e3dc] bg-white p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)] sm:p-8">
              <h3 className="font-sans text-2xl font-black leading-tight text-[#261712]">
                {t("writingTemplateTitle")}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#74665f] sm:text-base sm:leading-7">
                {t("writingTemplateDescription")}
              </p>
              <div className="mt-5 rounded-2xl border border-dashed border-[#dcb6a4] bg-[#fffdf9] px-5 py-6 sm:px-8">
                {writingTemplateLines.map((line) => (
                  <p
                    key={line}
                    className="py-1.5 text-sm italic leading-6 text-[#6f625c] sm:text-base sm:leading-7"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </article>
            <article className="rounded-3xl border border-[#f0e3dc] bg-white p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)] sm:p-8">
              <h3 className="font-sans text-2xl font-black leading-tight text-[#261712]">
                {t("writingIdeasTitle")}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#74665f] sm:text-base sm:leading-7">
                {t("writingIdeasDescription")}
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {writingIdeasItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-6 text-[#74665f]"
                  >
                    <Heart className="mt-1 size-3.5 shrink-0 text-[#c23d4b]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-8 text-center text-sm leading-6 text-[#8a7a72]">
            {t("writingNote")}
          </p>
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
                <Heart className="size-5 text-[#c23d4b]" />
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
                </I18nLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        ctaButtonLabel={t("faqCtaButton")}
        ctaDescription={t("faqCtaDescription")}
        ctaHref="#create"
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
            href="#create"
            prefetch={false}
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
