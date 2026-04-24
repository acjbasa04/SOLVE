"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, ArrowRight, Loader2, Search, Newspaper, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/layout/Navbar";

export default function NewsArchivePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    
    if (data) setArticles(data);
    setLoading(false);
  };

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-outfit pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
              <Newspaper size={14} /> Institutional Archive
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              News & <span className="text-emerald-700">Events</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Explore the full history of values-driven initiatives, organizational 
              milestones, and leadership highlights from the UP System.
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-slate-700 focus:outline-none focus:border-emerald-500 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Article Grid */}
        {loading ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
            <p className="text-slate-400 font-medium">Synchronizing records...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-32 text-center space-y-4 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Search size={40} />
            </div>
            <p className="text-slate-400 font-medium italic">No matches found in the institutional archive.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/news/${article.id}`}
                className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col"
              >
                <div className="aspect-[16/9] bg-emerald-950 rounded-[2rem] mb-8 flex items-center justify-center overflow-hidden">
                  {article.image_url ? (
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <Calendar size={48} className="text-white/10" />
                  )}
                </div>
                
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-emerald-700/50">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span className="bg-emerald-50 px-2 py-1 rounded-md">{article.type || "Article"}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed flex-1">
                    {article.content?.replace(/<[^>]*>/g, '')}
                  </p>
                  
                  <div className="pt-6 mt-auto border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {article.posted_by?.[0] || "A"}
                      </div>
                      <span className="text-xs font-bold text-slate-600">{article.posted_by || "Institutional Admin"}</span>
                    </div>
                    <ArrowRight size={20} className="text-emerald-700 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
