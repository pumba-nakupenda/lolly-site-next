"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Eye, EyeOff, ChevronRight, LogOut,
  FileText, Briefcase, Star, HelpCircle, Zap,
  BarChart2, Image, Home, Menu, X
} from "lucide-react";

import PostsSection from "./sections/PostsSection";
import PortfolioSection from "./sections/PortfolioSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FAQSection from "./sections/FAQSection";
import ServicesSection from "./sections/ServicesSection";
import ResultsSection from "./sections/ResultsSection";
import PartnersSection from "./sections/PartnersSection";
import HeroSection from "./sections/HeroSection";

type Section =
  | "posts"
  | "portfolio"
  | "testimonials"
  | "faqs"
  | "services"
  | "results"
  | "partners"
  | "hero";

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "hero", label: "Hero", icon: Home },
  { id: "posts", label: "Blog", icon: FileText },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "services", label: "Services", icon: Zap },
  { id: "testimonials", label: "Témoignages", icon: Star },
  { id: "faqs", label: "FAQ", icon: HelpCircle },
  { id: "results", label: "Résultats", icon: BarChart2 },
  { id: "partners", label: "Partenaires", icon: Image },
];

// First 5 items shown in bottom bar on mobile, rest in drawer
const BOTTOM_NAV = NAV_ITEMS.slice(0, 5);

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("posts");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const correctPassword =
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "lolly2024";

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    setIsAuthenticated(auth === "true");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    setTimeout(() => {
      if (password === correctPassword) {
        sessionStorage.setItem("admin-auth", "true");
        setIsAuthenticated(true);
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 600);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const navigate = (id: Section) => {
    setActiveSection(id);
    setSidebarOpen(false);
    setMoreOpen(false);
  };

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md z-10"
        >
          <div className="bg-surface/30 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-white to-accent opacity-50" />

            <div className="flex flex-col items-center mb-10">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 border border-primary/30"
              >
                <Lock className="text-primary" size={32} />
              </motion.div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                LOLLY Admin
              </h1>
              <p className="text-gray-400 text-sm text-center">
                Espace sécurisé — Accès restreint
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    className={`w-full bg-black/40 border ${
                      error
                        ? "border-red-500/50 ring-2 ring-red-500/10"
                        : "border-white/10 focus:border-primary/50"
                    } rounded-2xl px-6 py-5 text-white focus:outline-none transition-all pr-14 text-lg`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-[10px] font-bold uppercase tracking-wider mt-2 ml-1"
                    >
                      Mot de passe incorrect
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 bg-primary hover:bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Accéder à l&apos;admin
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                © 2026 LOLLY AGENCY
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const ActiveSection = {
    posts: PostsSection,
    portfolio: PortfolioSection,
    testimonials: TestimonialsSection,
    faqs: FAQSection,
    services: ServicesSection,
    results: ResultsSection,
    partners: PartnersSection,
    hero: HeroSection,
  }[activeSection];

  const currentLabel = NAV_ITEMS.find((i) => i.id === activeSection)?.label ?? "";

  return (
    <div className="min-h-screen bg-black flex">

      {/* ── Desktop sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Desktop sidebar ── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0a0a0a] border-r border-white/5 flex-col transition-transform duration-300 hidden lg:flex`}
      >
        <div className="p-6 border-b border-white/5">
          <h1 className="text-white font-bold text-lg tracking-tight">LOLLY Admin</h1>
          <p className="text-gray-500 text-xs mt-0.5">Tableau de bord</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Mobile drawer (all sections) ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col lg:hidden"
            >
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h1 className="text-white font-bold text-base">LOLLY Admin</h1>
                  <p className="text-gray-500 text-xs">Tableau de bord</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 p-2">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-14 lg:h-16 border-b border-white/5 flex items-center px-4 lg:px-6 gap-3 sticky top-0 bg-black z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <Menu size={22} />
          </button>
          <h2 className="text-white font-semibold text-base lg:text-lg flex-1 truncate">
            {currentLabel}
          </h2>
          <button
            onClick={handleLogout}
            className="lg:hidden text-gray-500 hover:text-red-400 p-1 transition-colors"
            title="Déconnexion"
          >
            <LogOut size={18} />
          </button>
        </header>

        {/* Content — add bottom padding on mobile for bottom nav */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-24 lg:pb-6">
          <ActiveSection />
        </div>
      </main>

      {/* ── Mobile bottom navigation bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 flex lg:hidden z-30 safe-bottom">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all ${
                isActive ? "text-primary" : "text-gray-500"
              }`}
            >
              <Icon size={20} />
              <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">
                {item.label.slice(0, 6)}
              </span>
            </button>
          );
        })}
        {/* "Plus" button to open drawer for remaining sections */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-gray-500"
        >
          <Menu size={20} />
          <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">Plus</span>
        </button>
      </nav>
    </div>
  );
}
