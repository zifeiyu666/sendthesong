import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MyGiftCard } from "@/components/virtual-gifts/MyGiftCard";
import { Link, Locale } from "@/i18n/routing";
import { getSession } from "@/lib/auth/server";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
  filterVirtualGifts,
  getVirtualGiftCardTitle,
} from "@/lib/virtual-gifts/library";
import {
  buildVirtualGiftShareUrl,
  getVirtualGiftsForOwner,
} from "@/lib/virtual-gifts/store";
import { normalizeLoveLetterVibe } from "@/lib/virtual-gifts/templates";
import { Gift, Search } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{ q?: string; template?: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "VirtualGifts.library" });

  return constructMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    locale: locale as Locale,
    path: "/mygifts",
    noIndex: true,
  });
}

function formatCreatedAt(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function MyGiftsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "VirtualGifts.library" });
  const pickerT = await getTranslations({
    locale,
    namespace: "VirtualGifts.picker",
  });
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  const { q = "", template = "all" } = await searchParams;
  const gifts = await getVirtualGiftsForOwner(session.user.id);
  const filteredGifts = filterVirtualGifts(gifts, { template, query: q });
  const templates = [
    "all",
    ...Array.from(new Set(gifts.map((gift) => gift.templateId))),
  ];
  const templateNames = pickerT.raw("templates") as Record<string, string>;
  const formAction = locale === "en" ? "/mygifts" : `/${locale}/mygifts`;

  return (
    <main className="min-h-screen w-full bg-[#fbfaf7] text-foreground">
      <PageHero
        badge={{
          icon: <Gift className="size-4" />,
          label: t("hero.badge"),
        }}
        description={t("hero.description")}
        titleLines={[t("hero.title")]}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
            {templates.map((value) => (
              <Link
                key={value}
                className={cn(
                  "inline-flex h-8 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-normal transition",
                  template === value
                    ? "bg-stone-950 text-white"
                    : "bg-white text-muted-foreground shadow-sm hover:text-foreground",
                )}
                href={`/mygifts?template=${value}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              >
                {value === "all"
                  ? t("filters.all")
                  : (templateNames[value] ?? value)}
              </Link>
            ))}
          </div>

          <form
            action={formAction}
            className="relative w-full max-w-xs sm:w-80"
          >
            {template !== "all" && (
              <input name="template" type="hidden" value={template} />
            )}
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-full bg-white pl-9 pr-4 text-sm font-medium outline-none shadow-[0_10px_30px_rgba(28,25,23,0.10)] transition placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/10"
              defaultValue={q}
              name="q"
              placeholder={t("filters.searchPlaceholder")}
            />
          </form>
        </div>

        {filteredGifts.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGifts.map((gift) => {
              const templateName =
                templateNames[gift.templateId] ?? gift.templateId;
              const vibe = normalizeLoveLetterVibe(gift.vibe);
              const title = getVirtualGiftCardTitle(gift.message, templateName);

              return (
                <MyGiftCard
                  key={gift.id}
                  copiedLabel={t("card.copied")}
                  copyLabel={t("card.copyLink")}
                  createdFor={
                    gift.senderName
                      ? t("card.from", { name: gift.senderName })
                      : templateName
                  }
                  createdText={t("card.created", {
                    date: formatCreatedAt(gift.createdAt, locale),
                  })}
                  href={`/g/${gift.shareToken}`}
                  imageAlt={templateName}
                  imageUrl={gift.imageUrl}
                  shareCopiedLabel={t("card.shareCopied")}
                  shareCopyLabel={t("card.shareCopy")}
                  shareDescription={t("card.shareDescription")}
                  shareLabel={t("card.share")}
                  sharePreviewLabel={t("card.sharePreview")}
                  shareTitle={t("card.shareTitle")}
                  shareToXLabel={t("card.shareToX")}
                  shareUrl={buildVirtualGiftShareUrl(gift.shareToken)}
                  title={title}
                  tweetText={t("card.tweetText", { title })}
                  vibe={vibe}
                />
              );
            })}
          </div>
        ) : (
          <Empty className="mt-8 min-h-[360px] border border-dashed border-border bg-white">
            <EmptyHeader>
              <EmptyMedia
                className="size-14 rounded-full bg-primary/10 text-primary"
                variant="icon"
              >
                <Gift className="size-6" />
              </EmptyMedia>
              <EmptyTitle>
                {gifts.length
                  ? t("empty.noMatches.title")
                  : t("empty.noGifts.title")}
              </EmptyTitle>
              <EmptyDescription>
                {gifts.length
                  ? t("empty.noMatches.description")
                  : t("empty.noGifts.description")}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/virtual-gifts/love-letter">
                    {t("empty.create")}
                  </Link>
                </Button>
                <Button asChild className="rounded-full" variant="outline">
                  <Link href="/virtual-gifts">{t("empty.browse")}</Link>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        )}
      </section>
    </main>
  );
}
