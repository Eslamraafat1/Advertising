import type { Metadata } from "next";
import { SHARED_OPEN_GRAPH } from "../lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description: "The kinds of productions The Untold Story delivers: commercials, documentaries, corporate content, live events and post production.",
  alternates: { canonical: "/portfolio" },
  openGraph: { ...SHARED_OPEN_GRAPH, title: "Our Work | The Untold Story", description: "The kinds of productions The Untold Story delivers: commercials, documentaries, corporate content, live events and post production.", url: "/portfolio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
