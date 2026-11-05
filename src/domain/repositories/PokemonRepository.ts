import type { Pokemon, PokemonSummary } from '../entities/Pokemon';

export interface PokemonRepository {
  getPokemonList(limit: number, offset: number): Promise<PokemonSummary[]>;
  getPokemonDetail(id: number): Promise<Pokemon>;
}
