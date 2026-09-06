import React from 'react';
import { OnSale } from '../types';

interface OnSaleRowProps {
  onSale: OnSale;
}

export const OnSaleRow: React.FC<OnSaleRowProps> = ({ onSale }) => {
  const isPresale = onSale.saleType === 'Presale';

  return (
    <div
      id={`on-sale-row-${onSale.id}`}
      className="flex justify-between items-center py-3.5 px-4 bg-white rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
    >
      <div className="flex-1 min-w-0 pr-3">
        <p
          id={`row-artist-${onSale.id}`}
          className="text-base font-black text-stone-900 truncate tracking-tight"
        >
          {onSale.artistName}
        </p>
        <p className="text-xs text-stone-600 truncate mt-0.5 font-medium">
          <span className="text-stone-900 font-bold">{onSale.venue}</span>, {onSale.city} ·{' '}
          <span className="text-rose-600 font-black">{onSale.time}</span> · {onSale.priceRange}
        </p>
      </div>

      <div className="text-right shrink-0">
        <span
          id={`row-tag-${onSale.id}`}
          className={`text-[10px] px-2.5 py-1 rounded-full border font-black uppercase tracking-wider ${
            isPresale
              ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-xs'
              : 'bg-emerald-100 text-emerald-950 border-emerald-300 shadow-xs'
          }`}
        >
          {onSale.saleType}
        </span>
        <p className="text-xs text-stone-500 mt-1 font-bold">
          {onSale.platform}
        </p>
      </div>
    </div>
  );
};
