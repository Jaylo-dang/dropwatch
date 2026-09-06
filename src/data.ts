import { Artist, OnSale, Platform, Venue } from './types';

// The 4 fixed ticketing platforms
export const PLATFORMS: Platform[] = [
  'TixNova',
  'StageLine',
  'Rialto Tickets',
  'Nimbus Live',
];

// The 4 fixed venues
export const VENUES: Venue[] = [
  'Harbourline Arena',
  'The Glasshouse',
  'Pier Nine Pavilion',
  'Northgate Dome',
];

// Helper to generate dynamic calendar dates relative to today
const formatRelativeDate = (offsetDays: number): { key: string; heading: string; displayDate: string } => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const key = `${year}-${month}-${day}`;

  const monthShort = d.toLocaleDateString('en-US', { month: 'short' });
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = d.getDate();

  let prefix = '';
  if (offsetDays === 0) prefix = 'Today · ';
  else if (offsetDays === 1) prefix = 'Tomorrow · ';

  return {
    key,
    heading: `${prefix}${weekday}, ${monthShort} ${dayNum}`,
    displayDate: `${weekday}, ${monthShort} ${dayNum}`,
  };
};

const d0 = formatRelativeDate(0);
const d1 = formatRelativeDate(1);
const d3 = formatRelativeDate(3);
const d5 = formatRelativeDate(5);
const d7 = formatRelativeDate(7);
const d10 = formatRelativeDate(10);
const d14 = formatRelativeDate(14);
const d18 = formatRelativeDate(18);
const d22 = formatRelativeDate(22);

// The exactly 9 artists specified
export const ARTISTS: Artist[] = [
  {
    id: 'aria-volt',
    name: 'Aria Volt',
    genre: 'Pop',
    nextShow: {
      city: 'Chicago',
      venue: 'Harbourline Arena',
    },
    nextOnSaleDate: d0.displayDate,
    upcomingCount: 3,
  },
  {
    id: 'novaline',
    name: 'Novaline',
    genre: 'Pop',
    nextShow: {
      city: 'Seattle',
      venue: 'The Glasshouse',
    },
    nextOnSaleDate: d1.displayDate,
    upcomingCount: 2,
  },
  {
    id: 'rui-and-the-static',
    name: 'Rui & the Static',
    genre: 'Rock',
    nextShow: {
      city: 'Austin',
      venue: 'Pier Nine Pavilion',
    },
    nextOnSaleDate: d3.displayDate,
    upcomingCount: 2,
  },
  {
    id: 'blue-cassette-club',
    name: 'Blue Cassette Club',
    genre: 'Rock',
    nextShow: {
      city: 'Boston',
      venue: 'Northgate Dome',
    },
    nextOnSaleDate: d5.displayDate,
    upcomingCount: 2,
  },
  {
    id: 'the-paper-lanterns',
    name: 'The Paper Lanterns',
    genre: 'Indie',
    nextShow: {
      city: 'San Francisco',
      venue: 'The Glasshouse',
    },
    nextOnSaleDate: d7.displayDate,
    upcomingCount: 2,
  },
  {
    id: 'halcyon-grey',
    name: 'Halcyon Grey',
    genre: 'Indie',
    nextShow: {
      city: 'Denver',
      venue: 'Pier Nine Pavilion',
    },
    nextOnSaleDate: d10.displayDate,
    upcomingCount: 2,
  },
  {
    id: 'marta-fenn',
    name: 'Marta Fenn',
    genre: 'Hip-hop',
    nextShow: {
      city: 'New York',
      venue: 'Harbourline Arena',
    },
    nextOnSaleDate: d14.displayDate,
    upcomingCount: 2,
  },
  {
    id: 'dune-prospect',
    name: 'Dune Prospect',
    genre: 'Hip-hop',
    nextShow: {
      city: 'Atlanta',
      venue: 'Northgate Dome',
    },
    nextOnSaleDate: d18.displayDate,
    upcomingCount: 2,
  },
  {
    id: 'kenji-moroe',
    name: 'Kenji Moroe',
    genre: 'Electronic',
    nextShow: {
      city: 'Chicago',
      venue: 'Pier Nine Pavilion',
    },
    nextOnSaleDate: d22.displayDate,
    upcomingCount: 2,
  },
];

