import { View, Text, StyleSheet, Image } from 'react-native';
import type { PokemonSummary } from '../../domain/entities/Pokemon';
import { theme } from '../theme';
import React from 'react';

interface PokemonCardProps {
  pokemon: PokemonSummary;
}

export const PokemonCard = React.memo(({ pokemon }: PokemonCardProps) => {
  const { id, name, imageUrl } = pokemon;
  const pokedexNumber = `#${id.toString().padStart(3, '0')}`;
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View style={styles.container}>
      <Text style={styles.numberLabel}>{pokedexNumber}</Text>
      <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="contain" />
      <Text style={styles.name}>{pokemonName}</Text>
    </View>
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
