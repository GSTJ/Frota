import { all, take } from 'redux-saga/effects';

import route from './route';

import { REHYDRATE } from 'redux-persist/lib/constants';

export default function* rootSaga() {
  yield take(REHYDRATE); // Wait for store to be fully rehydrate
  yield all([route]);
}
