/**
 * Migration script: Sanity → Supabase
 *
 * Usage:
 *   node scripts/migrate-sanity-to-supabase.mjs
 *
 * Requires these env vars (in .env.local or exported in shell):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   NEXT_PUBLIC_SANITY_PROJECT_ID   (or hardcode below)
 *   NEXT_PUBLIC_SANITY_DATASET
 */

import { createClient as createSanity } from "@sanity/client";
import { createClient as createSupabase } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local manually ──────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
try {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
} catch {
  console.log("No .env.local found, using existing env vars");
}

// ── Clients ───────────────────────────────────────────────────────────────────
const sanity = createSanity({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u9vbpezv",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2023-05-03",
});

const supabase = createSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ── Helpers ───────────────────────────────────────────────────────────────────
async function upsert(table, rows) {
  if (!rows || rows.length === 0) {
    console.log(`  ⚠ Aucune donnée pour ${table}`);
    return;
  }
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
  if (error) console.error(`  ✗ ${table}:`, error.message);
  else console.log(`  ✓ ${table}: ${rows.length} ligne(s) importée(s)`);
}

function slug(s) {
  return typeof s === "string" ? s : s?.current ?? "";
}

// ── Migration functions ───────────────────────────────────────────────────────

async function migrateAuthors() {
  console.log("\n📝 Authors...");
  const data = await sanity.fetch(`*[_type == "author"] {
    "id": _id, name,
    "slug": slug.current,
    "image": image.asset->url,
    "bio": array::join(bio[].children[].text, " ")
  }`);
  await upsert("authors", data.map((a) => ({
    id: a.id, name: a.name, slug: a.slug || a.name.toLowerCase().replace(/\s+/g, "-"),
    image: a.image, bio: a.bio,
  })));
  return data;
}

async function migratePosts(authors) {
  console.log("\n📰 Posts...");
  const data = await sanity.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "id": _id, title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    publishedAt,
    "categories": categories[]->title,
    "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
    "body": pt::text(body),
    "authorId": author->_id
  }`);
  await upsert("posts", data.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    main_image: p.mainImage,
    published_at: p.publishedAt,
    categories: p.categories || [],
    excerpt: p.excerpt,
    body: p.body,
    author_id: p.authorId || null,
  })));
}

async function migratePortfolio() {
  console.log("\n🎨 Portfolio...");
  const data = await sanity.fetch(`*[_type == "portfolio"] | order(publishedAt desc) {
    "id": _id, title,
    "slug": slug.current,
    category,
    "mainImage": mainImage.asset->url,
    client, description,
    "publishedAt": publishedAt,
    "gallery": gallery[].asset->url,
    videoUrl, hasReport, reportUrl, reportLabel
  }`);
  await upsert("portfolio", data.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug || p.title.toLowerCase().replace(/\s+/g, "-"),
    category: p.category || "design",
    main_image: p.mainImage,
    client: p.client,
    description: p.description,
    published_at: p.publishedAt,
    gallery: p.gallery?.filter(Boolean) || [],
    video_url: p.videoUrl,
    has_report: p.hasReport || false,
    report_url: p.reportUrl,
    report_label: p.reportLabel,
  })));
}

async function migrateServices() {
  console.log("\n⚡ Services...");
  const data = await sanity.fetch(`*[_type == "service"] | order(orderId asc) {
    "id": _id, icon, badge, orderId, title, description, items, cta, link, highlight, color, extra
  }`);
  await upsert("services", data.map((s) => ({
    id: s.id,
    icon: s.icon, badge: s.badge,
    order_id: s.orderId || 0,
    title: s.title,
    description: s.description,
    items: s.items || [],
    cta: s.cta, link: s.link,
    highlight: s.highlight || false,
    color: s.color, extra: s.extra,
  })));
}

async function migrateTestimonials() {
  console.log("\n⭐ Témoignages...");
  const data = await sanity.fetch(`*[_type == "testimonial"] {
    "id": _id, name, role, content,
    "avatar": avatar.asset->url,
    rating
  }`);
  await upsert("testimonials", data.map((t) => ({
    id: t.id, name: t.name, role: t.role,
    content: t.content, avatar: t.avatar,
    rating: t.rating || 5,
  })));
}

async function migrateFAQs() {
  console.log("\n❓ FAQs...");
  const data = await sanity.fetch(`*[_type == "faq"] | order(orderId asc) {
    "id": _id, question, answer, orderId
  }`);
  await upsert("faqs", data.map((f) => ({
    id: f.id, question: f.question, answer: f.answer,
    order_id: f.orderId || 0,
  })));
}

async function migrateSteps() {
  console.log("\n🔢 Steps...");
  const data = await sanity.fetch(`*[_type == "step"] | order(orderId asc) {
    "id": _id, orderId, title, subtitle, icon, content, details, deliverable
  }`);
  await upsert("steps", data.map((s) => ({
    id: s.id, order_id: s.orderId || 0,
    title: s.title, subtitle: s.subtitle,
    icon: s.icon, content: s.content,
    details: s.details || [], deliverable: s.deliverable,
  })));
}

async function migrateResults() {
  console.log("\n📊 Résultats...");
  const data = await sanity.fetch(`*[_type == "result"] | order(orderId asc) {
    "id": _id, value, label, description, orderId
  }`);
  await upsert("results", data.map((r) => ({
    id: r.id, value: r.value, label: r.label,
    description: r.description, order_id: r.orderId || 0,
  })));
}

async function migrateHero() {
  console.log("\n🏠 Hero...");
  const data = await sanity.fetch(`*[_type == "hero"][0] {
    "id": _id, badge, title, subtitle,
    cta1Label, cta1Link, cta2Label, cta2Link
  }`);
  if (!data) { console.log("  ⚠ Aucun hero trouvé"); return; }
  await upsert("hero", [{
    id: data.id, badge: data.badge, title: data.title,
    subtitle: data.subtitle,
    cta1_label: data.cta1Label, cta1_link: data.cta1Link,
    cta2_label: data.cta2Label, cta2_link: data.cta2Link,
  }]);
}

async function migratePartners() {
  console.log("\n🤝 Partenaires...");
  const data = await sanity.fetch(`*[_type == "partner"] {
    "id": _id, name,
    "logo": logo.asset->url,
    scale
  }`);
  await upsert("partners", data.map((p) => ({
    id: p.id, name: p.name, logo: p.logo, scale: p.scale || 1,
  })));
}

// ── Run all ───────────────────────────────────────────────────────────────────
console.log("🚀 Migration Sanity → Supabase\n");
console.log(`   Supabase: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
console.log(`   Sanity:   ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u9vbpezv"}\n`);

const authors = await migrateAuthors();
await migratePosts(authors);
await migratePortfolio();
await migrateServices();
await migrateTestimonials();
await migrateFAQs();
await migrateSteps();
await migrateResults();
await migrateHero();
await migratePartners();

console.log("\n✅ Migration terminée !\n");
