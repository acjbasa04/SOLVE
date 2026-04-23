"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Shield,
  ArrowRight, 
  Compass, 
  Navigation, 
  Mail, 
  ChevronRight,
  Calendar,
  Users,
  Award,
  BookOpen,
  Loader2,
  MapPin,
  Target,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function LandingPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const { data: articlesData } = await supabase.from('articles').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(3);
      const { data: teamData } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
      const { data: galleryData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false }).limit(8);
      const { data: contentData } = await supabase.from('site_content').select('*');

      if (articlesData) setArticles(articlesData);
      if (teamData) setTeam(teamData);
      if (galleryData) setGallery(galleryData);
      if (contentData) setSiteContent(contentData);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const getContent = (key: string, fallback: { title: string, subtitle?: string, content?: string }) => {
    const section = siteContent.find(s => s.section_key === key);
    return {
      title: section?.title || fallback.title,
      subtitle: section?.subtitle || fallback.subtitle || "",
      content: section?.content || fallback.content || "",
      imageUrl: section?.image_url
    };
  };

  const hero = getContent('hero', { 
    title: "Strengthening Organizational Leadership, Values and Ethics",
    subtitle: "OVPA Initiative",
    content: '"Honor and Excellence in Service of the Nation"'
  });

  const mission = getContent('mission', {
    title: "Our Shared Values",
    subtitle: "Cultivating a culture of leadership and accountability across all UP constituent universities.",
  });

  const about = getContent('about', {
    title: "Upholding Honor, Championing Excellence.",
    subtitle: "For the UP Community",
    content: "SOLVE is a initiative designed for the dedicated employees of the University of the Philippines System."
  });

  const cta = getContent('cta', {
    title: "Commit to Honor and Excellence. Ready to Lead with Integrity?",
    content: "Join the community of Values Champions and help strengthen the ethical foundation of our national university."
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Values-Driven / UP Mandate Focus */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-emerald-950 px-6 py-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          {hero.imageUrl ? (
            <>
              <img src={hero.imageUrl} alt="Background" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#0A0505]" />
              
              {/* Subtle Moral Compass / Purpose Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square animate-spin-slow opacity-5">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-emerald-500 fill-none stroke-[0.1]">
                  <circle cx="50" cy="50" r="45" />
                  <circle cx="50" cy="50" r="35" strokeDasharray="1 4" />
                  <path d="M50 5 L50 95 M5 50 L95 50" />
                </svg>
              </div>

              <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-900/20 rounded-full blur-[140px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[140px]" />
            </>
          )}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center space-y-10">
          {/* Institution Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-xl"
          >
            <ShieldCheck size={18} />
            {hero.subtitle}
          </motion.div>

          {/* Headline: SOLVE Acronym Focus */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black text-white tracking-tight leading-[1.1]"
            >
              {hero.title === "Strengthening Organizational Leadership, Values and Ethics" ? (
                <>
                  <span className="text-amber-400">S</span>trengthening 
                  <span className="text-amber-400"> O</span>rganizational 
                  <span className="text-amber-400"> L</span>eadership, 
                  <span className="text-amber-400"> V</span>alues and 
                  <span className="text-amber-400"> E</span>thics
                </>
              ) : hero.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-2xl md:text-3xl text-amber-200/90 font-outfit italic font-light tracking-wide">
                {hero.content}
              </p>
              {!hero.imageUrl && (
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-emerald-100/60 font-light leading-relaxed">
                  Empowering the UP community to lead with integrity, cultivating a culture 
                  of service that upholds the honor and excellence of our national university.
                </p>
              )}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          >
            <button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl shadow-amber-900/40 transition-all flex items-center justify-center gap-2 group active:scale-95 text-lg">
              Connect with Us
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold py-5 px-12 rounded-2xl border border-white/10 backdrop-blur-xl transition-all active:scale-95 text-lg">
              Stay Updated
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-white transform skew-y-[-1.5deg] translate-y-12 z-20" />
      </section>

      {/* 2. About Section - UP Employee Focus */}
      <section id="about" className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 text-emerald-700 font-bold uppercase tracking-widest text-sm">
              <span className="w-12 h-px bg-emerald-700" />
              {about.subtitle}
            </div>
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-slate-900 tracking-tight">
              {about.title === "Upholding Honor, Championing Excellence." ? (
                <>Upholding <span className="text-emerald-700">Honor</span>,<br /> Championing <span className="text-amber-600">Excellence</span>.</>
              ) : about.title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {about.content}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-3 p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-emerald-50 transition-all">
                <Award className="text-emerald-700" size={32} />
                <h4 className="font-bold text-slate-900">Institutional Honor</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Fostering a workspace where integrity and ethical standards are the foundation of every decision.</p>
              </div>
              <div className="space-y-3 p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-amber-50 transition-all">
                <BookOpen className="text-amber-600" size={32} />
                <h4 className="font-bold text-slate-900">Service Excellence</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Committing to the highest standards of administrative and academic service for the UP System.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-emerald-950 rounded-[4rem] overflow-hidden shadow-2xl flex items-center justify-center relative">
              {about.imageUrl ? (
                <img src={about.imageUrl} alt="About SOLVE" className="w-full h-full object-contain bg-emerald-900/10" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-transparent" />
                  <Compass size={80} className="text-amber-500/10 animate-spin-slow" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Section - Strategic Values for UP Staff */}
      <section id="mission" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/5 -skew-x-12" />
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-outfit font-black text-slate-900">{mission.title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{mission.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Public Service", desc: "Placing the welfare of our university and the nation at the heart of our administrative work." },
              { title: "Shared Accountability", desc: "Empowering every employee to be a steward of the University's resources and reputation." },
              { title: "Collaborative Growth", desc: "Building a network of Values Champions to support and inspire one another across campuses." }
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all border border-slate-100 text-left space-y-6 group">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                  <Navigation size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. News & Events - Live Data */}
      <section id="events" className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-outfit font-black text-slate-900 tracking-tight">Institutional Pulse</h2>
              <p className="text-slate-500 text-lg">Latest updates from the Values Champions community.</p>
            </div>
            <button className="text-emerald-700 font-bold flex items-center gap-2 hover:underline">
              View All Archive <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="space-y-6 animate-pulse">
                  <div className="aspect-[4/3] bg-slate-200 rounded-[2.5rem]" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))
            ) : articles.length === 0 ? (
              <div className="col-span-3 py-20 text-center text-slate-400 bg-white rounded-[3rem] border border-dashed border-slate-200">
                No recent records found in the institutional registry.
              </div>
            ) : articles.map((article) => (
              <div 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2"
              >
                <div className="aspect-[16/9] bg-emerald-950 rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                  {article.image_url ? (
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                  ) : (
                    <Calendar size={48} className="text-white/10" />
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-emerald-700/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> 
                      {article.event_date ? new Date(article.event_date).toLocaleDateString() : new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Navigation size={12} />
                      {article.posted_by || "OVPA"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Values in Action - Media Gallery */}
      <section id="gallery" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-outfit font-black text-slate-900 tracking-tight">Values in Action</h2>
              <p className="text-slate-500 text-lg">A visual journey through our institutional values program.</p>
            </div>
            <button className="text-emerald-700 font-bold flex items-center gap-2 hover:underline">
              View Full Gallery <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square bg-slate-100 rounded-2xl animate-pulse" />
              ))
            ) : gallery.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="max-w-xs mx-auto space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto text-slate-300">
                    <Compass size={24} />
                  </div>
                  <p className="text-slate-400 font-medium text-sm italic">Archive being populated.</p>
                </div>
              </div>
            ) : gallery.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedImage(item.image_url)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={item.image_url} 
                  alt={item.caption || "Values in Action"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-white font-bold text-[10px] leading-tight uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    {item.caption || "Institutional Update"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team - Live Data */}
      <section id="team" className="py-32 px-6 bg-emerald-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-outfit font-black text-white italic">Our Leadership</h2>
            <p className="text-emerald-100/40 text-lg max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">The Values Champions Directorate</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="w-56 space-y-4 animate-pulse">
                  <div className="w-40 h-40 bg-white/5 rounded-[2.5rem] mx-auto" />
                  <div className="h-4 bg-white/5 rounded w-1/2 mx-auto" />
                </div>
              ))
            ) : team.length === 0 ? (
              <div className="text-emerald-100/20 py-20 text-center font-bold tracking-widest uppercase">
                Directorate synchronization pending.
              </div>
            ) : team.map((member) => (
              <div key={member.id} className="text-center group w-56">
                <div className="w-40 h-40 mx-auto bg-emerald-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/5 group-hover:border-amber-500 transition-all flex items-center justify-center mb-6">
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-5xl font-black font-outfit opacity-20">{member.full_name[0]}</span>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white truncate">{member.full_name}</h4>
                <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-emerald-50 rounded-[4rem] p-12 md:p-20 text-center space-y-8 border border-emerald-100 relative">
          <h2 className="text-4xl md:text-5xl font-outfit font-black text-slate-900">
            {cta.title.includes("Integrity") ? (
              <>{cta.title.replace("Integrity", "").replace("?", "")} <span className="text-emerald-700">Integrity</span>?</>
            ) : cta.title}
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">{cta.content}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-5 px-12 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2">
              <Mail size={22} /> Subscribe to Newsletter
            </button>
            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-bold py-5 px-12 rounded-2xl border border-slate-200 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row h-fit max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-xl backdrop-blur-md transition-all"
              >
                <X size={20} />
              </button>

              <div className="md:w-1/2 bg-emerald-950 flex items-center justify-center relative p-4">
                {selectedArticle.image_url ? (
                  <img src={selectedArticle.image_url} alt={selectedArticle.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar size={80} className="text-white/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none" />
              </div>

              <div className="md:w-1/2 p-8 md:p-16 overflow-y-auto space-y-10 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-emerald-700/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> 
                      {selectedArticle.event_date ? new Date(selectedArticle.event_date).toLocaleDateString() : new Date(selectedArticle.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Navigation size={12} />
                      {selectedArticle.posted_by || "OVPA"}
                    </span>
                  </div>
                  <h2 className="text-4xl font-outfit font-black text-slate-900 leading-tight tracking-tight">
                    {selectedArticle.title}
                  </h2>
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 text-xl leading-relaxed whitespace-pre-wrap font-light">
                    {selectedArticle.content}
                  </p>
                </div>

                <div className="pt-10 border-t border-slate-100 flex items-center gap-5">
                  <div className="w-14 h-14 bg-emerald-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-700/20">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Institutional Record</p>
                    <p className="text-base font-bold text-slate-900 tracking-tight">Verified by Values Team</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-emerald-950/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-5xl h-full flex flex-col items-center justify-center pointer-events-none"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 font-bold transition-all pointer-events-auto"
              >
                Close <X size={20} />
              </button>
              <div className="w-full h-full max-h-[80vh] flex items-center justify-center">
                <img 
                  src={selectedImage} 
                  alt="Gallery Preview" 
                  className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] pointer-events-auto" 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
