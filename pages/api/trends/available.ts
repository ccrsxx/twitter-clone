import { AUTH } from '@lib/api/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AvailablePlaces } from '@lib/api/types/available';

export default async function availableEndpoint(
  _req: NextApiRequest,
  res: NextApiResponse<AvailablePlaces>
): Promise<void> {
  const response = await fetch(
    'https://api.twitter.com/1.1/trends/available.json',
    AUTH
  );

  const data = (await response.json()) as AvailablePlaces;

  res.status(response.status).json(data);
}
