import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { GetLastLocation } from './location';
import Geocode from '~services/geocoder';
import { Map } from './styles';
import { Button } from '~components';
import Marker from './components/Marker';
import Navbar from './components/Navbar';
import { useDebouncedCallback } from 'use-debounce';
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { useValue } from 'react-native-redash';
import { useDispatch } from 'react-redux';
import { Creators } from '~store/reducers';

// Ribeirão Preto
const defaultLocation = {
  latitude: -21.1824895,
  longitude: -47.8042025,
  longitudeDelta: 0.0025,
  latitudeDelta: 0.0025,
};

const defaultPlace = {
  city: 'Ribeirão Preto',
  state: 'SP',
  street: 'Av Independência',
  neighborhood: 'Vila Seixas',
};

export default function Component() {
  const { params } = useRoute();
  const [location, setLocation] = useState(defaultLocation);
  const [place, setPlace] = useState(defaultPlace);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const notDragging = useValue(1);
  const [locationDebounce] = useDebouncedCallback(setLocation, 250);

  const mapRef = useRef(null);

  // Get user current latitude/longitude
  const GetUserLocation = useCallback(async () => {
    const latestLocation = await GetLastLocation();
    const newLocation = { ...defaultLocation, ...latestLocation };
    if (!mapRef.current) return setLocation(newLocation);
    mapRef.current.animateToRegion(newLocation);
    setLoading(false);
  }, []);

  const GetPlace = useCallback(async () => {
    const newPlace = await Geocode(location);
    setPlace(newPlace);
    setLoading(false);
  }, [location]);

  useFocusEffect(
    useCallback(() => {
      GetUserLocation();
      setLoading(true);
    }, [GetUserLocation])
  );

  useEffect(() => {
    GetPlace();
    setLoading(true);
  }, [GetPlace]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Map
          ref={mapRef}
          initialRegion={location}
          pitchEnabled={false}
          onRegionChange={() => notDragging.setValue(0)}
          onRegionChangeComplete={e => {
            notDragging.setValue(1);
            locationDebounce(e);
          }}
        />
        <Marker notDragging={notDragging} />
        <Navbar notDragging={notDragging} loading={loading} {...place} />
      </View>
      <Button
        rect
        onPress={() => {
          dispatch(
            Creators.modifyWaypoint({
              ...params.waypoint,
              address: place.formattedAddress,
            })
          );
          navigation.navigate('AddressList');
        }}
      >
        Confirmar localização
      </Button>
    </>
  );
}
