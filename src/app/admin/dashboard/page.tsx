"use client";

import { Newspaper, Users, Image as ImageIcon, Calendar, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardOverview() {
  const [counts, setCounts] = useState({ articles: 0, team: 0, gallery: 0 });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Fetch Counts
    const { count: artCount } = await supabase.from('articles').select('*', { count: 'exact', head: true });
    const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
    const { count: galCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });
    
    // Fetch Recent Articles
    const { data: latest } = await supabase.from('articles').select('*').order('created_at', { ascending: false }).limit(3);

    setCounts({
      articles: artCount || 0,
      team: teamCount || 0,
      gallery: galCount || 0
    });
    
    if (latest) setRecentArticles(latest);
    setLoading(false);
  };

  const stats = [
    { name: "News Articles", value: counts.articles, icon: Newspaper, color: "bg-blue-500", change: "Live" },
    { name: "Upcoming Events", value: counts.articles > 0 ? "Synced" : "0", icon: Calendar, color: "bg-amber-500", change: "Institutional" },
    { name: "Team Members", value: counts.team, icon: Users, color: "bg-emerald-500", change: "Champions" },
    { name: "Gallery Images", value: counts.gallery, icon: ImageIcon, color: "bg-purple-500", change: "Assets" },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
        <p className="text-slate-400 font-medium">Synchronizing institutional metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Welcome back, Champion.</h1>
          <p className="text-slate-500 text-lg">Here's what's happening with the SOLVE platform today.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            View Website <ArrowUpRight size={18} />
          </Link>
          <Link href="/admin/content" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <Plus size={18} /> New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <p className="text-slate-400 font-medium text-xs mb-1 uppercase tracking-widest">{stat.name}</p>
            <h3 className="text-4xl font-black text-slate-900 font-outfit">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Recent News Articles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recent Articles</h3>
            <Link href="/admin/content" className="text-sm font-bold text-emerald-600 hover:underline">View All</Link>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5">Title</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentArticles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic">No articles found. Write your first post to see it here.</td>
                    </tr>
                  ) : recentArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="font-bold text-slate-700 block truncate max-w-xs">{article.title}</span>
                        <span className="text-xs text-slate-400 font-medium">{article.posted_by || "Institutional Admin"}</span>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500">{new Date(article.created_at).toLocaleDateString()}</td>
                      <td className="px-8 py-6">
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {article.status || "Published"}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link href="/admin/content" className="text-slate-400 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest">Manage</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Status */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Platform Health</h3>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 space-y-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between text-xs mb-1 uppercase font-black tracking-widest">
                <span className="text-slate-400">Institutional Sync</span>
                <span className="text-emerald-600">Active</span>
              </div>
              <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <div className="w-full h-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs mb-1 uppercase font-black tracking-widest">
                <span className="text-slate-400">Database Engine</span>
                <span className="text-emerald-600">Optimized</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className="flex-1 h-8 bg-emerald-50 rounded-lg" />
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-widest">
                Your console is currently synchronized with the Supabase master branch. 
                All changes made here are immediate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
