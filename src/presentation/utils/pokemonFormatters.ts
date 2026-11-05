export const formatPokedexNumber = (id: number): string =>
  `#${id.toString().padStart(3, '0')}`;

export const capitalizePokemonName = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const formatDisplayText = (value: string): string => {
  return value
    .trim()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export const formatStatName = (name: string): string => {
  return STAT_LABELS[name] ?? formatDisplayText(name);
};
