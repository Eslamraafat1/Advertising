/**
 * Canonical site URL used for metadata, sitemap.xml and robots.txt.
 *
 * Order: explicit NEXT_PUBLIC_SITE_URL -> Vercel production domain -> the
 * known production URL. It never falls back to localhost, so a missing env
 * var on the host cannot leak `http://localhost:3000` into canonical tags.
 */
const PRODUCTION_URL = "https://advertising-blond.vercel.app";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "The Untold Story";
export const SITE_DESCRIPTION =
  "Film & video production services in Egypt and MENA. The Untold Story delivers the full production cycle: planning, filming, live, post production and localization.";

/** Public routes listed in the sitemap. */
export const PUBLIC_ROUTES = ["/", "/about", "/services", "/portfolio", "/blog", "/contact"] as const;

/**
 * Open Graph fields shared by every page. Next.js replaces (does not merge)
 * a parent's `openGraph` object when a child segment sets its own, so page
 * layouts spread this in.
 */
export const SHARED_OPEN_GRAPH = {
  type: "website" as const,
  siteName: SITE_NAME,
  locale: "en_US",
  alternateLocale: ["ar_EG"],
  images: [{ url: "/black.png", width: 1920, height: 1080, alt: SITE_NAME }],
};
