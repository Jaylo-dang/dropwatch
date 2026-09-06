import React, { useState } from 'react';
import { Bell, CheckCircle2, RotateCcw } from 'lucide-react';
import { OnSale } from '../types';

interface ReminderCardProps {
  onSale: OnSale;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({ onSale }) => {
  const [status, setStatus] = useState<'initial' | 'confirmed' | 'dismissed'>('initial');

  // Dismissed collapsed single-line state
  if (status === 'dismissed') {
    return (
      <div
        id="reminder-card-dismissed"
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white border border-stone-300 text-stone-700 text-xs shadow-sm"
      >
        <span className="truncate">
          Reminder dismissed for <strong className="text-stone-950 font-bold">{onSale.artistName}</strong> tomorrow
        </span>
        <button
          id="reminder-undo-btn"
          type="button"
          onClick={() => setStatus('initial')}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors min-h-[36px] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Undo</span>
        </button>
      </div>
    );
  }

  // Confirmed state
  if (status === 'confirmed') {
    return (
      <div
        id="reminder-card-confirmed"
        className="rounded-3xl bg-emerald-50 border-2 border-emerald-500 p-5 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-base font-black text-emerald-950">
              You&apos;re in. The countdown starts when the doors open.
            </p>
            <p className="text-xs text-emerald-800 mt-1 font-semibold">
              {onSale.artistName} · {onSale.venue}, {onSale.city} · {onSale.dateHeading} at {onSale.time} on {onSale.platform} · {onSale.priceRange}
            </p>
          </div>
        </div>
        <button
          id="reminder-change-btn"
          type="button"
          onClick={() => setStatus('initial')}
          className="self-end sm:self-center text-xs font-black text-emerald-800 hover:text-emerald-950 underline underline-offset-2 py-1 cursor-pointer"
        >
          Change
        </button>
      </div>
    );
  }

  // Initial High-Adrenaline Tomorrow Card
  return (
    <article
      id="reminder-card-initial"
      className="bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 rounded-3xl p-5 sm:p-6 shadow-md border-2 border-indigo-400 text-white relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="p-1 rounded-md bg-amber-400 text-stone-950 font-black">
              <Bell className="w-3.5 h-3.5 fill-stone-950" />
            </span>
            <p className="text-xs uppercase tracking-wider font-black text-amber-300">
              On sale tomorrow
            </p>
          </div>
          <h3
            id="reminder-artist-name"
            className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm"
          >
            {onSale.artistName}
          </h3>
          <p className="text-sm text-indigo-100 mt-1 font-medium">
            {onSale.venue}, {onSale.city} · {onSale.dateHeading}, {onSale.time}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="inline-block text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/40">
            {onSale.platform}
          </span>
          <p className="text-xs text-amber-300 font-black mt-1.5">{onSale.priceRange}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
        <button
          id="reminder-going-btn"
          type="button"
          onClick={() => setStatus('confirmed')}
          className="flex-1 bg-amber-400 hover:bg-amber-300 text-stone-950 py-3 px-5 rounded-2xl font-black text-sm shadow-md transition-all min-h-[46px] cursor-pointer flex items-center justify-center"
        >
          <span>I&apos;m going for it</span>
        </button>
        <button
          id="reminder-dismiss-btn"
          type="button"
          onClick={() => setStatus('dismissed')}
          className="px-5 py-3 border-2 border-white/60 hover:bg-white/20 text-white rounded-2xl font-bold text-sm transition-all min-h-[46px] cursor-pointer flex items-center justify-center"
        >
          <span>Not this one</span>
        </button>
      </div>
    </article>
  );
};
