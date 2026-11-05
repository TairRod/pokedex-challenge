import { PokemonListItemDTO } from '../dto/PokemonListDTO';
import { PokemonDetailDTO } from '../dto/PokemonDetailDTO';
import type { PokemonSummary, Pokemon } from '../../domain/entities/Pokemon';
import { isPokemonType } from '../../domain/entities/Pokemon';

const POKEMON_IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
export function mapPokemonSummary(dto: PokemonListItemDTO): PokemonSummary {
  const segments = dto.url.split('/').filter(Boolean);
  const id = Number(segments[segments.length - 1]);

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('Invalid pokemon id');
  }

  return {
    id,
    name: dto.name,
    imageUrl: `${POKEMON_IMAGE_BASE_URL}/${id}.png`,
  };
}

export function mapPokemonDetail(dto: PokemonDetailDTO): Pokemon {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: `${POKEMON_IMAGE_BASE_URL}/${dto.id}.png`,
    types: dto.types.map((item) => {
      const name = item.type.name;
      if (!isPokemonType(name)) {
        throw new Error(`Invalid Pokemon type: ${name}`);
      }
      return name;
    }),
    abilities: dto.abilities.map((item) => item.ability.name),
    height: dto.height,
    weight: dto.weight,
    baseExperience: dto.base_experience,
    stats: dto.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
  };
}
