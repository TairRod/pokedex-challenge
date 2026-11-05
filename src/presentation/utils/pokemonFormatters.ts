export const formatPokedexNumber = (id: number): string =>
  `#${id.toString().padStart(3, '0')}`;

export const capitalizePokemonName = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);
