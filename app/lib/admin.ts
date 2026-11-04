import { timingSafeEqual } from "crypto";

export const ADMIN_HEADER = "x-admin-token";
export const ADMIN_COOKIE = "admin_token";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

/**
 * Admin access for the demo dashboard and mutating API routes.
 *
 * - In development (`next dev`) everything is allowed so the demo works locally.
 * - In production, access requires the ADMIN_TOKEN env var to be set and to
 *   match the `x-admin-token` header or the `admin_token` cookie. Without
 *   ADMIN_TOKEN, admin access is disabled entirely.
 */
export function isAdminRequest(request: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const provided =
    request.headers.get(ADMIN_HEADER) ?? readCookie(request.headers.get("cookie"), ADMIN_COOKIE);
  return typeof provided === "string" && provided.length > 0 && safeEqual(provided, expected);
}
