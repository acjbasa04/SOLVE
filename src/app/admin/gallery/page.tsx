"use client";

import { Upload, Search, Grid, List, FolderPlus, Download, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function GalleryManager() {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Media Gallery</h1>
          <p className="text-slate-500">Organize and upload institutional photos and assets.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            <FolderPlus size={20} /> New Album
          </button>
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <Upload size={20} /> Upload Files
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-4 rounded-[1.5rem] border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search media..."
              className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:border-emerald-500 transition-all w-64"
            />
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
          <span>48 Items</span>
          <span className="text-slate-200">|</span>
          <span className="text-emerald-600 font-bold">12 Selected</span>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-square hover:shadow-xl transition-all">
              <div className="w-full h-full bg-slate-100 animate-pulse group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end gap-2">
                <p className="text-white text-[10px] font-bold uppercase tracking-wider truncate">Values_Summit_0{i}.jpg</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-lg transition-colors">
                    <Download size={14} className="mx-auto" />
                  </button>
                  <button className="flex-1 bg-red-500/40 hover:bg-red-500/60 backdrop-blur-md text-white p-2 rounded-lg transition-colors">
                    <Trash2 size={14} className="mx-auto" />
                  </button>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 bg-white/90 rounded-md text-slate-600 shadow-lg">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Preview</th>
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Size</th>
                <th className="px-8 py-4">Dimensions</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3, 4].map(i => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4"><div className="w-12 h-12 bg-slate-100 rounded-lg" /></td>
                  <td className="px-8 py-4 font-bold text-slate-700">Values_Event_Asset_{i}.png</td>
                  <td className="px-8 py-4 text-sm text-slate-400">2.4 MB</td>
                  <td className="px-8 py-4 text-sm text-slate-400">1920 x 1080</td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-slate-400 hover:text-emerald-600 font-bold text-sm">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
