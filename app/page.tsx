"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Zap, Terminal, Command, Menu } from 'lucide-react';
import ChatSidebar from '../components/ChatSidebar';

interface Message {
  role: 'bot' | 'user';
  content: string;
  time: string;
}

export default function CyberChat() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initializing state only on client to prevent hydration errors
  useEffect(() => {
    setMounted(true);
    setMessages([
      { 
        role: 'bot', 
        content: 'SYSTEM INITIALIZED. STANDBY FOR INPUT.', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: 'user', content: input, time: now }]);
    const currentInput = input;
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `EXPLAINING: "${currentInput}" ... [DATA RETRIEVED]`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 800);
  };

  // Prevent flash of unstyled content
  if (!mounted) return <div className="bg-[#050505] h-screen w-screen" />;

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono selection:bg-[#ff6b00] selection:text-black overflow-hidden">
      
      <ChatSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center px-4 md:px-6 justify-between bg-black/40 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-white/5 border border-white/10 rounded-lg text-[#ff6b00] transition-all active:scale-95"
            >
              <Menu size={20} />
            </button>
            
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg hidden sm:block">
                <Terminal size={18} className="text-[#ff6b00]" />
            </div>
            <div>
                <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">General_Kernel</h2>
                <p className="text-[8px] md:text-[9px] text-gray-500 font-bold tracking-widest uppercase">v.4.0.01 / Optimized</p>
            </div>
          </div>
          <Zap size={18} className="text-[#ff6b00] animate-pulse" />
        </header>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 z-10 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                msg.role === 'user' ? 'bg-[#ff6b00] border-[#ff6b00] text-black shadow-[0_0_10px_rgba(255,107,0,0.2)]' : 'bg-white/5 border-white/10 text-[#ff6b00]'
              }`}>
                {msg.role === 'user' ? <User size={14} strokeWidth={3} /> : <Bot size={14} strokeWidth={3} />}
              </div>
              
              <div className={`max-w-[85%] md:max-w-2xl space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-2.5 md:px-5 md:py-3 rounded-2xl text-[13px] md:text-sm font-bold tracking-tight leading-relaxed shadow-2xl ${
                  msg.role === 'user' 
                  ? 'bg-zinc-100 text-black rounded-tr-none' 
                  : 'bg-[#111] border border-white/10 text-gray-300 rounded-tl-none border-l-2 border-l-[#ff6b00]'
                }`}>
                  {msg.content}
                </div>
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    {msg.role === 'user' ? 'Auth_User' : 'System_Root'} • {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Terminal */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-[#050505] to-transparent z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#ff6b00]/20 rounded-[1rem] md:rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-[1rem] md:rounded-[1.5rem] overflow-hidden">
                <div className="pl-4 md:pl-6 text-gray-500 shrink-0">
                    <Command size={18} />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="EXECUTE COMMAND..."
                  className="w-full bg-transparent border-none py-4 md:py-5 px-3 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-widest focus:outline-none placeholder:text-gray-700"
                />
                <button 
                  onClick={handleSend}
                  className="mr-2 md:mr-3 p-2.5 md:p-3 bg-[#ff6b00] text-black rounded-lg md:rounded-xl hover:bg-orange-400 transition-all active:scale-95 flex items-center gap-2 px-4 md:px-5"
                >
                  <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:inline">Send</span>
                  <Send size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}