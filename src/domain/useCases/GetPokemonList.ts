import type { PokemonRepository } from '../repositories/PokemonRepository';

import type { PokemonSummary } from '../entities/Pokemon';

export class GetPokemonList {
  constructor(private readonly pokemonRepository: PokemonRepository) {}
  execute(limit: number = 20, offset: number = 0): Promise<PokemonSummary[]> {
    return this.pokemonRepository.getPokemonList(limit, offset);
  }
}
