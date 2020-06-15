import React, { useRef, useEffect, useCallback } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { setNavigator } from '~services/navigation';
import Toast from 'react-native-toast-message';
import { SafeComponent } from '~components';
import Router from '~router';
import { persistor, store } from '~store';
import analytics from '@react-native-firebase/analytics';
import RNBootSplash from 'react-native-bootsplash';
import { Platform } from 'react-native';

const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};

const onBeforeLift = () => {
  // Waiting for the components to be mounted
  setTimeout(
    () => RNBootSplash.hide({ duration: 250 }),
    Platform.OS === 'ios' ? 0 : 275
  );
};

export default function Component() {
  const routeNameRef = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    const state = navigationRef.current?.getRootState();
    if (state) {
      routeNameRef.current = getActiveRouteName(state);
    }

    onBeforeLift();
  }, []);

  const onStateChange = useCallback(state => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);
    if (previousRouteName !== currentRouteName) {
      analytics().setCurrentScreen(currentRouteName, currentRouteName);
    }
    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <SafeComponent request={{ data: true }}>
      <Provider store={store}>
        <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
          <NavigationContainer
            onStateChange={onStateChange}
            ref={navigatorRef => {
              navigationRef.current = navigatorRef;
              setNavigator(navigatorRef);
            }}
          >
            <Router />
          </NavigationContainer>
          <Toast ref={Toast.setRef} />
        </PersistGate>
      </Provider>
    </SafeComponent>
  );
}
