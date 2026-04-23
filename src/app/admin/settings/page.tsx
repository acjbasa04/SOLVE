"use client";

import { Save, Globe, Shield, Mail, Bell, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">System Settings</h1>
          <p className="text-slate-500">Configure platform identity, SEO, and communication channels.</p>
        </div>
        <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Save size={20} /> Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* General Settings */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 text-emerald-700">
              <div className="p-3 bg-emerald-50 rounded-xl"><Globe size={24} /></div>
              <h2 className="text-xl font-bold">General Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Platform Name</label>
                <input type="text" defaultValue="SOLVE Platform" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-slate-700 focus:outline-none focus:border-emerald-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact Email</label>
                <input type="email" defaultValue="admin@ovpa.edu.ph" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-slate-700 focus:outline-none focus:border-emerald-500" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Institutional Mandate</label>
                <textarea rows={3} defaultValue="Honor and Excellence in Service of the Nation" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-slate-700 focus:outline-none focus:border-emerald-500" />
              </div>
            </div>
          </section>

          {/* Security Settings */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 text-amber-600">
              <div className="p-3 bg-amber-50 rounded-xl"><Shield size={24} /></div>
              <h2 className="text-xl font-bold">Security & Access</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-700">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-400">Add an extra layer of security to your admin account.</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-700">Session Timeout</p>
                  <p className="text-sm text-slate-400">Automatically log out after 30 minutes of inactivity.</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-10">
          <section className="bg-emerald-950 text-white rounded-[2.5rem] p-8 space-y-6 shadow-xl shadow-emerald-900/20">
            <div className="flex items-center gap-3">
              <RefreshCw size={20} className="text-amber-400" />
              <h3 className="font-bold">System Status</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100/60">Version</span>
                <span className="font-bold">1.2.4-stable</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100/60">Last Backup</span>
                <span className="font-bold">2 hours ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100/60">Database</span>
                <span className="text-emerald-400 font-bold">Connected</span>
              </div>
            </div>
            <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-all text-sm">
              Check for Updates
            </button>
          </section>

          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-slate-700">
              <Bell size={20} />
              <h3 className="font-bold">Notifications</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Configure how the system alerts you about new team member registrations or high-priority news comments.
            </p>
            <button className="text-emerald-600 font-bold text-sm hover:underline">Configure Alerts</button>
          </section>
        </div>
      </div>
    </div>
  );
}
