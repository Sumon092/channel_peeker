import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact the channelpeek team with questions, bug reports, tool ideas or data deletion requests.",
  path: "/contact",
});

export default function Page() {
  return (
    <ProsePage title="Contact" path="/contact">
      <p>
        Email us at <strong>{site.contactEmail}</strong>. We read everything and usually reply within two working days.
      </p>
      <h2>Helpful to include</h2>
      <ul>
        <li>For bugs: the tool, what you entered, and what you expected to see.</li>
        <li>For data deletion: the channel URL, sent from an address linked to the channel if possible.</li>
        <li>For tool ideas: what you are trying to do and how you do it today.</li>
      </ul>
    </ProsePage>
  );
}
