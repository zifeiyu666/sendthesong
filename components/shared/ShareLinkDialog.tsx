"use client";

import { TwitterX } from "@/components/social-icons/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useState, type ReactNode } from "react";

const glassDialogButtonClassName =
  "h-11 justify-start rounded-xl border-0 bg-white/48 text-foreground shadow-[0_10px_28px_rgba(45,31,24,0.07),inset_0_1px_0_rgba(255,255,255,0.78),inset_0_-1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl hover:bg-white/62 hover:text-foreground";

type ShareLinkDialogProps = {
  copiedLabel?: string;
  copyLabel?: string;
  description: string;
  previewLabel?: string;
  shareToXLabel?: string;
  shareUrl: string;
  title: string;
  trigger: ReactNode;
  tweetText: string;
};

export function ShareLinkDialog({
  copiedLabel = "Copied link",
  copyLabel = "Copy link",
  description,
  previewLabel = "Preview share page",
  shareToXLabel = "Share to X",
  shareUrl,
  title,
  trigger,
  tweetText,
}: ShareLinkDialogProps) {
  const [copied, setCopied] = useState(false);
  const tweetUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
    text: tweetText,
    url: shareUrl,
  }).toString()}`;

  async function copyShareUrl() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[min(720px,calc(100svh-2rem))] overflow-hidden border-black/10 bg-[#fffaf4] p-0 sm:max-w-2xl">
        <div className="border-b border-black/10 bg-white/75 px-6 py-5">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        </div>
        <div className="min-w-0 space-y-4 overflow-y-auto px-6 pb-6">
          <div className="min-w-0 rounded-2xl border border-black/10 bg-white/80 p-3 shadow-inner">
            <p className="break-all text-sm font-semibold leading-6 text-stone-700 sm:truncate sm:break-normal">
              {shareUrl}
            </p>
          </div>
          <div className="grid gap-2">
            <Button
              className="h-11 justify-start rounded-xl border-0 bg-stone-950/88 text-white shadow-[0_12px_30px_rgba(45,31,24,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl hover:bg-stone-950"
              type="button"
              onClick={copyShareUrl}
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied ? copiedLabel : copyLabel}
            </Button>
            <Button asChild className={glassDialogButtonClassName}>
              <a href={tweetUrl} rel="noreferrer" target="_blank">
                <TwitterX className="size-4" />
                {shareToXLabel}
              </a>
            </Button>
            <Button asChild className={glassDialogButtonClassName}>
              <a href={shareUrl} rel="noreferrer" target="_blank">
                <ExternalLink className="size-4" />
                {previewLabel}
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
