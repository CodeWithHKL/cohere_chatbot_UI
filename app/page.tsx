"use client";

import React, { useState, useEffect } from 'react';
import { Bot, Zap, Terminal, Loader2, ShieldAlert, Lock, AlertTriangle, PowerOff } from 'lucide-react';

export default function CyberShutdown() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#050505] h-screen w-screen" />;

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono selection:bg-[#ff0000] selection:text-black overflow-hidden">
      {/* Sidebar removed to isolate the shutdown state */}
      
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Animated Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ff0000]/10 blur-[160px] rounded-full pointer-events-none animate-pulse" />

        {/* Header - Modified for Offline Status */}
        <header className="h-20 border-b border-white/10 flex items-center px-4 md:px-6 justify-between bg-black/40 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <Terminal size={18} className="text-[#ff0000]" />
            </div>
            <div>
                <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-red-500">UNITEN CHATBOT V6.7</h2>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                  <p className="text-[8px] md:text-[9px] text-red-700 font-bold tracking-widest uppercase">
                    System Protocol: OFFLINE
                  </p>
                </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#ff0000]">
            <span className="hidden md:block text-[9px] font-black tracking-widest opacity-40">MAINTENANCE_MODE_ACTIVE</span>
            <PowerOff size={18} className="text-red-600" />
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 z-10 space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-md flex flex-col items-center text-center max-w-lg">
              <div className="mb-6 p-4 bg-red-500/20 rounded-full border border-red-500/40">
                <ShieldAlert size={48} className="text-[#ff0000] animate-bounce" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-2">SYSTEM_SHUTDOWN</h1>
              <p className="text-gray-500 text-[10px] md:text-xs tracking-widest uppercase font-bold mb-8">
                The UNITEN Intelligence core is currently undergoing scheduled maintenance or emergency reboot.
              </p>

              <div className="grid grid-cols-1 gap-4 w-full">
                <div className="flex items-center gap-4 px-6 py-4 bg-black/60 border border-white/5 rounded-xl">
                  <Loader2 size={16} className="text-red-500 animate-spin" />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Reconstruction Status</p>
                    <p className="text-[11px] text-red-500 font-bold uppercase">Optimizing Synaptic Pathways... 0%</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 px-6 py-4 bg-black/60 border border-white/5 rounded-xl">
                  <AlertTriangle size={16} className="text-yellow-500" />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Expected Recovery</p>
                    <p className="text-[11px] text-gray-300 font-bold uppercase tracking-wider">TBD - Standing by for Host Handshake</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 opacity-40">
             <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.4em]">Encrypted Session Locked</span>
             <div className="flex gap-2">
                {[1,2,3,4,5].map((i) => (
                    <div key={i} className="h-1 w-8 bg-red-900/50 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600 animate-progress" style={{animationDelay: `${i * 0.2}s`}} />
                    </div>
                ))}
             </div>
          </div>
        </div>

        {/* Disabled Input Field UX */}
        <div className="px-4 pt-4 pb-20 md:px-8 md:pt-8 md:pb-24 bg-gradient-to-t from-[#050505] to-transparent z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative group cursor-not-allowed">
              <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-[1rem] md:rounded-[1.5rem] overflow-hidden grayscale">
                <div className="pl-4 md:pl-6 text-gray-800 shrink-0"><Lock size={18} /></div>
                
                <input
                  type="text"
                  disabled
                  placeholder="INPUT_DISABLED: CORE_OFFLINE"
                  className="w-full bg-transparent border-none py-4 md:py-6 px-3 md:px-5 text-[11px] md:text-xs font-black tracking-[0.2em] focus:outline-none placeholder:text-gray-900"
                />

                <div className="mr-2 md:mr-4 p-2.5 md:p-4 bg-gray-900 text-gray-700 rounded-lg md:rounded-xl flex items-center gap-2 px-5 md:px-8">
                  <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:inline">Locked</span>
                  <Bot size={16} className="opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles for the progress animation */}
      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s infinite linear;
        }
      `}</style>
    </div>
  );
}