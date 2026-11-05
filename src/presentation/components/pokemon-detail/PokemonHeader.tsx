import { Text, View, Image, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import React from 'react';
import {
  formatPokedexNumber,
  capitalizePokemonName,
} from '../../utils/pokemonFormatters';

interface PokemonHeaderProps {
  imageUrl: string;
  name: string;
  id: number;
  types: string[];
}

function typeChip(type: string) {
  return (
    <View style={styles.typeChip}>
      <Text>{type}</Text>
    </View>
  );
}

export default function PokemonHeader({ imageUrl, name, id, types }: PokemonHeaderProps) {
  const pokedexNumber = formatPokedexNumber(id);
  const pokemonName = capitalizePokemonName(name);
  return (
    <View style={styles.container}>
      <Text style={styles.numberLabel}>{pokedexNumber}</Text>
      <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="contain" />
      <Text style={styles.name}>{pokemonName}</Text>
      <View style={styles.typesContainer}>
        {types && types.map((type) => typeChip(type))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    width: '90%',
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
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  typeChip: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
});
