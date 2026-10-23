"use client";

import { ArrowUpRight, Clock3, FolderOpen } from "lucide-react";
import { kindergarten } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";

/**
 * Opens the Google Drive folder. Until its link is set in the data file there is no button at all —
 * only a quiet note, so visitors never meet a dead link.
 */
export function DriveButton({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const url: string = kindergarten.documents.driveUrl;
  if (!url) {
    return (
      <p role="status" className={`inline-flex items-start gap-2 text-[0.92rem] leading-snug text-ink-soft ${className}`}>
        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-deep" aria-hidden="true" />
        {t.documents.soon}
      </p>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[0.95rem] font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-sky-deep ${className}`}
    >
      <FolderOpen className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
      {t.documents.open}
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
