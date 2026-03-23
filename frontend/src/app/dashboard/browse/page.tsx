"use client";
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, BookOpen, Search, Filter, Sparkles, ArrowRight, Layout, Database } from 'lucide-react';

export default function BrowseCourses() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subjects')
      .then(res => setSubjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped = subjects.reduce((acc: any, sub: any) => {
    const cat = sub.category || 'Engineering';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(sub);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border-2 border-border h-[400px] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-20 py-16 pb-32 relative z-10 selection:bg-primary selection:text-white">
      
      {/* Registry Hero */}
      <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24 border-b-2 border-dashed border-border pb-20">
        <div className="max-w-2xl">
           <div className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 bg-primary/10 px-4 py-2 border border-primary/20">
              <Database size={14} /> Global Course Library
           </div>
           <h1 className="text-7xl lg:text-[10rem] font-black mb-10 tracking-[-0.08em] uppercase leading-[0.85]">
              EXPLORE <br /> <span className="text-gray-400 italic">COURSES.</span>
           </h1>
           <p className="text-xl lg:text-3xl text-gray-700 font-black leading-relaxed uppercase tracking-tight">
             Learn the best engineering skills. Our courses are structured to help you master new technologies quickly.
           </p>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto mt-10">
           <div className="relative flex-1 lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
              <input 
                type="text" 
                  placeholder="SEARCH FOR COURSES..." 
                className="w-full bg-white border-2 border-black py-5 pl-16 pr-8 text-xs font-black tracking-[0.3em] uppercase focus:outline-none focus:border-primary transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.05)] placeholder:text-gray-200"
              />
           </div>
        </div>
      </div>

      {Object.entries(grouped).map(([category, groupSubs]: any, categoryIdx) => (
        <div key={category} className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-sm font-black tracking-[0.5em] uppercase text-black whitespace-nowrap">
              {category} / LESSONS_{groupSubs.length}
            </h2>
            <div className="h-[2px] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {groupSubs.map((sub: any, i: number) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 6) * 0.05 + (categoryIdx * 0.1) }}
                className="bg-white border-2 border-black p-10 lg:p-14 transition-all duration-500 hover:shadow-[20px_20px_0px_rgba(255,87,34,0.08)] hover:-translate-y-2 flex flex-col group relative overflow-hidden h-full min-h-[500px]"
              >
                {/* Visual Connector */}
                <div className="absolute top-0 right-0 w-3 h-0 group-hover:h-full bg-primary transition-all duration-700" />
                
                <div className="flex items-start justify-between mb-16">
                  <div className="w-16 h-16 border-2 border-black flex items-center justify-center text-gray-200 group-hover:text-primary group-hover:bg-primary/5 transition-all rotate-45 group-hover:rotate-0 duration-700">
                    <BookOpen size={28} className="-rotate-45 group-hover:rotate-0 transition-transform duration-700" />
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">LESSON_{sub.id}</span>
                     <div className="w-8 h-1 bg-black mt-2 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>

                <div className="flex-1 mb-16 relative z-10">
                  <h3 className="text-4xl lg:text-5xl font-black mb-8 tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">{sub.title}</h3>
                  <p className="text-gray-600 text-sm font-bold uppercase tracking-widest leading-loose line-clamp-4">{sub.description}</p>
                </div>

                <div className="relative z-10 mt-auto">
                  <Link
                    href={`/subjects/${sub.id}`}
                    className="flex items-center justify-between gap-4 py-6 px-10 bg-black text-white hover:bg-primary text-[11px] font-black uppercase tracking-[0.4em] transition-all group/btn shadow-[10px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
                  >
                    <span>START_LEARNING</span>
                    <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {subjects.length === 0 && (
        <div className="text-center py-60 border-[3px] border-black border-dashed bg-white">
           <Database size={64} className="mx-auto text-gray-200 mb-12 animate-pulse" />
           <h3 className="text-5xl font-black text-black mb-6 uppercase tracking-[-0.05em]">No Clusters Isolated</h3>
           <p className="text-gray-400 font-bold uppercase tracking-[0.4em]">Re-initialize probes or synchronize with master registry.</p>
        </div>
      )}
    </div>
  );
}
