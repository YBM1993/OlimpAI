
import React from 'react';
import { OLYMPIAD_TOPICS } from '../constants';

interface SidebarProps {
  onOpenGuide: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenGuide }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen hidden md:flex flex-col p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 kazakh-blue rounded-xl flex items-center justify-center text-white font-bold text-xl">
          O
        </div>
        <h1 className="text-xl font-bold text-slate-800">Olymp<span className="kazakh-gold">AI</span></h1>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Дайындық тақырыптары</h3>
          </div>
          <div className="space-y-1">
            {OLYMPIAD_TOPICS.map((topic) => (
              <button
                key={topic.id}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-[#00AFCA] transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span>{topic.title}</span>
                </div>
                <span className={`block text-[10px] font-bold ${
                  topic.difficulty === 'Elite' ? 'text-red-500' : 
                  topic.difficulty === 'Hard' ? 'text-orange-500' : 'text-green-500'
                }`}>
                  {topic.difficulty}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Көмек</h3>
          <button 
            onClick={onOpenGuide}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all border border-transparent hover:border-blue-100 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">📖</span>
            <span className="font-semibold">Нұсқаулық</span>
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-800 font-semibold mb-1">Құрама мақсаты</p>
          <p className="text-[10px] text-blue-600">IOI 2025 дайындық. Тек АЛТЫН!</p>
          <div className="mt-2 h-1.5 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#00AFCA]" style={{ width: '65%' }}></div>
          </div>
        </div>
      </nav>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alisher" className="w-8 h-8 rounded-full bg-slate-100" alt="Avatar" />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">Алишер К.</p>
            <p className="text-xs text-slate-500">Оқушы #1337</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
