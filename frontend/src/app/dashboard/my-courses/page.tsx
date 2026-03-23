"use client";
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Zap, Target, Layers, Activity } from 'lucide-react';

export default function MyCourses() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subjects/enrolled')
      .then(res => setSubjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
     return (
       <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-20">
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
      
      {/* Industrial Page Header */}
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="max-w-2xl">
           <div className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 bg-primary/10 px-4 py-2 border border-primary/20">
              <Activity size={14} /> ACTIVE_ID_SESSION
           </div>
           <h1 className="text-6xl lg:text-9xl font-black mb-10 tracking-[-0.05em] uppercase leading-[0.85]">
              SYST_LEAR <br /> <span className="text-gray-400 italic">ACTIVE.</span>
           </h1>
           <p className="text-xl lg:text-2xl text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
             Track and synchronize your active engineering sequences. Real-time telemetry connection established.
           </p>
        </div>
      </div>
      
      {subjects.length === 0 ? (
        <div className="bg-white border-[3px] border-black p-24 text-center max-w-4xl mx-auto shadow-[20px_20px_0px_rgba(255,87,34,0.1)]">
           <Layers size={64} className="mx-auto text-gray-200 mb-10" />
           <h3 className="text-4xl font-black text-black mb-6 uppercase tracking-[-0.05em]">No Active Nodes</h3>
           <p className="text-gray-500 font-bold uppercase tracking-widest mb-16 max-w-sm mx-auto leading-loose">Initialize your first module from the global registry to begin node tracking.</p>
           <Link href="/dashboard/browse" className="inline-flex items-center gap-6 px-16 py-6 bg-black text-white font-black hover:bg-primary transition-all text-xs uppercase tracking-[0.3em] shadow-[10px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-none">
              BROWSE REGISTRY <ArrowRight size={20} />
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {subjects.map((sub: any, i) => {
             const pct = sub.total_videos > 0 ? Math.round((sub.completed_videos / sub.total_videos) * 100) : 0;
             const isDone = pct >= 100;

             return (
               <motion.div 
                 key={sub.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white border-2 border-black p-12 group relative transition-all duration-500 hover:shadow-[15px_15px_0px_rgba(255,87,34,0.1)] hover:-translate-y-2 flex flex-col"
               >
                 <div className="flex items-start justify-between mb-16">
                   <div className={`w-14 h-14 border-2 flex items-center justify-center transition-all duration-500 ${isDone ? 'bg-black text-white border-black' : 'bg-white border-black text-primary'}`}>
                      <Target size={28} />
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">UNIT_NODE_{sub.id}</div>
                 </div>

                 <div className="flex-1 mb-16">
                   <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase leading-tight truncate group-hover:text-primary transition-colors">{sub.title}</h3>
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">THROUGHPUT: {pct}%</span>
                      {isDone && <Zap size={14} className="text-primary fill-primary" />}
                   </div>
                   <div className="w-full h-3 bg-gray-100 border-2 border-black relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${isDone ? 'bg-black' : 'bg-primary'}`}
                      />
                   </div>
                 </div>

                 <Link href={`/subjects/${sub.id}`} className={`flex items-center justify-between px-10 py-5 bg-black text-white hover:bg-primary transition-all duration-500 font-black text-[10px] uppercase tracking-[0.3em] group/btn ${isDone ? 'bg-gray-200 text-black shadow-none border border-black hover:bg-black hover:text-white' : 'shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-none'}`}>
                   <span>{isDone ? 'REVIEW_MODULE' : 'RESUME_SEQUENCE'}</span>
                   <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                 </Link>
               </motion.div>
             );
          })}
        </div>
      )}
    </div>
  );
}
