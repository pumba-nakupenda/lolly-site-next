"use client";

import { useState } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminEmpty, AdminCard,
  AdminBtn, AdminInput, AdminTextarea, AdminToggle,
  DeleteBtn, EditBtn, Plus, X, Loader2
} from "../AdminUI";
import type { Service } from "@/lib/supabase";

const EMPTY = {
  title: "", icon: "", badge: "", order_id: 0,
  description: "", items: [] as string[], cta: "",
  link: "", highlight: false, color: "", extra: "",
};

export default function ServicesSection() {
  const { items, loading, error, saving, create, update, remove } = useAdminTable<Service>("services");
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isNew, setIsNew] = useState(false);
  const [itemInput, setItemInput] = useState("");

  const sorted = [...items].sort((a, b) => a.order_id - b.order_id);

  const openNew = () => { setForm({ ...EMPTY, order_id: items.length + 1 }); setItemInput(""); setIsNew(true); setEditing(null); };
  const openEdit = (s: Service) => {
    setForm({
      title: s.title, icon: s.icon ?? "", badge: s.badge ?? "",
      order_id: s.order_id, description: s.description ?? "",
      items: s.items ?? [], cta: s.cta ?? "", link: s.link ?? "",
      highlight: s.highlight, color: s.color ?? "", extra: s.extra ?? "",
    });
    setItemInput(""); setEditing(s); setIsNew(false);
  };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const addItem = () => {
    if (itemInput.trim()) {
      setForm({ ...form, items: [...form.items, itemInput.trim()] });
      setItemInput("");
    }
  };

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
        <p className="text-gray-400 text-sm">{items.length} service(s)</p>
        <AdminBtn onClick={openNew}><Plus size={16} /> Nouveau service</AdminBtn>
      </div>

      {(isNew || editing) && (
        <AdminCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">{isNew ? "Nouveau service" : "Modifier"}</h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminInput label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <AdminInput label="Ordre" type="number" value={String(form.order_id)} onChange={(v) => setForm({ ...form, order_id: Number(v) })} />
              <AdminInput label="Icône (emoji ou nom)" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} />
              <AdminInput label="Badge" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} />
              <AdminInput label="CTA (label bouton)" value={form.cta} onChange={(v) => setForm({ ...form, cta: v })} />
              <AdminInput label="Lien" value={form.link} onChange={(v) => setForm({ ...form, link: v })} />
              <AdminInput label="Couleur (hex ou nom)" value={form.color} onChange={(v) => setForm({ ...form, color: v })} />
            </div>
            <AdminTextarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
            <AdminTextarea label="Extra" value={form.extra} onChange={(v) => setForm({ ...form, extra: v })} rows={2} />
            <AdminToggle label="Mis en avant (highlight)" value={form.highlight} onChange={(v) => setForm({ ...form, highlight: v })} />

            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">Items (liste)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={itemInput}
                  onChange={(e) => setItemInput(e.target.value)}
                  placeholder="Ajouter un item..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(); }}}
                />
                <AdminBtn variant="ghost" onClick={addItem}>Ajouter</AdminBtn>
              </div>
              {form.items.length > 0 && (
                <div className="space-y-1">
                  {form.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-gray-300 text-sm">{item}</span>
                      <button type="button" onClick={() => setForm({ ...form, items: form.items.filter((_, j) => j !== i) })} className="text-red-400 text-sm ml-2">×</button>
                    </div>
                  ))}
                </div>
              )}
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

      {items.length === 0 ? <AdminEmpty label="service" /> : (
        <div className="space-y-3">
          {sorted.map((s) => (
            <AdminCard key={s.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {s.icon && <span className="text-xl">{s.icon}</span>}
                    <h3 className="text-white font-semibold">{s.title}</h3>
                    {s.highlight && <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">Highlight</span>}
                    <span className="text-gray-500 text-xs">#{s.order_id}</span>
                  </div>
                  {s.description && <p className="text-gray-400 text-sm mt-1 line-clamp-1">{s.description}</p>}
                </div>
                <div className="flex gap-1">
                  <EditBtn onClick={() => openEdit(s)} />
                  <DeleteBtn onClick={() => remove(s.id)} />
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
