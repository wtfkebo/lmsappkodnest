"use client";
import { useEffect, useState, useMemo } from 'react';
import api from '../../../../lib/api';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, Lock, PlayCircle, ChevronLeft, ChevronRight, ArrowLeft, Target, Zap, Sparkles, Layout, Crosshair, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import KodBotSidebar from '../../../../components/KodBotSidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function LearnPage() {
  const { subjectId, videoId } = useParams();
  const router = useRouter();
  
  const [subject, setSubject] = useState<any>(null);
  const [progress, setProgress] = useState<any>({ is_completed: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, progRes] = await Promise.all([
          api.get(`/subjects/${subjectId}/tree`),
          api.get(`/progress/videos/${videoId}`)
        ]);
        setSubject(subRes.data);
        setProgress(progRes.data);
        setError('');
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError(err.response.data.error || 'Access Denied');
        } else {
          setError('Error: Unable to load the course lesson.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subjectId, videoId]);

  const allVideos = useMemo(() => {
    if (!subject) return [];
    return subject.sections.flatMap((s: any) => s.videos);
  }, [subject]);

  const currentIndex = allVideos.findIndex((v: any) => v.id === Number(videoId));
  const currentVideo = allVideos[currentIndex];
  const nextVideo = allVideos[currentIndex + 1];
  const prevVideo = allVideos[currentIndex - 1];

  const handleVideoEnded = async () => {
    try {
      await api.post(`/progress/videos/${videoId}`, { is_completed: true });
      setProgress({ ...progress, is_completed: true });
      if (nextVideo) {
        setTimeout(() => {
          router.push(`/learn/${subjectId}/${nextVideo.id}`);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgressReset = async () => {
    try {
      if (confirm('Are you sure you want to reset your progress for this lesson?')) {
        await api.post(`/progress/videos/${videoId}`, { is_completed: false });
        setProgress({ is_completed: false });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!hasMounted || loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-black overflow-hidden relative">
         <div className="absolute inset-0 bg-grid opacity-20" />
         <div className="w-24 h-24 border-2 border-black animate-spin mb-10" />
         <p className="font-black uppercase tracking-[0.5em] text-xs">Loading Lesson...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Syllabus Sidebar */}
      <div className="w-80 border-r-2 border-black bg-white shrink-0 flex flex-col relative z-20">
        <div className="p-8 border-b-2 border-black flex items-center gap-4 bg-white sticky top-0 z-30">
          <Link href={`/subjects/${subjectId}`} className="w-10 h-10 border-2 border-border hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="overflow-hidden">
             <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-1">COURSE_MENU</div>
             <h2 className="text-sm font-black uppercase tracking-tight truncate text-black">{subject?.title}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-10 custom-scrollbar mt-4">
          {subject?.sections.map((section: any, idx: number) => (
            <div key={section.id} className="space-y-6">
              <div className="px-4 py-3 bg-gray-50 border-2 border-border flex items-center justify-between group-hover:border-black transition-all">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">Part 0{idx + 1}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-black line-clamp-1">{section.title}</span>
              </div>
              <div className="space-y-2">
                {section.videos?.map((vid: any) => {
                  const isActive = vid.id === Number(videoId);
                  return (
                    <Link 
                      href={`/learn/${subjectId}/${vid.id}`}
                      key={vid.id}
                      className={`relative group flex items-center justify-between px-6 py-5 border-2 transition-all duration-500 ${
                        isActive 
                          ? 'bg-black text-white border-black shadow-[8px_8px_0px_rgba(0,0,0,0.1)] translate-x-1 translate-y-1' 
                          : 'border-border text-gray-500 hover:border-black hover:text-black hover:bg-white'
                      }`}
                    >
                      <div className="shrink-0 flex items-center justify-center relative">
                         {isActive ? <Crosshair size={18} className="text-primary" /> : <PlayCircle size={14} />}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest line-clamp-2 text-right">{vid.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Focus Layer */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative bg-grid">
        {error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
             <div className="w-24 h-24 bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center mb-12 text-red-500 rotate-45">
               <Lock size={48} className="-rotate-45" />
             </div>
             <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase leading-none">Access <br /> Denied</h2>
             <p className="text-gray-700 font-bold uppercase tracking-[0.3em] max-w-sm mx-auto mb-16">{error}</p>
             {prevVideo && (
               <Link href={`/learn/${subjectId}/${prevVideo.id}`} className="px-16 py-6 bg-black text-white font-black hover:bg-primary transition-all text-[11px] uppercase tracking-[0.5em] shadow-[15px_15px_0px_rgba(0,0,0,0.1)] hover:shadow-none">
                 GO BACK
               </Link>
             )}
          </div>
        ) : (
          <>
            {/* Header Telemetry */}
            <div className="px-12 py-10 border-b-2 border-black flex items-center justify-between bg-white relative z-10 sticky top-0">
               <div className="flex items-center gap-10">
                  <div className="label-mono text-primary flex items-center gap-3">
                     <Zap size={14} className="fill-primary" /> My Progress
                  </div>
                  <div className="h-[20px] w-48 bg-gray-100 border-2 border-black hidden md:block overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: progress.is_completed ? '100.1%' : '15%' }}
                      className="absolute inset-y-0 left-0 bg-primary"
                    />
                  </div>
               </div>

               <Link href={`/subjects/${subjectId}`} className="px-6 py-3 border-2 border-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all bg-white hidden lg:block">
                 BACK_TO_COURSE
               </Link>
            </div>

            <div className="flex-1 p-8 lg:p-20">
               <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-video bg-black border-4 border-black mb-16 shadow-[30px_30px_0px_rgba(0,0,0,0.1)] overflow-hidden flex items-center justify-center group relative h-fit max-h-[80vh] w-full"
              >
                {currentVideo?.video_url ? (
                   <video 
                     src={currentVideo.video_url} 
                     controls 
                     className="w-full h-full object-contain"
                     onEnded={handleVideoEnded}
                   />
                ) : (
                  <div className="flex flex-col items-center gap-8 text-white/20">
                     <PlayCircle size={80} />
                     <p className="font-black uppercase tracking-[1em] text-xs">VIDEO_BUFFER_EMPTY</p>
                  </div>
                )}
                
                {progress.is_completed && (
                   <div className="absolute top-8 right-8 px-6 py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-3">
                      <CheckCircle size={14} /> LESSON COMPLETE
                   </div>
                )}
               </motion.div>

               <div className="max-w-5xl mx-auto">
                  <div className="label-mono mb-6 text-primary flex items-center gap-4">
                    <Activity size={16} /> LIVE_STREAM_DATA
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter uppercase leading-tight text-black">{currentVideo?.title}</h1>
                  <p className="text-xl lg:text-2xl text-gray-700 font-black mb-16 leading-relaxed max-w-4xl uppercase tracking-tight">
                    This lesson covers technical implementation patterns and core logic for {currentVideo?.title}. 
                    Watch the full session to unlock next steps.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t-4 border-black pt-16 mt-20">
                     <div className="flex items-center gap-8">
                        {prevVideo && (
                          <Link href={`/learn/${subjectId}/${prevVideo.id}`} className="group flex flex-col items-start gap-4 hover:translate-x-2 transition-transform">
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PREVIOUS</div>
                             <div className="text-lg font-black uppercase text-black group-hover:text-primary transition-colors flex items-center gap-3">
                                <ChevronLeft size={20} /> {prevVideo.title}
                             </div>
                          </Link>
                        )}
                     </div>

                     <div className="flex items-center justify-end gap-16">
                        {nextVideo ? (
                          <Link href={`/learn/${subjectId}/${nextVideo.id}`} className="group flex flex-col items-end gap-4 hover:-translate-x-2 transition-transform">
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">NEXT_UP</div>
                             <div className="text-lg font-black uppercase text-black group-hover:text-primary transition-colors flex items-center gap-3">
                                {nextVideo.title} <ChevronRight size={20} />
                             </div>
                          </Link>
                        ) : (
                          <Link href={`/subjects/${subjectId}`} className="group flex flex-col items-end gap-4">
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">COURSE_END</div>
                             <div className="px-10 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
                                FINISH COURSE
                             </div>
                          </Link>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </>
        )}
      </div>

      <KodBotSidebar />
    </div>
  );
}
