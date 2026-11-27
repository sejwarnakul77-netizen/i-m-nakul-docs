import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const path = (segments || []).join("/");
  if (!path.startsWith("uploads/") || path.includes("..") || !supabase) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }
  const { data } = supabase.storage.from("public-files").getPublicUrl(path);
  const upstream = await fetch(data.publicUrl, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) return NextResponse.json({ error: "File not found." }, { status: upstream.status || 404 });

  const rawFileName = segments[segments.length - 1] || "download";
  const fileName = rawFileName.replace(/[\\r\\n"]/g, "_");
  const headers = new Headers();
  headers.set("Content-Type", upstream.headers.get("content-type") || "application/octet-stream");
  headers.set("Content-Disposition", `attachment; filename="download"; filename*=UTF-8''${encodeURIComponent(fileName)}`);
  headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);
  headers.set("X-Content-Type-Options", "nosniff");
  return new NextResponse(upstream.body, { status: 200, headers });
}
