"use client";

import { Plus, Search, Mail, Phone, MoreHorizontal, UserPlus, Loader2, X, Trash2, Upload, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TeamDirectoryManager() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase.from("team_members").select("*").order("created_at", { ascending: false });
    if (data) setMembers(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    } catch (error: any) {
      alert("Error uploading image: " + error.message + "\n\nNote: Please ensure you have created a public bucket named 'avatars' in your Supabase storage.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("team_members").insert([
      { full_name: fullName, position, email, phone, image_url: imageUrl }
    ]);
    if (!error) {
      setIsModalOpen(false);
      setFullName("");
      setPosition("");
      setEmail("");
      setPhone("");
      setImageUrl("");
      fetchMembers();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove this member from the institutional directory?")) {
      await supabase.from("team_members").delete().eq("id", id);
      fetchMembers();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Team Directory</h1>
          <p className="text-slate-500">Manage the profiles of the SOLVE Values Champions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <UserPlus size={20} /> Add Member
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search team members..."
          className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all w-full"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="animate-spin mx-auto text-emerald-600 mb-4" size={32} />
          <p className="text-slate-400 font-medium">Loading Champion records...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400 font-medium">
          No members found. Add your first Values Champion.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-emerald-700 font-bold text-2xl">{member.full_name[0].toUpperCase()}</span>
                    )}
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-600 p-2 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="space-y-1 mb-8">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">{member.full_name}</h3>
                <p className="text-emerald-600 font-bold text-xs uppercase tracking-[0.2em]">{member.position}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail size={16} />
                  <span className="text-sm truncate">{member.email || "No email listed"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone size={16} />
                  <span className="text-sm">{member.phone || "No phone listed"}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="flex-1 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 font-bold py-3 rounded-xl transition-all text-sm">
                  Edit Profile
                </button>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="px-4 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-emerald-950/20">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-2xl font-bold text-slate-900 font-outfit">Add Team Member</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddMember} className="p-8 space-y-6">
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 gap-4 group hover:border-emerald-500/50 transition-all">
                {imageUrl ? (
                  <div className="relative">
                    <img src={imageUrl} alt="Preview" className="w-24 h-24 rounded-[1.5rem] object-cover shadow-lg" />
                    <button 
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-all shadow-sm">
                      {uploading ? <Loader2 size={24} className="animate-spin" /> : <Camera size={24} />}
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-all">
                      {uploading ? "Uploading..." : "Click to Upload Photo"}
                    </span>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                <input 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Position / Role</label>
                <input 
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Values Facilitator"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Institutional Email</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@up.edu.ph"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                  <input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+63 ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Or Image URL</label>
                <input 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
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
                  disabled={saving}
                  className="flex-1 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={20} className="animate-spin" /> : "Confirm Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
