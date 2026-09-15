"use client";

import { Link } from "@/i18n/routing";
import { VIRTUAL_GIFT_PICKER_ITEMS } from "@/lib/virtual-gifts/templates";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Cake, Gift, Heart, PartyPopper } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const templateIcons = {
  "love-letter": Heart,
  "super-box": Gift,
  "birthday-balloons": PartyPopper,
  "birthday-cake": Cake,
} as const;

export function VirtualGiftPicker() {
  const t = useTranslations("VirtualGifts.picker");

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {VIRTUAL_GIFT_PICKER_ITEMS.map((item) => {
        const Icon = templateIcons[item.id as keyof typeof templateIcons];
        const label = t(`templates.${item.id}` as Parameters<typeof t>[0]);
        const hint = t(`hints.${item.id}` as Parameters<typeof t>[0]);
        const className = cn(
          "group relative flex h-full flex-col rounded-3xl border border-[#ead7cf] bg-white p-6 text-left shadow-[0_14px_38px_rgba(59,31,18,0.05)] transition",
          item.comingSoon
            ? "cursor-pointer opacity-90 hover:opacity-100"
            : "hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        );

        const content = (
          <>
            <span
              className={cn(
                "flex size-12 items-center justify-center rounded-2xl border-2",
                item.accentClassName,
                item.textClassName,
              )}
            >
              <Icon className="size-6" aria-hidden />
            </span>
            <span className="mt-5 font-sans text-xl font-black tracking-tight text-[#261712]">
              {label}
            </span>
            <span className="mt-3 text-sm leading-6 text-[#74665f]">{hint}</span>
            {item.comingSoon ? (
              <span className="absolute right-4 top-4 rounded-full bg-[#fff2eb] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#c23d4b]">
                {t("comingSoon")}
              </span>
            ) : (
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                {t("trending")}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            )}
          </>
        );

        if (item.comingSoon || !item.href) {
          return (
            <li key={item.id}>
              <button
                type="button"
                className={cn(className, "w-full")}
                onClick={() => toast.message(t("comingSoonToast"))}
              >
                {content}
              </button>
            </li>
          );
        }

        return (
          <li key={item.id}>
            <Link href={item.href} className={className}>
              {content}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
