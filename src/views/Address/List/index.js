import React from 'react';
import { Container, Stops } from './styles';
import { CourierInput, Row, Button } from '~components/';
import useStatusbar from '~services/statusbar';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import Illustration from '~images/illustration.svg';
import Close from '~images/close.svg';
import Plus from '~images/plus.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '~store/reducers';

export default function Component() {
  useStatusbar('light');
  const waypoints = useSelector(store => store.waypoints);
  const route = useSelector(store => store.route);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Container>
      <Stops>
        {waypoints.map((waypoint, index) => {
          const lastWaypoint = index === waypoints.length - 1;
          return (
            <Row center key={waypoint.id} style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{ flex: 1, marginRight: index ? 0 : 15 + 20 }}
                onPress={() =>
                  navigation.navigate('AddressSearch', { waypoint })
                }
              >
                <CourierInput
                  editable={false}
                  value={waypoint.address}
                  placeholder={index ? 'Para onde vou entregar' : 'Onde estou'}
                />
              </TouchableOpacity>
              {!!index && (
                <TouchableOpacity
                  onPress={() => {
                    if (lastWaypoint) return dispatch(Creators.addWaypoint());
                    dispatch(Creators.removeWaypoint(waypoint));
                  }}
                  style={{ paddingLeft: 15 }}
                >
                  {lastWaypoint ? (
                    <Plus width={20} height={20} />
                  ) : (
                    <Close width={20} height={20} />
                  )}
                </TouchableOpacity>
              )}
            </Row>
          );
        })}
      </Stops>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Illustration width={125} height={125} />
      </View>
      <View style={{ padding: 15 }}>
        <Button
          onPress={() => dispatch(Creators.getRoute())}
          loading={route.loading}
          disabled={!waypoints[0].address || !waypoints[1].address}
        >
          Confirmar
        </Button>
      </View>
    </Container>
  );
}
