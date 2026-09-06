export type Genre = 'All' | 'Pop' | 'Rock' | 'Indie' | 'Hip-hop' | 'Electronic';

export type Platform = 'TixNova' | 'StageLine' | 'Rialto Tickets' | 'Nimbus Live';

export type Venue = 'Harbourline Arena' | 'The Glasshouse' | 'Pier Nine Pavilion' | 'Northgate Dome';

export type SaleType = 'Presale' | 'General sale';

export interface Artist {
  id: string;
  name: string;
  genre: Exclude<Genre, 'All'>;
  nextShow: {
    city: string;
    venue: Venue;
  };
  nextOnSaleDate: string;
  upcomingCount: number;
}

export interface OnSale {
  id: string;
  artistId: string;
  artistName: string;
  venue: Venue;
  city: string;
  dateKey: string; // YYYY-MM-DD for grouping and chronological sorting
  dateHeading: string; // User-facing heading e.g., "Tomorrow · Monday, Sep 7"
  time: string; // e.g., "10:00 AM EDT"
  platform: Platform;
  priceRange: string; // e.g., "$45 - $130"
  saleType: SaleType;
  isTodayDrop?: boolean;
  isTomorrowDrop?: boolean;
}
