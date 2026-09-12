import FAQ from "@/components/home/FAQ";
import SpokenIntroDemo from "@/components/home/SpokenIntroDemo";
import Testimonials from "@/components/home/Testimonials";
import OccasionHeroVisual from "@/components/occasions/OccasionHeroVisual";
import HowItWorksSection from "@/components/shared/HowItWorksSection";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link as I18nLink } from "@/i18n/routing";
import {
  ArrowRight,
  BadgeCheck,
  CakeSlice,
  Check,
  Gift,
  Heart,
  MessageCircleHeart,
  Mic2,
  Music2,
  Palette,
  PencilLine,
  Quote,
  Send,
  Sparkles,
  Stars,
} from "lucide-react";
import type { ReactNode } from "react";

const pagePath = "/gifts/song-message";
const createHref = "/create-song";

const occasions = [
  {
    title: "Birthday wishes",
    description:
      "Record the birthday blessing you would say out loud, then let a custom song pick up where your voice leaves off.",
    icon: CakeSlice,
  },
  {
    title: "Anniversary memories",
    description:
      "Open with a few words only the two of you would recognize, then fold those memories into a song written around your story.",
    icon: Heart,
  },
  {
    title: "Thank-you messages",
    description:
      "Speak the gratitude first, then let the custom song carry the details you never quite fit into a text.",
    icon: MessageCircleHeart,
  },
  {
    title: "Apologies and reconnection",
    description:
      "Start with honest spoken words, then let the song hold the tone you want them to feel after the first seconds.",
    icon: PencilLine,
  },
  {
    title: "Long-distance love",
    description:
      "Send your voice across the miles as the opening, then a custom song they can replay until you are in the same room again.",
    icon: Send,
  },
  {
    title: "Memorial messages",
    description:
      "Place a familiar phrase or blessing at the start, then let the custom song hold the memories that should not fade.",
    icon: Stars,
  },
];

const steps = [
  {
    kicker: "01",
    title: "Write or record the message",
    description:
      "Start with the blessing, greeting, or few sentences you want them to hear in your own words. You do not need lyrics yet.",
  },
  {
    kicker: "02",
    title: "Shape the custom song around them",
    description:
      "Add a name, relationship, occasion, and one memory so the song itself is written for that person—not a generic track.",
  },
  {
    kicker: "03",
    title: "Fold the message into the song",
    description:
      "Open with your recorded voice, ask the singer to speak the greeting, or keep the words in the lyrics. Preview until the blend feels right.",
  },
  {
    kicker: "04",
    title: "Share the finished gift",
    description:
      "Send the private listening page, or pair the song with a music video or printable lyric keepsake.",
  },
];

const comparisonRows = [
  {
    format: "Custom song with your message",
    personal: "Your spoken or written blessing inside a song made for them",
    experience: "Opening words, then original music they can replay",
    keepsake: "Replayable song, share page, video, or lyric art",
    highlighted: true,
  },
  {
    format: "Greeting card",
    personal: "Personal when handwritten, but limited by space",
    experience: "Read once during the gift reveal",
    keepsake: "Physical card",
  },
  {
    format: "Voice message",
    personal: "Carries your real voice and natural emotion",
    experience: "Intimate, but often buried in a message thread",
    keepsake: "Audio file or chat attachment",
  },
  {
    format: "Regular song link",
    personal: "Meaning depends on the context you add",
    experience: "Fast and familiar",
    keepsake: "Streaming link",
  },
];

const features = [
  {
    title: "Editable lyrics",
    description:
      "Keep the lines that feel true, rewrite anything that misses the mark, and make the final message sound like you.",
    icon: PencilLine,
  },
  {
    title: "Music direction",
    description:
      "Choose a genre, vocal direction, and emotional energy that fit the recipient and the reason behind the song.",
    icon: Music2,
  },
  {
    title: "Spoken opening",
    description:
      "Record your own blessing, or write a short greeting the singer can speak, so the song starts in your words.",
    icon: Mic2,
  },
  {
    title: "Gift-ready formats",
    description:
      "Share the track, build a photo music video, or turn a favorite lyric into printable wall art.",
    icon: Palette,
  },
];

