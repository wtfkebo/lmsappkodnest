"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Globe, Cpu, Database, Layers, Sparkles, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-white bg-background overflow-x-hidden">
      
      {/* Heavy Structural Nav */}
      <nav className="fixed top-0 w-full z-[100] border-b-2 border-black bg-white px-8 lg:px-20 py-8 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
           <div className="w-10 h-10 bg-black flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all duration-700">
              <div className="w-5 h-5 bg-white rotate-45 group-hover:bg-primary transition-colors" />
           </div>
           <span className="text-2xl font-black tracking-[-0.12em] uppercase">KODLEARN / ACADEMY</span>
        </div>
        <div className="flex items-center gap-16">
           <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors hidden md:block">Login [ACCESS]</Link>
           <Link href="/register" className="bg-black text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-none">
              Get Started
           </Link>
        </div>
      </nav>

      <section className="pt-60 pb-40 px-8 lg:px-20 max-w-[1600px] mx-auto min-h-screen flex flex-col justify-center relative">
        <div className="absolute top-40 right-10 text-[10rem] font-black text-black/5 pointer-events-none select-none uppercase tracking-[-0.1em] text-right leading-none hidden xl:block">
           INDUSTRIAL <br /> MASTERY.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-end mb-40 relative z-10">
           <div className="lg:col-span-8">
           <div className="inline-flex items-center gap-6 text-primary font-black uppercase tracking-[0.6em] text-[12px] mb-12 border-l-4 border-primary pl-8">
              <Activity size={18} /> LATEST_VERSION / ACTIVE
           </div>
           <h1 className="text-8xl lg:text-[14rem] font-black leading-[0.8] uppercase tracking-[-0.08em] mb-16">
              MODERN <br />
              <span className="text-primary italic">SKILLS.</span>
           </h1>
           <p className="text-2xl lg:text-4xl font-medium max-w-3xl leading-snug text-gray-700 mb-20 uppercase tracking-tighter">
              A premium learning platform built for modern developers who want to master new technologies.
           </p>
           <div className="flex flex-wrap gap-10">
              <Link href="/register" className="group bg-primary text-white border-2 border-black px-16 py-8 text-xs font-black uppercase tracking-[0.4em] hover:bg-black transition-all flex items-center gap-6 shadow-[20px_20px_0px_rgba(255,87,34,0.15)] hover:shadow-none">
                 START_LEARNING <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
              </Link>
              <Link href="/login" className="px-16 py-8 border-[3px] border-black text-xs font-black uppercase tracking-[0.4em] hover:bg-gray-50 transition-all flex items-center gap-4">
                 Sign In <Activity size={18} className="text-primary" />
              </Link>
           </div>
           </div>
           
           <div className="lg:col-span-4 hidden lg:block">
              <div className="p-12 border-[3px] border-black bg-white space-y-10 relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 w-4 h-full bg-primary" />
                 <div className="text-[12px] font-black text-gray-300 uppercase tracking-[0.6em] mb-8">System_Metrics</div>
                 {[
                    { label: 'NODES_ACTIVE', val: '412+', icon: Database },
                    { label: 'THROUGH_RT', val: '99.9%', icon: Zap },
                    { label: 'SYNC_CLOCK', val: '12MS', icon: Cpu }
                 ].map((m, i) => (
                    <div key={i} className="flex justify-between items-end border-b-2 border-border pb-6 group-hover:border-primary transition-all">
                       <div className="flex items-center gap-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest"><m.icon size={16} className="text-primary" /> {m.label}</div>
                       <div className="text-4xl font-black tracking-tighter text-black">{m.val}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Feature Grid with Industrial Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-60">
           <div className="card-nexus p-16 flex flex-col justify-between min-h-[500px] hover:shadow-[30px_30px_0px_rgba(255,87,34,0.1)] border-[3px] border-black">
              <div className="w-20 h-20 border-2 border-black flex items-center justify-center text-primary mb-20 bg-primary/5">
                 <Code size={40} />
              </div>
              <div>
                 <h3 className="text-5xl font-black mb-8 uppercase tracking-[-0.05em] leading-none">Quantum <br /> Logic</h3>
                 <p className="text-gray-400 font-bold text-sm leading-loose uppercase tracking-widest">Deep synchronization with industrial-scale architectures. No abstractions. Only logic.</p>
              </div>
           </div>

           <div className="card-nexus p-16 bg-black text-white flex flex-col justify-between min-h-[500px] shadow-[30px_30px_0px_rgba(0,0,0,0.1)] border-[3px] border-black group">
              <Zap className="text-primary mb-20 group-hover:scale-110 transition-transform origin-left" size={64} />
              <div>
                 <h3 className="text-5xl font-black mb-8 uppercase tracking-[-0.05em] leading-none">LEARN <br /> FAST</h3>
                 <p className="text-gray-500 font-bold text-sm leading-loose uppercase tracking-widest">Our curriculum is designed for speed. Master new frameworks in days, not months.</p>
              </div>
           </div>

           <div className="card-nexus p-16 flex flex-col justify-between min-h-[500px] bg-primary text-white border-[3px] border-black shadow-[30px_30px_0px_rgba(255,87,34,0.2)]">
              <Layers className="opacity-20 mb-20" size={80} />
              <div>
                 <h3 className="text-5xl font-black mb-8 uppercase tracking-[-0.05em] leading-none">Global <br /> Community</h3>
                 <p className="text-white/60 font-bold text-sm leading-loose uppercase tracking-widest">Connect with a worldwide network of ambitious learners and expert developers.</p>
                 <Link href="/register" className="mt-12 inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] bg-white text-black px-10 py-5 hover:bg-black hover:text-white transition-all">
                    Join Today <ArrowRight size={18} />
                 </Link>
              </div>
           </div>
        </div>

        {/* Closing Action */}
        <div className="border-t-[3px] border-black pt-40 pb-20 flex flex-col items-center text-center">
            <Sparkles size={80} className="text-primary mb-12 opacity-20" />
            <h2 className="text-7xl lg:text-[9rem] font-black mb-12 tracking-[-0.1em] uppercase leading-none">ENROLL_NOW.</h2>
            <p className="text-gray-400 max-w-2xl font-black uppercase tracking-[0.5em] text-sm mb-20 leading-relaxed">
               The industrial system is open. Synchronize your career with the new grid of mastery. 
            </p>
            <div className="flex gap-8">
               <Link href="/register" className="px-20 py-8 bg-black text-white font-black text-xs uppercase tracking-[0.6em] hover:bg-primary transition-all shadow-[15px_15px_0px_rgba(0,0,0,0.1)] hover:shadow-none">Initialize_Registry</Link>
            </div>
        </div>

        <footer className="mt-40 pt-20 border-t-2 border-border flex flex-col md:flex-row justify-between items-center gap-12 text-gray-300 font-black uppercase tracking-[0.4em] text-[10px]">
           <div className="flex items-center gap-6">
              <div className="w-8 h-8 bg-black flex items-center justify-center rotate-45">
                 <div className="w-4 h-4 bg-white rotate-45" />
              </div>
              <span>KODLEARN // 2026 OFFICIAL</span>
           </div>
           <div className="flex gap-12">
              <Link href="#" className="hover:text-primary transition-colors">Safety_Protocol</Link>
              <Link href="#" className="hover:text-primary transition-colors">Access_Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Telemetry</Link>
           </div>
        </footer>
      </section>
    </div>
  );
}
