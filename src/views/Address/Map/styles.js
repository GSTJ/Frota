import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export const MAX_RADIUS = 250;

// import LinearGradient from 'react-native-linear-gradient';

export const Map = styled(MapView).attrs({
  provider: PROVIDER_GOOGLE,
  showsUserLocation: true,
  mapPadding: { right: 15, left: 15, bottom: 15 + 15 + 55 },
})`
  flex: 1;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 15px;
  right: 15px;
`;

export const Container = styled.View`
  flex: 1;
`;
