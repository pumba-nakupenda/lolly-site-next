// Generic admin CRUD route: /api/admin?table=posts
// Supports GET, POST, PUT, DELETE with service role key

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  const adminPwd = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "lolly2024";
  const apiSecret = process.env.ADMIN_API_SECRET;
  return token === adminPwd || (!!apiSecret && token === apiSecret);
}

const ALLOWED_TABLES = [
  "posts",
  "portfolio",
  "services",
  "testimonials",
  "faqs",
  "steps",
  "results",
  "hero",
  "partners",
  "authors",
];

function getTable(req: NextRequest): string | null {
  const table = req.nextUrl.searchParams.get("table");
  if (!table || !ALLOWED_TABLES.includes(table)) return null;
  return table;
}

// Map tables to the public pages that display their data
const TABLE_PATHS: Record<string, string[]> = {
  posts: ["/", "/blog"],
  portfolio: ["/", "/portfolio"],
  services: ["/", "/services"],
  testimonials: ["/", "/services"],
  faqs: ["/services"],
  steps: ["/services"],
  results: ["/", "/services"],
  hero: ["/"],
  partners: ["/"],
  authors: ["/blog"],
};

function revalidateTablePaths(table: string) {
  const paths = TABLE_PATHS[table] ?? ["/"];
  for (const p of paths) {
    revalidatePath(p);
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Supabase n'est pas configuré. Ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans vos variables d'environnement." },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin.from(table).select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  const body = await req.json();
  const { data, error } = await supabaseAdmin.from(table).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTablePaths(table);
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from(table)
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTablePaths(table);
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTablePaths(table);
  return NextResponse.json({ success: true });
}
