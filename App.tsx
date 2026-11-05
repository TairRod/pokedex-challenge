/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { Query } from '@tanstack/react-query';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { queryClient } from './src/app/providers/queryClient';
import { theme } from './src/presentation/theme';
import { StyleSheet } from 'react-native';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryPersister } from './src/app/providers/queryPersister';
import { useEffect } from 'react';
import { setupNetworkManager } from './src/app/providers/networkManager';

const PERSIST_MAX_AGE = 24 * 60 * 60 * 1000;
function App() {
  useEffect(() => {
    return setupNetworkManager();
  }, []);

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: queryPersister,
          maxAge: PERSIST_MAX_AGE,
          buster: 'v1',
        }}
      >
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <AppNavigator />
        </SafeAreaView>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
