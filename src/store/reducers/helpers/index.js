import produce from 'immer';

export const INITIAL_STATE = {
  data: null,
  error: '',
  loading: false,
};

export const Get = (state = INITIAL_STATE) =>
  produce(state, draft => {
    draft.error = '';
    draft.loading = true;
    return draft;
  });

export const Failed = (state = INITIAL_STATE, { error }) =>
  produce(state, draft => {
    draft.error = error;
    draft.loading = false;
    return draft;
  });

export const SuccessReplace = (state = INITIAL_STATE, { response }) =>
  produce(state, draft => {
    draft.data = response;
    draft.error = '';
    draft.loading = false;
    return draft;
  });

export const SuccessModify = (state = INITIAL_STATE, { response }) =>
  produce(state, draft => {
    const index = draft.data.findIndex(obj => obj.id === response.id);
    Object.assign(draft.data[index], response);
    draft.error = '';
    draft.loading = false;
    return draft;
  });

export const SuccessAdd = (state = INITIAL_STATE, { response }) =>
  produce(state, draft => {
    draft.data = [...draft.data, response];
    draft.error = '';
    draft.loading = false;
    return draft;
  });

export const SuccessDelete = (state = INITIAL_STATE, { response }) =>
  produce(state, draft => {
    draft.error = '';
    draft.loading = false;
    const index = draft.data.findIndex(item => item.id === response.id);
    draft.data.splice(index, 1);
    return draft;
  });

export const Success = (state = INITIAL_STATE) =>
  produce(state, draft => {
    draft.error = '';
    draft.loading = false;
  });
