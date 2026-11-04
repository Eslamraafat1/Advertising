import type { Metadata } from "next";
import { SHARED_OPEN_GRAPH } from "../lib/site";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "Company news and updates from The Untold Story.",
  alternates: { canonical: "/blog" },
  openGraph: { ...SHARED_OPEN_GRAPH, title: "News & Insights | The Untold Story", description: "Company news and updates from The Untold Story.", url: "/blog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
