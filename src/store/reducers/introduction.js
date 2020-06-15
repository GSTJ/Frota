import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = true;

export const { Types, Creators } = createActions(
  { finishIntroduction: [] },
  {}
);

const HANDLERS = {
  [Types.FINISH_INTRODUCTION]: () => false,
};

export default createReducer(INITIAL_STATE, HANDLERS);
