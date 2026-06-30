import { NextRequest } from "next/server";

const EXTERNAL_API =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "https://globaluntoldstory.com/api/public/api/v1";

// e.g. https://globaluntoldstory.com/api/public  (drops the trailing /api/v1)
const API_PUBLIC_BASE = EXTERNAL_API.replace(/\/api\/v1$/, "");

// Same-origin proxy for backend media so the browser never makes a cross-origin
// no-cors image request (which the CDN intermittently blocks via ORB:
// ERR_BLOCKED_BY_ORB). Fetches server-side and streams the bytes back.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const target = `${API_PUBLIC_BASE}/storage/${path.map(encodeURIComponent).join("/")}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const upstream = await fetch(target, {
      signal: controller.signal,
      headers: { Accept: "image/*,*/*" },
      cache: "no-store",
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("Not found", { status: upstream.status || 502 });
    }

    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  } catch {
    return new Response("Upstream error", { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}
