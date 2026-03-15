// Generic admin CRUD route: /api/admin?table=posts
// Supports GET, POST, PUT, DELETE with service role key

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

export async function GET(req: NextRequest) {
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  const { data, error } = await supabaseAdmin.from(table).select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  const body = await req.json();
  const { data, error } = await supabaseAdmin.from(table).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from(table)
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Invalid table" }, { status: 400 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
