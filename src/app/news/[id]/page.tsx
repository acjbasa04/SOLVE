"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Printer, ChevronRight, Newspaper, ShieldCheck, Compass, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/layout/Navbar";

export default function NewsDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  const fetchArticle = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("id", params.id)
      .single();
    
    if (data) setArticle(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoaderComponent />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em]">404 | Record Not Found</p>
        <Link href="/news" className="bg-emerald-800 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-900/20">
          Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Navbar />
      
      {/* Article Header */}
      <header className="pt-40 pb-20 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <Link href="/news" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={18} /> Back to Archive
          </Link>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                {article.type || "Institutional Article"}
              </span>
              <span className="text-slate-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Clock size={14} /> {new Date(article.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold">
                  {article.posted_by?.[0] || "A"}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Posted By</span>
                  <span className="font-bold text-slate-900">{article.posted_by || "Institutional Admin"}</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                  <Share2 size={18} className="text-slate-600" />
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                  <Printer size={18} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="px-6 -mt-10">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[21/9] bg-emerald-950 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white">
            {article.image_url ? (
              <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/5">
                <Newspaper size={120} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="">
          {/* We'll render the content. If it contains newlines, we preserve them. */}
          <div 
            className="rich-text-content text-lg leading-relaxed text-slate-700 space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Footer of article */}
        <div className="mt-24 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <ShieldCheck size={32} className="text-emerald-700" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Registry</p>
              <p className="text-sm font-medium text-slate-600">This record is a verified entry of the UP SOLVE Platform.</p>
            </div>
          </div>
          
          <Link href="/news" className="group flex items-center gap-3 text-emerald-800 font-black uppercase tracking-widest text-xs">
            Explore more news <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="py-24 px-6 bg-emerald-950 text-white">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Compass size={48} className="mx-auto text-amber-500 opacity-20" />
          <h2 className="text-3xl md:text-5xl font-black font-outfit leading-tight">
            Stay informed about our <br /> <span className="text-amber-500 italic">Institutional Journey.</span>
          </h2>
          <p className="text-emerald-100/40 text-lg">
            Join our mailing list to receive the latest updates from the SOLVE community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input 
              type="email" 
              placeholder="your@email.edu.ph"
              className="w-full sm:w-80 bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500"
            />
            <button className="w-full sm:w-auto bg-amber-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-amber-900/40 hover:bg-amber-500 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoaderComponent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Retrieving Record...</p>
    </div>
  );
}
