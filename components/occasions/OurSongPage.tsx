import FAQ from "@/components/home/FAQ";
import OccasionHeroVisual from "@/components/occasions/OccasionHeroVisual";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link as I18nLink } from "@/i18n/routing";
import { Heart, Music2, Sparkles } from "lucide-react";

const createHref = "/create-song?occasion=just-because";

const faqs = [
  {
    question: "What is an our song personalised gift?",
    answer:
      "It is an original track written from your names, a shared memory, and the feeling you want to keep. Unlike a playlist of someone else's hits, our song belongs to one relationship.",
  },
  {
    question: "Is this the same as a personalized love song?",
    answer:
      "Close, but the search is more specific. People looking for our song personalised usually want one special song they can replay as a couple, not a holiday gift page.",
  },
  {
    question: "Can I hear our song before I pay?",
    answer:
      "Yes. Start with a free preview, then refine the lyrics or style until it sounds like the two of you.",
  },
  {
    question: "When should I give a personalised our song?",
    answer:
      "Anniversaries, first dances, long-distance weeks, or a quiet Tuesday. One special song does not need a calendar date.",
  },
];

const reasons = [
  {
    title: "One special song, not a playlist",
    description:
      "Keep the chorus for the phrase you already say to each other. Use the verses for the kitchen, the commute, the joke nobody else gets.",
    icon: Music2,
  },
  {
    title: "Your names, your timeline",
    description:
      "An our song personalised gift should mention how you met, what you still do on Sundays, and the promise that is still true.",
    icon: Heart,
  },
  {
    title: "Preview, then keep it",
    description:
      "Hear the sample in minutes. Unlock the full track when it sounds like home, then share a private link or pair it with lyric art.",
    icon: Sparkles,
  },
];

export default function OurSongPage() {
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
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
              Our song, written for two people
            </p>
            <h1 className="mt-5 max-w-[12ch] text-balance font-sans text-[2.5rem] font-black leading-[0.98] tracking-normal min-[420px]:text-[2.9rem] sm:text-[3.7rem] lg:text-[4.3rem]">
              Our Song Personalised
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#6c5f59] sm:text-lg">
              Turn the way you met, the ordinary Tuesdays, and the line you still
              mean into one special song. Preview it free, then keep a
              personalised our song you can replay for years.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href={createHref}
                size="sm"
                trailingArrow
                className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
              >
                Create our song
              </MagneticButton>
              <MagneticButton
                href="/occasions/love-song"
                prefetch={false}
                variant="light"
                size="sm"
                className="border-[#ead7cf] bg-white px-6 font-bold text-[#2b1710] hover:border-[#d8c4ba]"
              >
                Personalized love song
              </MagneticButton>
            </div>
            <p className="mt-6 text-sm font-semibold">
              <I18nLink
                href="/occasions/anniversary"
                className="text-[#c23d4b] underline-offset-4 hover:underline"
              >
                One year anniversary song
              </I18nLink>
            </p>
          </div>
          <OccasionHeroVisual
            image="/images/occasions/our-song-hero.webp"
            imageAlt="Couple listening to a personalised our song in their kitchen"
            cardTitle="One special song"
            cardDescription="Names, a private joke, and the chorus you wish a radio love song already had."
            accent="#c23d4b"
          />
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-balance font-sans text-3xl font-black leading-tight sm:text-4xl">
            Why a personalised our song lands differently
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reasons.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-black/[0.07] bg-white p-6 shadow-[0_14px_38px_rgba(45,31,24,0.05)]"
              >
                <item.icon className="size-5 text-[#c23d4b]" />
                <h3 className="mt-4 text-xl font-black leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#74665f]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        title="Our song questions"
        description="A couple's song starts with one memory and one true sentence."
        items={faqs}
        ctaTitle="Ready to write our song?"
        ctaDescription="Add both names, one scene, and the feeling. Start with a free preview."
        ctaButtonLabel="Create our song"
        ctaHref={createHref}
      />
    </div>
  );
}
