import { QueryClient } from '@tanstack/react-query';

const ONE_MINUTE_MS = 60 * 1000;
const ONE_HOUR_MS = 60 * ONE_MINUTE_MS;
const ONE_DAY_MS = 24 * ONE_HOUR_MS;

const STALE_TIME = 5 * ONE_MINUTE_MS;
const GC_TIME = ONE_DAY_MS;
const RETRY_COUNT = 1;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      retry: RETRY_COUNT,
      refetchOnReconnect: 'always',
    },
  },
});
