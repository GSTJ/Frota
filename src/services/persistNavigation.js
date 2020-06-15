import AsyncStorage from '@react-native-community/async-storage';
import { useState, useCallback, useEffect } from 'react';

export default function usePersistNavigation(PERSISTENCE_KEY, enabled) {
  const [isReady, setIsReady] = useState(!enabled);
  const [initialState, setInitialState] = useState();

  const saveState = useCallback(
    state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state)),
    [PERSISTENCE_KEY]
  );

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString);

        setInitialState(state);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady, PERSISTENCE_KEY]);

  return [initialState, saveState, isReady];
}
