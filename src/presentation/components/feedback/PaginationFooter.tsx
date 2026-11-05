import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

interface PaginationFooterProps {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export default function PaginationFooter({
  isLoading,
  isError,
  onRetry,
}: PaginationFooterProps) {
  if (!isLoading && !isError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <ActivityIndicator color={theme.colors.primary} />
          <Text>Loading more...</Text>
        </>
      ) : (
        <>
          <Text>Couldn't load more items.</Text>
          <Button title="Try again" onPress={onRetry} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
});
