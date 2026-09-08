import FAQ from "@/components/home/FAQ";
import OccasionShowcase from "@/components/home/OccasionShowcase";
import Testimonials from "@/components/home/Testimonials";
import HowItWorksSection from "@/components/shared/HowItWorksSection";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link as I18nLink } from "@/i18n/routing";
import {
  Heart,
  Music2,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import PrayerSongHeroVisual from "./PrayerSongHeroVisual";
import { prayerSongOccasionCards } from "./prayerSongOccasionCards";

const pagePath = "/prayer-song";
const createHref = "/create-song?occasion=just-because";

const benefits = [
  {
    title: "Personal, not generic",
    description:
      "Keep the chorus for one name, one memory, and the line you actually pray—not a worship playlist that could belong to anyone.",
    icon: Heart,
  },
  {
    title: "Preview before you keep it",
    description:
      "Hear the custom prayer song first. Change a blessing, a nickname, or the musical feel until it sits right.",
    icon: Music2,
  },
  {
    title: "Ready in minutes, not 7 days",
    description:
      "Start with a free preview instead of waiting a week for first delivery. Refine as long as you need, then unlock the full track.",
    icon: Sparkles,
  },
  {
    title: "A gift they can replay",
    description:
      "Share a private link, play it at a gathering, or print a lyric as a keepsake they can return to.",
    icon: PlayCircle,
  },
];

const steps = [
  {
    kicker: "01",
    title: "Share the prayer",
    description:
      "Write the blessing, testimony, or hope in plain language. A few true sentences are enough; you do not need finished lyrics.",
  },
  {
    kicker: "02",
    title: "Add the people and details",
    description:
      "Include names, the relationship, one memory, and any phrase you want the chorus to carry.",
  },
  {
    kicker: "03",
    title: "Preview the prayer song",
    description:
      "Hear a free custom prayer song sample, then edit lines, tone, or genre until it feels faithful to the moment.",
  },
  {
    kicker: "04",
    title: "Share it with care",
    description:
      "Send a private listening link, play it at a gathering, or pair the lyric with printable wall art.",
  },
];

const comparisonRows = [
  {
    format: "Custom prayer song here",
    personal: "Your prayer, names, and story in original lyrics",
    wait: "Free preview in minutes, then refine",
    keepsake: "Replayable track, share page, or lyric art",
    highlighted: true,
  },
  {
    format: "Made-to-order prayer song services",
    personal: "Survey answers turned into a finished track",
    wait: "Often days, with limited preview before delivery",
    keepsake: "Email link to the completed song",
  },
  {
    format: "A familiar hymn or worship track",
    personal: "Meaningful, but not written around one person",
    wait: "Immediate if you already know the song",
    keepsake: "Streaming link or church recording",
  },
  {
    format: "Spoken prayer or card",
    personal: "Direct and sincere",
    wait: "Immediate",
    keepsake: "Easy to lose in a thread or a drawer",
  },
];

export const prayerSongFaqs = [
  {
    question: "What is a custom prayer song?",
    answer:
      "A custom prayer song, sometimes searched as prayersong, is an original track written from a prayer, blessing, testimony, or spiritual hope. It is built around specific names and details rather than generic worship lyrics.",
  },
  {
    question: "How is this different from PrayerSong.com?",
    answer:
      "Those services typically collect a survey and deliver a finished song in several days. Here you start with a free preview, edit the lyrics and style yourself, and keep the prayer song when it sounds true. You are creating with One Custom Song, not ordering from another brand.",
  },
  {
    question: "Do I need to write lyrics or be a songwriter?",
    answer:
      "No. Write the prayer the way you would say it. The song maker shapes those words into lyrics, and you can revise any line before unlocking the full track.",
  },
  {
    question: "What themes can a prayer song cover?",
    answer:
      "Healing, encouragement, gratitude, marriage, children, parents, remembrance, baptism, and prayers for strength or a new chapter. Keep the request sincere and specific to the person receiving it.",
  },
  {
    question: "Can I hear the prayer song before I pay?",
    answer:
      "Yes. Start with a free preview, listen, and refine names, blessings, or the musical direction before you decide to keep the full song.",
  },
  {
    question: "How fast can I get a personalized prayer song?",
    answer:
      "You can hear a preview in minutes instead of waiting a week for first delivery. Take as long as you need to edit, then unlock the finished prayer song when it feels ready.",
  },
  {
    question: "Can I play a custom prayer song at church or a private gathering?",
    answer:
      "Yes, you may share and play your song at private events and church gatherings. Use the private listening page or download once you have unlocked the full track.",
  },
];

function SectionHeader({
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

export default function PrayerSongLandingPage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#fffaf7] text-[#2b1914]">
      <section className="relative isolate bg-[#fffaf7] px-6 pb-12 pt-10 sm:px-8 md:pb-14 md:pt-14 lg:px-12 xl:px-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_16%,rgba(246,190,50,0.2),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(184,63,93,0.13),transparent_34%),linear-gradient(115deg,rgba(255,247,239,0.98)_0%,rgba(255,255,255,0.96)_46%,rgba(255,239,245,0.76)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-white/72" />

        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1fr] lg:gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-white/75 px-4 py-2 text-sm font-bold text-[#695851] shadow-[0_18px_40px_rgba(70,45,32,0.08)]">
              Custom prayer song
            </p>
            <h1 className="mt-5 max-w-[13ch] text-balance font-sans text-[2.5rem] font-black leading-[0.98] tracking-normal text-[#250f0b] min-[420px]:text-[2.9rem] sm:text-[3.7rem] lg:text-[4.45rem]">
              Turn Your Prayer Into a Song
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#6c5f59] sm:text-lg">
              A prayersong is more than a worship playlist. Write the blessing,
              testimony, or hope you want someone to hear, then preview a
              personalized prayer song you can edit and keep.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href={createHref}
                size="sm"
                trailingArrow
                className="border-[#bf3f5d] bg-[#bf3f5d] px-6 font-bold text-white shadow-[0_18px_38px_rgba(191,63,93,0.28)] hover:border-[#9f304b] hover:bg-[#9f304b] hover:text-white"
              >
                Create my prayer song
              </MagneticButton>
              <MagneticButton
                href="#prayer-song-examples"
                prefetch={false}
                size="sm"
                variant="light"
                className="border-[#d7b9aa] bg-white px-6 font-bold text-[#923328] shadow-[0_14px_30px_rgba(88,45,28,0.1)] hover:border-[#caa995] hover:bg-[#fff2eb] hover:text-[#73251e]"
              >
                <PlayCircle className="size-4" />
                Listen to examples
              </MagneticButton>
            </div>
          </div>
          <PrayerSongHeroVisual />
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Why a prayer song"
            title="Give the prayer somewhere beautiful to live"
            description="Cards get put away. A custom prayer song can be played on the drive to church, at a bedside, or on a hard Tuesday when the words still need to be heard."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="rounded-lg border border-[#f0e3dc] bg-[#fffaf7] p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)]"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-[#ffe0e7] text-[#bf3f5d]">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-black leading-tight text-[#261712]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#74665f]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorksSection
        eyebrow="How it works"
        title="From prayer to a finished song"
        description="Keep the writing natural. The creation flow turns your blessing into lyrics, music, and a gift-ready result."
        steps={steps}
      />

      <OccasionShowcase
        id="prayer-song-examples"
        headingId="prayer-song-examples-heading"
        cards={prayerSongOccasionCards}
        copy={{
          eyebrow: "Prayer songs",
          title: "Hear a Prayer Take Shape as a Song",
          description:
            "Play a sample, then start from the blessing, testimony, or hope you want someone to hear.",
          previous: "Previous prayer song example",
          next: "Next prayer song example",
          carouselLabel: "Prayer song examples",
        }}
      />

      <section className="bg-[#fff4f7] px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Compare the options"
            title="Custom prayer song vs. waiting a week"
            description="Services that deliver in seven days can be beautiful. If you want to hear a preview first and reshape the lyric, start here."
          />
          <div className="mt-12 overflow-hidden rounded-lg border border-[#eed8df] bg-white shadow-[0_16px_42px_rgba(76,38,52,0.06)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#25130e] text-white">
                  <tr>
                    <th className="px-5 py-4 font-bold">Option</th>
                    <th className="px-5 py-4 font-bold">Personal detail</th>
                    <th className="px-5 py-4 font-bold">Timing</th>
                    <th className="px-5 py-4 font-bold">What remains</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0e3dc]">
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.format}
                      className={row.highlighted ? "bg-[#fff4f7]" : "bg-white"}
                    >
                      <th className="px-5 py-5 font-black text-[#261712]">
                        {row.format}
                      </th>
                      <td className="px-5 py-5 leading-6 text-[#74665f]">
                        {row.personal}
                      </td>
                      <td className="px-5 py-5 leading-6 text-[#74665f]">
                        {row.wait}
                      </td>
                      <td className="px-5 py-5 leading-6 text-[#74665f]">
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

      <Testimonials />

      <section className="bg-white px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Keep exploring"
            title="Related songs and gift ideas"
            description="If the prayer is for a specific person or season, these pages help you aim the story."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Send a song with a message",
                description:
                  "Record a blessing or spoken opening and fold it into a custom song made for them.",
                href: "/gifts/song-message",
              },
              {
                title: "Songs for healing",
                description:
                  "Write a gentler custom song around recovery, rest, and the people showing up.",
                href: "/occasions/get-well-soon",
              },
              {
                title: "In memoriam songs",
                description:
                  "Honor a life with memories, familiar phrases, and a tribute that can be replayed.",
                href: "/occasions/in-memoriam",
              },
            ].map((article) => (
              <article
                key={article.href}
                className="rounded-lg border border-[#f0e3dc] bg-[#fffaf7] p-6"
              >
                <h3 className="text-xl font-black leading-tight text-[#261712]">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#74665f]">
                  {article.description}
                </p>
                <I18nLink
                  href={article.href}
                  className="mt-5 inline-flex font-bold text-[#b83b30] underline decoration-[#e7b6c2] underline-offset-4 transition hover:text-[#8f2b23]"
                >
                  Open this page
                </I18nLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        title="Custom prayer song FAQ"
        description="Practical answers about turning a blessing, testimony, or hope into a personalized prayer song."
        items={prayerSongFaqs}
        ctaTitle="Ready to write the prayer into a song?"
        ctaDescription="Add a name, one true sentence, and the feeling. Start with a free preview."
        ctaButtonLabel="Create my prayer song"
        ctaHref={createHref}
      />

      <span className="sr-only">Canonical page: {pagePath}</span>
    </div>
  );
}
