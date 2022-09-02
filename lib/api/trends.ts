export type TrendsData = [
  {
    trends: Trends;
    as_of: string;
    created_at: string;
    locations: Location[];
  }
];

export type Location = {
  name: string;
  woeid: number;
};

export type Trend = {
  name: string;
  url: string;
  promoted_content: null;
  query: string;
  tweet_volume: number | null;
};

export type Trends = Trend[];

export type ErrorResponse = {
  errors: [
    {
      code: number;
      message: string;
    }
  ];
};

export type TrendsResponse = Trends | ErrorResponse;

export type TrendsReturn = {
  status: number;
  data: TrendsResponse;
};

const AUTH = {
  headers: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN!}`
  }
};

export async function getTrends(countryId: string): Promise<TrendsReturn> {
  const res = await fetch(
    `https://api.twitter.com/1.1/trends/place.json?id=${countryId}`,
    AUTH
  );

  const data = (await res.json()) as TrendsData | ErrorResponse;

  return { status: res.status, data: 'errors' in data ? data : data[0].trends };
}

export interface AvailablePlace {
  name: string;
  placeType: PlaceType;
  url: string;
  parentid: number;
  country: string;
  woeid: number;
  countryCode: null | string;
}

export type PlaceType = {
  code: number;
  name: Name;
};

export type Name = 'Country' | 'Supername' | 'Town' | 'Unknown';

export type AvailablePlacesResponse = AvailablePlace[];

export async function getAvailableTrendingPlaces(): Promise<AvailablePlacesResponse> {
  const res = await fetch(
    'https://api.twitter.com/1.1/trends/available.json',
    AUTH
  );

  const data = (await res.json()) as AvailablePlacesResponse;

  return data;
}