// Initial followed artists to satisfy "Following 3 of 9 artists"
export const INITIAL_FOLLOWED_ARTIST_IDS: string[] = [
  'aria-volt',
  'novaline',
  'rui-and-the-static',
];

// 18 invented on-sale entries (exceeds minimum of 14)
export const ON_SALES: OnSale[] = [
  // Today's live countdown drop
  {
    id: 'sale-today-aria',
    artistId: 'aria-volt',
    artistName: 'Aria Volt',
    venue: 'Harbourline Arena',
    city: 'Chicago',
    dateKey: d0.key,
    dateHeading: d0.heading,
    time: '12:00 PM CDT',
    platform: 'TixNova',
    priceRange: '$55 - $160',
    saleType: 'Presale',
    isTodayDrop: true,
  },
  // Tomorrow's reminder drop
  {
    id: 'sale-tomorrow-novaline',
    artistId: 'novaline',
    artistName: 'Novaline',
    venue: 'The Glasshouse',
    city: 'Seattle',
    dateKey: d1.key,
    dateHeading: d1.heading,
    time: '10:00 AM PDT',
    platform: 'StageLine',
    priceRange: '$48 - $135',
    saleType: 'General sale',
    isTomorrowDrop: true,
  },
  // Day +3
  {
    id: 'sale-rui-austin',
    artistId: 'rui-and-the-static',
    artistName: 'Rui & the Static',
    venue: 'Pier Nine Pavilion',
    city: 'Austin',
    dateKey: d3.key,
    dateHeading: d3.heading,
    time: '11:00 AM CDT',
    platform: 'Rialto Tickets',
    priceRange: '$42 - $98',
    saleType: 'Presale',
  },
  // Day +5
  {
    id: 'sale-blue-cassette-boston',
    artistId: 'blue-cassette-club',
    artistName: 'Blue Cassette Club',
    venue: 'Northgate Dome',
    city: 'Boston',
    dateKey: d5.key,
    dateHeading: d5.heading,
    time: '10:00 AM EDT',
    platform: 'Nimbus Live',
    priceRange: '$38 - $90',
    saleType: 'Presale',
  },
  {
    id: 'sale-aria-general-chicago',
    artistId: 'aria-volt',
    artistName: 'Aria Volt',
    venue: 'Harbourline Arena',
    city: 'Chicago',
    dateKey: d5.key,
    dateHeading: d5.heading,
    time: '1:00 PM CDT',
    platform: 'TixNova',
    priceRange: '$55 - $160',
    saleType: 'General sale',
  },
  // Day +7
  {
    id: 'sale-lanterns-sf',
    artistId: 'the-paper-lanterns',
    artistName: 'The Paper Lanterns',
    venue: 'The Glasshouse',
    city: 'San Francisco',
    dateKey: d7.key,
    dateHeading: d7.heading,
    time: '9:00 AM PDT',
    platform: 'StageLine',
    priceRange: '$35 - $85',
    saleType: 'Presale',
  },
  {
    id: 'sale-rui-houston',
    artistId: 'rui-and-the-static',
    artistName: 'Rui & the Static',
    venue: 'Northgate Dome',
    city: 'Austin',
    dateKey: d7.key,
    dateHeading: d7.heading,
    time: '11:00 AM CDT',
    platform: 'Rialto Tickets',
    priceRange: '$42 - $110',
    saleType: 'General sale',
  },
  // Day +10
  {
    id: 'sale-halcyon-denver',
    artistId: 'halcyon-grey',
    artistName: 'Halcyon Grey',
    venue: 'Pier Nine Pavilion',
    city: 'Denver',
    dateKey: d10.key,
    dateHeading: d10.heading,
    time: '10:00 AM MDT',
    platform: 'TixNova',
    priceRange: '$40 - $95',
    saleType: 'Presale',
  },
  {
    id: 'sale-novaline-portland',
    artistId: 'novaline',
    artistName: 'Novaline',
    venue: 'Harbourline Arena',
    city: 'Seattle',
    dateKey: d10.key,
    dateHeading: d10.heading,
    time: '2:00 PM PDT',
    platform: 'StageLine',
    priceRange: '$52 - $145',
    saleType: 'General sale',
  },
  // Day +14
  {
    id: 'sale-marta-nyc',
    artistId: 'marta-fenn',
    artistName: 'Marta Fenn',
    venue: 'Harbourline Arena',
    city: 'New York',
    dateKey: d14.key,
    dateHeading: d14.heading,
    time: '10:00 AM EDT',
    platform: 'Nimbus Live',
    priceRange: '$60 - $175',
    saleType: 'Presale',
  },
  {
    id: 'sale-blue-cassette-philly',
    artistId: 'blue-cassette-club',
    artistName: 'Blue Cassette Club',
    venue: 'The Glasshouse',
    city: 'Boston',
    dateKey: d14.key,
    dateHeading: d14.heading,
    time: '12:00 PM EDT',
    platform: 'Rialto Tickets',
    priceRange: '$40 - $95',
    saleType: 'General sale',
  },
  // Day +18
  {
    id: 'sale-dune-atlanta',
    artistId: 'dune-prospect',
    artistName: 'Dune Prospect',
    venue: 'Northgate Dome',
    city: 'Atlanta',
    dateKey: d18.key,
    dateHeading: d18.heading,
    time: '10:00 AM EDT',
    platform: 'TixNova',
    priceRange: '$50 - $140',
    saleType: 'Presale',
  },
  {
    id: 'sale-lanterns-la',
    artistId: 'the-paper-lanterns',
    artistName: 'The Paper Lanterns',
    venue: 'Pier Nine Pavilion',
    city: 'San Francisco',
    dateKey: d18.key,
    dateHeading: d18.heading,
    time: '1:00 PM PDT',
    platform: 'StageLine',
    priceRange: '$35 - $85',
    saleType: 'General sale',
  },
  // Day +22
  {
    id: 'sale-kenji-chicago',
    artistId: 'kenji-moroe',
    artistName: 'Kenji Moroe',
    venue: 'Pier Nine Pavilion',
    city: 'Chicago',
    dateKey: d22.key,
    dateHeading: d22.heading,
    time: '11:00 AM CDT',
    platform: 'Rialto Tickets',
    priceRange: '$45 - $120',
    saleType: 'Presale',
  },
  {
    id: 'sale-halcyon-saltlake',
    artistId: 'halcyon-grey',
    artistName: 'Halcyon Grey',
    venue: 'The Glasshouse',
    city: 'Denver',
    dateKey: d22.key,
    dateHeading: d22.heading,
    time: '12:00 PM MDT',
    platform: 'TixNova',
    priceRange: '$40 - $95',
    saleType: 'General sale',
  },
  {
    id: 'sale-marta-general',
    artistId: 'marta-fenn',
    artistName: 'Marta Fenn',
    venue: 'Harbourline Arena',
    city: 'New York',
    dateKey: d22.key,
    dateHeading: d22.heading,
    time: '1:00 PM EDT',
    platform: 'Nimbus Live',
    priceRange: '$60 - $175',
    saleType: 'General sale',
  },
  {
    id: 'sale-dune-general',
    artistId: 'dune-prospect',
    artistName: 'Dune Prospect',
    venue: 'Northgate Dome',
    city: 'Atlanta',
    dateKey: d22.key,
    dateHeading: d22.heading,
    time: '2:00 PM EDT',
    platform: 'TixNova',
    priceRange: '$50 - $140',
    saleType: 'General sale',
  },
  {
    id: 'sale-kenji-general',
    artistId: 'kenji-moroe',
    artistName: 'Kenji Moroe',
    venue: 'Pier Nine Pavilion',
    city: 'Chicago',
    dateKey: d22.key,
    dateHeading: d22.heading,
    time: '3:00 PM CDT',
    platform: 'StageLine',
    priceRange: '$45 - $120',
    saleType: 'General sale',
  },
];
