import type { PokemonType } from '../../domain/entities/Pokemon';

interface PokemonTypeStyle {
  background: string;
  label: string;
}

export const POKEMON_TYPE_COLORS: Record<PokemonType, PokemonTypeStyle> = {
  normal: { background: '#A8A77A', label: '#242933' },
  fire: { background: '#EE8130', label: '#FFFFFF' },
  water: { background: '#6390F0', label: '#FFFFFF' },
  electric: { background: '#F7D02C', label: '#242933' },
  grass: { background: '#7AC74C', label: '#242933' },
  ice: { background: '#96D9D6', label: '#242933' },
  fighting: { background: '#C22E28', label: '#FFFFFF' },
  poison: { background: '#A33EA1', label: '#FFFFFF' },
  ground: { background: '#E2BF65', label: '#242933' },
  flying: { background: '#A98FF3', label: '#242933' },
  psychic: { background: '#F95587', label: '#242933' },
  bug: { background: '#A6B91A', label: '#242933' },
  rock: { background: '#B6A136', label: '#242933' },
  ghost: { background: '#735797', label: '#FFFFFF' },
  dragon: { background: '#6F35FC', label: '#FFFFFF' },
  dark: { background: '#705746', label: '#FFFFFF' },
  steel: { background: '#B7B7CE', label: '#242933' },
  fairy: { background: '#D685AD', label: '#242933' },
};
