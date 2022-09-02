import useSWR from 'swr';
import type { Trends } from './api/trends';

type SwrHooksReturn = {
  isLoading: boolean;
  isError: Error | undefined;
};

type UseTrendsReturn = SwrHooksReturn & {
  trends: Trends | undefined;
};

export function useTrends(id: number, limit?: number): UseTrendsReturn {
  const { data, error } = useSWR<Trends, Error>(
    `/api/trends/place/${id}${limit ? `?limit=${limit}` : ''}`
  );

  if (data && 'errors' in data)
    return {
      trends: undefined,
      isLoading: false,
      isError: new Error('Sorry we could not find any trends for this place')
    };

  return {
    trends: data,
    isLoading: !error && !data,
    isError: error
  };
}
