"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Settings, User, Hash, Menu } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNewSession?: () => void;
}

export default function ChatSidebar({ isOpen, setIsOpen, onNewSession }: SidebarProps) {
  
  const [isSpinning, setIsSpinning] = useState(false);

  // --- AUTO CLOSE, REMOVE THIS IF NOT NEEDED, REMOVE USEEFFECT ASWELL ON TOP
  useEffect(() => {
  // 1. Check if the document is still loading
  const handleLoad = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  if (document.readyState === 'complete') {
    // If page is already loaded, start timer
    handleLoad();
  } else {
    // Wait for the window to finish loading everything (images, etc.)
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }
}, [setIsOpen]);
//----------------------
  
  const handleLogoClick = () => {
    setIsSpinning(true);
    // Add logic here if you want it to do something, e.g., redirect home
    window.open("https://hklxportfolio.vercel.app", "_blank", "noopener,noreferrer");
    
    setTimeout(() => setIsSpinning(false), 500); 
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed md:relative z-50 h-screen bg-[#080808] border-r border-white/10
        transition-all duration-300 ease-in-out flex flex-col overflow-hidden
        ${isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0'}
      `}>
        <div className="min-w-[288px] flex flex-col h-full">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              {/* TOOLTIP WRAPPER */}
              <div className="relative group flex items-center">
                {/* THE TOOLTIP (Portfolio Style) */}
                <span className="absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl z-[100]">
                  VISIT HKL
                  {/* The Arrow */}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black/90 border-l border-b border-white/10 rotate-45"></div>
                </span>

                <button 
                  onClick={handleLogoClick}
                  className={`w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-black text-black text-sm transition-transform duration-500 hover:bg-red-500 active:scale-90 ${
                    isSpinning ? "rotate-[360deg]" : "rotate-0"
                  }`}
                >
                  H
                </button>
              </div>  

              <span className="text-[10px] font-black uppercase tracking-[0.3em]">HKLX</span>
            </div>
            
            <button onClick={() => setIsOpen(false)} className="p-2 text-red-600 hover:bg-white/5 rounded-lg transition-all">
              <Menu size={20} />
            </button>
          </div>

          <div className="p-4">
            <button 
              onClick={onNewSession}
              className="w-full group flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:border-red-600/50 transition-all"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">New Session</span>
              <Plus size={16} className="text-red-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] px-2 mb-2">History</p>
              {['Eduroam_wifi_issue', 'Diddy_vs_Epstein', 'Kacip_files'].map((chat) => (
                <button key={chat} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 group transition-colors text-left">
                  <Hash size={14} className="text-gray-600 group-hover:text-red-600 shrink-0" />
                  <span className="text-xs text-gray-400 group-hover:text-white truncate font-bold uppercase tracking-tighter">{chat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-[#050505]">
            <div className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <User size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase truncate">Visitor</p>
                <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Online</p>
              </div>
              <Settings size={14} className="text-gray-500 hover:text-white cursor-pointer shrink-0" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}