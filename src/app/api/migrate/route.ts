/**
 * Route de migration one-shot : Sanity → Supabase
 * Protégée par le mot de passe admin.
 *
 * Appel : GET /api/migrate?password=lolly2024
 *
 * Étapes :
 *   1. Vérifie que les tables existent (sinon renvoie le SQL à coller dans Supabase)
 *   2. Migre toutes les données Sanity → Supabase
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient as createSanity } from "@sanity/client";
import { createClient as createSupabase } from "@supabase/supabase-js";

// ── Auth ──────────────────────────────────────────────────────────────────────
function isAuthorized(req: NextRequest): boolean {
  const pwd = req.nextUrl.searchParams.get("password");
  return pwd === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "lolly2024");
}

// ── SQL de création des tables ─────────────────────────────────────────────────
const CREATE_TABLES_SQL = `
-- Auteurs
create table if not exists authors (
  id text primary key,
  name text not null,
  slug text unique,
  image text,
  bio text,
  created_at timestamptz default now()
);

-- Articles
create table if not exists posts (
  id text primary key,
  title text not null,
  slug text unique not null,
  main_image text,
  published_at timestamptz,
  categories text[] default '{}',
  excerpt text,
  body text,
  author_id text references authors(id),
  created_at timestamptz default now()
);

-- Portfolio
create table if not exists portfolio (
  id text primary key,
  title text not null,
  slug text unique not null,
  category text default 'design',
  main_image text,
  client text,
  description text,
  published_at timestamptz,
  gallery text[] default '{}',
  video_url text,
  has_report boolean default false,
  report_url text,
  report_label text,
  created_at timestamptz default now()
);

-- Services
create table if not exists services (
  id text primary key,
  icon text,
  badge text,
  order_id int default 0,
  title text not null,
  description text,
  items text[] default '{}',
  cta text,
  link text,
  highlight boolean default false,
  color text,
  extra text,
  created_at timestamptz default now()
);

-- Témoignages
create table if not exists testimonials (
  id text primary key,
  name text not null,
  role text,
  content text,
  avatar text,
  rating int default 5,
  created_at timestamptz default now()
);

-- FAQ
create table if not exists faqs (
  id text primary key,
  question text not null,
  answer text,
  order_id int default 0,
  created_at timestamptz default now()
);

-- Étapes
create table if not exists steps (
  id text primary key,
  order_id int default 0,
  title text,
  subtitle text,
  icon text,
  content text,
  details text[] default '{}',
  deliverable text,
  created_at timestamptz default now()
);

-- Résultats
create table if not exists results (
  id text primary key,
  value text,
  label text,
  description text,
  order_id int default 0,
  created_at timestamptz default now()
);

-- Hero
create table if not exists hero (
  id text primary key,
  badge text,
  title text,
  subtitle text,
  cta1_label text,
  cta1_link text,
  cta2_label text,
  cta2_link text,
  created_at timestamptz default now()
);

-- Partenaires
create table if not exists partners (
  id text primary key,
  name text,
  logo text,
  scale numeric default 1,
  created_at timestamptz default now()
);
`.trim();

// ── Helpers ───────────────────────────────────────────────────────────────────
type Log = { table: string; status: "ok" | "error" | "empty"; count?: number; error?: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SB = any;

async function upsert(sb: SB, table: string, rows: Record<string, unknown>[], logs: Log[]) {
  if (!rows || rows.length === 0) {
    logs.push({ table, status: "empty" });
    return;
  }
  const { error } = await sb.from(table).upsert(rows, { onConflict: "id" });
  if (error) {
    logs.push({ table, status: "error", error: error.message });
  } else {
    logs.push({ table, status: "ok", count: rows.length });
  }
}

function slug(s: unknown): string {
  return typeof s === "string" ? s : (s as { current?: string })?.current ?? "";
}

// ── Check tables exist ────────────────────────────────────────────────────────
async function tablesExist(sb: SB): Promise<string[]> {
  const tables = ["posts", "portfolio", "services", "testimonials", "faqs", "steps", "results", "hero", "partners", "authors"];
  const missing: string[] = [];
  await Promise.all(
    tables.map(async (t) => {
      const { error } = await sb.from(t).select("id").limit(1);
      if (error && error.code === "42P01") missing.push(t);
    })
  );
  return missing;
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const sanityProject = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u9vbpezv";
  const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Variables Supabase manquantes" }, { status: 500 });
  }

  const sb = createSupabase(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const sanity = createSanity({
    projectId: sanityProject,
    dataset: sanityDataset,
    useCdn: false,
    apiVersion: "2023-05-03",
  });

  // 1. Vérifier que les tables existent
  const missing = await tablesExist(sb);
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: `Tables manquantes : ${missing.join(", ")}`,
        action: "Colle ce SQL dans Supabase Dashboard → SQL Editor, puis rappelle cette URL.",
        sql: CREATE_TABLES_SQL,
      },
      { status: 424 }
    );
  }

  // 2. Migration
  const logs: Log[] = [];

  // Authors
  const authorsData = await sanity.fetch<{ id: string; name: string; slug?: string; image?: string; bio?: string }[]>(
    `*[_type == "author"] { "id": _id, name, "slug": slug.current, "image": image.asset->url, "bio": array::join(bio[].children[].text, " ") }`
  );
  await upsert(
    sb,
    "authors",
    authorsData.map((a) => ({
      id: a.id,
      name: a.name,
      slug: a.slug || a.name.toLowerCase().replace(/\s+/g, "-"),
      image: a.image,
      bio: a.bio,
    })),
    logs
  );

  // Posts
  const postsData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      "id": _id, title, "slug": slug.current, "mainImage": mainImage.asset->url,
      publishedAt, "categories": categories[]->title,
      "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
      "body": pt::text(body), "authorId": author->_id
    }`
  );
  await upsert(
    sb,
    "posts",
    postsData.map((p) => ({
      id: p.id,
      title: p.title,
      slug: slug(p.slug),
      main_image: p.mainImage,
      published_at: p.publishedAt,
      categories: p.categories || [],
      excerpt: p.excerpt,
      body: p.body,
      author_id: p.authorId || null,
    })),
    logs
  );

  // Portfolio
  const portfolioData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "portfolio"] | order(publishedAt desc) {
      "id": _id, title, "slug": slug.current, category,
      "mainImage": mainImage.asset->url, client, description,
      "publishedAt": publishedAt, "gallery": gallery[].asset->url,
      videoUrl, hasReport, reportUrl, reportLabel
    }`
  );
  await upsert(
    sb,
    "portfolio",
    portfolioData.map((p: Record<string, unknown>) => ({
      id: p.id,
      title: p.title,
      slug: slug(p.slug) || String(p.title ?? "").toLowerCase().replace(/\s+/g, "-"),
      category: p.category || "design",
      main_image: p.mainImage,
      client: p.client,
      description: p.description,
      published_at: p.publishedAt,
      gallery: Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : [],
      video_url: p.videoUrl,
      has_report: p.hasReport || false,
      report_url: p.reportUrl,
      report_label: p.reportLabel,
    })),
    logs
  );

  // Services
  const servicesData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "service"] | order(orderId asc) {
      "id": _id, icon, badge, orderId, title, description, items, cta, link, highlight, color, extra
    }`
  );
  await upsert(
    sb,
    "services",
    servicesData.map((s) => ({
      id: s.id,
      icon: s.icon, badge: s.badge,
      order_id: s.orderId || 0,
      title: s.title, description: s.description,
      items: s.items || [],
      cta: s.cta, link: s.link,
      highlight: s.highlight || false,
      color: s.color, extra: s.extra,
    })),
    logs
  );

  // Testimonials
  const testimonialsData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "testimonial"] {
      "id": _id, name, role, content, "avatar": avatar.asset->url, rating
    }`
  );
  await upsert(
    sb,
    "testimonials",
    testimonialsData.map((t) => ({
      id: t.id, name: t.name, role: t.role,
      content: t.content, avatar: t.avatar,
      rating: t.rating || 5,
    })),
    logs
  );

  // FAQs
  const faqsData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "faq"] | order(orderId asc) { "id": _id, question, answer, orderId }`
  );
  await upsert(
    sb,
    "faqs",
    faqsData.map((f) => ({
      id: f.id, question: f.question, answer: f.answer, order_id: f.orderId || 0,
    })),
    logs
  );

  // Steps
  const stepsData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "step"] | order(orderId asc) {
      "id": _id, orderId, title, subtitle, icon, content, details, deliverable
    }`
  );
  await upsert(
    sb,
    "steps",
    stepsData.map((s) => ({
      id: s.id, order_id: s.orderId || 0,
      title: s.title, subtitle: s.subtitle,
      icon: s.icon, content: s.content,
      details: s.details || [], deliverable: s.deliverable,
    })),
    logs
  );

  // Results
  const resultsData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "result"] | order(orderId asc) { "id": _id, value, label, description, orderId }`
  );
  await upsert(
    sb,
    "results",
    resultsData.map((r) => ({
      id: r.id, value: r.value, label: r.label,
      description: r.description, order_id: r.orderId || 0,
    })),
    logs
  );

  // Hero
  const heroData = await sanity.fetch<Record<string, unknown> | null>(
    `*[_type == "hero"][0] {
      "id": _id, badge, title, subtitle,
      cta1Label, cta1Link, cta2Label, cta2Link
    }`
  );
  if (heroData) {
    await upsert(
      sb,
      "hero",
      [{
        id: heroData.id, badge: heroData.badge, title: heroData.title,
        subtitle: heroData.subtitle,
        cta1_label: heroData.cta1Label, cta1_link: heroData.cta1Link,
        cta2_label: heroData.cta2Label, cta2_link: heroData.cta2Link,
      }],
      logs
    );
  }

  // Partners
  const partnersData = await sanity.fetch<Record<string, unknown>[]>(
    `*[_type == "partner"] { "id": _id, name, "logo": logo.asset->url, scale }`
  );
  await upsert(
    sb,
    "partners",
    partnersData.map((p) => ({
      id: p.id, name: p.name, logo: p.logo, scale: p.scale || 1,
    })),
    logs
  );

  const errors = logs.filter((l) => l.status === "error");
  return NextResponse.json({
    success: errors.length === 0,
    summary: logs,
    ...(errors.length > 0 && { errors }),
  });
}
