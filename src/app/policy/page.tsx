"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight, FileText, ArrowLeft, Printer, Share2, Compass, Award, Shield, CheckCircle2, MessageSquare, PhoneCall, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  { id: "overview", title: "Coverage & Basis", icon: <Shield size={18} /> },
  { id: "honor", title: "Honor & Behaviors", icon: <Award size={18} /> },
  { id: "excellence", title: "Excellence & Growth", icon: <ShieldCheck size={18} /> },
  { id: "monitoring", title: "Monitoring & Strategy", icon: <Compass size={18} /> },
];

export default function ValuesPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

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
      <header className="bg-emerald-950 text-white py-24 px-6 relative overflow-hidden">
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
              <ShieldCheck size={14} /> Institutional Governance
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase">
              KALINANGÁN
            </h1>
            <p className="text-emerald-100/80 max-w-2xl text-xl font-light leading-relaxed">
              A Guide for OVPA Personnel to Embody, Practice, and Cultivate UP’s Core Values of Honor, Excellence, and Service.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/10 transition-all flex items-center gap-2 text-sm font-bold backdrop-blur-md">
              <Printer size={18} /> Print Guide
            </button>
            <div className="flex items-center gap-3 px-6 py-3 bg-emerald-900/50 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest text-emerald-200">
              <Clock size={14} /> Effective April 2026
            </div>
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
                  <div className="flex items-center gap-3 text-sm">
                    {section.icon}
                    {section.title}
                  </div>
                  {activeSection === section.id && <ChevronRight size={14} />}
                </button>
              ))}

              <div className="mt-12 p-8 bg-emerald-900 rounded-[2rem] text-white space-y-4 shadow-2xl shadow-emerald-950/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
                <FileText size={32} className="text-amber-500 relative z-10" />
                <h4 className="font-bold relative z-10">Personnel Copy</h4>
                <p className="text-xs text-emerald-100/60 leading-relaxed relative z-10">Download the full Kalinangán PDF to keep at your workstation.</p>
                <button className="w-full bg-white text-emerald-900 py-3 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors relative z-10">
                  Download PDF
                </button>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <article className="lg:col-span-3 space-y-24">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tight">1. Coverage & Basis</h2>
                <div className="w-20 h-1.5 bg-amber-500 rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="font-bold text-slate-800">Coverage</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    This guide applies to all officials, employees, and contract workers (COS/JO) 
                    of the University of the Philippines Office of the Vice President for Administration (UP OVPA).
                  </p>
                </div>
                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <h3 className="font-bold text-slate-800">Legal Basis</h3>
                  <ul className="text-sm text-slate-500 space-y-2">
                    <li className="flex gap-2 font-medium">
                      <span className="text-amber-600">•</span> RA No. 6713 (Public Ethics)
                    </li>
                    <li className="flex gap-2 font-medium">
                      <span className="text-amber-600">•</span> RA No. 9500 (UP Charter 2008)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h4 className="text-xl font-bold text-slate-800">Background and Rationale</h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  The University of the Philippines emphasizes Honor and Excellence in its services. 
                  This guide aims to help UP OVPA officials, employees, and contract workers uphold 
                  these values in their daily work. This bottom-up initiative draws on the ideas and 
                  experiences of individuals in public service, serving as a practical tool for 
                  achieving these ideals.
                </p>
              </div>
            </section>

            {/* Honor */}
            <section id="honor" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tight">2. Honor and Behavioral Indicators</h2>
                <p className="text-slate-500 text-lg">UP OVPA personnel shall demonstrate honor by being empathic, trustworthy, respectful, professional, and honest.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-emerald-950 text-white rounded-[2.5rem] md:col-span-2 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-emerald-900/20">
                  <div className="w-20 h-20 bg-emerald-900 rounded-3xl flex items-center justify-center shrink-0 border border-white/10">
                    <MessageSquare size={32} className="text-amber-500" />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold tracking-tight">The Institutional Greeting</h3>
                    <p className="text-emerald-100/60 leading-relaxed">
                      Welcome and greet clients and other staff who enter the office with a smile, saying:
                    </p>
                    <p className="text-2xl font-black text-amber-500 font-outfit italic">“Happy Morning/Afternoon!”</p>
                  </div>
                </div>

                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-4 border-l-4 border-l-emerald-600">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <PhoneCall size={20} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Phone Protocol</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Answer phone calls on or before the <span className="font-bold text-emerald-700">second ring</span>. 
                    Greet cheerfully: <span className="italic font-medium">“Happy Morning/Afternoon, OVPA, how may I help you?”</span>
                  </p>
                </div>

                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-4 border-l-4 border-l-amber-500">
                  <div className="flex items-center gap-3 text-amber-600">
                    <Clock size={20} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Time Management</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Follow agreed working hours. Be punctual, meet deadlines, and prioritize tasks. 
                    Log in/out using biometrics and maintain accurate DTR records.
                  </p>
                </div>

                <div className="p-8 bg-slate-50 rounded-[2.5rem] md:col-span-2 space-y-6">
                  <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs px-2">Professional Standards</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Observe appropriate office attire (CSC MC No. 19)",
                      "Maintain 100% smoke-free environment",
                      "Immediately report errors/negligence to supervisors",
                      "Inform supervisor of all out-of-station trips",
                      "Stay calm when dealing with angry clients",
                      "Engage in open, professional dialogue for conflict resolution"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-sm text-slate-500 bg-white p-4 rounded-2xl border border-slate-100">
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Excellence */}
            <section id="excellence" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tight">3. Excellence and Growth</h2>
                <p className="text-slate-500 text-lg">UP OVPA personnel shall be proactive future-thinkers, compliant with quality standards, and continuous learners.</p>
              </div>

              <div className="bg-white border border-slate-100 rounded-[3.5rem] overflow-hidden shadow-sm">
                <div className="bg-emerald-50 p-10 border-b border-emerald-100">
                  <h3 className="text-2xl font-black text-emerald-900 font-outfit uppercase">Completed Staff Work (CSW)</h3>
                  <p className="text-emerald-700/60 text-sm font-bold uppercase tracking-widest mt-1">Institutional Standard for Effective Decision-Making</p>
                </div>
                <div className="p-10 grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { step: "01", label: "Identify", desc: "Clearly describe the problem or issue." },
                    { step: "02", label: "Context", desc: "Provide concise background info." },
                    { step: "03", label: "Alternatives", desc: "List all possible solutions." },
                    { step: "04", label: "Analyze", desc: "Data-driven analysis of criteria." },
                    { step: "05", label: "Recommend", desc: "Suggest the best course of action." }
                  ].map((step, i) => (
                    <div key={i} className="space-y-3 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{step.step}</span>
                      <h4 className="font-bold text-slate-800 text-sm">{step.label}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-900 text-white rounded-[3rem] space-y-6 relative overflow-hidden">
                  <AlertCircle className="absolute -bottom-6 -right-6 text-white/5" size={120} />
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-xl font-bold">Innovation & Safespace</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      All system/program improvements shall be reviewed by authority. 
                      Ideas will never be dismissed without proper evaluation. 
                      We foster a safe space for innovation and peer-to-peer mentoring.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 relative z-10">
                    <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">Commitment</p>
                    <p className="text-sm text-emerald-100/60 mt-2 italic">"We support employees attending learning programs to align with university goals."</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800">Response Protocol</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">When asked for an update on urgent tasks, reply within <span className="font-bold text-emerald-700 text-sm">2 hours</span>.</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
                      <Award size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800">Quality Standards</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Follow UP Citizen’s Charter and Quality Management System Manual strictly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Monitoring */}
            <section id="monitoring" className="scroll-mt-32 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tight">4. Monitoring & Strategy</h2>
                <div className="w-20 h-1.5 bg-emerald-600 rounded-full" />
              </div>

              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  A **Core Values Champion (CVC)** shall be appointed per office/unit/division/section to monitor compliance with this policy. 
                  While there are no sanctions for non-compliance, units and individuals who demonstrate adherence to these values may 
                  qualify for existing university awards and recognition.
                </p>
                
                <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2rem] space-y-4">
                  <h4 className="font-bold text-amber-900 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <AlertCircle size={16} /> Limitations & Review
                  </h4>
                  <p className="text-sm text-amber-800/70 leading-relaxed">
                    This document does not claim to contain an exhaustive list of all behavioral indicators. 
                    All personnel are expected to also review **RA 6713** and other relevant Civil Service Commission issuances.
                    This document shall be amended as the need arises based on institutional experience.
                  </p>
                </div>
              </div>

              <div className="pt-20 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm p-3">
                    <img src="/up-seal.png" alt="UP Seal" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Policy Governance</p>
                    <p className="text-sm font-bold text-slate-900 uppercase">Office of the Vice President for Administration</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Institutional Identity</p>
                   <p className="text-xs text-slate-400 mt-1">SOLVE Initiative Framework © 2026</p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="py-24 px-6 bg-emerald-950">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-outfit font-black text-white">
              Embody the <span className="text-amber-500 italic">UP Standard.</span>
            </h2>
            <p className="text-emerald-100/40 text-lg max-w-2xl mx-auto leading-relaxed">
              Kalinangán is more than a guide—it is our shared commitment to public service excellence and honorable leadership.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/" className="bg-white text-emerald-900 font-bold py-5 px-12 rounded-2xl transition-all shadow-xl hover:bg-emerald-50">
              Return to SOLVE Hub
            </Link>
            <button className="bg-emerald-900 text-white border border-white/10 font-bold py-5 px-12 rounded-2xl transition-all hover:bg-emerald-800">
              Contact OVPA Support
            </button>
          </div>
          <p className="text-[10px] text-emerald-100/20 font-bold uppercase tracking-[0.4em]">Honor • Excellence • Service</p>
        </div>
      </footer>
    </div>
  );
}
