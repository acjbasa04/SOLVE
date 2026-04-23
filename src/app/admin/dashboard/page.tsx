"use client";

import { Newspaper, Users, Image as ImageIcon, Calendar, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const stats = [
    { name: "News Articles", value: "12", icon: Newspaper, color: "bg-blue-500", change: "+2 this week" },
    { name: "Upcoming Events", value: "4", icon: Calendar, color: "bg-amber-500", change: "Next: Oct 24" },
    { name: "Team Members", value: "8", icon: Users, color: "bg-emerald-500", change: "Active Champions" },
    { name: "Gallery Images", value: "48", icon: ImageIcon, color: "bg-purple-500", change: "12 high-res" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Welcome back, Champion.</h1>
          <p className="text-slate-500 text-lg">Here's what's happening with the SOLVE platform today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            View Website <ArrowUpRight size={18} />
          </button>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <Plus size={18} /> New Post
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <p className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">{stat.name}</p>
            <h3 className="text-3xl font-black text-slate-900 font-outfit">{stat.value}</h3>
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
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5">Title</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="font-bold text-slate-700 block truncate max-w-xs">Values-Based Leadership Summit 2026 {i}</span>
                        <span className="text-xs text-slate-400">Written by Admin</span>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500">Oct 24, 2026</td>
                      <td className="px-8 py-6">
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Published</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-slate-400 hover:text-emerald-600 font-bold text-sm">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Links / Status */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Platform Health</h3>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-500">Storage Usage</span>
                <span className="font-bold text-slate-800">4.2GB / 5GB</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[84%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-500">Auth Connections</span>
                <span className="font-bold text-emerald-600">Stable</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className="flex-1 h-8 bg-emerald-50 rounded" />
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <p className="text-xs text-slate-400 leading-relaxed">
                Your console is currently synchronized with the Supabase master branch. 
                All changes made here are immediate and irreversible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
