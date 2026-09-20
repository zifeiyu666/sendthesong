"use client";

import { ChevronDown, Globe2, Mic2, Music2, Plus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { Link as I18nLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { LanguageChip, MagneticChoiceCard } from "../components/wizard-ui";
import {
  featuredLanguages,
  genres,
  moreLanguages,
  vocalGenderOptions,
} from "../constants";
import type { GenreOption } from "../types";
import {
  localizedGenreLabel,
  useWizardCopy,
  useWizardLocale,
} from "../i18n";

type StyleStepProps = {
  genre: string;
  language: string;
  showAllLanguages: boolean;
  vocalGender: string;
  customVoiceId?: string;
  onGenreSelect: (genre: GenreOption) => void;
  onLanguageChange: (value: string) => void;
  onShowAllLanguagesChange: Dispatch<SetStateAction<boolean>>;
  onVocalGenderChange: (value: string) => void;
  onCustomVoiceChange: (value?: string) => void;
};

export function StyleStep({
  genre,
  language,
  showAllLanguages,
  vocalGender,
  customVoiceId,
  onGenreSelect,
  onLanguageChange,
  onShowAllLanguagesChange,
  onVocalGenderChange,
  onCustomVoiceChange,
}: StyleStepProps) {
  const copy = useWizardCopy();
  const locale = useWizardLocale();
  const [customVoices, setCustomVoices] = useState<Array<{ id: string; name: string }>>([]);
  useEffect(() => { fetch("/api/voices").then((response) => response.json()).then((result) => { if (result.success) setCustomVoices(result.data.filter((voice: { status: string }) => voice.status === "ready")); }).catch(() => undefined); }, []);

  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-base font-semibold">
            <Music2 className="size-5 text-accent-foreground" />
            {copy.genre}
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {copy.pickOne}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-5">
        {genres.map((item) => {
          const selected = genre === item.value;

          return (
            <MagneticChoiceCard
              key={item.value}
              icon={<span className={item.accent}>{item.icon}</span>}
              label={localizedGenreLabel(locale, item.value, item.label)}
              selected={selected}
              onClick={() => onGenreSelect(item)}
            />
          );
        })}
      </div>

      <div className="mt-9">
        <div className="mb-4 flex items-center gap-2 text-base font-semibold">
          <Mic2 className="size-5 text-accent-foreground" />
          {copy.voice}
        </div>
        <div className="flex flex-wrap gap-3">
          {vocalGenderOptions.map((option) => {
            const selected = !customVoiceId && vocalGender === option;
            const auto = option === "Pick for me";

            return (
              <button
                key={option}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm",
                  selected
                    ? "bg-primary/10 text-primary"
                    : auto
                      ? "border-2 border-dashed border-border bg-transparent text-foreground"
                      : "bg-card text-foreground",
                )}
                type="button"
                onClick={() => {
                  onCustomVoiceChange(undefined);
                  onVocalGenderChange(option);
                }}
              >
                {locale === "es"
                  ? option === "Pick for me"
                    ? "Elegir por mí"
                    : option === "Male"
                      ? "Masculina"
                      : "Femenina"
                  : locale === "ja"
                    ? option === "Pick for me"
                      ? "おまかせ"
                      : option === "Male"
                        ? "男性"
                        : "女性"
                    : option}
              </button>
            );
          })}
          {customVoices.map((voice) => (
            <button
              key={voice.id}
              className={cn(
                "cursor-pointer rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:shadow-sm",
                customVoiceId === voice.id && "bg-primary/10 text-primary",
              )}
              type="button"
              onClick={() => onCustomVoiceChange(voice.id)}
            >
              {voice.name}
            </button>
          ))}
          <I18nLink
            href="/voices?create=1"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-dashed border-primary/35 px-4 py-2 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-sm"
          >
            <Plus className="size-3.5" />
            {copy.addCustomVoice}
          </I18nLink>
        </div>
      </div>

      <div className="mt-9">
        <div className="mb-4 flex items-center gap-2 text-base font-semibold">
          <Globe2 className="size-5 text-accent-foreground" />
          {copy.language}
        </div>
        <div className="flex flex-wrap gap-3">
          {featuredLanguages.map((item) => (
            <LanguageChip
              key={item.code}
              language={item}
              selected={language === item.value}
              onClick={() => onLanguageChange(item.value)}
            />
          ))}
        </div>
        <button
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-sm"
          type="button"
          onClick={() => onShowAllLanguagesChange((current) => !current)}
        >
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              !showAllLanguages && "-rotate-90",
            )}
          />
          {showAllLanguages
            ? copy.showFewerLanguages
            : copy.showMoreLanguages}
        </button>
        {showAllLanguages && (
          <div className="mt-5 flex flex-wrap gap-3">
            {moreLanguages.map((item) => (
              <LanguageChip
                key={item.code}
                language={item}
                selected={language === item.value}
                showCode
                onClick={() => onLanguageChange(item.value)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
