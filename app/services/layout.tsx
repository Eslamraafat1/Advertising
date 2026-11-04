import type { Metadata } from "next";
import { SHARED_OPEN_GRAPH } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Commercials, documentaries, corporate films, live events, podcasts, photography, motion/CGI, post production, dubbing and localization.",
  alternates: { canonical: "/services" },
  openGraph: { ...SHARED_OPEN_GRAPH, title: "Services | The Untold Story", description: "Commercials, documentaries, corporate films, live events, podcasts, photography, motion/CGI, post production, dubbing and localization.", url: "/services" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
