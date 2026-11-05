import { useQuery } from '@tanstack/react-query';
import { getPokemonList } from '../../app/di/container';

export function usePokemonList(limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ['pokemon', 'list', limit, offset],
    queryFn: () => getPokemonList.execute(limit, offset),
  });
}
