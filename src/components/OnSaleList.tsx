import React from 'react';
import { Calendar, Compass } from 'lucide-react';
import { OnSale } from '../types';
import { OnSaleRow } from './OnSaleRow';

interface OnSaleListProps {
  onSales: OnSale[];
  hasFollowedArtists: boolean;
  onNavigateToDiscover?: () => void;
}

export const OnSaleList: React.FC<OnSaleListProps> = ({
  onSales,
  hasFollowedArtists,
  onNavigateToDiscover,
}) => {
  // Requirement 8: When no artists are followed
  if (!hasFollowedArtists) {
    return (
      <div
        id="no-followed-artists-notice"
        className="rounded-3xl border-2 border-dashed border-stone-300 bg-white p-8 text-center shadow-sm"
      >
        <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3 shadow-inner">
          <Compass className="w-6 h-6" />
        </div>
        <p className="text-sm text-stone-700 max-w-sm mx-auto mb-5 leading-relaxed font-semibold">
          You are not following anyone yet. Follow an artist on Discover to see their on-sales here.
        </p>
        {onNavigateToDiscover && (
          <button
            id="go-to-discover-btn"
            type="button"
            onClick={onNavigateToDiscover}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 text-white font-black text-xs hover:opacity-95 transition-all shadow-md min-h-[42px] cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Artists</span>
          </button>
        )}
      </div>
    );
  }

  // If artists are followed but somehow have no upcoming on-sales
  if (onSales.length === 0) {
    return (
      <div
        id="empty-onsales-list"
        className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-stone-600 shadow-sm"
      >
        <p className="text-sm font-medium">No upcoming on-sales scheduled for your followed artists.</p>
      </div>
    );
  }

  // Group by dateKey, preserving chronological order (oldest first)
  const groupedSales = onSales.reduce(
    (acc: Record<string, { heading: string; items: OnSale[] }>, sale) => {
      if (!acc[sale.dateKey]) {
        acc[sale.dateKey] = {
          heading: sale.dateHeading,
          items: [],
        };
      }
      acc[sale.dateKey].items.push(sale);
      return acc;
    },
    {} as Record<string, { heading: string; items: OnSale[] }>
  );

  const sortedDateKeys = Object.keys(groupedSales).sort();

  return (
    <section id="upcoming-on-sales-section" className="space-y-4 pt-1">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-lg font-black text-stone-950 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-rose-600" />
          <span className="text-rose-700">All Upcoming On-Sales</span>
        </h3>
        <span className="text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shadow-xs">
          {onSales.length} {onSales.length === 1 ? 'drop' : 'drops'} tracked
        </span>
      </div>

      <div className="space-y-4">
        {sortedDateKeys.map((dateKey) => {
          const group = groupedSales[dateKey];
          return (
            <div key={dateKey} id={`date-group-${dateKey}`}>
              <h4
                id={`heading-${dateKey}`}
                className="text-xs uppercase tracking-wider text-rose-700 font-black mb-2.5 border-b border-stone-200 pb-1.5 flex items-center gap-1.5"
              >
                <span>📅</span>
                <span>{group.heading}</span>
              </h4>

              <div className="space-y-2.5">
                {group.items.map((sale) => (
                  <OnSaleRow key={sale.id} onSale={sale} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
