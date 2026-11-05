import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCard } from '../components/PokemonCard';
import LoadingState from '../components/feedback/LoadingState';
import ErrorState from '../components/feedback/ErrorState';
import EmptyState from '../components/feedback/EmptyState';
import { theme } from '../theme';
import PaginationFooter from '../components/feedback/PaginationFooter';

export function PokemonListScreen() {
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
  } = usePokemonList();

  const pokemon = React.useMemo(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data]);

  if (isPending) {
    return (
      <View style={styles.center}>
        <LoadingState title="Loading Pokemons" message="Getting you pokedex." />
      </View>
    );
  }

  if (isError && pokemon.length === 0) {
    return (
      <View style={styles.center}>
        <ErrorState
          title="Something went wrong"
          message={"We couldn't get your pokedex."}
          onPress={refetch}
        />
      </View>
    );
  }

  if (pokemon.length === 0 && !isPending && !isError) {
    return (
      <View style={styles.center}>
        <EmptyState title="No Pokemons found" message={"We couldn't find any pokemon."} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <PaginationFooter
            isLoading={isFetchingNextPage}
            isError={isFetchNextPageError}
            onRetry={() => {
              if (!isFetching) {
                fetchNextPage();
              }
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    gap: theme.spacing.md,
  },
  listContent: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
});
