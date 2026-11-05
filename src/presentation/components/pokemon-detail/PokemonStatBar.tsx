import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatStatName } from '../../utils/pokemonFormatters';
interface PokemonStatBarProps {
  label: string;
  value: number;
  color: string;
}

const MAX_STAT = 255;

function PokemonStatBar({ label, value, color }: PokemonStatBarProps) {
  const percentage = Math.min(Math.max((value / MAX_STAT) * 100, 0), 100);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{formatStatName(label)}</Text>
      <Text style={styles.value}>{value}</Text>

      <View style={styles.track}>
        <View
          style={[
            styles.progress,
            { width: `${percentage}%` },
            { backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

export default PokemonStatBar;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    marginBottom: 12,
  },
  label: {
    width: 100,
    fontSize: 12,
  },
  value: {
    width: 28,
    textAlign: 'right',
    fontWeight: '600',
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 8,
  },
});
