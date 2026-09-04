import FAQ from "@/components/home/FAQ";
import OurProducts from "@/components/home/OurProducts";
import Testimonials, { type TestimonialItem } from "@/components/home/Testimonials";
import BirthdayHeroVisual from "@/components/occasions/BirthdayHeroVisual";
import HowItWorksSection from "@/components/shared/HowItWorksSection";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link as I18nLink } from "@/i18n/routing";
import { isTestimonialsEnabled } from "@/config/features";
import { type FinalSongPlayerData } from "@/components/song/FinalSongPlayer";
import { type WallArtSongOption } from "@/components/song/WallArtEditorDrawer";
import { ArrowRight, Clock3, Gift, Heart, Headphones, Music2, PlayCircle, Sparkles, Star } from "lucide-react";
import type { ReactNode } from "react";

const createHref = "/create-song?occasion=music-gift";

type Card = { title: string; description: string; icon: ReactNode };

const benefits: Card[] = [
  { title: "Give a song only they could receive", description: "Turn their name, stories, favorite sounds, and your message into a custom song that feels made for one person.", icon: <MessageIcon /> },
  { title: "More personal than another playlist", description: "Gift music that reflects who they are, not just what is popular or easy to buy.", icon: <Headphones className="size-6" /> },
  { title: "Preview before you give it", description: "Create a free sample, refine the lyrics and mood, then unlock the version you are proud to share.", icon: <Clock3 className="size-6" /> },
  { title: "A keepsake they can replay", description: "Pair the track with a music video or printable lyric art for a reveal that lasts beyond the occasion.", icon: <Gift className="size-6" /> },
];

const steps = [
  { kicker: "01", title: "Tell us who you are gifting", description: "Share their name, your relationship, the memories you want remembered, and what you want the song to say." },
  { kicker: "02", title: "Choose their sound", description: "Pick a genre and emotional direction, from acoustic and indie to pop, cinematic, funny, or deeply sentimental." },
  { kicker: "03", title: "Preview and personalize", description: "Listen to the sample, adjust the wording and tone, and make the song feel unmistakably theirs." },
  { kicker: "04", title: "Gift the music", description: "Send the song privately, play it during a celebration, or deliver it with video and lyric art." },
];

const occasions: Card[] = [
  { title: "For your partner", description: "Turn a shared memory, private nickname, or love story into a song they will keep returning to.", icon: <Heart className="size-5" /> },
  { title: "For family", description: "Celebrate parents, siblings, grandparents, and the everyday rituals that make your family yours.", icon: <Music2 className="size-5" /> },
  { title: "For a best friend", description: "Capture the jokes, late nights, road trips, and history no store-bought gift could explain.", icon: <Sparkles className="size-5" /> },
  { title: "For kids", description: "Make it playful and specific with their nickname, hobbies, pets, and favorite adventures.", icon: <Star className="size-5" /> },
  { title: "For Christmas or a birthday", description: "Give a thoughtful surprise that feels warm, personal, and more meaningful than a generic present.", icon: <Gift className="size-5" /> },
  { title: "For a just-because moment", description: "You do not need a holiday to say ‘I know you, I love you, and I made this for you.’", icon: <PlayCircle className="size-5" /> },
];

const briefs = [
  { label: "For a partner", title: "Our song after midnight", text: "Write an intimate indie-pop song for Maya from Alex. Mention our first coffee date, rainy train rides, the blue scarf, and how every ordinary night feels like home with her." },
  { label: "For family", title: "The kitchen remembers", text: "Create a warm acoustic song for my dad. Include Sunday pancakes, his terrible jokes, the old record player, and the way he taught us to keep showing up." },
  { label: "For a friend", title: "Still the best bad idea", text: "Make an upbeat pop-rock song for Jamie. Mention our missed flights, karaoke confidence, road-trip snacks, and the line ‘you make the chaos worth it’." },
];

