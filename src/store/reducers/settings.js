import { createActions, createReducer } from 'reduxsauce';
import produce from 'immer';

const INITIAL_STATE = {
  fuelConsumption: null,
  fuelPrice: null,
};

export const { Types, Creators } = createActions(
  {
    setFuelConsumption: ['value'],
    setFuelPrice: ['value'],
  },
  {}
);

export const SetFuelPrice = (state = INITIAL_STATE, { value }) =>
  produce(state, draft => {
    draft.fuelPrice = value;
    return draft;
  });

export const SetFuelConsumption = (state = INITIAL_STATE, { value }) =>
  produce(state, draft => {
    draft.fuelConsumption = value;
    return draft;
  });

const HANDLERS = {
  [Types.SET_FUEL_PRICE]: SetFuelPrice,
  [Types.SET_FUEL_CONSUMPTION]: SetFuelConsumption,
};

export default createReducer(INITIAL_STATE, HANDLERS);
