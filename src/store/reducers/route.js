import { Failed, Get, INITIAL_STATE, SuccessReplace } from '~reducers/helpers';
import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getRoute: ['provider', 'data'],
    getRouteSuccess: ['response'],
    getRouteFailed: ['error'],
  },
  {}
);

const HANDLERS = {
  [Types.GET_ROUTE]: Get,
  [Types.GET_ROUTE_SUCCESS]: SuccessReplace,
  [Types.GET_ROUTE_FAILED]: Failed,
};

export default createReducer(INITIAL_STATE, HANDLERS);
