import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Changelog",
  description: "New tools and changes on channelpeek.",
  path: "/changelog",
});

const entries = [{ date: "September 29, 2026", items: ["Site foundation: tools directory, methodology and data policy."] }];

export default function Page() {
  return (
    <ProsePage title="Changelog" path="/changelog">
      {entries.map((e) => (
        <section key={e.date}>
          <h2>{e.date}</h2>
          <ul>
            {e.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      ))}
    </ProsePage>
  );
}
