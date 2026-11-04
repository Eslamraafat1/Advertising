import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/LanguageContext";
import { SHARED_OPEN_GRAPH, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Film & Video Production in Egypt and MENA`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: `${SITE_NAME} | Film & Video Production in Egypt and MENA`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} | Film & Video Production in Egypt and MENA`,
    description: SITE_DESCRIPTION,
    images: ["/black.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/black.png`,
  email: "bendary@globaluntoldstory.com",
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Egyptian Media Production City", addressCountry: "EG" },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+201001299639", contactType: "customer service", areaServed: "EG" },
    { "@type": "ContactPoint", telephone: "+971547711772", contactType: "customer service", areaServed: "AE" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        />
      </head>
      <body>
        {/* Pre-hydration cleanup: remove attributes injected by browser extensions
            (e.g. cz-shortcut-listen) that can cause React hydration mismatches. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                if (typeof document !== 'undefined' && document.body) {
                  // Remove attributes that commonly come from extensions and cause
                  // hydration mismatches. Adjust regex if you need to target more.
                  const re = /^(cz-|czt-|cz_shortcut|cz_shortcut_listen)/i;
                  const attrs = Array.from(document.body.attributes || []);
                  attrs.forEach(a => {
                    if (re.test(a.name)) document.body.removeAttribute(a.name);
                  });
                }
              } catch (e) { /* ignore */ }
            })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
