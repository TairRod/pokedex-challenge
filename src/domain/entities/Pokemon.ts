export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonType[];
  abilities: string[];
  height: number;
  weight: number;
  baseExperience: number | null;
  stats: PokemonStat[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

export function isPokemonType(value: string): value is PokemonType {
  return POKEMON_TYPES.some((type) => type === value);
}

export type PokemonSummary = Pick<Pokemon, 'id' | 'name' | 'imageUrl'>;
