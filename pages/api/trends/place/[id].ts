import { getTrends } from '@lib/api/trends';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TrendsResponse } from '@lib/api/trends';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrendsResponse>
): Promise<void> {
  const { id, limit } = req.query;

  const { status, data } = await getTrends(id as string);

  let formattedData = !('errors' in data) ? data : null;

  if (formattedData) {
    const limitParam = limit ? parseInt(limit as string, 10) : null;

    if (limitParam && Number.isInteger(limitParam))
      formattedData = formattedData.slice(0, limitParam);

    formattedData = formattedData
      .filter(({ tweet_volume }) => tweet_volume)
      .map(({ url, ...rest }) => ({
        ...rest,
        url: url.replace(/http.*.com/, '')
      }))
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .sort((a, b) => b.tweet_volume! - a.tweet_volume!);
  }

  res.status(status).json(formattedData ?? data);
}
