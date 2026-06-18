import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "app", "lib", "db.json");

function getDbData() {
  try {
    if (fs.existsSync(dbPath)) {
      const raw = fs.readFileSync(dbPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading db.json", e);
  }
  return null;
}

export async function GET() {
  const data = getDbData();
  if (!data) {
    return NextResponse.json({ error: "Database file not found" }, { status: 500 });
  }
  return NextResponse.json(data, {
    headers: { 
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      "CDN-Cache-Control": "no-store"
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = getDbData();
    if (!currentData) {
      return NextResponse.json({ success: false, error: "Database not found" }, { status: 500 });
    }

    // Deep merge or update specific keys
    const newData = {
      ...currentData,
      ...body
    };

    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2), "utf8");
    return NextResponse.json({ success: true, data: newData });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
