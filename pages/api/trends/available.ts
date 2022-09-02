import { getAvailableTrendingPlaces } from '@lib/api/trends';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AvailablePlacesResponse } from '@lib/api/trends';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AvailablePlacesResponse>
): Promise<void> {
  const trendingData = await getAvailableTrendingPlaces();
  res.status(200).json(trendingData);
}
