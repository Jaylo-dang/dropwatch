import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Flame, Ticket } from 'lucide-react';
import { OnSale } from '../types';

interface CountdownCardProps {
  onSale: OnSale;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ onSale }) => {
  // Target is set to two hours and fifteen minutes (2h 15m = 8100 seconds) after the app loads
  const targetTimeRef = useRef<number>(Date.now() + (2 * 60 + 15) * 60 * 1000);

  const calculateRemaining = () => {
    const diff = targetTimeRef.current - Date.now();
    return Math.max(0, diff);
  };

  const [remainingMs, setRemainingMs] = useState<number>(calculateRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = calculateRemaining();
      setRemainingMs(diff);
      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isComplete = remainingMs <= 0;

  // Format HH:MM:SS
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':');

  return (
    <article
      id="countdown-card"
      className="bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 text-white rounded-3xl p-5 sm:p-6 shadow-[0_16px_36px_rgba(244,63,94,0.32)] border-2 border-rose-400 relative overflow-hidden ring-2 ring-amber-300/40"
    >
      {/* Blazing header urgency line */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-rose-700 font-black text-xs uppercase tracking-wider shadow-sm animate-pulse">
          <Flame className="w-4 h-4 fill-rose-600 text-rose-600" />
          <span>Live Urgent Drop · Opens Today</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white font-black text-xs shadow-sm">
          <Ticket className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span>{onSale.platform}</span>
        </div>
      </div>

      {/* Artist and Venue Headline */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <h3
            id="countdown-artist-name"
            className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm"
          >
            {onSale.artistName}
          </h3>
          <span className="text-xs font-black uppercase tracking-wider text-white bg-white/20 px-2.5 py-1 rounded-lg border border-white/40">
            {onSale.saleType}
          </span>
        </div>
        <p className="text-sm text-white/95 font-medium mt-1">
          {onSale.venue}, {onSale.city} · Drop opens at{' '}
          <strong className="text-amber-200 font-black underline decoration-amber-300/60">{onSale.time}</strong>
        </p>
      </div>

      {/* High-Voltage Bright Display Box (Not a dark box) */}
      <div
        id="countdown-timer-display"
        className="bg-white border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-center shadow-lg relative overflow-hidden"
      >
        <div className="text-xs uppercase font-black tracking-widest text-rose-600 mb-1 flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>Seconds ticking until drop</span>
        </div>

        {isComplete ? (
          <div className="flex items-center justify-center gap-2 text-emerald-600 py-3">
            <Sparkles className="w-7 h-7 animate-bounce" />
            <span className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              Doors Are Open!
            </span>
          </div>
        ) : (
          <div>
            <div
              id="countdown-digits"
              className="text-4xl sm:text-6xl font-mono font-black text-stone-950 tracking-widest tabular-nums py-1"
            >
              {formattedTime}
            </div>

            <div className="flex items-center justify-center gap-8 sm:gap-14 text-[10px] sm:text-xs text-stone-600 font-mono font-black uppercase tracking-widest mt-1">
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
