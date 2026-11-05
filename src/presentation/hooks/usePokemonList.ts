import { useInfiniteQuery } from '@tanstack/react-query';
import { getPokemonList } from '../../app/di/container';

const PAGE_SIZE = 20;

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPokemonList.execute(PAGE_SIZE, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length * PAGE_SIZE;
    },
  });
}
