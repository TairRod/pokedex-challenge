import { Pressable, Text, StyleSheet, Image } from 'react-native';
import type { PokemonSummary } from '../../domain/entities/Pokemon';
import { theme } from '../theme';
import React from 'react';
import { formatPokedexNumber, capitalizePokemonName } from '../utils/pokemonFormatters';

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onPress: () => void;
}

export const PokemonCard = React.memo(({ pokemon, onPress }: PokemonCardProps) => {
  const { id, name, imageUrl } = pokemon;
  const pokedexNumber = formatPokedexNumber(id);
  const pokemonName = capitalizePokemonName(name);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.numberLabel}>{pokedexNumber}</Text>
      <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="contain" />
      <Text style={styles.name}>{pokemonName}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  numberLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  image: {
    width: 120,
    height: 120,
  },
  name: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
