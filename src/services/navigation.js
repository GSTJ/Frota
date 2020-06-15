import { CommonActions } from '@react-navigation/native';

let navigator;

export function setNavigator(ref) {
  navigator = ref;
}

export function navigate(routeName, params) {
  const action = CommonActions.navigate(routeName, params);
  navigator.dispatch(action);
}

export function reset(payload) {
  const action = CommonActions.reset(payload);
  navigator.dispatch(action);
}

export function goBack() {
  const action = CommonActions.goBack();
  navigator.dispatch(action);
}

export function getCurrentRouteName(currentNavigator) {
  const route = currentNavigator || navigator.getRootState();

  // Nested navigators
  // Cant be a falsy comparison because 0 is a valid index
  if (route.index !== undefined) {
    return getCurrentRouteName(route.routes[route.index]);
  }
  if (route?.state?.index !== undefined) {
    return getCurrentRouteName(route.state.routes[route.state.index]);
  }

  return route.name;
}
