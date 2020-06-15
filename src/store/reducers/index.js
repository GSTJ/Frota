import * as waypoints from './waypoints';
import * as route from './route';
import * as introduction from './introduction';
import * as settings from './settings';
import { combineReducers } from 'redux';
// import reduceReducers from 'reduce-reducers';

export const Types = {
  ...waypoints.Types,
  ...route.Types,
  ...introduction.Types,
  ...settings.Types,
};

export const Creators = {
  ...waypoints.Creators,
  ...route.Creators,
  ...introduction.Creators,
  ...settings.Creators,
};

const Reducers = combineReducers({
  waypoints: waypoints.default,
  route: route.default,
  introduction: introduction.default,
  settings: settings.default,
});

export default Reducers;
