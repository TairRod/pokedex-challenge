import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface PokemonAbilitiesProps {
  abilities: string[];
}
export default function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <>
      <Text style={styles.title}>Abilities</Text>
      <View style={styles.container}>
        {abilities && abilities.map((ability) => abilityChip(ability))}
      </View>
    </>
  );
}

function abilityChip(ability: string) {
  return (
    <View style={styles.abilityChip}>
      <Text style={styles.abilityChipText}>{ability}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  abilityChip: {
    padding: theme.spacing.sm,
    margin: 5,
    backgroundColor: 'black',
    borderRadius: theme.radius.lg,
  },
  abilityChipText: {
    color: 'white',
  },
});
