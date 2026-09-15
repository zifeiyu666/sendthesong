"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link as I18nLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type BlogPostCTAVariant = "compact" | "mid" | "end";

type BlogPostCTAProps = {
  href: string;
  variant?: BlogPostCTAVariant;
  title?: string;
  description?: string;
  buttonLabel: string;
  className?: string;
};

const PRIMARY_BUTTON_CLASS_NAME =
  "min-w-[180px] border-[#ef5b4e] bg-[#ef5b4e] px-7 text-sm font-bold text-white shadow-[0_14px_32px_rgba(174,67,114,0.24)] hover:border-[#f36a5d] hover:bg-[#bb4b7b] hover:text-white hover:shadow-[0_18px_38px_rgba(174,67,114,0.3)] sm:min-w-[200px]";

export function BlogPostCTA({
  href,
  variant = "end",
  title,
  description,
  buttonLabel,
  className,
}: BlogPostCTAProps) {
  if (variant === "compact") {
    return (
      <I18nLink
        href={href}
        className={cn(
          "inline-flex items-center gap-2 rounded-full bg-[#ef5b4e] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(174,67,114,0.2)] transition-colors hover:bg-[#bb4b7b]",
          className,
        )}
      >
        <span>{buttonLabel}</span>
        <ArrowRight className="size-4" aria-hidden="true" />
      </I18nLink>
    );
  }

  if (variant === "mid") {
    return (
      <aside
        className={cn(
          "my-12 rounded-2xl border border-[#eadfd4] bg-[#f8f4f0] px-6 py-7 sm:px-8",
          className,
        )}
      >
        {title ? (
          <p className="text-lg font-semibold leading-7 text-[#32103f] sm:text-xl">
            {title}
          </p>
        ) : null}
        {description ? (
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#63536b] sm:text-base">
            {description}
          </p>
        ) : null}
        <MagneticButton
          href={href}
          size="sm"
          magneticRange={110}
          strength={0.22}
          contentStrength={0.12}
          trailingArrow
          className={cn("mt-5", PRIMARY_BUTTON_CLASS_NAME)}
        >
          <span>{buttonLabel}</span>
        </MagneticButton>
      </aside>
    );
  }

  return (
    <section className={cn("mt-14 border-t border-[#e4ded8] pt-10", className)}>
      {title ? (
        <p className="text-xl font-medium leading-8 text-black sm:text-xl">
          {title}
        </p>
      ) : null}
      <MagneticButton
        href={href}
        size="sm"
        magneticRange={110}
        strength={0.22}
        contentStrength={0.12}
        trailingArrow
        className={cn("mt-5", PRIMARY_BUTTON_CLASS_NAME)}
      >
        <span>{buttonLabel}</span>
      </MagneticButton>
    </section>
  );
}
