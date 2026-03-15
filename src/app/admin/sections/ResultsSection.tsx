"use client";

import { useState } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminEmpty, AdminCard,
  AdminBtn, AdminInput, AdminTextarea,
  DeleteBtn, EditBtn, Plus, X, Loader2
} from "../AdminUI";
import type { Result } from "@/lib/supabase";

const EMPTY = { value: "", label: "", description: "", order_id: 0 };

export default function ResultsSection() {
  const { items, loading, error, saving, create, update, remove } = useAdminTable<Result>("results");
  const [editing, setEditing] = useState<Result | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isNew, setIsNew] = useState(false);

  const sorted = [...items].sort((a, b) => a.order_id - b.order_id);

  const openNew = () => { setForm({ ...EMPTY, order_id: items.length + 1 }); setIsNew(true); setEditing(null); };
  const openEdit = (r: Result) => {
    setForm({ value: r.value, label: r.label, description: r.description ?? "", order_id: r.order_id });
    setEditing(r); setIsNew(false);
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
        <p className="text-gray-400 text-sm">{items.length} résultat(s)</p>
        <AdminBtn onClick={openNew}><Plus size={16} /> Nouveau résultat</AdminBtn>
      </div>

      {(isNew || editing) && (
        <AdminCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">{isNew ? "Nouveau résultat" : "Modifier"}</h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AdminInput label="Valeur (ex: 200+)" value={form.value} onChange={(v) => setForm({ ...form, value: v })} required />
              <AdminInput label="Label (ex: Clients)" value={form.label} onChange={(v) => setForm({ ...form, label: v })} required />
              <AdminInput label="Ordre" type="number" value={String(form.order_id)} onChange={(v) => setForm({ ...form, order_id: Number(v) })} />
            </div>
            <AdminTextarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} />
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

      {items.length === 0 ? <AdminEmpty label="résultat" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((r) => (
            <AdminCard key={r.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-primary font-black text-2xl">{r.value}</p>
                  <p className="text-white font-semibold text-sm">{r.label}</p>
                  {r.description && <p className="text-gray-500 text-xs mt-1">{r.description}</p>}
                </div>
                <div className="flex gap-1">
                  <EditBtn onClick={() => openEdit(r)} />
                  <DeleteBtn onClick={() => remove(r.id)} />
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
