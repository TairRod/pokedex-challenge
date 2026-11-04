export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonType[];
  abilieties: string[];
  height: number;
  weight: number;
  baseExperience: number;
  stats: PokemonStat[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export type PokemonType =
  | 'norma'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy';

export type PokemonSummary = Pick<Pokemon, 'id' | 'name' | 'imageUrl'>;
