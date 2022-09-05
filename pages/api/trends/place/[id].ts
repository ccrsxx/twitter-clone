import { AUTH } from '@lib/api/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  TrendsData,
  ErrorResponse,
  TrendsResponse,
  FilteredTrends
} from '@lib/api/types/place';

type PlaceIdEndpointQuery = {
  id: string;
  limit?: string;
};

export default async function placeIdEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<TrendsResponse>
): Promise<void> {
  const { id, limit } = req.query as PlaceIdEndpointQuery;

  const response = await fetch(
    `https://api.twitter.com/1.1/trends/place.json?id=${id}`,
    AUTH
  );

  const rawData = (await response.json()) as TrendsData | ErrorResponse;

  const data =
    'errors' in rawData
      ? rawData
      : { trends: rawData[0].trends, location: rawData[0].locations[0].name };

  const limitParam = limit ? parseInt(limit, 10) : null;

  let formattedTrends = limitParam && !('errors' in data) ? data.trends : null;

  if (formattedTrends) {
    const filteredTrends = formattedTrends.filter(
      ({ tweet_volume }) => tweet_volume
    ) as FilteredTrends;

    formattedTrends = filteredTrends
      .map(({ url, ...rest }) => ({
        ...rest,
        url: url.replace(/http.*.com/, '')
      }))
      .sort((a, b) => b.tweet_volume - a.tweet_volume);

    if (limitParam) formattedTrends = formattedTrends.slice(0, limitParam);
  }

  const formattedData = formattedTrends
    ? { ...data, trends: formattedTrends }
    : null;

  res.status(response.status).json(formattedData ?? data);
}
