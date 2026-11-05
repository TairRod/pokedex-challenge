import type { PokemonListDTO } from '../dto/PokemonListDTO';
import type { PokemonDetailDTO } from '../dto/PokemonDetailDTO';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isPokemonListItem(
  value: unknown,
): value is PokemonListDTO['results'][number] {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.name === 'string' && typeof value.url === 'string';
}
export function isPokemonListDTO(value: unknown): value is PokemonListDTO {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.count === 'number' &&
    (typeof value.next === 'string' || value.next === null) &&
    (typeof value.previous === 'string' || value.previous === null) &&
    Array.isArray(value.results) &&
    value.results.every(isPokemonListItem)
  );
}

function isNamedResource(value: unknown): boolean {
  return (
    isRecord(value) && typeof value.name === 'string' && typeof value.url === 'string'
  );
}

export function isPokemonDetailDTO(value: unknown): value is PokemonDetailDTO {
  if (!isRecord(value)) {
    return false;
  }

  const validTypes =
    Array.isArray(value.types) &&
    value.types.every(
      (item: unknown) =>
        isRecord(item) && typeof item.slot === 'number' && isNamedResource(item.type),
    );

  const validAbilities =
    Array.isArray(value.abilities) &&
    value.abilities.every(
      (item: unknown) =>
        isRecord(item) &&
        typeof item.is_hidden === 'boolean' &&
        typeof item.slot === 'number' &&
        isNamedResource(item.ability),
    );
  const validStats =
    Array.isArray(value.stats) &&
    value.stats.every(
      (item: unknown) =>
        isRecord(item) &&
        typeof item.base_stat === 'number' &&
        typeof item.effort === 'number' &&
        isNamedResource(item.stat),
    );

  return (
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.base_experience === 'number' &&
    typeof value.height === 'number' &&
    typeof value.weight === 'number' &&
    validTypes &&
    validAbilities &&
    validStats
  );
}
