import type { Metadata } from "next";
import { SHARED_OPEN_GRAPH } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Untold Story in Egypt or the UAE and get a quote for your next production within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: { ...SHARED_OPEN_GRAPH, title: "Contact | The Untold Story", description: "Contact The Untold Story in Egypt or the UAE and get a quote for your next production within 24 hours.", url: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
