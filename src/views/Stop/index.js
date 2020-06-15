import React, { useState, useEffect } from 'react';
import { Overlay, StopTitle, StopContainer, Container, Map } from './styles';

import { PersistentHeader, Text, Row, Button } from '~components/';
import { useRoute } from '@react-navigation/native';
import CurrentLocation from '~images/current_location';
import Geocoder from '~services/geocoder';
import { View, Platform } from 'react-native';
import { MarkerIcon } from '~views/Address/Map/components/Marker';
import { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';

export default function Component() {
  const { params } = useRoute();
  const [address, setAddress] = useState(null);
  const { stop } = params;

  useEffect(() => {
    Geocoder(stop).then(setAddress);
  }, [stop]);

  return (
    <PersistentHeader noPadding>
      <StopContainer
        // Only to test
        source={{
          uri: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${stop.latitude},${stop.longitude}&fov=30&heading=270&pitch=0&key=AIzaSyA6UspQCGWrvKUPyCtIx49YeH5wyS1keF4`,
        }}
      >
        <Overlay>
          <StopTitle numberOfLines={1}>{stop.nome}</StopTitle>
        </Overlay>
      </StopContainer>

      <Container>
        <Text>{stop.servicos}</Text>
      </Container>

      <View style={{ backgroundColor: 'white' }}>
        <Row
          style={{
            alignItems: 'center',
            padding: 15,
          }}
        >
          <CurrentLocation width={17} height={17} style={{ marginRight: 15 }} />
          <View>
            <Text bold>{address?.title}</Text>
            <Text>{address?.description}</Text>
          </View>
        </Row>
        <Map
          initialRegion={{
            ...stop,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          pitchEnabled={false}
        >
          <Marker
            coordinate={{
              ...stop,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <MarkerIcon />
          </Marker>
        </Map>
        <Button
          onPress={() =>
            openMap({
              ...stop,
              end: address.formattedAddress,
              provider: Platform.OS === 'ios' ? 'apple' : 'google',
            })
          }
          style={{ margin: 25, flex: 1, width: 'auto', marginBottom: 30 }}
        >
          Abrir no mapa
        </Button>
      </View>
    </PersistentHeader>
  );
}
