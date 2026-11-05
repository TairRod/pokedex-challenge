interface NameResourceDTO {
  name: string;
  url: string;
}

interface PokemonTypeDTO {
  slot: number;
  type: NameResourceDTO;
}

interface PokemonAbilityDTO {
  ability: NameResourceDTO;
  is_hidden: boolean;
  slot: number;
}

interface PokemonStatDTO {
  base_stat: number;
  effort: number;
  stat: NameResourceDTO;
}
export interface PokemonDetailDTO {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  types: PokemonTypeDTO[];
  abilities: PokemonAbilityDTO[];
  stats: PokemonStatDTO[];
}
