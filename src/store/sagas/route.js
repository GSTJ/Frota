import { Creators, Types } from '~store/reducers';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import axios from 'axios';
import * as navigation from '~services/navigation';

function* GetRoute() {
  try {
    const waypoints = yield select(state => state.waypoints);

    const { data: response } = yield call(
      axios.get,
      'https://app.qualp.com.br/roteirizador',
      {
        params: {
          json: {
            login_cod: null,
            waypoints: waypoints.map(waypoint => waypoint.address),
            config_rota: {
              volta: false,
              costing: 'truck',
              directions_options: {
                units: 'km',
                language: 'pt-BR',
                directions_type: 'maneuvers',
                narrative: true,
              },
            },
            config_veiculo: { categoria: 'truck', eixos: 6 },
            config_pedagio: { prices_from_date: '' },
          },
        },
      }
    );

    const formatted = {
      ...response,
      postosCCR: response.postosCCR.map(posto => ({
        ...posto,
        latitude: Number(posto.latitude),
        longitude: Number(posto.longitude),
      })),
    };

    yield put(Creators.getRouteSuccess(formatted));

    navigation.navigate('Home');
  } catch (err) {
    yield put(Creators.getRouteFailed(err.message));
  }
}

export default takeLatest(Types.GET_ROUTE, GetRoute);
