import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map(route => ({
    url: route === "/" ? SITE_URL : `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
