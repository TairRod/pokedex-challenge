import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

export function setupNetworkManager() {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      const isOnline = state.isConnected === true && state.isInternetReachable !== false;

      setOnline(isOnline);

      console.log('[NETINFO]', state);
      console.log('[TANSTACK]', onlineManager.isOnline());
    });
  });

  const subscription = AppState.addEventListener('change', (status) => {
    if (status === 'active') {
      NetInfo.refresh().then((state) => {
        const isOnline =
          state.isConnected === true && state.isInternetReachable !== false;

        onlineManager.setOnline(isOnline);

        console.log('[REFRESH NETINFO]', state);
        console.log('[REFRESH TANSTACK]', onlineManager.isOnline());
      });
    }
  });

  return () => {
    subscription.remove();
  };
}
