import React from 'react';
import { Compass, Ticket } from 'lucide-react';

interface TabBarProps {
  activeTab: 'discover' | 'my-drops';
  onTabChange: (tab: 'discover' | 'my-drops') => void;
  followedCount: number;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  followedCount,
}) => {
  return (
    <nav
      id="tab-bar-nav"
      aria-label="Screen navigation"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200"
    >
      <div className="max-w-xl mx-auto px-4 py-3">
        <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shadow-inner">
          <button
            id="tab-discover-btn"
            type="button"
            onClick={() => onTabChange('discover')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Discover</span>
          </button>

          <button
            id="tab-my-drops-btn"
            type="button"
            onClick={() => onTabChange('my-drops')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'my-drops'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Ticket className="w-4 h-4 shrink-0" />
            <span>My drops</span>
            {followedCount > 0 && (
              <span
                id="my-drops-badge"
                className="ml-1.5 inline-flex items-center justify-center px-2 py-0.5 text-xs font-black rounded-full bg-amber-400 text-stone-950 shadow-sm"
              >
                {followedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
