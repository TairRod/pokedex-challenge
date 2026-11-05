import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';
import { POKEMON_TYPE_COLORS } from './pokemonTypes';

export const theme = {
  colors,
  spacing,
  typography,
  radius,
  pokemonTypeColors: POKEMON_TYPE_COLORS,
} as const;

export type AppTheme = typeof theme;
