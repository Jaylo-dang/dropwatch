import React from 'react';
import { Star } from 'lucide-react';
import { Artist } from '../types';

interface ArtistCardProps {
  artist: Artist;
  isFollowed: boolean;
  onToggleFollow: (artistId: string) => void;
}

interface GenreTheme {
  borderL: string;
  bgGrad: string;
  cardBorder: string;
  badge: string;
  accentText: string;
}

const GENRE_THEMES: Record<string, GenreTheme> = {
  Pop: {
    borderL: 'border-l-sky-500',
    bgGrad: 'bg-gradient-to-r from-sky-50 via-sky-50/40 to-white',
    cardBorder: 'border-sky-200 hover:border-sky-300',
    badge: 'bg-sky-100 text-sky-800 border-sky-300',
    accentText: 'text-sky-700',
  },
  Rock: {
    borderL: 'border-l-rose-500',
    bgGrad: 'bg-gradient-to-r from-rose-50 via-rose-50/40 to-white',
    cardBorder: 'border-rose-200 hover:border-rose-300',
    badge: 'bg-rose-100 text-rose-800 border-rose-300',
    accentText: 'text-rose-700',
  },
  Indie: {
    borderL: 'border-l-emerald-500',
    bgGrad: 'bg-gradient-to-r from-emerald-50 via-emerald-50/40 to-white',
    cardBorder: 'border-emerald-200 hover:border-emerald-300',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentText: 'text-emerald-700',
  },
  'Hip-hop': {
    borderL: 'border-l-purple-500',
    bgGrad: 'bg-gradient-to-r from-purple-50 via-purple-50/40 to-white',
    cardBorder: 'border-purple-200 hover:border-purple-300',
    badge: 'bg-purple-100 text-purple-800 border-purple-300',
    accentText: 'text-purple-700',
  },
  Electronic: {
    borderL: 'border-l-teal-500',
    bgGrad: 'bg-gradient-to-r from-teal-50 via-teal-50/40 to-white',
    cardBorder: 'border-teal-200 hover:border-teal-300',
    badge: 'bg-teal-100 text-teal-800 border-teal-300',
    accentText: 'text-teal-700',
  },
};

const DEFAULT_THEME: GenreTheme = {
  borderL: 'border-l-amber-500',
  bgGrad: 'bg-gradient-to-r from-amber-50 via-amber-50/40 to-white',
  cardBorder: 'border-amber-200 hover:border-amber-300',
  badge: 'bg-amber-100 text-amber-900 border-amber-300',
  accentText: 'text-amber-800',
};

export const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  isFollowed,
  onToggleFollow,
}) => {
  const theme = GENRE_THEMES[artist.genre] || DEFAULT_THEME;

  return (
    <article
      id={`artist-card-${artist.id}`}
      className={`p-3.5 rounded-2xl border border-l-4 flex justify-between items-center transition-all ${
        theme.borderL
      } ${theme.bgGrad} ${theme.cardBorder} ${
        isFollowed
          ? 'shadow-md ring-2 ring-amber-400 opacity-100'
          : 'shadow-[0_2px_8px_rgba(0,0,0,0.04)] opacity-95 hover:opacity-100 hover:shadow-md'
      }`}
    >
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-center flex-wrap gap-2">
          <h3
            id={`artist-name-${artist.id}`}
            className="text-base sm:text-lg font-black text-stone-900 tracking-tight"
          >
            {artist.name}
          </h3>
          <span
            id={`artist-genre-${artist.id}`}
            className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full border ${theme.badge}`}
          >
            {artist.genre}
          </span>
        </div>

        <p className="text-xs text-stone-600 mt-1 truncate">
          <strong className="text-stone-900 font-bold">{artist.nextShow.city}</strong>
          {' · '}
          <span className={`${theme.accentText} font-semibold`}>{artist.nextShow.venue}</span>
          {' · '}
          <span className="text-stone-700 font-medium">Next: {artist.nextOnSaleDate}</span>
        </p>

        <p className="text-[11px] text-amber-800 font-bold mt-1 flex items-center gap-1">
          <span>⚡</span>
          <span>
            {artist.upcomingCount} upcoming {artist.upcomingCount === 1 ? 'on-sale' : 'on-sales'}
          </span>
        </p>
      </div>

      {/* Follow / Following Star Button */}
      <button
        id={`toggle-follow-btn-${artist.id}`}
        type="button"
        onClick={() => onToggleFollow(artist.id)}
        aria-pressed={isFollowed}
        aria-label={isFollowed ? `Following ${artist.name}, click to unfollow` : `Follow ${artist.name}`}
        className={`p-2.5 rounded-full border transition-all shrink-0 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center ${
          isFollowed
            ? 'bg-amber-400 border-amber-400 text-stone-950 shadow-md shadow-amber-400/30 hover:bg-amber-300'
            : 'bg-white border-stone-300 hover:bg-stone-100 text-stone-400 hover:text-stone-600 shadow-xs'
        }`}
      >
        <Star
          className={`w-5 h-5 transition-transform ${
            isFollowed ? 'fill-stone-950 text-stone-950 scale-105' : 'text-stone-400'
          }`}
        />
      </button>
    </article>
  );
};
