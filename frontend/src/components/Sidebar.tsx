"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { Home, Compass, BookOpen, User, LogOut, ChevronRight, Hash, Activity } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const executeLogout = () => {
    logout();
    router.push('/login');
  };

  const navs = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, count: '00' },
    { name: 'Explore', path: '/dashboard/browse', icon: Compass, count: '12' },
    { name: 'My Courses', path: '/dashboard/my-courses', icon: BookOpen, count: '04' },
    { name: 'Profile', path: '/dashboard/profile', icon: User, count: 'RE' },
  ];

  return (
    <>
      <AnimatePresence>
        {isLogoutModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white p-12 rounded-none border-[3px] border-black max-w-sm w-full text-center m-4 shadow-[20px_20px_0px_rgba(0,0,0,1)] selection:bg-primary selection:text-white"
            >
              <div className="w-16 h-16 bg-primary rounded-none flex items-center justify-center mx-auto mb-10 text-white shadow-[10px_10px_0px_rgba(0,0,0,1)]">
                <LogOut size={32} />
              </div>
              <h2 className="text-3xl font-black text-black mb-4 tracking-[-0.05em] uppercase">Logout?</h2>
              <p className="text-gray-700 mb-10 text-xs font-black uppercase tracking-widest leading-relaxed">Are you sure you want to sign out of your account?</p>
              <div className="space-y-4">
                <button 
                  onClick={executeLogout} 
                  className="w-full py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-[10px_10px_0px_rgba(255,87,34,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Yes, Sign Out
                </button>
                <button onClick={() => setIsLogoutModalOpen(false)} className="w-full py-5 border-2 border-black text-black font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-80 h-screen flex flex-col sticky top-0 shrink-0 z-50 p-6 bg-background border-r-2 border-border border-dashed"
      >
        <div className="h-full flex flex-col bg-white border-2 border-black p-8 shadow-[10px_10px_0px_rgba(0,0,0,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rotate-45 translate-x-16 -translate-y-16" />
          
          {/* Brand */}
          <div className="mb-20">
            <Link href="/dashboard" className="flex items-center gap-4 group">
              <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform">
                <div className="w-4 h-4 bg-white rotate-45" />
              </div>
              <span className="text-xl font-black text-black tracking-[-0.1em] uppercase">
                KodLearn / In
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <div className="label-mono mb-6 ml-4 text-black/60 font-black">MY_RESOURCES</div>
            {navs.map((n) => {
              const active = pathname === n.path;
              return (
                <Link 
                  key={n.name} 
                  href={n.path} 
                  className="relative group block"
                >
                  <div className={`relative flex items-center gap-4 px-6 py-4 transition-all duration-300 ${
                    active 
                      ? 'bg-primary text-white shadow-[8px_8px_0px_rgba(229,74,25,1)]' 
                      : 'text-gray-500 hover:text-black hover:bg-primary/5'
                  }`}>
                    <n.icon size={18} className={active ? 'text-white' : 'group-hover:translate-x-1 transition-transform'} />
                    <span className="text-[12px] uppercase tracking-[0.2em] font-black">{n.name}</span>
                    <span className={`ml-auto text-[9px] font-black opacity-40 ${active ? 'text-white' : 'text-gray-400'}`}>{n.count}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* User Module Card */}
          <div className="mt-auto space-y-6">
            <div className="p-6 border-2 border-border bg-background flex flex-col gap-4 group/card hover:border-black transition-all">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-black rounded-none flex items-center justify-center text-white scale-100 group-hover/card:scale-110 group-hover/card:bg-primary transition-all">
                    <User size={18} />
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-[12px] font-black text-black uppercase tracking-widest truncate">
                       {user?.name || 'AUTHORIZED_NODE'}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" /> Active Student
                    </div>
                 </div>
              </div>
              
              <button 
                onClick={() => setIsLogoutModalOpen(true)} 
                className="w-full flex items-center justify-center gap-3 py-4 border-2 border-black hover:bg-black hover:text-white text-black font-black transition-all text-[11px] uppercase tracking-widest bg-white"
              >
                Sign Out
              </button>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-black/40 uppercase overflow-hidden whitespace-nowrap">
               APP_VERSION <Activity size={10} className="text-primary" /> 0.2.1-RES
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
