"use client";
import { useAuthStore } from '../../store/authStore';
import { BookOpen, Clock, Play, ArrowRight, Compass, Sparkles, Layout, Database, Activity, Target } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ lessonsCompleted: 0, hoursWatched: 0 });
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/progress/stats').catch(() => ({ data: { lessonsCompleted: 0, hoursWatched: 0 }})),
      api.get('/subjects').catch(() => ({ data: [] }))
    ]).then(([statsRes, subjectsRes]) => {
      setStats(statsRes.data);
      setRecentCourses(subjectsRes.data.slice(0, 2)); 
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 xl:px-20 py-16 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 overflow-x-hidden">
      
      {/* Structural Header */}
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="flex-1">
            <div className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-[11px] mb-8 bg-primary/10 px-5 py-2.5 border-2 border-primary/20">
               <Activity size={14} /> LIVE_UPDATE / ACTIVE
            </div>
           <h1 className="text-5xl lg:text-8xl font-black mb-10 tracking-[-0.05em] uppercase leading-[0.85]">
              Welcome back.<br />
              <span className="text-gray-500 italic uppercase">{user?.name?.split(' ')[0] || 'ENGINEER'}.</span>
           </h1>
            <p className="text-xl lg:text-3xl text-gray-700 max-w-2xl font-black leading-tight uppercase tracking-tight">
              You are all set to learn. Pick up where you left off and finish your lessons.
           </p>
        </div>
        
        <div className="w-full md:w-80 p-8 border-2 border-black bg-white shadow-[15px_15px_0px_rgba(255,87,34,0.1)] group">
           <div className="label-mono mb-6">Quick Link</div>
           <h4 className="text-2xl font-black mb-8 uppercase line-clamp-2">Complete Your Sequence</h4>
           <Link href="/dashboard/my-courses" className="flex items-center justify-between py-4 border-b-2 border-black text-xs font-black uppercase tracking-widest hover:text-primary transition-all group-hover:border-primary">
              GO TO LESSONS <ArrowRight size={18} />
           </Link>
        </div>
      </div>
      
      {/* Industrial Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 mb-32">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-10 border-2 border-black bg-white group hover:shadow-[20px_20px_0px_rgba(0,0,0,0.05)] transition-all">
           <div className="flex items-center justify-between mb-16">
              <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 <BookOpen size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Metric 01</span>
           </div>
           <div>
              <p className="label-mono mb-4 text-gray-500">LESSONS_DONE</p>
              <h3 className="text-6xl lg:text-8xl font-black tracking-tighter text-black">{loading ? '—' : stats.lessonsCompleted}</h3>
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-10 border-2 border-black bg-white group hover:shadow-[20px_20px_0px_rgba(255,87,34,0.05)] transition-all">
           <div className="flex items-center justify-between mb-16">
              <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 <Clock size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Metric 02</span>
           </div>
           <div>
              <p className="label-mono mb-4 text-gray-500">TOTAL_STUDY_TIME</p>
              <h3 className="text-6xl lg:text-8xl font-black tracking-tighter text-black">{loading ? '—' : stats.hoursWatched}<span className="text-xl md:text-2xl text-gray-700 ml-4">HRS</span></h3>
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-10 bg-primary text-white space-y-12 flex flex-col justify-between group overflow-hidden relative border-2 border-black">
           <Target className="absolute -right-10 -bottom-10 opacity-20 scale-[4] rotate-45" size={40} />
           <div className="label-mono text-white opacity-40">System Global Access</div>
           <div>
              <h4 className="text-2xl font-black tracking-tight uppercase leading-none group-hover:translate-x-1 transition-transform mb-4">Explore New <br />Skills</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">PLANETARY SCALE EDUCATION GRID</p>
           </div>
           <Link href="/dashboard/browse" className="bg-white text-black py-4 px-8 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all text-center">
             OPEN CATALOG
           </Link>
        </motion.div>
      </div>

      {/* Active Sequences */}
      <section className="mb-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-border pb-10">
           <div>
             <div className="label-mono mb-4 text-primary">Active Buffer</div>
             <h2 className="text-5xl font-black tracking-[-0.05em] uppercase">RESUME_GRID</h2>
           </div>
           <Link href="/dashboard/my-courses" className="text-[10px] font-black text-gray-400 hover:text-black transition-all uppercase tracking-widest border-b border-border hover:border-black pb-1">
             Manage all active nodes
           </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {!loading && recentCourses.map((course, i) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="p-10 border-2 border-black bg-white group relative transition-all hover:bg-black hover:text-white"
            >
              <div className="flex items-center justify-between mb-16">
                 <div className="text-[9px] font-black uppercase tracking-widest px-4 py-2 border-2 border-border group-hover:border-primary transition-colors">LESSON_{course.id}</div>
                 <div className="w-8 h-8 rounded-full border border-border group-hover:bg-primary group-hover:border-primary transition-all" />
              </div>
              <div className="mb-16">
                 <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-none">{course.title}</h3>
                 <p className="text-gray-500 group-hover:text-gray-400 text-sm font-medium line-clamp-2 max-w-sm uppercase tracking-wider">{course.description}</p>
              </div>
              <Link href={`/subjects/${course.id}`} className="group/btn flex items-center justify-between py-5 border-t border-border group-hover:border-white/20 transition-all font-black text-[10px] uppercase tracking-widest text-primary group-hover:text-white">
                <span>Synchronize Unit</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
          {loading && Array.from({ length: 2 }).map((_, i) => (
             <div key={i} className="h-[400px] bg-white border-2 border-border animate-pulse" />
          ))}
        </div>
      </section>

      {/* Industrial Grid Footer Action */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-20 bg-white border-[3px] border-black shadow-[20px_20px_0px_rgba(255,87,34,0.1)] text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <Database size={64} className="mx-auto text-primary mb-12 opacity-20 group-hover:rotate-12 transition-transform duration-1000" />
        <h2 className="text-4xl lg:text-7xl font-black tracking-[-0.05em] uppercase mb-10 leading-none">Browse Our <br />Courses</h2>
        <p className="text-gray-700 max-w-2xl mx-auto font-black text-xl mb-16 uppercase tracking-[0.2em] leading-relaxed">
          Join a global community of developers and master new skills.
        </p>
        <Link href="/dashboard/browse" className="inline-flex items-center gap-6 px-16 py-6 bg-black text-white font-black hover:bg-primary transition-all text-xs uppercase tracking-[0.3em]">
           Open Library <Sparkles size={18} />
        </Link>
      </motion.div>

    </div>
  );
}
