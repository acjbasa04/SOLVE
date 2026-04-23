"use client";

import { FileText, Plus, Search, Trash2, Download, ExternalLink, Loader2, X, FileCheck, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ResourcesManager() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [category, setCategory] = useState("Policy");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setResources(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      // We'll use the 'avatars' bucket for now as it's already configured public
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setFileUrl(data.publicUrl);
    } catch (error: any) {
      alert("Error uploading document: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) return;

    setSaving(true);
    const { error } = await supabase.from("resources").insert([
      { title, description, file_url: fileUrl, category }
    ]);

    if (!error) {
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setFileUrl("");
      fetchResources();
    } else {
      alert("Error saving resource: " + error.message + "\n\nNote: Ensure the 'resources' table exists in your database.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently remove this institutional document?")) {
      await supabase.from("resources").delete().eq("id", id);
      fetchResources();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Institutional Resources</h1>
          <p className="text-slate-500">Manage policies, guidelines, and official SOLVE documents.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Add Document
        </button>
      </div>

      {/* Resource List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Document Details</th>
                <th className="px-10 py-6">Category</th>
                <th className="px-10 py-6">Added Date</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-emerald-600 mb-4" size={32} />
                    <p className="text-slate-400 font-medium">Loading institutional library...</p>
                  </td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-medium italic">
                    The resource library is currently empty.
                  </td>
                </tr>
              ) : resources.map((res) => (
                <tr key={res.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-700 block truncate max-w-xs group-hover:text-emerald-700 transition-colors">
                          {res.title}
                        </span>
                        <p className="text-xs text-slate-400 line-clamp-1">{res.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {res.category}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm text-slate-500">{new Date(res.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={res.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <button 
                        onClick={() => handleDelete(res.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-emerald-950/20 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-300 my-auto flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                  <FileCheck size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-outfit">Add Institutional Resource</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveResource} className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Document Title</label>
                <input 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Values Policy & Ethics Framework 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 appearance-none"
                >
                  <option value="Policy">Policy / Governance</option>
                  <option value="Form">Official Form</option>
                  <option value="Report">Institutional Report</option>
                  <option value="Guide">Manual / Guide</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Brief Description</label>
                <textarea 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the content of this document..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Attach Document</label>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 gap-4 group hover:border-emerald-500/50 transition-all">
                  {fileUrl ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                        <FileCheck size={32} />
                      </div>
                      <p className="text-xs font-bold text-emerald-700">Document Uploaded Successfully</p>
                      <button 
                        type="button"
                        onClick={() => setFileUrl("")}
                        className="text-[10px] text-red-500 font-bold uppercase hover:underline"
                      >
                        Remove & Replace
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-all shadow-sm">
                        {uploading ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-slate-600">Click to Upload Document</p>
                        <p className="text-[10px] text-slate-400 mt-1">PDF, DOCX, or Excel</p>
                      </div>
                      <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.xls,.xlsx" disabled={uploading} />
                    </label>
                  )}
                </div>
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
                  disabled={saving || !fileUrl}
                  className="flex-1 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={20} className="animate-spin" /> : "Authorize & Store"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