const exampleMessages = [
  {
    label: "Thank you",
    message:
      "You never tried to fix everything. You just stayed, listened, and made the difficult days feel possible.",
    detail:
      "Add where you met, one moment they showed up for you, and the phrase you always use to thank each other.",
  },
  {
    label: "Anniversary",
    message:
      "I still choose the life we are building—the loud mornings, the quiet drives, and every ordinary day in between.",
    detail:
      "Add the year you met, a shared ritual, and one small detail that represents home to both of you.",
  },
  {
    label: "Long distance",
    message:
      "Until the next arrival gate, keep this song close and remember that every mile still leads me back to you.",
    detail:
      "Add your time zones, the call you never miss, a trip you remember, and what you want the reunion to feel like.",
  },
];

export const songMessageFaqs = [
  {
    question: "How do I add a message to a custom song?",
    answer:
      "Write or record the blessing you want them to hear, then create a custom song around the recipient. You can open the track with your own voice, ask the singer to speak the greeting, or fold the words into the lyrics. Preview the blend before unlocking the finished song.",
  },
  {
    question: "Do I need to write lyrics first?",
    answer:
      "No. Keep the message as a greeting or blessing. The custom song still gets original lyrics around their name, story, and occasion, and you can edit those lines after the preview.",
  },
  {
    question: "Can I record my own blessing into the song?",
    answer:
      "Yes. Record a short spoken opening in your own voice, or write the words for the singer to deliver before the first verse. Only upload or record voices you own or are authorized to use.",
  },
  {
    question: "Can I change the lyrics after the preview?",
    answer:
      "Yes. You can revise lines, clarify details, and adjust the genre or tone before choosing the final version. Your spoken opening and the custom song can both be refined.",
  },
  {
    question: "What should I include in the message I add to the song?",
    answer:
      "Include who the song is for, why you are sending it, one vivid memory, a phrase they recognize, and the feeling you want the opening to leave. A short, specific blessing usually lands better than a long speech.",
  },
  {
    question: "How can I share the finished song?",
    answer:
      "You can share the finished song through its private listening page or use the final audio in a gift reveal. You can also pair it with a photo music video or printable lyric wall art.",
  },
  {
    question: "Can I preview the song before paying?",
    answer:
      "Yes. Start with a free preview, listen to how your message sits inside the custom song, and refine the result before deciding whether to unlock the full track.",
  },
];

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
    <article className="rounded-lg border border-[#f0e3dc] bg-white p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)]">
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

