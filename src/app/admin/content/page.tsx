"use client";

import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, Loader2, X, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function NewsEventsManager() {
  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState("article");
  const [status, setStatus] = useState("published");
  const [content, setContent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `news/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase.from("articles").select("*").order("created_at", { ascending: false });
    
    if (activeTab === "articles") query = query.eq("type", "article");
    if (activeTab === "events") query = query.eq("type", "event");
    if (activeTab === "drafts") query = query.eq("status", "draft");

    const { data, error } = await query;
    if (data) setPosts(data);
    setLoading(false);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title || "");
    setType(post.type || "article");
    setStatus(post.status || "published");
    setContent(post.content || "");
    setEventDate(post.event_date || "");
    setPostedBy(post.posted_by || "");
    setImageUrl(post.image_url || "");
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEventDate("");
    setPostedBy("");
    setImageUrl("");
    setEditingPost(null);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { data: { session } } = await supabase.auth.getSession();

    const postData = { 
      title, 
      content, 
      type, 
      status, 
      image_url: imageUrl,
      event_date: eventDate || null,
      posted_by: postedBy,
      author_id: session?.user?.id 
    };

    if (editingPost) {
      const { error } = await supabase
        .from("articles")
        .update(postData)
        .eq("id", editingPost.id);
      
      if (!error) {
        setIsModalOpen(false);
        resetForm();
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from("articles").insert([postData]);
      if (!error) {
        setIsModalOpen(false);
        resetForm();
        fetchPosts();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await supabase.from("articles").delete().eq("id", id);
      fetchPosts();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">News & Events</h1>
          <p className="text-slate-500">Manage your announcements, articles, and upcoming events.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Create New Post
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
          {["all", "articles", "events", "drafts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                activeTab === tab 
                  ? "bg-white text-emerald-700 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">Post Details</th>
                <th className="px-10 py-6">Type</th>
                <th className="px-10 py-6">Date</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-emerald-600 mb-4" size={32} />
                    <p className="text-slate-400 font-medium">Fetching institutional records...</p>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-slate-400 font-medium">
                    No records found. Start by creating a new post.
                  </td>
                </tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6">
                    <span className="font-bold text-slate-700 block truncate max-w-xs group-hover:text-emerald-700 transition-colors">
                      {post.title}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-tighter">ID: {post.id.slice(0, 8)}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-medium text-slate-600 capitalize">{post.type}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm text-slate-500">{new Date(post.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${post.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className={`text-xs font-bold ${post.status === 'published' ? 'text-emerald-700' : 'text-amber-700'} capitalize`}>
                        {post.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(post)} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
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

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-emerald-950/20">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-2xl font-bold text-slate-900 font-outfit">
                {editingPost ? "Edit Institutional Post" : "Create New Post"}
              </h2>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateOrUpdate} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Post Title</label>
                <input 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a compelling headline..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Content Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 appearance-none"
                  >
                    <option value="article">News Article</option>
                    <option value="event">Institutional Event</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Publishing Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 appearance-none"
                  >
                    <option value="published">Immediate Publish</option>
                    <option value="draft">Save as Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Event/Post Date</label>
                  <input 
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Posted By / Office</label>
                  <input 
                    value={postedBy}
                    onChange={(e) => setPostedBy(e.target.value)}
                    placeholder="e.g. OVPA, SPMO, etc."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Main Content</label>
                <textarea 
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share the details of this values initiative..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Post Featured Image</label>
                <div className="flex gap-4">
                  <input 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste an image URL or upload a file..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 focus:outline-none focus:border-emerald-500 transition-all"
                  />
                  <div className="relative">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button 
                      type="button"
                      className="h-full bg-slate-900 text-white px-8 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                      disabled={uploading}
                    >
                      {uploading ? <Loader2 size={18} className="animate-spin" /> : "Upload File"}
                    </button>
                  </div>
                </div>
                {imageUrl && (
                  <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-slate-100 relative group">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-xs font-bold uppercase tracking-widest">Image Selected</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => { setIsModalOpen(false); resetForm(); }}
                  className="flex-1 px-8 py-4 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={20} className="animate-spin" /> : (editingPost ? "Update Record" : "Authorize & Post")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
