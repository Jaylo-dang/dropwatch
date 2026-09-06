import React, { useState } from 'react';
import { ARTISTS, INITIAL_FOLLOWED_ARTIST_IDS, ON_SALES } from './data';
import { Genre } from './types';
import { TabBar } from './components/TabBar';
import { GenreChips } from './components/GenreChips';
import { ArtistList } from './components/ArtistList';
import { ReminderCard } from './components/ReminderCard';
import { CountdownCard } from './components/CountdownCard';
import { OnSaleList } from './components/OnSaleList';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-drops'>('discover');
  const [followedArtistIds, setFollowedArtistIds] = useState<string[]>(INITIAL_FOLLOWED_ARTIST_IDS);
  const [selectedGenre, setSelectedGenre] = useState<Genre>('All');

  // Toggle follow state for an artist
  const handleToggleFollow = (artistId: string) => {
    setFollowedArtistIds((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId]
    );
  };

  // Filter artists based on selected genre chip
  const filteredArtists = selectedGenre === 'All'
    ? ARTISTS
    : ARTISTS.filter((artist) => artist.genre === selectedGenre);

  // Screen 2 drops
  const tomorrowOnSale = ON_SALES.find((sale) => sale.isTomorrowDrop) || ON_SALES[1];
  const todayOnSale = ON_SALES.find((sale) => sale.isTodayDrop) || ON_SALES[0];

  // Followed upcoming on-sales for Screen 2
  const followedOnSales = ON_SALES.filter((sale) =>
    followedArtistIds.includes(sale.artistId)
  );

  // Check if today's and tomorrow's artists are followed
  const isTodayArtistFollowed = todayOnSale && followedArtistIds.includes(todayOnSale.artistId);
  const isTomorrowArtistFollowed = tomorrowOnSale && followedArtistIds.includes(tomorrowOnSale.artistId);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col justify-start items-center p-0 sm:p-6 font-sans antialiased selection:bg-amber-300 selection:text-stone-950">
      {/* Centered App Container with Warm Light Palette & Soft Shadows */}
      <div className="w-full max-w-xl bg-white sm:rounded-3xl border sm:border-stone-200/90 flex flex-col sm:shadow-[0_12px_44px_rgba(0,0,0,0.08)] overflow-hidden min-h-screen sm:min-h-[768px]">
        {/* Top Tab Bar */}
        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          followedCount={followedArtistIds.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full flex flex-col">
          {activeTab === 'discover' ? (
            <section id="screen-discover" className="flex flex-col flex-1">
              {/* Header: "DropWatch" with subline "Following X of 9 artists" */}
              <header id="discover-header" className="px-5 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-rose-500 text-white border-b border-stone-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <h1
                    id="app-title"
                    className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2"
                  >
                    <span>DropWatch</span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047] animate-pulse"></span>
                  </h1>
                </div>
                <p
                  id="following-count-line"
                  className="text-xs sm:text-sm text-purple-100 border-t border-white/20 mt-2 pt-1.5 font-medium"
                >
                  Following <strong className="text-amber-300 font-black">{followedArtistIds.length}</strong> of {ARTISTS.length} artists
                </p>
              </header>

              <div className="p-5 space-y-4 flex-1 bg-[#faf8f5]">
                {/* Genre Chips */}
                <div id="discover-genre-filter">
                  <GenreChips
                    selectedGenre={selectedGenre}
                    onSelectGenre={setSelectedGenre}
                  />
                </div>

                {/* Exactly 9 Artist Cards (filtered by genre) */}
                <ArtistList
                  artists={filteredArtists}
                  followedArtistIds={followedArtistIds}
                  onToggleFollow={handleToggleFollow}
                />
              </div>
            </section>
          ) : (
            <section id="screen-my-drops" className="flex flex-col flex-1">
              <header id="my-drops-header" className="px-5 py-4 bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white border-b border-stone-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                    <span>My drops</span>
                    <span className="text-xs uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-white/25 text-white border border-white/40">
                      Live
                    </span>
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-rose-100 border-t border-white/20 mt-2 pt-1.5 font-medium">
                  Live drops and upcoming on-sales for your followed artists
                </p>
              </header>

              {followedArtistIds.length === 0 ? (
                /* When no artists are followed at all: show ONLY the notice line, no countdown, no reminder, no on-sale list */
                <div className="p-6 flex-1 flex flex-col justify-center items-center bg-[#faf8f5]">
                  <div
                    id="no-followed-artists-notice"
                    className="w-full rounded-3xl border-2 border-dashed border-stone-300 bg-white p-8 text-center shadow-sm"
                  >
                    <p
                      id="no-followed-artists-line"
                      className="text-base text-stone-700 max-w-sm mx-auto leading-relaxed font-semibold mb-4"
                    >
                      You are not following anyone yet. Follow an artist on Discover to see their on-sales here.
                    </p>
                    <button
                      id="go-to-discover-btn"
                      type="button"
                      onClick={() => setActiveTab('discover')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 text-white font-black text-xs hover:opacity-95 transition-all shadow-md min-h-[42px] cursor-pointer"
                    >
                      <span>Go to Discover</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 space-y-5 flex-1 bg-[#faf8f5]">
                  {/* 6) Countdown card: appears only if today's on-sale artist is followed */}
                  {isTodayArtistFollowed && <CountdownCard onSale={todayOnSale} />}

                  {/* 4) Reminder card: appears only if tomorrow on-sale's artist is followed */}
                  {isTomorrowArtistFollowed && <ReminderCard onSale={tomorrowOnSale} />}

                  {/* 7 & 8) List of upcoming on-sales for followed artists */}
                  <OnSaleList
                    onSales={followedOnSales}
                    hasFollowedArtists={followedArtistIds.length > 0}
                    onNavigateToDiscover={() => setActiveTab('discover')}
                  />
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
