"use client";

import { useState, useEffect } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminCard,
  AdminBtn, AdminInput, AdminTextarea,
  Loader2
} from "../AdminUI";
import type { Hero } from "@/lib/supabase";

const EMPTY = {
  badge: "", title: "", subtitle: "",
  cta1_label: "", cta1_link: "",
  cta2_label: "", cta2_link: "",
};

export default function HeroSection() {
  const { items, loading, error, saving, create, update } = useAdminTable<Hero>("hero");
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [saved, setSaved] = useState(false);

  const hero = items[0] ?? null;

  useEffect(() => {
    if (hero) {
      setForm({
        badge: hero.badge ?? "",
        title: hero.title ?? "",
        subtitle: hero.subtitle ?? "",
        cta1_label: hero.cta1_label ?? "",
        cta1_link: hero.cta1_link ?? "",
        cta2_label: hero.cta2_label ?? "",
        cta2_link: hero.cta2_link ?? "",
      });
    }
  }, [hero]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hero) await update(hero.id, form);
    else await create(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <AdminLoader />;
  if (error) return <AdminError message={error} />;

  return (
    <div className="space-y-6">
      <p className="text-gray-400 text-sm">
        Section hero de la page d'accueil — une seule configuration
      </p>

      <AdminCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AdminInput label="Badge (ex: Agence #1 au Sénégal)" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} />
          <AdminInput label="Titre principal" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <AdminTextarea label="Sous-titre" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} rows={3} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput label="CTA 1 — Label" value={form.cta1_label} onChange={(v) => setForm({ ...form, cta1_label: v })} placeholder="Découvrir nos services" />
            <AdminInput label="CTA 1 — Lien" value={form.cta1_link} onChange={(v) => setForm({ ...form, cta1_link: v })} placeholder="/services" />
            <AdminInput label="CTA 2 — Label" value={form.cta2_label} onChange={(v) => setForm({ ...form, cta2_label: v })} placeholder="Nous contacter" />
            <AdminInput label="CTA 2 — Lien" value={form.cta2_link} onChange={(v) => setForm({ ...form, cta2_link: v })} placeholder="/contact" />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <AdminBtn type="submit" disabled={saving}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              Enregistrer
            </AdminBtn>
            {saved && (
              <span className="text-green-400 text-sm font-semibold">✓ Sauvegardé !</span>
            )}
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
