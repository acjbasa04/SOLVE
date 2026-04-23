"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Navigation, 
  Mail, 
  ChevronRight,
  Calendar,
  Users,
  Award,
  BookOpen,
  Loader2,
  MapPin,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function LandingPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [articlesRes, teamRes] = await Promise.all([
        supabase.from("articles").select("*").eq("status", "published").order("created_at", { ascending: false }).limit(3),
        supabase.from("team_members").select("*").order("order_index", { ascending: true })
      ]);
      
      if (articlesRes.data) setArticles(articlesRes.data);
      if (teamRes.data) setTeam(teamRes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Values-Driven / UP Mandate Focus */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-emerald-950 px-6 py-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#0A0505]" />
          
          {/* Subtle Moral Compass Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square animate-spin-slow opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-emerald-500 fill-none stroke-[0.2]">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="35" strokeDasharray="1 4" />
              <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" />
              <text x="48" y="4" className="text-[2px] font-black fill-emerald-400">PURPOSE</text>
              <text x="48" y="99" className="text-[2px] font-black fill-emerald-400">SERVICE</text>
            </svg>
          </div>

          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-900/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-xl"
          >
            <ShieldCheck size={18} />
            OVPA Initiative
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black text-white tracking-tight leading-[1.1]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 italic block mb-4">
                "Honor and Excellence in Service of the Nation"
              </span>
              <span className="text-emerald-50 text-2xl md:text-3xl lg:text-4xl block font-light opacity-90 mt-6 max-w-4xl mx-auto leading-relaxed">
                <span className="text-amber-400 font-bold">S</span>trengthening 
                <span className="text-amber-400 font-bold"> O</span>rganizational 
                <span className="text-amber-400 font-bold"> L</span>eadership, 
                <span className="text-amber-400 font-bold"> V</span>alues and 
                <span className="text-amber-400 font-bold"> E</span>thics
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-emerald-100/60 font-light leading-relaxed"
            >
              A platform dedicated to fostering integrity, nurturing community leaders, 
              and championing the core values that define our shared mission.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          >
            <button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl shadow-amber-900/40 transition-all flex items-center justify-center gap-2 group active:scale-95 text-lg">
              Connect with Us
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold py-5 px-12 rounded-2xl border border-white/10 backdrop-blur-xl transition-all active:scale-95 text-lg">
              Stay Updated
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-white transform skew-y-[-1.5deg] translate-y-12 z-20" />
      </section>

      {/* 2. Mission Section */}
      <section id="mission" className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 text-emerald-700 font-bold uppercase tracking-widest text-sm">
              <span className="w-12 h-px bg-emerald-700" />
              Strategic Mandate
            </div>
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-slate-900 tracking-tight">
              Our Commitment to <span className="text-emerald-700">Integrity</span> and Excellence.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              To institutionalize values-based leadership and ethical governance within the organization by equipping every team member with the mindset necessary to navigate complex challenges with honor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                <Award className="text-emerald-700 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-slate-900">Honor</h4>
                  <p className="text-xs text-slate-500 mt-1">Unwavering ethical standards in every action.</p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                <BookOpen className="text-amber-600 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-slate-900">Excellence</h4>
                  <p className="text-xs text-slate-500 mt-1">Commitment to global institutional standards.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-emerald-950 rounded-[4rem] overflow-hidden shadow-2xl flex items-center justify-center p-12">
              <Target size={200} className="text-amber-500/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. News & Events - Live Data */}
      <section id="events" className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-outfit font-black text-slate-900 tracking-tight">Institutional Pulse</h2>
              <p className="text-slate-500 text-lg">Latest updates from the Values Champions community.</p>
            </div>
            <button className="text-emerald-700 font-bold flex items-center gap-2 hover:underline">
              View All Archive <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="space-y-6 animate-pulse">
                  <div className="aspect-[4/3] bg-slate-200 rounded-[2.5rem]" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))
            ) : articles.length === 0 ? (
              <div className="col-span-3 py-20 text-center text-slate-400 bg-white rounded-[3rem] border border-dashed border-slate-200">
                No recent records found in the institutional registry.
              </div>
            ) : articles.map((article) => (
              <div key={article.id} className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-[16/9] bg-emerald-950 rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                  {article.image_url ? (
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                  ) : (
                    <Calendar size={48} className="text-white/10" />
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {article.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team - Live Data */}
      <section id="team" className="py-32 px-6 bg-emerald-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-white italic">Our Leadership</h2>
            <p className="text-emerald-100/40 text-lg max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">The Values Champions Directorate</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="w-56 space-y-4 animate-pulse">
                  <div className="w-40 h-40 bg-white/5 rounded-[2.5rem] mx-auto" />
                  <div className="h-4 bg-white/5 rounded w-1/2 mx-auto" />
                </div>
              ))
            ) : team.length === 0 ? (
              <div className="text-emerald-100/20 py-20 text-center font-bold tracking-widest uppercase">
                Directorate synchronization pending.
              </div>
            ) : team.map((member) => (
              <div key={member.id} className="text-center group w-56">
                <div className="w-40 h-40 mx-auto bg-emerald-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/5 group-hover:border-amber-500 transition-all flex items-center justify-center mb-6">
                  <span className="text-white text-5xl font-black font-outfit opacity-20">{member.full_name[0]}</span>
                </div>
                <h4 className="text-lg font-bold text-white truncate">{member.full_name}</h4>
                <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-emerald-50 rounded-[4rem] p-12 md:p-20 text-center space-y-8 border border-emerald-100 relative">
          <h2 className="text-4xl md:text-5xl font-outfit font-black text-slate-900">Ready to Foster <span className="text-emerald-700">Integrity</span>?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">Join the SOLVE community and contribute to the strengthening of organizational values.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-5 px-12 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2">
              <Mail size={22} /> Subscribe to Newsletter
            </button>
            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-bold py-5 px-12 rounded-2xl border border-slate-200 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
