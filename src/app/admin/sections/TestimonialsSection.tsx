"use client";

import { useState } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminEmpty, AdminCard,
  AdminBtn, AdminInput, AdminTextarea, AdminSelect,
  DeleteBtn, EditBtn, Plus, X, Loader2
} from "../AdminUI";
import type { Testimonial } from "@/lib/supabase";

const RATINGS = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: "⭐".repeat(n) }));
const EMPTY = { name: "", role: "", content: "", avatar: "", rating: 5 };

export default function TestimonialsSection() {
  const { items, loading, error, saveError, setSaveError, saving, create, update, remove } = useAdminTable<Testimonial>("testimonials");
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setForm({ ...EMPTY }); setIsNew(true); setEditing(null); setSaveError(null); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, role: t.role ?? "", content: t.content, avatar: t.avatar ?? "", rating: t.rating });
    setEditing(t); setIsNew(false); setSaveError(null);
  };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let ok: boolean;
    if (isNew) ok = !!(await create(form));
    else ok = !!(await update(editing!.id, form));
    if (ok) closeForm();
  };

  if (loading) return <AdminLoader />;
  if (error) return <AdminError message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{items.length} témoignage(s)</p>
        <AdminBtn onClick={openNew}><Plus size={16} /> Nouveau témoignage</AdminBtn>
      </div>

      {(isNew || editing) && (
        <AdminCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">{isNew ? "Nouveau témoignage" : "Modifier"}</h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminInput label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <AdminInput label="Rôle / Poste" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
              <AdminInput label="Avatar (URL)" value={form.avatar} onChange={(v) => setForm({ ...form, avatar: v })} />
              <AdminSelect label="Note" value={String(form.rating)} onChange={(v) => setForm({ ...form, rating: Number(v) })} options={RATINGS} />
            </div>
            <AdminTextarea label="Témoignage" value={form.content} onChange={(v) => setForm({ ...form, content: v })} required rows={3} />
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

      {items.length === 0 ? <AdminEmpty label="témoignage" /> : (
        <div className="space-y-3">
          {items.map((t) => (
            <AdminCard key={t.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{t.name}</span>
                    <span className="text-yellow-400 text-xs">{"⭐".repeat(t.rating)}</span>
                  </div>
                  {t.role && <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>}
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">"{t.content}"</p>
                </div>
                <div className="flex gap-1">
                  <EditBtn onClick={() => openEdit(t)} />
                  <DeleteBtn onClick={() => remove(t.id)} />
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
