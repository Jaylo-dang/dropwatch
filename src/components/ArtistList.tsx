import React from 'react';
import { Artist } from '../types';
import { ArtistCard } from './ArtistCard';

interface ArtistListProps {
  artists: Artist[];
  followedArtistIds: string[];
  onToggleFollow: (artistId: string) => void;
}

export const ArtistList: React.FC<ArtistListProps> = ({
  artists,
  followedArtistIds,
  onToggleFollow,
}) => {
  if (artists.length === 0) {
    return (
      <div
        id="empty-artist-list"
        className="p-8 text-center rounded-2xl bg-white border border-stone-200 text-stone-600 shadow-sm"
      >
        <p className="text-sm font-medium">No artists found in this genre.</p>
      </div>
    );
  }

  return (
    <div
      id="artist-cards-list"
      className="grid grid-cols-1 gap-3"
    >
      {artists.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
          isFollowed={followedArtistIds.includes(artist.id)}
          onToggleFollow={onToggleFollow}
        />
      ))}
    </div>
  );
};
