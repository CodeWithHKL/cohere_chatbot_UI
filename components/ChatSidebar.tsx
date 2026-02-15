"use client";

import React from 'react';
import { Plus, Settings, User, Hash, Menu, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ChatSidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
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
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center font-black text-black shadow-[0_0_15px_rgba(255,107,0,0.3)]">H</div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Link</span>
            </div>
            
            {/* The Hamburger INSIDE the sidebar (Mobile/Desktop Close Trigger) */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 text-[#ff6b00] hover:bg-white/5 rounded-lg transition-all duration-500 transform rotate-180"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="p-4">
            <button className="w-full group flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#ff6b00]/50 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">New Session</span>
              <Plus size={16} className="text-[#ff6b00]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] px-2 mb-2">History</p>
              {['Architecture_Log', 'Database_Schema', 'API_Refactor'].map((chat) => (
                <button key={chat} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 group transition-colors text-left">
                  <Hash size={14} className="text-gray-600 group-hover:text-[#ff6b00] shrink-0" />
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
                <p className="text-[10px] font-black uppercase truncate">Visitor_01</p>
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