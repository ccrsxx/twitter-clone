export type TrendsReturn = {
  data: TrendsResponse;
  status: number;
};

export type TrendsResponse = SuccessResponse | ErrorResponse;

export type SuccessResponse = {
  trends: FilteredTrends | Trends;
  location: string;
};

export type ErrorResponse = {
  errors: [
    {
      code: number;
      message: string;
    }
  ];
};

export type TrendsData = [
  {
    trends: Trends;
    as_of: string;
    created_at: string;
    locations: Location;
  }
];

export type Location = [
  {
    name: string;
    woeid: number;
  }
];

export type Trend = {
  name: string;
  url: string;
  promoted_content: null;
  query: string;
  tweet_volume: number | null;
};

export type Trends = Trend[];

export type FilteredTrends = (Trend & {
  tweet_volume: number;
})[];
