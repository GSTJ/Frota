import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import Reactotron from '~services/reactotron';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import createFilter from 'redux-persist-transform-filter';
import reducers from './reducers';
import sagas from './sagas';

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const applied = applyMiddleware(...middlewares);

const ReactotronMiddleware = composeWithDevTools(
  applied,
  Reactotron.createEnhancer()
);

// Persisting only the important, non-changeable without user interaction, fields
// Blacklisting error/Loading subfields on them before saving (unnecessary and buggy)

const persistConfig = {
  key: '@Frota',
  storage: AsyncStorage,
  whitelist: ['route', 'waypoints', 'introduction'],
  transforms: [createFilter('route', ['data'])],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  undefined,
  ReactotronMiddleware
);

export const persistor = persistStore(store);

sagaMiddleware.run(sagas);

if (module.hot) {
  module.hot.accept(() => {
    // This fetch the new state of the above reducers.
    const nextRootReducer = require('./reducers').default;
    const nextPersistedReducer = persistReducer(persistConfig, nextRootReducer);
    store.replaceReducer(nextPersistedReducer);
  });
}
