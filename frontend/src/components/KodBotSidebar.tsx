"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Send, Bot, User, Sparkles, Loader2, Maximize2, Minimize2, Activity, Hash, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/api';
import ReactMarkdown from 'react-markdown';

export default function KodBotSidebar() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: `Hi there! I'm **KodBot**, your study assistant. How can I help you learn today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const pageContext = typeof document !== 'undefined' ? document.title : 'General LMS Platform';
      const res = await api.post('/chat/ai', { message: userMessage, context: pageContext });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '⚠️ *AI assistant is currently offline. Please try again soon.*' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ width: 340 }}
      animate={{ width: expanded ? 480 : 340 }}
      className="hidden lg:flex flex-col border-l-2 border-border bg-white shrink-0 h-screen sticky top-0 z-40 selection:bg-primary selection:text-white"
    >
      {/* Header */}
      <div className="p-8 border-b-2 border-black flex items-center justify-between bg-white relative group">
        <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-primary transition-all duration-700" />
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform">
            <Bot size={22} className="text-white -rotate-45 group-hover:rotate-0 transition-transform" />
          </div>
          <div>
            <h3 className="font-black text-black tracking-[-0.05em] uppercase text-sm flex items-center gap-1.5 leading-none">
              KodBot / AI
            </h3>
            <p className="text-[9px] text-gray-500 font-black tracking-[0.3em] uppercase mt-1">Smart Assistant</p>
          </div>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-10 h-10 border-2 border-border hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Identity Node Info */}
      <div className="p-6 border-b-2 border-border border-dashed flex items-center gap-4">
         <div className="w-10 h-10 border-2 border-black bg-background flex items-center justify-center shrink-0 group">
            <User size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
         </div>
         <div className="overflow-hidden">
            <p className="text-[10px] font-black text-black uppercase tracking-widest truncate">{user?.name || 'Authorized Node'}</p>
            <div className="flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-[0.3em]">
               <Activity size={10} className="animate-pulse" /> AI IS READY
            </div>
         </div>
      </div>

      {/* Chat Interface */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar bg-grid">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex flex-col w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-center gap-3 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-6 h-6 border-2 flex items-center justify-center ${msg.role === 'user' ? 'border-primary bg-primary text-white' : 'border-black bg-white text-black'}`}>
                {msg.role === 'user' ? <Hash size={12} /> : <Zap size={12} />}
              </div>
              <span className="text-[11px] uppercase tracking-[0.4em] text-black/60 font-black">
                {msg.role === 'user' ? 'YOU' : 'KODBOT'}
              </span>
            </div>
            
            <div className={`p-6 border-2 max-w-[95%] min-w-[50%] transition-all ${
              msg.role === 'user' 
                ? 'bg-black text-white border-black shadow-[10px_10px_0px_rgba(0,0,0,0.1)]' 
                : 'bg-white border-black text-black shadow-[10px_10px_0px_rgba(255,87,34,0.05)]'
            }`}>
              <div className="prose prose-sm max-w-none text-inherit font-medium leading-relaxed uppercase tracking-wide text-[11px]">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start italic">
             <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border-2 border-primary animate-spin" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-primary font-black">THINKING...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Command Input Area */}
      <div className="p-6 border-t-2 border-black bg-white">
        <form onSubmit={handleSend} className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full bg-background border-2 border-black py-6 pl-8 pr-16 text-[12px] font-black uppercase tracking-widest text-black focus:outline-none focus:border-primary transition-all placeholder:text-black/20"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-black hover:bg-primary text-white flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
          </button>
        </form>
        <p className="text-center text-[10px] text-black/40 mt-5 font-black uppercase tracking-[0.4em]">
           AI may sometimes provide inaccurate info.
        </p>
      </div>

    </motion.div>
  );
}
