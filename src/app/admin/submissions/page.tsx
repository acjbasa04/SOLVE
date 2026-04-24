"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Trash2, Loader2, CheckCircle, Filter, Search, ArrowRight } from "lucide-react";

export default function SubmissionsManager() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    let query = supabase.from("submissions").select("*").order("created_at", { ascending: false });
    
    if (filter !== "all") {
      query = query.eq("type", filter);
    }

    const { data, error } = await query;
    if (data) setSubmissions(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this submission?")) {
      const { error } = await supabase.from("submissions").delete().eq("id", id);
      if (!error) fetchSubmissions();
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-outfit">Stakeholder Inquiries</h1>
        <p className="text-slate-500">Monitor and manage communications from the SOLVE community.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit">
          {["all", "newsletter", "contact"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                filter === t ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-slate-700 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Stakeholder</th>
                <th className="px-10 py-6">Category</th>
                <th className="px-10 py-6">Message / Details</th>
                <th className="px-10 py-6">Received</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-emerald-600 mb-4" size={32} />
                    <p className="text-slate-400 font-medium font-outfit">Retrieving submissions...</p>
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-slate-400 font-medium">
                    No inquiries found.
                  </td>
                </tr>
              ) : filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        sub.type === 'newsletter' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <Mail size={18} />
                      </div>
                      <span className="font-bold text-slate-700">{sub.email}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      sub.type === 'newsletter' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {sub.type}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-slate-600 text-sm max-w-md line-clamp-2">
                      {sub.message || "Newsletter Subscription Request"}
                    </p>
                  </td>
                  <td className="px-10 py-8 text-sm text-slate-400 font-medium">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button 
                      onClick={() => handleDelete(sub.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
