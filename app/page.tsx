"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Hash, 
  Settings, Plus, Zap, Sparkles, 
  ChevronRight, Terminal, Command 
} from 'lucide-react';

export default function CyberChat() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'SYSTEM INITIALIZED. STANDBY FOR INPUT.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    // Fake "Processing" Delay
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: `EXPLAINING: "${input}" ... [DATA RETRIEVED]` }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono selection:bg-[#ff6b00] selection:text-black">
      
      {/* 1. CYBER SIDEBAR */}
      <aside className="w-72 border-r border-white/10 flex flex-col bg-[#080808] hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center font-black text-black">H</div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Link</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <button className="w-full group flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#ff6b00]/50 transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">New Session</span>
            <Plus size={16} className="text-[#ff6b00]" />
          </button>

          <div className="space-y-1">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] px-2 mb-2">History</p>
            {['Architecture_Log', 'Database_Schema', 'API_Refactor'].map((chat) => (
              <button key={chat} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 group transition-colors">
                <Hash size={14} className="text-gray-600 group-hover:text-[#ff6b00]" />
                <span className="text-xs text-gray-400 group-hover:text-white truncate font-bold uppercase tracking-tighter">{chat}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-[#050505]">
            <div className="flex items-center gap-3 p-2">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <User size={16} />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase">Visitor_01</p>
                    <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Online</p>
                </div>
                <Settings size={14} className="text-gray-500 hover:text-white cursor-pointer" />
            </div>
        </div>
      </aside>

      {/* 2. CHAT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Glow Effect Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center px-8 justify-between bg-black/40 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                <Terminal size={18} className="text-[#ff6b00]" />
            </div>
            <div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">General_Kernel</h2>
                <p className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">v.4.0.01 / Optimized for performance</p>
            </div>
          </div>
          <Zap size={18} className="text-[#ff6b00] animate-pulse" />
        </header>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 z-10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                msg.role === 'user' ? 'bg-[#ff6b00] border-[#ff6b00] text-black' : 'bg-white/5 border-white/10 text-[#ff6b00]'
              }`}>
                {msg.role === 'user' ? <User size={16} strokeWidth={3} /> : <Bot size={16} strokeWidth={3} />}
              </div>
              
              <div className={`max-w-2xl space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-5 py-3 rounded-2xl text-sm font-bold tracking-tight leading-relaxed shadow-2xl ${
                  msg.role === 'user' 
                  ? 'bg-white text-black rounded-tr-none' 
                  : 'bg-[#111] border border-white/10 text-gray-300 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    {msg.role === 'user' ? 'Auth_User' : 'System_Root'} • 10:04 PM
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Terminal */}
        <div className="p-6 bg-gradient-to-t from-[#050505] to-transparent z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#ff6b00]/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-[1.5rem] overflow-hidden">
                <div className="pl-6 text-gray-500">
                    <Command size={18} />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="EXECUTE COMMAND..."
                  className="w-full bg-transparent border-none py-5 px-4 text-xs font-black uppercase tracking-widest focus:outline-none placeholder:text-gray-700"
                />
                <button 
                  onClick={handleSend}
                  className="mr-3 p-3 bg-[#ff6b00] text-black rounded-xl hover:bg-orange-400 transition-all active:scale-95 flex items-center gap-2 px-5"
                >
                  <span className="text-[10px] font-black uppercase tracking-tighter">Send</span>
                  <Send size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 px-2">
                <div className="flex gap-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-1"><Sparkles size={10}/> AI-Sync</span>
                    <span className="flex items-center gap-1"><Terminal size={10}/> Node_20</span>
                </div>
                <p className="text-[9px] text-gray-700 font-bold uppercase italic">
                    Encrypted Connection Stable
                </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}