"use client";

import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Mission", href: "#mission" },
  { name: "Events & News", href: "#events" },
  { name: "Team", href: "#about-us" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Mission", href: "#mission" },
    { name: "Events & News", href: "#events" },
    { name: "Team", href: "#team" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "py-4 bg-white/80 backdrop-blur-2xl shadow-xl shadow-emerald-950/5 border-b border-emerald-50" : "py-8 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 group-hover:bg-amber-500 transition-all">
            <ShieldCheck size={24} />
          </div>
          <span className="font-outfit font-black text-2xl tracking-tighter text-emerald-950">
            S<span className="text-amber-500">O</span>LVE
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                scrolled ? "text-slate-600 hover:text-emerald-700" : "text-emerald-100 hover:text-amber-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admin/login"
            className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/20 transition-all flex items-center gap-2 group"
          >
            Admin Console
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            scrolled ? "text-emerald-950 hover:bg-emerald-50" : "text-white hover:bg-white/10"
          }`}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-emerald-50 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-4 px-6 rounded-2xl bg-slate-50 text-emerald-950 font-bold text-lg hover:bg-emerald-50 transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="w-full bg-emerald-800 text-white px-6 py-5 rounded-2xl font-bold text-lg flex items-center justify-between group shadow-xl shadow-emerald-900/20"
              >
                Access Admin Console
                <ShieldCheck size={20} />
              </Link>
            </div>
            <div className="bg-emerald-950 p-8 text-center space-y-4">
              <Compass size={40} className="mx-auto text-amber-500 opacity-20 animate-spin-slow" />
              <p className="text-emerald-100/40 text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Identity Hub</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
