import { MessageSquare, Plus, Settings, User } from "lucide-react";

export default function ChatSidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen p-4">
      <button className="flex items-center gap-2 w-full p-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-colors text-sm font-medium mb-6">
        <Plus size={18} />
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-2">
        <p className="text-xs font-semibold text-zinc-500 uppercase px-2 mb-2">Recent</p>
        {['Project Ideas', 'Code Review', 'Travel Plan'].map((chat) => (
          <button key={chat} className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white text-sm transition-all group">
            <MessageSquare size={16} className="group-hover:text-cyan-400" />
            <span className="truncate">{chat}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-zinc-800 space-y-1">
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-zinc-900 text-zinc-400 text-sm"><Settings size={18}/> Settings</button>
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-zinc-900 text-zinc-400 text-sm"><User size={18}/> Profile</button>
      </div>
    </aside>
  );
}