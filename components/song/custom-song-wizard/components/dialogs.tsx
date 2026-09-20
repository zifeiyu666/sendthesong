"use client";

import {
  Check,
  Edit3,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import type { LyricsVersionComparison } from "../types";
import { useWizardLocale } from "../i18n";
import { LyricsVersionPanel } from "./wizard-ui";

const dialogCopy = {
  en: {
    newTitle: "Write a new version", newDescription: "Add optional direction for the next lyrics draft.",
    placeholder: "e.g., Add the name to the title and make the song more romantic...",
    blank: "Leave it blank for a fresh take.", cancel: "Cancel", generate: "Generate version",
    compare: "Compare lyrics versions", compareDescription: "Review both drafts before choosing which one to keep.",
    original: "Original", newVersion: "New version", useOriginal: "Use original", useNew: "Use new version",
  },
  es: {
    newTitle: "Escribir otra versión", newDescription: "Añade una indicación opcional para la siguiente letra.",
    placeholder: "Ej.: añade el nombre al título y haz la canción más romántica...",
    blank: "Déjalo en blanco para obtener una versión completamente nueva.", cancel: "Cancelar", generate: "Generar versión",
    compare: "Comparar versiones de la letra", compareDescription: "Revisa ambas propuestas antes de elegir cuál conservar.",
    original: "Original", newVersion: "Nueva versión", useOriginal: "Usar original", useNew: "Usar nueva versión",
  },
  ja: {
    newTitle: "別の歌詞を作る", newDescription: "次の歌詞に反映したい内容があれば入力してください。",
    placeholder: "例：曲名に名前を入れ、全体をもっとロマンチックにする...",
    blank: "空欄のままなら、自由な新バージョンを作ります。", cancel: "キャンセル", generate: "新しい歌詞を作る",
    compare: "歌詞を比較", compareDescription: "2つの歌詞を確認し、残すほうを選んでください。",
    original: "元の歌詞", newVersion: "新しい歌詞", useOriginal: "元の歌詞を使う", useNew: "新しい歌詞を使う",
  },
} as const;

export function NewLyricsVersionDialog({
  instruction,
  open,
  onGenerate,
  onInstructionChange,
  onOpenChange,
}: {
  instruction: string;
  open: boolean;
  onGenerate: () => void;
  onInstructionChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
}) {
  const copy = dialogCopy[useWizardLocale()];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-border p-0 sm:max-w-xl">
        <DialogHeader className="border-b border-border px-5 pb-4 pt-5 text-left sm:px-6">
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <Sparkles className="size-5 text-primary" />
            {copy.newTitle}
          </DialogTitle>
          <DialogDescription className="leading-6">
            {copy.newDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 py-4 sm:px-6">
          <Textarea
            autoFocus
            className="min-h-32 resize-none rounded-2xl border-border bg-muted p-4 text-sm leading-6 text-foreground shadow-none placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:ring-primary/20"
            maxLength={500}
            placeholder={copy.placeholder}
            value={instruction}
            onChange={(event) => onInstructionChange(event.target.value)}
          />
          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>{instruction.length} / 500</span>
            <span>{copy.blank}</span>
          </div>
        </div>

        <DialogFooter className="border-t border-border px-5 py-4 sm:px-6">
          <Button
            className="h-10 rounded-full px-5 text-sm font-bold"
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            {copy.cancel}
          </Button>
          <Button
            className="h-10 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90"
            type="button"
            onClick={onGenerate}
          >
            <RefreshCw className="size-4" />
            {copy.generate}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function LyricsVersionComparisonDialog({
  comparison,
  onKeepOriginal,
  onUseNew,
}: {
  comparison: LyricsVersionComparison | null;
  onKeepOriginal: () => void;
  onUseNew: () => void;
}) {
  const copy = dialogCopy[useWizardLocale()];
  return (
    <Dialog
      open={Boolean(comparison)}
      onOpenChange={(open) => {
        if (!open) onKeepOriginal();
      }}
    >
      <DialogContent className="flex max-h-[86vh] flex-col overflow-hidden rounded-2xl border-border p-0 sm:max-w-5xl">
        <DialogHeader className="border-b border-border px-5 pb-4 pt-5 text-left sm:px-6">
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <Edit3 className="size-5 text-primary" />
            {copy.compare}
          </DialogTitle>
          <DialogDescription className="leading-6">
            {copy.compareDescription}
          </DialogDescription>
        </DialogHeader>

        {comparison && (
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            <div className="grid gap-4 md:grid-cols-2">
              <LyricsVersionPanel
                label={copy.original}
                lyrics={comparison.originalLyrics}
                title={comparison.originalTitle}
              />
              <LyricsVersionPanel
                label={copy.newVersion}
                lyrics={comparison.newLyrics}
                title={comparison.newTitle}
              />
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-border px-5 py-4 sm:px-6">
          <Button
            className="h-10 rounded-full px-5 text-sm font-bold"
            type="button"
            variant="ghost"
            onClick={onKeepOriginal}
          >
            {copy.useOriginal}
          </Button>
          <Button
            className="h-10 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90"
            type="button"
            onClick={onUseNew}
          >
            <Check className="size-4" />
            {copy.useNew}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
