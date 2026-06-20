import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/LanguageContext";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Untold Agency | Premium Advertising & Marketing Agency",
  description: "وكالة دعاية وإعلان متخصصة في تقديم حلول تسويقية مبتكرة. Professional marketing and advertising agency delivering measurable results.",
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
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
