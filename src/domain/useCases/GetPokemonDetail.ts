import type { PokemonRepository } from '../repositories/PokemonRepository';
import type { Pokemon } from '../entities/Pokemon';

export class GetPokemonDetail {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  execute(id: number): Promise<Pokemon> {
    return this.pokemonRepository.getPokemonDetail(id);
  }
}
