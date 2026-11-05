import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import PokemonStatBar from './PokemonStatBar';

type StatItemProps = {
  name: string;
  value: number;
};
type PokemonStatsProps = {
  stats: StatItemProps[];
};
export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <>
      <Text style={styles.title}>Stats</Text>
      <View style={styles.container}>
        {stats &&
          stats.map((stat) => (
            <PokemonStatBar key={stat.name} label={stat.name} value={stat.value} />
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
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
});
