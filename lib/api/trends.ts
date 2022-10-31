import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';
import type { FilteredTrends, SuccessResponse } from '@lib/types/place';

type SwrHooksReturn = {
  loading: boolean;
  error: Error | undefined;
};

type UseTrendsReturn = SwrHooksReturn & {
  data: SuccessResponse | undefined;
};

type FilteredSuccessResponse = Omit<SuccessResponse, 'trends'> & {
  trends: FilteredTrends;
};

type FilteredUseTrendsReturn = SwrHooksReturn & {
  data: FilteredSuccessResponse | undefined;
};

export function useTrends(
  id: number,
  limit?: undefined,
  config?: SWRConfiguration
): UseTrendsReturn;

export function useTrends(
  id: number,
  limit: number,
  config?: SWRConfiguration
): FilteredUseTrendsReturn;

export function useTrends(
  id: number,
  limit?: number,
  config?: SWRConfiguration
): UseTrendsReturn | FilteredUseTrendsReturn {
  const { data, error } = useSWR<SuccessResponse, Error>(
    `/api/trends/place/${id}${limit ? `?limit=${limit}` : ''}`,
    config
  );

  if (data && 'errors' in data)
    return {
      data: undefined,
      loading: false,
      error: new Error('Sorry we could not find any trends for this place')
    };

  return {
    data,
    error: error,
    loading: !error && !data
  };
}
