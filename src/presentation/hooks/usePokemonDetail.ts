import { useQuery } from '@tanstack/react-query';
import { getPokemonDetail } from '../../app/di/container';

export function usePokemonDetail(id: number) {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemonDetail.execute(id),
  });
}
