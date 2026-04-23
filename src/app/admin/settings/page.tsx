"use client";

import { Save, Layout, Target, Eye, Loader2, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const SECTIONS = [
  { key: 'hero', label: 'Hero Section', icon: <Layout size={18} /> },
  { key: 'mission', label: 'Mission Statement', icon: <Target size={18} /> },
  { key: 'vision', label: 'Vision Statement', icon: <Eye size={18} /> },
  { key: 'values', label: 'Core Values Intro', icon: <Eye size={18} /> },
];

export default function SiteContentManager() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchSectionData();
  }, [activeSection]);

  const fetchSectionData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("section_key", activeSection.key)
      .single();

    if (data) {
      setTitle(data.title || "");
      setSubtitle(data.subtitle || "");
      setContent(data.content || "");
      setImageUrl(data.image_url || "");
    } else {
      // Reset if no data found
      setTitle("");
      setSubtitle("");
      setContent("");
      setImageUrl("");
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase
      .from("site_content")
      .upsert({
        section_key: activeSection.key,
        title,
        subtitle,
        content,
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      }, { onConflict: 'section_key' });

    if (!error) {
      alert("Section updated successfully!");
    } else {
      alert("Error updating section: " + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-outfit">Site Content Manager</h1>
        <p className="text-slate-500">Manage the messaging and visual sections of the landing page.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Section Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeSection.key === section.key 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                  {activeSection.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Editing {activeSection.label}</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Section Key: {activeSection.key}</p>
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={saving || loading}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Save Changes
              </button>
            </div>

            {loading ? (
              <div className="p-20 text-center">
                <Loader2 className="animate-spin mx-auto text-emerald-600 mb-4" size={32} />
                <p className="text-slate-400 font-medium">Fetching section data...</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Section Title</label>
                    <input 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter the main heading..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Subtitle / Label</label>
                    <input 
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Enter the smaller supporting text..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Main Content Body</label>
                    <textarea 
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write the detailed description here..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Featured / Background Image URL</label>
                    <div className="flex gap-4">
                      <input 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                      />
                      {imageUrl && (
                        <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
