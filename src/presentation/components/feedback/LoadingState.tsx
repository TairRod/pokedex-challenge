import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

interface LoadingStateProps {
  title: string;
  message: string;
}
export default function LoadingState({ title, message }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
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
