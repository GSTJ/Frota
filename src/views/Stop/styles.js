import styled from 'styled-components/native';
import { BACKGROUND } from '~colors';
import LinearGradient from 'react-native-linear-gradient';
import { Row, Text } from '~components/';
import FastImage from 'react-native-fast-image';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// import LinearGradient from 'react-native-linear-gradient';

export const Map = styled(MapView).attrs({
  provider: PROVIDER_GOOGLE,
  showsUserLocation: true,
})`
  height: 250px;
`;

export const Container = styled.View`
  background: #fff;
  padding: 25px;
  margin: 25px;
  border-radius: 5px;
  elevation: 20;
`;

export const Overlay = styled(LinearGradient).attrs({
  colors: ['#0000', 'rgba(0,0,0,0.6)'],
})`
  flex: 1;
`;

export const StopTitle = styled(Text).attrs({
  big: true,
  bold: true,
  background: true,
})`
  margin: auto 20px 20px 20px;
  flex-shrink: 0;
`;

export const StopContainer = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  height: 230px;
  background-color: #e9e9e9;
  overflow: hidden;
`;