const testimonials: TestimonialItem[] = [
  { quote: "It felt like I had written a song for my wife, even though I have never written lyrics. She replayed it all week.", author: "Elena V.", badge: "Partner gift", cardClassName: "bg-[#fff2ea] dark:bg-[#3a241d]" },
  { quote: "The song included details only our family knows. It became the best part of the birthday celebration.", author: "Marcus T.", badge: "Family keepsake", cardClassName: "bg-[#f6f2ef] dark:bg-[#2d2421]" },
  { quote: "I wanted to gift my music for Christmas without buying another object. The preview made the whole idea easy.", author: "Rachel P.", badge: "Christmas surprise", cardClassName: "bg-[#f7f3f1] dark:bg-[#2d2421]" },
];

const faqs = [
  { question: "What does ‘gift my music’ mean?", answer: "It means turning your feelings, memories, and message into a custom song that you can give to someone as a personal music gift." },
  { question: "Who can I make a music gift for?", answer: "Anyone: a partner, parent, child, sibling, best friend, colleague, or someone you want to surprise just because." },
  { question: "Can I preview the song before gifting it?", answer: "Yes. Start with a free preview, then refine the lyrics, genre, and emotional direction before unlocking the full track." },
  { question: "Can I add a music video or lyric art?", answer: "Yes. The finished song can be paired with a music video or printable lyric wall art to create a complete keepsake." },
  { question: "Do I need songwriting experience?", answer: "No. A few real details are enough. The song maker handles the lyric structure, production, and vocal direction." },
];

function MessageIcon() {
  return <span className="text-xl leading-none" aria-hidden="true">♡</span>;
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c33f32]">{eyebrow}</p><h2 className="mt-3 text-balance font-sans text-3xl font-black leading-tight text-[#261712] sm:text-4xl md:text-5xl">{title}</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6f625c] md:text-lg">{description}</p></div>;
}

