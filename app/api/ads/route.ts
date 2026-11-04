import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAdminRequest } from "../../lib/admin";

const dbPath = path.join(process.cwd(), "app", "lib", "db.json");

const NO_STORE = {
  "Cache-Control": "no-store, max-age=0, must-revalidate",
  "CDN-Cache-Control": "no-store",
};

type Db = Record<string, unknown> & { ar?: unknown; en?: unknown };

function getDbData(): Db | null {
  try {
    if (fs.existsSync(dbPath)) {
      return JSON.parse(fs.readFileSync(dbPath, "utf8")) as Db;
    }
  } catch (e) {
    console.error("Error reading db.json", e);
  }
  return null;
}

/**
 * Public callers only receive the editable site content (`ar` / `en`).
 * The demo dashboard data (stats, campaigns, leads) requires admin access.
 */
export async function GET(request: Request) {
  const data = getDbData();
  if (!data) {
    return NextResponse.json({ error: "Database file not found" }, { status: 500 });
  }
  const body = isAdminRequest(request) ? data : { ar: data.ar, en: data.en };
  return NextResponse.json(body, { headers: NO_STORE });
}

/** Updates the editable `ar` / `en` content. Admin only. */
export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json(
      { success: false, error: "Editing is disabled. A valid admin token is required." },
      { status: 401, headers: NO_STORE },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ success: false, error: "Expected a JSON object" }, { status: 400 });
  }

  const currentData = getDbData();
  if (!currentData) {
    return NextResponse.json({ success: false, error: "Database not found" }, { status: 500 });
  }

  // Only the editable content sections can be changed through the API.
  const { ar, en } = body as { ar?: unknown; en?: unknown };
  const newData: Db = {
    ...currentData,
    ...(ar && typeof ar === "object" ? { ar } : {}),
    ...(en && typeof en === "object" ? { en } : {}),
  };

  try {
    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2) + "\n", "utf8");
  } catch (error) {
    // Serverless hosts such as Vercel have a read-only file system.
    console.error("Error writing db.json", error);
    return NextResponse.json(
      { success: false, error: "Content storage is read-only on this deployment." },
      { status: 503 },
    );
  }
  return NextResponse.json({ success: true, data: newData });
}
