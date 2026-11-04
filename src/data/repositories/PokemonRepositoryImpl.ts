import type { Pokemon, PokemonSummary } from '../../domain/entities/Pokemon';
import type { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import type { HttpClient } from '../api/HttpClient';
import { mapPokemonSummary, mapPokemonDetail } from '../mappers/pokemonMapper';

import { isPokemonListDTO, isPokemonDetailDTO } from '../validators/pokemonValidators';

export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(private readonly client: HttpClient) {}

  async getPokemonList(limit: number, offset: number): Promise<PokemonSummary[]> {
    const response = await this.client.get(`/pokemon?limit=${limit}&offset=${offset}`);

    if (!isPokemonListDTO(response)) {
      throw new Error('Invalid Pokemon list response');
    }

    return response.results.map(mapPokemonSummary);
  }

  async getPokemonDetail(id: number): Promise<Pokemon> {
    const response = await this.client.get(`/pokemon/${id}`);
    if (!isPokemonDetailDTO(response)) {
      throw new Error('Invalid Pokemon detail response');
    }
    return mapPokemonDetail(response);
  }
}