function Stars() { return <span className="flex items-center gap-0.5 text-[#f6be32]" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-sm leading-none">★</span>)}</span>; }

type Props = { isAuthenticated: boolean; musicVideoSongOptions: FinalSongPlayerData[]; wallArtSongOptions: WallArtSongOption[] };

export default function GiftMyMusicSongsPage({ isAuthenticated, musicVideoSongOptions, wallArtSongOptions }: Props) {
  return <div className="w-full overflow-hidden bg-[#fffaf7] text-[#2b1914]">
    <section className="relative isolate bg-[#fffaf7] px-6 pb-12 pt-10 sm:px-8 md:pb-14 md:pt-14 lg:px-12 xl:px-16"><div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_16%,rgba(246,190,50,0.2),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(37,150,142,0.11),transparent_34%),linear-gradient(115deg,rgba(255,247,239,0.98)_0%,rgba(255,255,255,0.96)_46%,rgba(255,239,229,0.72)_100%)]" /><div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1fr] lg:gap-10"><div className="max-w-2xl"><div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-white/58 px-4 py-2 text-sm text-[#695851] shadow-[0_18px_40px_rgba(92,48,28,0.08)] backdrop-blur-xl"><Stars /><span className="font-bold text-[#261712]">Excellent</span><span className="text-[#d8c6bd]">/</span><span>Gift my music</span></div><h1 className="mt-5 max-w-[11ch] text-balance font-sans text-[2.5rem] font-black leading-[0.98] text-[#250f0b] min-[420px]:text-[2.9rem] sm:text-[3.7rem] lg:text-[4.45rem]">Gift My Music</h1><p className="mt-5 max-w-lg text-base leading-7 text-[#6c5f59] sm:text-lg">Turn your story into a personalized music gift. Create a custom song for someone you love, preview it for free, and give them music that feels like it could only belong to them.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><MagneticButton href={createHref} size="sm" trailingArrow className="border-[#e04132] bg-[#e04132] px-6 font-bold text-white shadow-[0_18px_38px_rgba(224,65,50,0.28)] hover:border-[#c93629] hover:bg-[#c93629]">Create Your Music Gift</MagneticButton><MagneticButton href="#gift-my-music-examples" prefetch={false} variant="light" size="sm" className="border-[#d7b9aa] bg-white px-6 font-bold text-[#923328]"><PlayCircle className="size-4" />See examples</MagneticButton></div></div><BirthdayHeroVisual /></div></section>
    <section className="bg-white px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16"><div className="mx-auto max-w-6xl"><SectionHeader eyebrow="Why gift music" title="The most personal gift is the one that sounds like them" description="A custom song carries the details only you know, then turns them into a moment they can hear, feel, and replay." /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{benefits.map((item) => <article key={item.title} className="rounded-lg border border-[#f0e3dc] bg-[#fffaf7] p-6 shadow-[0_14px_38px_rgba(59,31,18,0.05)]"><div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-[#ffe0e7] text-[#bf3f5d]">{item.icon}</div><h3 className="text-xl font-black leading-tight text-[#261712]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#74665f]">{item.description}</p></article>)}</div></div></section>
    <HowItWorksSection eyebrow="How it works" title="From your message to music they will remember" description="You bring the person and the feeling. The song maker turns them into lyrics, music, vocals, and a gift made for one listener." steps={steps} />
    <section className="bg-white px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16"><div className="mx-auto max-w-6xl"><SectionHeader eyebrow="Gift moments" title="One idea for every person and occasion" description="Gift my music for a birthday, holiday, milestone, thank-you, or simply because someone deserves to hear what they mean to you." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{occasions.map((item) => <article key={item.title} className="group rounded-lg border border-[#f0e3dc] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(59,31,18,0.08)]"><div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">{item.icon}</div><h3 className="text-xl font-black leading-tight text-[#261712]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#74665f]">{item.description}</p></article>)}</div></div></section>
    <section className="bg-[#fff6f1] px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16"><div className="mx-auto max-w-6xl"><SectionHeader eyebrow="Personalized music gifts" title="What to include when you gift your music" description="Start with one honest story, one detail only they would recognize, and the feeling you want the chorus to leave behind." /><div className="mt-12 grid gap-4 lg:grid-cols-3">{occasions.slice(0, 3).map((item, i) => <article key={item.title} className="rounded-[28px] border border-[#f0dcd2] bg-white p-6 shadow-[0_18px_48px_rgba(78,40,21,0.08)]"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b85a47]">Gift my music idea</p><h3 className="mt-2 text-2xl font-black text-[#261712]">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#715f57]">{briefs[i].text}</p><Button asChild variant="ghost" className="mt-5 h-auto px-0 text-sm font-black text-[#9a2f25]"><I18nLink href={createHref}>Create this music gift <ArrowRight className="size-4" /></I18nLink></Button></article>)}</div></div></section>
    <section id="gift-my-music-examples" className="bg-[#25130e] px-6 py-16 text-white sm:px-8 md:py-20 lg:px-12 xl:px-16"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f6be32]">Example briefs</p><h2 className="mt-3 text-balance text-3xl font-black leading-tight sm:text-4xl md:text-5xl">Give them a song made from real life</h2><p className="mt-4 text-base leading-7 text-white/70 md:text-lg">You do not need songwriting language. A person, a scene, and one true detail are enough.</p><Button asChild className="mt-7 h-12 rounded-full bg-[#f6be32] px-7 text-base font-black text-[#25130e] hover:bg-[#ffd363]"><I18nLink href={createHref}>Try your own brief <ArrowRight className="size-4" /></I18nLink></Button></div><div className="grid gap-4">{briefs.map((brief) => <article key={brief.title} className="rounded-lg border border-white/10 bg-white/[0.07] p-5"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#c33f32]">{brief.label}</span><h3 className="text-lg font-black text-white">{brief.title}</h3></div><p className="mt-4 text-sm leading-7 text-white/75">{brief.text}</p></article>)}</div></div></div></section>
    <OurProducts isAuthenticated={isAuthenticated} musicVideoSongOptions={musicVideoSongOptions} wallArtSongOptions={wallArtSongOptions} />
    {isTestimonialsEnabled && <Testimonials title="Music gifts that feel like they were made in secret" description="When the song includes their real life, the reveal lands differently." items={testimonials} contentWidthClassName="max-w-6xl" />}
    <FAQ title="Gift my music questions" description="A few real details are enough to start, and you can refine the song before you give it." items={faqs} ctaTitle="Ready to gift your music?" ctaDescription="Tell us who it is for, add the memories, and create a free preview today." ctaButtonLabel="Create Your Song" ctaHref={createHref} />
  </div>;
}
