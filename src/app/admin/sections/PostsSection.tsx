"use client";

import { useState } from "react";
import { useAdminTable } from "../useAdminTable";
import {
  AdminLoader, AdminError, AdminEmpty, AdminCard,
  AdminBtn, AdminInput, AdminTextarea,
  DeleteBtn, EditBtn, Plus, X, Loader2
} from "../AdminUI";
import type { Post } from "@/lib/supabase";

const EMPTY: Omit<Post, "id" | "created_at" | "updated_at" | "author_id"> = {
  title: "", slug: "", excerpt: "", body: "",
  main_image: "", published_at: "", categories: [],
};

export default function PostsSection() {
  const { items, loading, error, saveError, setSaveError, saving, create, update, remove } = useAdminTable<Post>("posts");
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setForm({ ...EMPTY }); setIsNew(true); setEditing(null); setSaveError(null); };
  const openEdit = (p: Post) => {
    setForm({
      title: p.title, slug: p.slug,
      excerpt: p.excerpt ?? "", body: p.body ?? "",
      main_image: p.main_image ?? "",
      published_at: p.published_at ? p.published_at.split("T")[0] : "",
      categories: p.categories,
    });
    setEditing(p); setIsNew(false); setSaveError(null);
  };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      published_at: form.published_at ? new Date(form.published_at as string).toISOString() : null,
    };
    let ok: boolean;
    if (isNew) ok = !!(await create(payload));
    else ok = !!(await update(editing!.id, payload));
    if (ok) closeForm();
  };

  if (loading) return <AdminLoader />;
  if (error) return <AdminError message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{items.length} article(s)</p>
        <AdminBtn onClick={openNew} variant="primary"><Plus size={16} /> Nouvel article</AdminBtn>
      </div>

      {(isNew || editing !== null) && (
        <AdminCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">{isNew ? "Nouvel article" : "Modifier l'article"}</h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminInput label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <AdminInput label="Slug (URL)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required placeholder="mon-article" />
            <AdminInput label="Image principale (URL)" value={form.main_image ?? ""} onChange={(v) => setForm({ ...form, main_image: v })} />
            <AdminInput label="Date de publication" type="date" value={form.published_at ?? ""} onChange={(v) => setForm({ ...form, published_at: v })} />
            <AdminTextarea label="Extrait" value={form.excerpt ?? ""} onChange={(v) => setForm({ ...form, excerpt: v })} rows={2} />
            <AdminTextarea label="Contenu (Markdown ou texte)" value={form.body ?? ""} onChange={(v) => setForm({ ...form, body: v })} rows={8} />
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

      {items.length === 0 ? <AdminEmpty label="article" /> : (
        <div className="space-y-3">
          {items.map((post) => (
            <AdminCard key={post.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{post.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    /{post.slug} · {post.published_at ? new Date(post.published_at).toLocaleDateString("fr-FR") : "Non publié"}
                  </p>
                  {post.excerpt && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{post.excerpt}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <EditBtn onClick={() => openEdit(post)} />
                  <DeleteBtn onClick={() => remove(post.id)} />
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
