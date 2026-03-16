"use client";

import { useState } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminEmpty, AdminCard,
  AdminBtn, AdminInput, AdminTextarea,
  DeleteBtn, EditBtn, Plus, X, Loader2
} from "../AdminUI";
import type { FAQ } from "@/lib/supabase";

const EMPTY = { question: "", answer: "", order_id: 0 };

export default function FAQSection() {
  const { items, loading, error, saveError, setSaveError, saving, create, update, remove } = useAdminTable<FAQ>("faqs");
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isNew, setIsNew] = useState(false);

  const sorted = [...items].sort((a, b) => a.order_id - b.order_id);

  const openNew = () => { setForm({ ...EMPTY, order_id: items.length + 1 }); setIsNew(true); setEditing(null); setSaveError(null); };
  const openEdit = (f: FAQ) => {
    setForm({ question: f.question, answer: f.answer, order_id: f.order_id });
    setEditing(f); setIsNew(false); setSaveError(null);
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
        <p className="text-gray-400 text-sm">{items.length} question(s)</p>
        <AdminBtn onClick={openNew}><Plus size={16} /> Nouvelle question</AdminBtn>
      </div>

      {(isNew || editing) && (
        <AdminCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">{isNew ? "Nouvelle question" : "Modifier"}</h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminInput label="Ordre" type="number" value={String(form.order_id)} onChange={(v) => setForm({ ...form, order_id: Number(v) })} />
            <AdminInput label="Question" value={form.question} onChange={(v) => setForm({ ...form, question: v })} required />
            <AdminTextarea label="Réponse" value={form.answer} onChange={(v) => setForm({ ...form, answer: v })} required rows={4} />
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

      {items.length === 0 ? <AdminEmpty label="question FAQ" /> : (
        <div className="space-y-3">
          {sorted.map((f) => (
            <AdminCard key={f.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-mono w-6">#{f.order_id}</span>
                    <h3 className="text-white font-semibold">{f.question}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex gap-1">
                  <EditBtn onClick={() => openEdit(f)} />
                  <DeleteBtn onClick={() => remove(f.id)} />
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
