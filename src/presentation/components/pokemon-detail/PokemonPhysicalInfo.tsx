import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type PhisicalItemProps = {
  value: number;
  tagTitle: string;
  unit: 'kg' | 'm';
};
function PhisicalItem({ value, tagTitle, unit }: PhisicalItemProps) {
  return (
    <View style={styles.containerItem}>
      <Text style={styles.value}>
        {(value / 10).toFixed(1)} {unit}
      </Text>
      <Text style={styles.tag}>
        {tagTitle} {unit}
      </Text>
    </View>
  );
}

interface PokemonPhysicalInfoProps {
  weight: number;
  height: number;
}
export default function PokemonPhysicalInfo({
  weight,
  height,
}: PokemonPhysicalInfoProps) {
  return (
    <>
      <Text style={styles.title}>Physical info</Text>
      <View style={styles.container}>
        <PhisicalItem value={weight} tagTitle="Weight" unit="kg" />
        <PhisicalItem value={height} tagTitle="Height" unit="m" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  value: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: theme.spacing.md,
  },
  tag: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});
