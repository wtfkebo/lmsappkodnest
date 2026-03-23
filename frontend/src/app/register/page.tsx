"use client";
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Zap, Target, BookOpen, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../lib/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: storeLogin } = useAuthStore();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', { name, email, password });
      storeLogin(res.data.user, res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden text-foreground bg-background selection:bg-primary selection:text-white">
      {/* Left side: Industrial Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-between p-24 overflow-hidden relative">
         <div className="absolute inset-0 bg-grid-white opacity-10" />
         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-40" />
         
         <div className="relative z-10 flex flex-col h-full justify-between">
           <Link href="/" className="inline-flex items-center gap-6 group">
             <div className="w-12 h-12 bg-primary flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all duration-700">
                <Target size={24} className="text-white -rotate-45 group-hover:rotate-0 transition-all" />
             </div>
             <span className="text-3xl font-black text-white tracking-[-0.1em] uppercase">KODLEARN / ACADEMY</span>
           </Link>

            <div>
              <h1 className="text-[8rem] font-black text-white mb-12 tracking-[-0.12em] uppercase leading-[0.8] mix-blend-difference">
                 JOIN <br />
                 <span className="text-primary italic">US.</span>
              </h1>
              <p className="text-gray-400 max-w-xl font-bold uppercase tracking-[0.4em] text-[10px] leading-relaxed">
                 Create your student profile and join thousands of developers mastering modern skills at scale.
              </p>
            </div>

            <div className="flex gap-16">
               {[
                  { label: 'NETWORK', val: 'OPEN' },
                  { label: 'VERSION', val: '2.5.1' },
                  { label: 'STATUS', val: 'STABLE' }
               ].map(s => (
                  <div key={s.label}>
                     <p className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">{s.label}</p>
                     <p className="text-sm font-black text-white uppercase tracking-widest">{s.val}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Right side: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 relative z-10 w-full lg:w-1/2 overflow-y-auto py-20 custom-scrollbar">
        <Link href="/login" className="absolute top-12 right-12 text-gray-700 hover:text-black transition-all text-[11px] font-black uppercase tracking-[0.4em] border-b-2 border-border pb-2 hover:border-black">
          &larr; Already have an account?
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-16 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Course Registration</div>
            <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase leading-none text-black">Get Started</h2>
            <p className="text-gray-700 text-xs font-black uppercase tracking-[0.5em] leading-loose">Create your account and begin your journey.</p>
          </div>
          
          {error && (
            <div className="mb-10 p-6 border-2 border-primary bg-primary/5 text-primary text-center text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4">
              <Zap size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] ml-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white border-2 border-black py-6 pl-16 pr-8 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.02)] placeholder:text-black/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] ml-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border-2 border-black py-6 pl-16 pr-8 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.02)] placeholder:text-black/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] ml-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-black py-6 pl-16 pr-8 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.02)] placeholder:text-black/20"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-8 px-10 font-black text-xs uppercase tracking-[0.6em] transition-all hover:bg-primary flex items-center justify-center gap-6 shadow-[15px_15px_0px_rgba(255,87,34,0.1)] hover:shadow-none translate-y-0 active:translate-y-2 group"
            >
              CREATE ACCOUNT <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
            </button>
          </form>

          <div className="mt-16 pt-12 border-t-2 border-border border-dashed text-center">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mb-6">Secure your future today.</p>
             <Link href="/login" className="inline-flex items-center gap-4 text-xs font-black text-black hover:text-primary transition-all uppercase tracking-widest border-b-2 border-black pb-1">
                Back to Sign In <Zap size={14} />
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
