"use client";

import { useState } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminEmpty, AdminCard,
  AdminBtn, AdminInput,
  DeleteBtn, EditBtn, Plus, X, Loader2
} from "../AdminUI";
import type { Partner } from "@/lib/supabase";

const EMPTY = { name: "", logo: "", scale: 1 };

export default function PartnersSection() {
  const { items, loading, error, saving, create, update, remove } = useAdminTable<Partner>("partners");
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setForm({ ...EMPTY }); setIsNew(true); setEditing(null); };
  const openEdit = (p: Partner) => {
    setForm({ name: p.name, logo: p.logo ?? "", scale: p.scale });
    setEditing(p); setIsNew(false);
  };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) await create(form);
    else if (editing) await update(editing.id, form);
    closeForm();
  };

  if (loading) return <AdminLoader />;
  if (error) return <AdminError message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{items.length} partenaire(s)</p>
        <AdminBtn onClick={openNew}><Plus size={16} /> Nouveau partenaire</AdminBtn>
      </div>

      {(isNew || editing) && (
        <AdminCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">{isNew ? "Nouveau partenaire" : "Modifier"}</h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AdminInput label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <AdminInput label="Logo (URL)" value={form.logo} onChange={(v) => setForm({ ...form, logo: v })} />
              <AdminInput label="Échelle (ex: 1.2)" type="number" value={String(form.scale)} onChange={(v) => setForm({ ...form, scale: Number(v) })} />
            </div>
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

      {items.length === 0 ? <AdminEmpty label="partenaire" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <AdminCard key={p.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {p.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-white/5 p-1" />
                  )}
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{p.name}</p>
                    <p className="text-gray-500 text-xs">scale: {p.scale}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
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
