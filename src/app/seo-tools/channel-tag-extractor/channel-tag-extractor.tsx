"use client";

import Image from "next/image";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: { id: string; title: string; handle: string | null; avatarUrl: string | null };
  keywords: string[];
  fetchedAt: string;
}

export function ChannelTagExtractor() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-tags");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Extract tags"
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : r.message;
        }}
        onSubmit={(input) => run({ input })}
      />

      <p role="status" className="sr-only">
        {state.status === "loading"
          ? "Looking up channel tags…"
          : state.status === "done"
            ? `${state.data.keywords.length} channel tag${state.data.keywords.length === 1 ? "" : "s"} found.`
            : ""}
      </p>
      <div>
        {state.status === "loading" && <Skeleton className="h-56 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ResultCard({ channel: c, keywords, fetchedAt }: Result) {
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        {c.avatarUrl && <Image src={c.avatarUrl} alt="" width={48} height={48} unoptimized className="h-12 w-12 shrink-0 rounded-full" />}
        <div className="min-w-0">
          <p className="truncate font-semibold">{c.title}</p>
          <p className="text-sm text-muted">
            {c.handle ?? c.id} · {keywords.length} channel tag{keywords.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {keywords.length === 0 ? (
        <p className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-muted">
          This channel hasn&apos;t set any channel keywords — that&apos;s common, and it only affects YouTube&apos;s understanding of the
          channel, not individual videos.
        </p>
      ) : (
        <>
          <ul role="list" className="mt-4 flex flex-wrap gap-2">
            {keywords.map((k) => (
              <li key={k} className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm font-medium">
                {k}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <CopyButton text={keywords.join(", ")} label="Copy all tags" />
          </div>
        </>
      )}

      <div className="mt-4 flex justify-end">
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
