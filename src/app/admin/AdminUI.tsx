"use client";

import { Loader2, Trash2, Pencil, Plus, X, Check, AlertCircle } from "lucide-react";

export function AdminLoader() {
  return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="text-primary animate-spin" size={32} />
    </div>
  );
}

export function AdminError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400">
      <AlertCircle size={20} />
      <span className="text-sm">{message}</span>
    </div>
  );
}

export function AdminEmpty({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-gray-500 gap-2">
      <span className="text-4xl">📭</span>
      <p className="text-sm">Aucun {label} pour l'instant</p>
    </div>
  );
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      {children}
    </div>
  );
}

export function AdminBtn({
  onClick,
  children,
  variant = "primary",
  disabled,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-black hover:bg-white",
    ghost: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export function AdminInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-black/40 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all placeholder-gray-600"
      />
    </div>
  );
}

export function AdminTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full bg-black/40 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all placeholder-gray-600 resize-y"
      />
    </div>
  );
}

export function AdminSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-black">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function AdminToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
        {label}
      </label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-all relative ${value ? "bg-primary" : "bg-white/10"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-black rounded-full transition-all shadow ${value ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
    >
      <Trash2 size={16} />
    </button>
  );
}

export function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-all"
    >
      <Pencil size={16} />
    </button>
  );
}

export { Plus, X, Check, Loader2 };
