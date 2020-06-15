import * as waypoints from './waypoints';
import * as route from './route';
import * as introduction from './introduction';
import { combineReducers } from 'redux';
// import reduceReducers from 'reduce-reducers';

export const Types = {
  ...waypoints.Types,
  ...route.Types,
  ...introduction.Types,
};

export const Creators = {
  ...waypoints.Creators,
  ...route.Creators,
  ...introduction.Creators,
};

const Reducers = combineReducers({
  waypoints: waypoints.default,
  route: route.default,
  introduction: introduction.default,
});

export default Reducers;
