"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight,
  FileText
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  // Skip layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    // In a real app, you might redirect here, but for development we'll allow seeing the shell if needed
    // or just show a simplified "unauthorized" view.
    // For now, let's just let it render or redirect to login.
    window.location.href = "/admin/login";
    return null;
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Site Content", icon: LayoutDashboard, href: "/admin/settings" },
    { name: "News & Events", icon: Newspaper, href: "/admin/content" },
    { name: "Team Directory", icon: Users, href: "/admin/team" },
    { name: "Institutional Resources", icon: FileText, href: "/admin/resources" },
    { name: "Media Gallery", icon: ImageIcon, href: "/admin/gallery" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Responsive Design */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[70] bg-emerald-950 text-white transition-all duration-300 flex flex-col
          lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
          ${sidebarOpen ? "lg:w-72" : "lg:w-20"}
        `}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5 bg-emerald-900/20">
          <div className={`flex items-center gap-3 ${(!sidebarOpen && !isMobileMenuOpen) && "lg:hidden"}`}>
            <img 
              src="/up-seal.png" 
              alt="UP Seal" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-outfit font-black tracking-tight text-xl uppercase">SOLVE</span>
          </div>
          <button 
            onClick={() => {
              if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
              else setSidebarOpen(!sidebarOpen);
            }}
            className="hover:bg-white/10 p-2 rounded-lg transition-colors text-emerald-100"
          >
            {sidebarOpen || isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => window.innerWidth < 1024 && setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-900/40" 
                    : "hover:bg-white/5 text-emerald-100/60 hover:text-white"
                }`}
              >
                <item.icon size={22} className={isActive ? "text-white" : "group-hover:text-amber-400"} />
                <span className={`font-medium text-sm transition-all duration-300 ${(!sidebarOpen && !isMobileMenuOpen) ? "lg:hidden opacity-0" : "opacity-100"}`}>
                  {item.name}
                </span>
                {(sidebarOpen || isMobileMenuOpen) && isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-emerald-100/40 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut size={22} />
            <span className={`font-medium text-sm transition-all duration-300 ${(!sidebarOpen && !isMobileMenuOpen) ? "lg:hidden opacity-0" : "opacity-100"}`}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-slate-800 font-outfit truncate max-w-[150px] md:max-w-none">
                {menuItems.find(i => i.href === pathname)?.name || "Admin Console"}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-700">{session?.user?.email?.split('@')[0]}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
              {session?.user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
