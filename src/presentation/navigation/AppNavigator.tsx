import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';
import { PokemonListScreen } from '../screens/PokemonListScreen';
import { PokemonDetailScreen } from '../screens/PokemonDetailScreen';
import { theme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.colors.textPrimary,
        }}
      >
        <Stack.Screen
          name="PokemonList"
          component={PokemonListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={{
            title: 'Pokemon',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
