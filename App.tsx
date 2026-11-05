import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/app/providers/queryClient';
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
        <AppNavigator />
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
