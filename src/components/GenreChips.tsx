import React from 'react';
import { Genre } from '../types';

interface GenreChipsProps {
  selectedGenre: Genre;
  onSelectGenre: (genre: Genre) => void;
}

const GENRES: Genre[] = ['All', 'Pop', 'Rock', 'Indie', 'Hip-hop', 'Electronic'];

const GENRE_CHIP_STYLES: Record<Genre, { active: string; inactive: string }> = {
  All: {
    active: 'bg-stone-900 text-white font-black shadow-md shadow-stone-900/20 ring-2 ring-stone-900',
    inactive: 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100 hover:text-stone-950 shadow-xs',
  },
  Pop: {
    active: 'bg-sky-500 text-white font-black shadow-md shadow-sky-500/30 ring-2 ring-sky-400',
    inactive: 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 hover:text-sky-950 shadow-xs',
  },
  Rock: {
    active: 'bg-rose-500 text-white font-black shadow-md shadow-rose-500/30 ring-2 ring-rose-400',
    inactive: 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 hover:text-rose-950 shadow-xs',
  },
  Indie: {
    active: 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500',
    inactive: 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-950 shadow-xs',
  },
  'Hip-hop': {
    active: 'bg-purple-600 text-white font-black shadow-md shadow-purple-600/30 ring-2 ring-purple-500',
    inactive: 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 hover:text-purple-950 shadow-xs',
  },
  Electronic: {
    active: 'bg-teal-600 text-white font-black shadow-md shadow-teal-600/30 ring-2 ring-teal-500',
    inactive: 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 hover:text-teal-950 shadow-xs',
  },
};

export const GenreChips: React.FC<GenreChipsProps> = ({
  selectedGenre,
  onSelectGenre,
}) => {
  return (
    <div
      id="genre-chips-container"
      className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar scroll-smooth focus:outline-none"
      role="radiogroup"
      aria-label="Filter by music genre"
    >
      {GENRES.map((genre) => {
        const isSelected = selectedGenre === genre;
        const buttonId = `genre-chip-${genre.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        const styles = GENRE_CHIP_STYLES[genre] || GENRE_CHIP_STYLES.All;

        return (
          <button
            key={genre}
            id={buttonId}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectGenre(genre)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all min-h-[36px] flex items-center justify-center whitespace-nowrap cursor-pointer ${
              isSelected ? styles.active : styles.inactive
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
};
