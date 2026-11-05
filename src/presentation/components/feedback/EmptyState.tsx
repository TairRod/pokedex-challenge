import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SearchX } from 'lucide-react-native';

interface LoadingStateProps {
  title: string;
  message: string;
}
export default function EmptyState({ title, message }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <SearchX size={30} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: theme.radius.full,
    width: 60,
    height: 60,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
  },
  message: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});
