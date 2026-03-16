"use client";

import { useState } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminEmpty, AdminCard,
  AdminBtn, AdminInput, AdminTextarea, AdminSelect, AdminToggle,
  DeleteBtn, EditBtn, Plus, X, Loader2
} from "../AdminUI";
import type { Portfolio } from "@/lib/supabase";

const CATEGORIES = [
  { value: "consulting", label: "Consulting" },
  { value: "design", label: "Design" },
  { value: "social", label: "Social Media" },
  { value: "content", label: "Contenu" },
  { value: "photo", label: "Photo" },
  { value: "formations", label: "Formations" },
  { value: "video", label: "Vidéo" },
];

const EMPTY = {
  title: "", slug: "", category: "consulting", main_image: "",
  client: "", description: "", published_at: "",
  gallery: [] as string[], video_url: "",
  has_report: false, report_url: "", report_label: "",
};

export default function PortfolioSection() {
  const { items, loading, error, saveError, setSaveError, saving, create, update, remove } = useAdminTable<Portfolio>("portfolio");
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isNew, setIsNew] = useState(false);
  const [galleryInput, setGalleryInput] = useState("");

  const openNew = () => { setForm({ ...EMPTY }); setGalleryInput(""); setIsNew(true); setEditing(null); setSaveError(null); };
  const openEdit = (p: Portfolio) => {
    setForm({
      title: p.title, slug: p.slug, category: p.category,
      main_image: p.main_image ?? "", client: p.client ?? "",
      description: p.description ?? "",
      published_at: p.published_at ? p.published_at.split("T")[0] : "",
      gallery: p.gallery ?? [], video_url: p.video_url ?? "",
      has_report: p.has_report, report_url: p.report_url ?? "",
      report_label: p.report_label ?? "",
    });
    setGalleryInput("");
    setEditing(p);
    setIsNew(false);
    setSaveError(null);
  };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
    };
    let ok: boolean;
    if (isNew) ok = !!(await create(payload));
    else ok = !!(await update(editing!.id, payload));
    if (ok) closeForm();
  };

  const addGalleryUrl = () => {
    if (galleryInput.trim()) {
      setForm({ ...form, gallery: [...form.gallery, galleryInput.trim()] });
      setGalleryInput("");
    }
  };

  if (loading) return <AdminLoader />;
  if (error) return <AdminError message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{items.length} projet(s)</p>
        <AdminBtn onClick={openNew}><Plus size={16} /> Nouveau projet</AdminBtn>
      </div>

      {(isNew || editing) && (
        <AdminCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">{isNew ? "Nouveau projet" : "Modifier le projet"}</h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminInput label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <AdminInput label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required />
              <AdminSelect label="Catégorie" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={CATEGORIES} />
              <AdminInput label="Client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
              <AdminInput label="Image principale (URL)" value={form.main_image} onChange={(v) => setForm({ ...form, main_image: v })} />
              <AdminInput label="Date" type="date" value={form.published_at} onChange={(v) => setForm({ ...form, published_at: v })} />
              <AdminInput label="URL Vidéo" value={form.video_url} onChange={(v) => setForm({ ...form, video_url: v })} />
            </div>
            <AdminTextarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
            <AdminToggle label="A un rapport" value={form.has_report} onChange={(v) => setForm({ ...form, has_report: v })} />
            {form.has_report && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput label="URL Rapport" value={form.report_url} onChange={(v) => setForm({ ...form, report_url: v })} />
                <AdminInput label="Label Rapport" value={form.report_label} onChange={(v) => setForm({ ...form, report_label: v })} />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">Galerie (URLs)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGalleryUrl(); }}}
                />
                <AdminBtn variant="ghost" onClick={addGalleryUrl}>Ajouter</AdminBtn>
              </div>
              {form.gallery.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.gallery.map((url, i) => (
                    <span key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-300">
                      {url.slice(0, 40)}…
                      <button type="button" onClick={() => setForm({ ...form, gallery: form.gallery.filter((_, j) => j !== i) })} className="text-red-400 ml-1">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            {saveError && <AdminError message={saveError} />}
            <div className="flex gap-3 pt-2">
              <AdminBtn type="submit" disabled={saving}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {isNew ? "Créer" : "Enregistrer"}
              </AdminBtn>
              <AdminBtn variant="ghost" onClick={closeForm}>Annuler</AdminBtn>
            </div>
          </form>
        </AdminCard>
      )}

      {items.length === 0 ? <AdminEmpty label="projet" /> : (
        <div className="space-y-3">
          {items.map((p) => (
            <AdminCard key={p.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-semibold">{p.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.category}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{p.client} · /{p.slug}</p>
                </div>
                <div className="flex gap-1">
                  <EditBtn onClick={() => openEdit(p)} />
                  <DeleteBtn onClick={() => remove(p.id)} />
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
