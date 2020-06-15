import { createActions, createReducer } from 'reduxsauce';
import produce from 'immer';

const INITIAL_STATE = [
  {
    id: 0,
    address: '',
  },
  {
    id: 1,
    address: '',
  },
];

export const { Types, Creators } = createActions(
  {
    addWaypoint: ['address'],
    modifyWaypoint: ['waypoint'],
    removeWaypoint: ['waypoint'],
  },
  {}
);

export const Add = (state = INITIAL_STATE, { address }) =>
  produce(state, draft => {
    draft.push({ id: new Date().getTime(), address });
    return draft;
  });

export const Modify = (state = INITIAL_STATE, { waypoint }) =>
  produce(state, draft => {
    const index = draft.findIndex(obj => obj.id === waypoint.id);
    Object.assign(draft[index], waypoint);
    return draft;
  });

export const Delete = (state = INITIAL_STATE, { waypoint }) =>
  produce(state, draft => {
    const index = draft.findIndex(item => item.id === waypoint.id);
    if ([0, draft.length].includes(index)) return; // So it doesn't remove by accident the first two, obligatory, waypoints
    draft.splice(index, 1);
    return draft;
  });

const HANDLERS = {
  [Types.ADD_WAYPOINT]: Add,
  [Types.MODIFY_WAYPOINT]: Modify,
  [Types.REMOVE_WAYPOINT]: Delete,
};

export default createReducer(INITIAL_STATE, HANDLERS);
