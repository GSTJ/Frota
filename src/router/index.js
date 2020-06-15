import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Views from '~views';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

function Component(props) {
  const introduction = useSelector(state => state.introduction);
  const route = useSelector(state => state.route);
  const fuelPrice = useSelector(state => state.settings.fuelPrice);

  const fillSettings = fuelPrice ? 'Home' : 'Settings';
  return (
    <Stack.Navigator
      {...props}
      initialRouteName={route.data ? fillSettings : undefined}
      screenOptions={{ headerShown: false }}
    >
      {introduction && (
        <Stack.Screen name="Introduction" component={Views.Introduction} />
      )}
      <Stack.Screen name="Settings" component={Views.Settings} />
      <Stack.Screen name="AddressList" component={Views.Address.List} />
      <Stack.Screen name="AddressMap" component={Views.Address.Map} />
      <Stack.Screen name="AddressSearch" component={Views.Address.Search} />
      <Stack.Screen name="Home" component={Views.Home} />
      <Stack.Screen name="Stops" component={Views.Stops} />
      <Stack.Screen name="Stop" component={Views.Stop} />
    </Stack.Navigator>
  );
}

export default Component;
