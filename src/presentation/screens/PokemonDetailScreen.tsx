import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { usePokemonDetail } from '../hooks/usePokemonDetail';

import LoadingState from '../components/feedback/LoadingState';
import ErrorState from '../components/feedback/ErrorState';

import type { RootStackParamList } from '../navigation/types';
import PokemonHeader from '../components/pokemon-detail/PokemonHeader';
import PokemonPhysicalInfo from '../components/pokemon-detail/PokemonPhysicalInfo';
import PokemonAbilities from '../components/pokemon-detail/PokemonAbilities';
import PokemonStats from '../components/pokemon-detail/PokemonStats';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetail'>;

export function PokemonDetailScreen({ route }: Props) {
  const { id } = route.params;
  const { data, isPending, isError, isPaused, refetch } = usePokemonDetail(id);

  if (isPending && isPaused) {
    return (
      <ErrorState
        title="Pokémon unavailable offline"
        message="Connect to the internet to load this Pokémon's details."
        onPress={() => refetch()}
      />
    );
  }
  if (isPending) {
    return <LoadingState title="Loading..." message="Getting Pokemon details" />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Something went wrong"
        message="Couldn't load Pokemon."
        onPress={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <PokemonHeader
        imageUrl={data.imageUrl}
        name={data.name}
        id={id}
        types={data.types}
      />

      <PokemonPhysicalInfo weight={data.weight} height={data.height} />
      <PokemonAbilities abilities={data.abilities} />
      <PokemonStats stats={data.stats} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
  },
});
