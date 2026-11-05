import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import PokemonStatBar from './PokemonStatBar';
import { PokemonType } from '../../../domain/entities/Pokemon';

type StatItemProps = {
  name: string;
  value: number;
};
type PokemonStatsProps = {
  stats: StatItemProps[];
  types: PokemonType[];
};
export default function PokemonStats({ stats, types }: PokemonStatsProps) {
  const primaryType = types[0];

  const color = primaryType
    ? theme.pokemonTypeColors[primaryType].background
    : theme.colors.primary;

  return (
    <>
      <Text style={styles.title}>Stats</Text>
      <View style={styles.container}>
        {stats &&
          stats.map((stat) => (
            <PokemonStatBar
              key={stat.name}
              label={stat.name}
              value={stat.value}
              color={color}
            />
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: theme.spacing.lg,
  },
});
