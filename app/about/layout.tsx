import type { Metadata } from "next";
import { SHARED_OPEN_GRAPH } from "../lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "The Untold Story is a full-service film and video production studio in Egypt and MENA: our story, what we offer and our leadership.",
  alternates: { canonical: "/about" },
  openGraph: { ...SHARED_OPEN_GRAPH, title: "About Us | The Untold Story", description: "The Untold Story is a full-service film and video production studio in Egypt and MENA: our story, what we offer and our leadership.", url: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
