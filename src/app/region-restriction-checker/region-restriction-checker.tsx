"use client";

import Image from "next/image";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  video: { id: string; title: string; channelTitle: string; thumbnailUrl: string | null };
  availability: { allowed: string[] | null; blocked: string[] | null; embeddable: boolean | null };
  fetchedAt: string;
}

const countryName = (code: string) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
};

export function RegionRestrictionChecker() {
  const { state, run } = useToolRequest<Result>("/api/tools/region-restriction");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Video link or ID"
        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
        submitLabel="Check regions"
        loading={state.status === "loading"}
        examples={[{ label: "A video link", value: "https://youtu.be/dQw4w9WgXcQ" }]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "video");
          return r.ok ? null : r.message;
        }}
        onSubmit={(input) => run({ input })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-56 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function CountryChips({ codes }: { codes: string[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {[...codes].sort().map((c) => (
        <li key={c} className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium">
          {countryName(c)} ({c})
        </li>
      ))}
    </ul>
  );
}

function ResultCard({ video: v, availability: a, fetchedAt }: Result) {
  const unrestricted = !a.allowed && !a.blocked;

  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <span className="relative h-14 w-[100px] shrink-0 overflow-hidden rounded-lg bg-surface-2">
          {v.thumbnailUrl && <Image src={v.thumbnailUrl} alt="" fill sizes="100px" className="object-cover" />}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{v.title}</p>
          <p className="text-sm text-muted">{v.channelTitle}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {unrestricted && (
          <div className="rounded-xl bg-surface-2 p-4">
            <p className="font-semibold text-good">No region restrictions set</p>
            <p className="mt-1 text-sm text-muted">
              The uploader (or their rights holders) hasn&apos;t limited this video to specific countries. It can still be unavailable
              somewhere for other reasons — local law, YouTube availability, or age restriction.
            </p>
          </div>
        )}

        {a.allowed && (
          <div className="rounded-xl bg-surface-2 p-4">
            <p className="font-semibold">
              Only viewable in {a.allowed.length} {a.allowed.length === 1 ? "country" : "countries"}
            </p>
            <p className="mt-1 text-sm text-muted">Everywhere else, this video is blocked.</p>
            <CountryChips codes={a.allowed} />
          </div>
        )}

        {a.blocked && (
          <div className="rounded-xl bg-surface-2 p-4">
            <p className="font-semibold text-bad">
              Blocked in {a.blocked.length} {a.blocked.length === 1 ? "country" : "countries"}
            </p>
            <p className="mt-1 text-sm text-muted">Viewable everywhere else.</p>
            <CountryChips codes={a.blocked} />
          </div>
        )}

        <div className="rounded-xl bg-surface-2 p-4">
          <p className="text-sm">
            <span className="font-semibold">Embedding:</span>{" "}
            {a.embeddable === null ? "Unknown" : a.embeddable ? "allowed on other websites." : "turned off — this video can't be embedded on other websites."}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
