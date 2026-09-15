"use client";

import { GiftMotifMark } from "@/components/virtual-gifts/GiftMotif";
import { ShareLinkDialog } from "@/components/shared/ShareLinkDialog";
import { MusicLibraryCard } from "@/components/song/MusicLibraryCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  LOVE_LETTER_VIBE_STYLES,
  type LoveLetterVibe,
} from "@/lib/virtual-gifts/templates";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type MyGiftCardProps = {
  copiedLabel: string;
  copyLabel: string;
  createdFor: string | null;
  createdText: string;
  href: string;
  imageAlt: string;
  imageUrl: string | null;
  shareCopiedLabel: string;
  shareCopyLabel: string;
  shareDescription: string;
  shareLabel: string;
  sharePreviewLabel: string;
  shareTitle: string;
  shareToXLabel: string;
  shareUrl: string;
  title: string;
  tweetText: string;
  vibe: LoveLetterVibe;
};

export function MyGiftCard({
  copiedLabel,
  copyLabel,
  createdFor,
  createdText,
  href,
  imageAlt,
  imageUrl,
  shareCopiedLabel,
  shareCopyLabel,
  shareDescription,
  shareLabel,
  sharePreviewLabel,
  shareTitle,
  shareToXLabel,
  shareUrl,
  title,
  tweetText,
  vibe,
}: MyGiftCardProps) {
  const [copied, setCopied] = useState(false);
  const style = LOVE_LETTER_VIBE_STYLES[vibe];

  return (
    <div className="relative h-full">
      <Link
        className="block h-full rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
        href={href}
      >
        <MusicLibraryCard
          coverFallback={
            <GiftMotifMark
              className={style.accentClassName}
              motif={vibe}
              size={80}
            />
          }
          coverFallbackClassName={style.fallbackClassName}
          createdFor={createdFor}
          createdText={createdText}
          footer={<div className="h-9" />}
          imageAlt={imageAlt}
          imageUrl={imageUrl}
          title={title}
        />
      </Link>
      <Button
        aria-label={copyLabel}
        className="absolute right-3 top-3 z-20 size-8 rounded-full bg-black/45 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white"
        onClick={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          toast.success(copiedLabel);
          setTimeout(() => setCopied(false), 2000);
        }}
        size="icon-sm"
        type="button"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </Button>
      <ShareLinkDialog
        copiedLabel={shareCopiedLabel}
        copyLabel={shareCopyLabel}
        description={shareDescription}
        previewLabel={sharePreviewLabel}
        shareToXLabel={shareToXLabel}
        shareUrl={shareUrl}
        title={shareTitle}
        tweetText={tweetText}
        trigger={
          <Button
            className="absolute bottom-4 left-3.5 right-3.5 z-20 h-9 rounded-full"
            type="button"
            variant="outline"
          >
            <Share2 className="size-3.5" />
            {shareLabel}
          </Button>
        }
      />
    </div>
  );
}
