"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import { useAuthStore } from '../../../store/authStore';
import api from '../../../lib/api';
import { motion } from 'framer-motion';
import { Database, Play, Lock, CheckCircle, ArrowLeft, Verified, Zap, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function SubjectDetail() {
  const { id } = useParams();
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await api.get(`/subjects/${id}/tree`);
        setSubject(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await api.post(`/subjects/${id}/enroll`);
      const res = await api.get(`/subjects/${id}/tree`);
      setSubject(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-background text-black font-black uppercase tracking-[0.4em] animate-pulse">Establishing Connection...</div>;
  if (!subject) return <div className="h-screen flex items-center justify-center bg-background text-black font-black uppercase tracking-[0.4em]">Error: Course Not Found</div>;

  return (
    <div className="flex h-screen overflow-hidden text-foreground relative z-10 w-full bg-background selection:bg-primary selection:text-white">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-16 pb-32">
          
          {/* Header Section */}
          <div className="mb-24 relative">
            <Link href="/dashboard/browse" className="inline-flex items-center gap-4 text-gray-600 hover:text-black transition-all text-[11px] font-black uppercase tracking-[0.4em] mb-12 group border-b border-border pb-2">
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK_TO_LIBRARY
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
               <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-[11px] mb-8 bg-primary/10 px-5 py-2.5 border-2 border-primary/20 w-fit">
                  <Database size={16} /> COURSE_INFO
               </div>
               
               <h1 className="text-6xl lg:text-[10rem] font-black mb-12 tracking-[-0.08em] uppercase leading-[0.85] text-black">{subject.title}</h1>
               <p className="text-xl lg:text-3xl text-gray-700 max-w-4xl font-black leading-tight mb-16 uppercase tracking-tight">{subject.description}</p>
               
               <div className="flex flex-wrap gap-8 items-center">
                  {!subject.is_enrolled ? (
                    <button onClick={handleEnroll} className="px-16 py-6 bg-black text-white font-black hover:bg-primary transition-all text-sm uppercase tracking-[0.3em] shadow-[15px_15px_0px_rgba(255,87,34,0.1)] hover:shadow-none">
                      ENROLL NOW
                    </button>
                  ) : (
                    <div className="px-8 py-4 bg-white border-2 border-black text-black font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-4 shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
                      <Verified size={20} className="text-primary fill-primary/10" /> ENROLLED
                    </div>
                  )}
                  <div className="px-8 py-4 bg-background border-2 border-border text-gray-600 text-[10px] font-black uppercase tracking-widest">
                    {subject.category || 'SKILL'} / {subject.sections?.length || 0} SECTIONS
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Curriculum Index */}
          <div className="space-y-16">
            <div className="flex items-center gap-6 mb-20 border-b-2 border-border pb-10">
               <div className="text-[10px] font-black uppercase tracking-[0.5em] text-black">COURSE_CONTENT</div>
               <div className="flex-1" />
               <div className="text-[10px] font-black uppercase text-gray-400">INDEX_00-0{subject.sections?.length}</div>
            </div>

            {subject.sections?.map((section: any, sIdx: number) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black p-12 lg:p-20 relative overflow-hidden group hover:shadow-[20px_20px_0px_rgba(255,87,34,0.05)] transition-all duration-700"
              >
                <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-primary transition-all duration-700" />
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                   <h3 className="text-4xl lg:text-7xl font-black text-black tracking-[-0.05em] uppercase leading-none">
                      <span className="text-[12px] font-black uppercase tracking-[0.5em] text-gray-400 block mb-6">SECTION_0{sIdx + 1}</span>
                      {section.title}
                   </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {section.videos?.map((vid: any, vIdx: number) => (
                    subject.is_enrolled ? (
                      <Link 
                        href={`/learn/${subject.id}/${vid.id}`} 
                        key={vid.id}
                        className="flex items-center justify-between px-10 py-6 bg-white border-2 border-border hover:border-black hover:bg-black hover:text-white transition-all duration-500 group/vid"
                      >
                         <div className="flex items-center gap-8">
                            <span className="text-xs font-black text-primary group-hover/vid:text-white transition-colors">0{vIdx + 1}</span>
                            <span className="text-xs font-black uppercase tracking-widest">{vid.title}</span>
                         </div>
                         <ArrowRight size={18} className="text-primary group-hover/vid:text-white group-hover/vid:translate-x-3 transition-all" />
                      </Link>
                    ) : (
                      <div 
                        key={vid.id}
                        className="flex items-center justify-between px-10 py-6 bg-gray-50 border-2 border-border opacity-60 cursor-not-allowed group/locked"
                      >
                         <div className="flex items-center gap-8">
                            <span className="text-xs font-black text-gray-400">0{vIdx + 1}</span>
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">{vid.title}</span>
                         </div>
                         <Lock size={18} className="text-gray-400" />
                      </div>
                    )
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
