"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight, FileText, ArrowLeft, Printer, Share2, Compass, Award, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  { id: "preamble", title: "Institutional Preamble", icon: <Compass size={18} /> },
  { id: "pillars", title: "Core Pillars", icon: <Award size={18} /> },
  { id: "conduct", title: "Code of Conduct", icon: <Shield size={18} /> },
  { id: "accountability", title: "Accountability", icon: <ShieldCheck size={18} /> },
];

export default function ValuesPolicyPage() {
  const [activeSection, setActiveSection] = useState("preamble");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-outfit">
      {/* Policy Header */}
      <header className="bg-emerald-950 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square border border-white rounded-full animate-spin-slow opacity-20" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-300 font-bold hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to SOLVE Hub
          </Link>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} /> Official Institutional Policy
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              Strengthening Organizational Leadership, <br />
              <span className="text-amber-500 font-outfit italic">Values and Ethics</span>
            </h1>
            <p className="text-emerald-100/60 max-w-2xl text-lg font-light leading-relaxed">
              The foundational framework governing the ethical standards and leadership 
              principles of the University of the Philippines System under the SOLVE initiative.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/10 transition-all flex items-center gap-2 text-sm font-bold">
              <Printer size={18} /> Print Document
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/10 transition-all flex items-center gap-2 text-sm font-bold">
              <Share2 size={18} /> Share Policy
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-4">Policy Contents</p>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeSection === section.id 
                    ? "bg-white text-emerald-700 shadow-xl shadow-emerald-950/5 border border-emerald-50" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    {section.title}
                  </div>
                  {activeSection === section.id && <ChevronRight size={14} />}
                </button>
              ))}

              <div className="mt-12 p-8 bg-emerald-900 rounded-[2rem] text-white space-y-4 shadow-2xl shadow-emerald-950/20">
                <FileText size={32} className="text-amber-500" />
                <h4 className="font-bold">Need a PDF?</h4>
                <p className="text-xs text-emerald-100/60 leading-relaxed">Download the official signed version of the SOLVE Values Policy for your records.</p>
                <button className="w-full bg-white text-emerald-900 py-3 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors">
                  Download PDF (2.4 MB)
                </button>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <article className="lg:col-span-3 space-y-24">
            {/* Preamble */}
            <section id="preamble" className="scroll-mt-32 space-y-8">
              <h2 className="text-3xl font-black text-slate-900 font-outfit">1. Institutional Preamble</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-emerald-700 first-letter:mr-3 first-letter:float-left">
                  The University of the Philippines, as the national university, is committed to the pursuit 
                  of truth and the promotion of honor and excellence. The SOLVE (Strengthening Organizational 
                  Leadership, Values and Ethics) policy serves as the definitive guideline for institutional 
                  integrity, fostering a culture of accountability and public service across all campuses.
                </p>
                <p className="text-slate-500 text-lg leading-relaxed pt-4">
                  This framework is designed to empower employees to act as Values Champions, 
                  ensuring that every administrative action and academic endeavor is aligned with the 
                  highest ethical standards.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                  <h4 className="font-bold text-emerald-800 mb-2">Vision</h4>
                  <p className="text-sm text-slate-500 leading-relaxed italic">"To be the national benchmark for ethical leadership and organizational integrity in public service."</p>
                </div>
                <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                  <h4 className="font-bold text-amber-600 mb-2">Mission</h4>
                  <p className="text-sm text-slate-500 leading-relaxed italic">"Cultivating a community of leaders who champion values and ethics in service of the UP System."</p>
                </div>
              </div>
            </section>

            {/* Pillars */}
            <section id="pillars" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 font-outfit">2. The Core Pillars</h2>
                <p className="text-slate-400 text-lg">The three strategic foundations of the SOLVE framework.</p>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Honor and Integrity", desc: "Consistency in values, principles, and actions regardless of external pressure.", detail: "Every UP employee is a steward of the university's reputation. We act with transparency and uncompromising honesty." },
                  { title: "Service Excellence", desc: "Commitment to the highest quality of service to the university and the public.", detail: "Excellence is not an act, but a habit. We continuously refine our administrative processes to better serve our stakeholders." },
                  { title: "Collaborative Leadership", desc: "Fostering an environment of shared growth and mutual respect.", detail: "Leadership is a collective responsibility. We empower our colleagues and constitents to lead with empathy and purpose." }
                ].map((pillar, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <span className="text-2xl font-black">0{i+1}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900">{pillar.title}</h3>
                      <p className="text-emerald-700/60 font-bold text-xs uppercase tracking-widest">{pillar.desc}</p>
                      <p className="text-slate-500 leading-relaxed pt-2">{pillar.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Code of Conduct */}
            <section id="conduct" className="scroll-mt-32 space-y-8">
              <h2 className="text-3xl font-black text-slate-900 font-outfit">3. Code of Conduct</h2>
              <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white space-y-10 relative overflow-hidden">
                <ShieldCheck className="absolute top-10 right-10 text-white/5" size={120} />
                <div className="space-y-4 relative z-10">
                  <p className="text-amber-500 font-bold uppercase tracking-widest text-xs">Standard of Ethics</p>
                  <h3 className="text-4xl font-bold tracking-tight">The Values Champion Oath</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-4">
                    <p className="text-emerald-100/60 leading-relaxed">
                      All employees under the SOLVE initiative commit to a rigorous standard of professional conduct, 
                      ensuring that personal interests never supersede the institutional welfare of the University of the Philippines.
                    </p>
                    <ul className="space-y-4 text-sm font-medium">
                      <li className="flex gap-3"><Shield className="text-amber-500 shrink-0" size={18} /> Zero tolerance for unethical behavior.</li>
                      <li className="flex gap-3"><Shield className="text-amber-500 shrink-0" size={18} /> Transparent disclosure of conflicts.</li>
                      <li className="flex gap-3"><Shield className="text-amber-500 shrink-0" size={18} /> Proactive reporting of value violations.</li>
                    </ul>
                  </div>
                  <div className="aspect-square bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center p-8">
                    <p className="text-center italic text-lg text-emerald-100/80">
                      "I solemnly swear to uphold the honor and excellence of the University, 
                      to lead with integrity, and to serve as a champion of our shared values."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Accountability */}
            <section id="accountability" className="scroll-mt-32 space-y-8">
              <h2 className="text-3xl font-black text-slate-900 font-outfit">4. Accountability Framework</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  Accountability is the bedrock of the SOLVE framework. This section outlines the mechanisms for 
                  monitoring, reporting, and reinforcing ethical standards within the institution.
                </p>
                <div className="p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-start gap-6">
                  <div className="p-3 bg-white text-emerald-700 rounded-xl shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900">Governance Oversight</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      The Office of the Vice President for Administration (OVPA) serves as the primary governing body 
                      for the SOLVE initiative, ensuring consistent application of these values across all campuses.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-20 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center grayscale opacity-50">
                    <img src="/up-seal.png" alt="Seal" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Institutional Revision</p>
                    <p className="text-sm font-bold text-slate-900">Version 2.4 | April 2026</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 text-center md:text-right max-w-xs">
                  This document is a living framework and may be updated periodically to reflect 
                  evolving institutional standards and legal requirements.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-emerald-950 rounded-[4rem] p-12 md:p-20 text-center space-y-8 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/10 -skew-x-12 translate-x-20" />
          <h2 className="text-3xl md:text-5xl font-outfit font-black text-white relative z-10">
            Ready to lead with <span className="text-amber-500 italic">Integrity?</span>
          </h2>
          <p className="text-emerald-100/60 text-lg max-w-2xl mx-auto leading-relaxed relative z-10">
            Join the community of Values Champions and help strengthen the ethical foundation of our national university.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 relative z-10">
            <Link href="/" className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-5 px-12 rounded-2xl transition-all shadow-xl shadow-amber-900/40">
              Apply to be a Values Champion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
