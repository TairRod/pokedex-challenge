import { Text, View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import React from 'react';
import {
  formatPokedexNumber,
  capitalizePokemonName,
} from '../../utils/pokemonFormatters';
import { PokemonImage } from '../PokemonImage';
import { PokemonType } from '../../../domain/entities/Pokemon';

interface PokemonHeaderProps {
  imageUrl: string;
  name: string;
  id: number;
  types: PokemonType[];
}

function TypeChip({ type }: { type: PokemonType }) {
  const typeStyle = theme.pokemonTypeColors[type];

  return (
    <View style={[styles.typeChip, { backgroundColor: typeStyle.background }]}>
      <Text style={{ color: typeStyle.label }}>{type}</Text>
    </View>
  );
}

export default function PokemonHeader({ imageUrl, name, id, types }: PokemonHeaderProps) {
  const primaryType = types[0];

  const typeStyle = primaryType
    ? theme.pokemonTypeColors[primaryType]
    : {
        background: theme.colors.surface,
        label: theme.colors.textPrimary,
      };

  const pokedexNumber = formatPokedexNumber(id);
  const pokemonName = capitalizePokemonName(name);

  return (
    <View style={styles.container}>
      <View style={[styles.containerImage, { backgroundColor: typeStyle.background }]}>
        <Text style={[styles.numberLabel, { color: typeStyle.label }]}>
          {pokedexNumber}
        </Text>

        <View style={styles.imageWrapper}>
          <PokemonImage imageUrl={imageUrl} style={styles.image} />
        </View>
      </View>

      <View style={styles.information}>
        <Text style={styles.name}>{pokemonName}</Text>

        <View style={styles.typesContainer}>
          {types.map((type) => (
            <TypeChip key={type} type={type} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  containerImage: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  numberLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  imageWrapper: {
    width: 240,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: -35,
  },
  image: {
    width: 220,
    height: 220,
  },
  information: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 16,
  },
  name: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
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
