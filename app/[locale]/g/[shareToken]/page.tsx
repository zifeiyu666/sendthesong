import { LoveLetterShareView } from "@/components/virtual-gifts/LoveLetterShareView";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { getVirtualGiftByShareToken } from "@/lib/virtual-gifts/store";
import { normalizeLoveLetterVibe } from "@/lib/virtual-gifts/templates";
import { isVirtualGiftShareToken } from "@/lib/virtual-gifts/token";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Params = Promise<{ locale: string; shareToken: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, shareToken } = await params;
  const t = await getTranslations({ locale, namespace: "VirtualGifts" });
  const gift = isVirtualGiftShareToken(shareToken)
    ? await getVirtualGiftByShareToken(shareToken)
    : null;

  return constructMetadata({
    title: gift?.senderName
      ? t("share.from", { name: gift.senderName })
      : t("share.title"),
    description: t("share.description"),
    locale: locale as Locale,
    path: `/g/${shareToken}`,
    noIndex: true,
  });
}

export default async function VirtualGiftSharePage({
  params,
}: {
  params: Params;
}) {
  const { shareToken } = await params;
  if (!isVirtualGiftShareToken(shareToken)) notFound();

  const gift = await getVirtualGiftByShareToken(shareToken);
  if (!gift) notFound();

  const vibe = normalizeLoveLetterVibe(gift.vibe);

  return (
    <LoveLetterShareView
      gift={{
        vibe,
        message: gift.message,
        senderName: gift.senderName,
        imageUrl: gift.imageUrl,
        audioUrl: gift.audioUrl,
      }}
    />
  );
}