export default function SongMessageLandingPage() {
  return (
    <div className="w-full overflow-hidden bg-[#fffdfb] text-[#2b1710]">
      <section className="relative isolate px-5 pb-14 pt-10 sm:px-6 md:px-8 md:pb-16 md:pt-14 lg:px-8 xl:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_13%_16%,#fff1f3,transparent_32%),radial-gradient(circle_at_86%_18%,#f6eee8,transparent_35%),linear-gradient(115deg,#fffdfb_0%,#ffffff_48%,#fff1f3_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)] lg:gap-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-bold text-[#695851] shadow-[0_18px_40px_rgba(70,45,32,0.08)]">
              <MessageCircleHeart className="size-4 text-[#c23d4b]" />
              Add your blessing to a custom song
            </p>
            <h1 className="mt-5 max-w-[26ch] text-balance font-sans text-[2.15rem] font-black leading-[1.05] tracking-normal min-[420px]:text-[2.45rem] sm:text-[3.05rem] lg:text-[3.35rem]">
              Send a Song with a Message: Start with Your Spoken Words
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#6c5f59] sm:text-lg">
              Fold a birthday wish, a blessing, or a short greeting into a song
              made for them. Record the opening in your own voice, or write the
              words for the singer—then the custom music carries the rest.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href={createHref}
                size="sm"
                trailingArrow
                className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
              >
                Create my free preview
              </MagneticButton>
              <MagneticButton
                href="/samples"
                prefetch={false}
                variant="light"
                size="sm"
                className="border-[#ead7cf] bg-white px-6 font-bold text-[#2b1710] hover:border-[#d8c4ba]"
              >
                Listen to samples
              </MagneticButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#6c5f59]">
              {["Record your blessing", "Spoken opening or lyrics", "Free preview first"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="size-4 text-[#c23d4b]" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
          <OccasionHeroVisual
            image="/images/blog/voice-message-gift-ideas/cover.webp"
            imageAlt="A spoken blessing opening a custom song gift"
            accent="#c23d4b"
            overlay={
              <SpokenIntroDemo
                compact
                playOnCardClick
                className="mt-0 shadow-[0_22px_56px_rgba(43,25,20,0.28)]"
              />
            }
          />
        </div>
      </section>

      <section className="bg-[#351d17] px-6 py-14 text-[#fff9f1] sm:px-8 md:py-18 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ef9a83]">
            What it is
          </p>
          <h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Your blessing, inside a song made for them
          </h2>
          <p className="mt-5 text-base leading-8 text-white/72">
            This is not converting a card into a track. You add your message
            to a custom song: a spoken opening they hear first, a recorded
            blessing in your voice, or words woven into the lyrics so the
            music still sounds like you.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Spoken opening in your voice", "Or a blessing the singer speaks", "A custom song around them", "A gift they can replay"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm text-white/82">
                  <Sparkles className="size-4 shrink-0 text-[#ef9a83]" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#bf3f5d]">
              Make it sound like you
            </p>
            <h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight text-[#261712] sm:text-4xl md:text-5xl">
              Let the song start with a message in your own voice
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#6f625c] sm:text-lg">
              Start the song with a short greeting that makes the surprise feel
              personal from the very first second.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm leading-6 text-[#4f423b]">
              {[
                "Record your own voice message to open the song",
                "Or write a blessing for the AI singer to deliver",
                "Let the spoken moment flow naturally into the music",
              ].map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <BadgeCheck
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <I18nLink
              href={createHref}
              className="mt-7 inline-flex items-center gap-2 text-base font-bold text-primary transition hover:text-primary/80"
            >
              Add an opening message
              <ArrowRight className="size-5" aria-hidden="true" />
            </I18nLink>
          </div>
          <SpokenIntroDemo className="mt-0" />
        </div>
      </section>

      <section className="px-6 py-18 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Messages for real moments"
            title="When you want the song to carry your words"
            description="Birthdays, thank-yous, and long-distance nights work the same way: write or record the blessing, then fold it into a song built around them."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((item) => {
              const Icon = item.icon;
              return (
                <IconCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={<Icon className="size-5" />}
                />
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorksSection
        eyebrow="How it works"
        title="From one message to a song in four steps"
        description="Keep the writing natural. The creation flow helps turn your raw message into lyrics, music, and a gift-ready result."
        steps={steps}
        sectionClassName="bg-[#f4e5dc]"
        titleClassName="mt-3 text-balance font-sans text-3xl font-black leading-tight text-[#261712] sm:text-4xl md:text-5xl"
        cardClassName="rounded-lg border-[#f0e3dc] bg-white shadow-[0_14px_38px_rgba(59,31,18,0.05)]"
        kickerClassName="bg-[#c23d4b]"
        mobileCarousel
      />

      <section className="bg-[#fffdf9] px-6 py-18 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Choose the right format"
            title="Song with a message vs. card, voice note, or song link"
            description="Each format can be meaningful. The difference is whether your words live inside a custom song they can return to later."
          />
          <div className="mt-12 overflow-hidden rounded-[1.4rem] border border-[#e5cfc4] bg-white shadow-[0_22px_70px_rgba(78,45,33,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#351d17] text-white">
                  <tr>
                    <th className="px-5 py-4 font-bold">Format</th>
                    <th className="px-5 py-4 font-bold">Personal detail</th>
                    <th className="px-5 py-4 font-bold">Experience</th>
                    <th className="px-5 py-4 font-bold">What remains</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ecdcd4]">
                  {comparisonRows.map((row) => (
                    <tr key={row.format} className={row.highlighted ? "bg-[#fff2ea]" : "bg-white"}>
                      <th className="px-5 py-5 font-bold text-[#3b211a]">{row.format}</th>
                      <td className="px-5 py-5 leading-6 text-[#735f57]">{row.personal}</td>
                      <td className="px-5 py-5 leading-6 text-[#735f57]">{row.experience}</td>
                      <td className="px-5 py-5 leading-6 text-[#735f57]">{row.keepsake}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#351d17] px-6 py-18 text-white sm:px-8 md:py-24 lg:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#e88a70_0,transparent_28%),radial-gradient(circle_at_80%_70%,#e9bd74_0,transparent_25%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ef9a83]">Message examples</p>
            <h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Start with words that sound like you
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
              Use these as structural examples, then replace every generic detail with something true to your relationship.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {exampleMessages.map((example, index) => (
              <article key={example.label} className="relative rounded-[1.4rem] border border-white/10 bg-white/[0.065] p-6 backdrop-blur-sm">
                <Quote className="absolute right-5 top-5 size-8 text-white/10" />
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ef9a83]">{example.label}</p>
                <blockquote className="mt-5 font-sans text-xl font-medium italic leading-8 text-white/90">“{example.message}”</blockquote>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Make it yours</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{example.detail}</p>
                </div>
                <span className="absolute -bottom-2 left-6 h-4 w-14 rotate-[-2deg] bg-[#e8c598]/70" aria-hidden="true" />
                <span className="sr-only">Example {index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-18 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Make the delivery personal"
            title="More than a generated audio file"
            description="Refine the words, shape the sound, and choose how your blessing arrives so the finished gift feels intentional from the first second."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return <IconCard key={feature.title} title={feature.title} description={feature.description} icon={<Icon className="size-5" />} />;
            })}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton
              href={createHref}
              size="sm"
              trailingArrow
              className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
            >
              Create a song preview
            </MagneticButton>
            <MagneticButton
              href="/samples"
              prefetch={false}
              variant="light"
              size="sm"
              className="border-[#ead7cf] bg-white px-6 font-bold text-[#2b1710] hover:border-[#d8c4ba]"
            >
              Listen to song samples
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              prefetch={false}
              variant="light"
              size="sm"
              className="border-[#ead7cf] bg-white px-6 font-bold text-[#2b1710] hover:border-[#d8c4ba]"
            >
              See pricing
            </MagneticButton>
            <I18nLink
              href="/music/personalized-gift"
              className="inline-flex h-10 items-center px-4 text-sm font-bold text-[#c23d4b] underline-offset-4 hover:underline sm:h-11"
            >
              Explore custom music gifts
            </I18nLink>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-[#f4e5dc] px-6 py-18 sm:px-8 md:py-22 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Continue exploring"
            title="Helpful guides for planning the message and reveal"
            description="Decide what to say, how to share it, and which gift format best fits the moment."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { title: "Voice message gift ideas", description: "Record a greeting or spoken opening and fold it into a gift that still feels like you.", href: "/blog/voice-message-gift-ideas" },
              { title: "How to send a song to someone", description: "Compare text links, audio files, share pages, and gift-style song delivery.", href: "/blog/how-to-send-a-song-to-someone" },
              { title: "Custom music gifts", description: "Explore custom songs, music videos, lyric keepsakes, and occasion ideas.", href: "/music/personalized-gift" },
            ].map((article) => (
              <article key={article.href} className="rounded-lg border border-[#f0e3dc] bg-white p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)]">
                <Gift className="size-5 text-[#c23d4b]" />
                <h3 className="mt-5 font-sans text-xl font-black text-[#261712]">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#74665f]">{article.description}</p>
                <I18nLink href={article.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#c23d4b] hover:text-[#9b2c39]">
                  Read the guide <ArrowRight className="size-4" />
                </I18nLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        title="Adding a message to a custom song"
        description="Practical answers about recording a blessing, speaking an opening, and folding your words into a song made for them."
        items={songMessageFaqs}
        ctaTitle="Let the song start with your words"
        ctaDescription="Write or record a short blessing, preview the custom song for free, and refine the blend before you share it."
        ctaButtonLabel="Add my message to a song"
        ctaHref="/create-song"
      />

      <section className="relative isolate overflow-hidden bg-[#351d17] px-6 py-18 text-center text-white sm:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(233,130,101,0.32),transparent_42%)]" />
        <Sparkles className="mx-auto size-7 text-[#ef9a83]" />
        <h2 className="mx-auto mt-5 max-w-3xl text-balance font-sans text-4xl font-black leading-tight sm:text-5xl">
          Send a song that starts with your message
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/66">
          Put your blessing inside a custom song they can hear, replay, and keep.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton
            href={createHref}
            size="sm"
            trailingArrow
            className="border-[#c23d4b] bg-[#c23d4b] px-6 font-bold text-white hover:border-[#9b2c39] hover:bg-[#9b2c39] hover:text-white"
          >
            Start a free preview
          </MagneticButton>
        </div>
      </section>

      <span className="sr-only">Canonical page: {pagePath}</span>
    </div>
  );
}
