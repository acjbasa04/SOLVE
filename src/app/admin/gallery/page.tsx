"use client";

import { Upload, Search, Grid, List, FolderPlus, Download, Trash2, MoreHorizontal, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function GalleryManager() {
  const [viewMode, setViewMode] = useState("grid");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    setSaving(true);
    const { error } = await supabase.from("gallery").insert([
      { image_url: imageUrl, caption }
    ]);

    if (!error) {
      setIsModalOpen(false);
      setImageUrl("");
      setCaption("");
      fetchMedia();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this institutional asset?")) {
      await supabase.from("gallery").delete().eq("id", id);
      fetchMedia();
    }
  };

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
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

      {/* Grid/List Content */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="animate-spin mx-auto text-emerald-600 mb-4" size={32} />
          <p className="text-slate-400 font-medium">Syncing institutional media...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400 font-medium">
          Media library is empty. Start by uploading institutional assets.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-square hover:shadow-xl transition-all">
              <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end gap-2">
                <p className="text-white text-[10px] font-bold uppercase tracking-wider truncate">{item.caption || "Untilted Asset"}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 bg-red-500/40 hover:bg-red-500/60 backdrop-blur-md text-white p-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} className="mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
              <tr>
                <th className="px-8 py-6">Preview</th>
                <th className="px-8 py-6">Caption</th>
                <th className="px-8 py-6">Created</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4"><img src={item.image_url} className="w-12 h-12 bg-slate-100 rounded-lg object-cover" /></td>
                  <td className="px-8 py-4 font-bold text-slate-700">{item.caption || "Untitled"}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-8 py-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 font-bold text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-emerald-950/20 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-300 my-auto flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 shrink-0">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-outfit">Upload Institutional Media</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveItem} className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 gap-4 group hover:border-emerald-500/50 transition-all">
                {imageUrl ? (
                  <div className="relative w-full aspect-video">
                    <img src={imageUrl} alt="Preview" className="w-full h-full rounded-2xl object-cover shadow-lg" />
                    <button 
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-all shadow-sm">
                      {uploading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-600">Click to Upload Institutional Asset</p>
                      <p className="text-xs text-slate-400 mt-1">High-resolution PNG, JPG, or WEBP</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Media Caption / Title</label>
                <input 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Values Summit Group Photo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-8 py-4 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving || !imageUrl}
                  className="flex-1 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={20} className="animate-spin" /> : "Authorize & Store Media"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
