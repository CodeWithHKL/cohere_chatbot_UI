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

  // Handle Hydration and Initial System Message
  useEffect(() => {
    setMounted(true);
    setMessages([
      { 
        role: 'bot', 
        content: 'SYSTEM INITIALIZED. NEURAL LINK ESTABLISHED.', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  }, []);

  // Auto-scroll to bottom
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
    
    // Simulated Bot Latency
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `KERNEL_RESPONSE: Processing "${currentInput}"... [SUCCESS]`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 800);
  };

  if (!mounted) return <div className="bg-[#050505] h-screen w-screen" />;

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono selection:bg-[#ff6b00] selection:text-black overflow-hidden">
      
      {/* SIDEBAR COMPONENT */}
      <ChatSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col relative min-w-0">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ff6b00]/5 blur-[140px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <header className="h-20 border-b border-white/10 flex items-center px-4 md:px-6 justify-between bg-black/40 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-4">
            
            {/* TOGGLE BUTTON (Visible only when sidebar is CLOSED) */}
            <div className={`transition-all duration-500 ease-in-out ${sidebarOpen ? 'opacity-0 scale-0 w-0 pointer-events-none' : 'opacity-100 scale-100 w-auto'}`}>
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 hover:bg-white/5 border border-white/10 rounded-lg text-[#ff6b00] transition-transform duration-500 hover:rotate-90 active:scale-95"
              >
                <Menu size={20} />
              </button>
            </div>
            
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg hidden sm:block">
                <Terminal size={18} className="text-[#ff6b00]" />
            </div>
            
            <div className="min-w-0">
                <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] truncate">General_Kernel</h2>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[8px] md:text-[9px] text-gray-500 font-bold tracking-widest uppercase">v.4.0.01 / Secure</p>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#ff6b00]">
            <span className="hidden md:block text-[9px] font-black tracking-widest opacity-40">ENCRYPTION: AES-256</span>
            <Zap size={18} className="animate-pulse" />
          </div>
        </header>

        {/* MESSAGES AREA */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 z-10 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 md:gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar Icon */}
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                msg.role === 'user' 
                ? 'bg-[#ff6b00] border-[#ff6b00] text-black shadow-[0_0_15px_rgba(255,107,0,0.3)]' 
                : 'bg-white/5 border-white/10 text-[#ff6b00]'
              }`}>
                {msg.role === 'user' ? <User size={16} strokeWidth={3} /> : <Bot size={16} strokeWidth={3} />}
              </div>
              
              {/* Message Content */}
              <div className={`max-w-[85%] md:max-w-2xl space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-3 md:px-6 md:py-4 rounded-2xl text-[13px] md:text-sm font-bold tracking-tight leading-relaxed shadow-2xl transition-all ${
                  msg.role === 'user' 
                  ? 'bg-zinc-100 text-black rounded-tr-none' 
                  : 'bg-[#0f0f0f] border border-white/10 text-gray-300 rounded-tl-none border-l-2 border-l-[#ff6b00]'
                }`}>
                  {msg.content}
                </div>
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2 justify-end">
                   <span className="opacity-40">{msg.time}</span>
                   <span className={msg.role === 'user' ? 'text-white/60' : 'text-[#ff6b00]/60'}>
                     // {msg.role === 'user' ? 'Auth_User' : 'System_Root'}
                   </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT TERMINAL */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-[#050505] to-transparent z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              {/* Glow effect on focus */}
              <div className="absolute -inset-1 bg-[#ff6b00]/20 rounded-[1rem] md:rounded-[2rem] blur-lg opacity-0 group-focus-within:opacity-100 transition duration-700"></div>
              
              <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-[1rem] md:rounded-[1.5rem] overflow-hidden backdrop-blur-md">
                <div className="pl-4 md:pl-6 text-gray-500 shrink-0">
                    <Command size={18} />
                </div>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="EXECUTE COMMAND..."
                  className="w-full bg-transparent border-none py-4 md:py-6 px-3 md:px-5 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] focus:outline-none placeholder:text-gray-800"
                />

                <button 
                  onClick={handleSend}
                  className="mr-2 md:mr-4 p-2.5 md:p-4 bg-[#ff6b00] text-black rounded-lg md:rounded-xl hover:bg-orange-400 transition-all active:scale-90 flex items-center gap-2 px-5 md:px-8 shadow-[0_0_20px_rgba(255,107,0,0.2)]"
                >
                  <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:inline">Execute</span>
                  <Send size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-[7px] md:text-[8px] text-center text-gray-600 font-bold uppercase tracking-[0.4em]">
              Authorized Access Only • Secure Neural Encryption Active
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}