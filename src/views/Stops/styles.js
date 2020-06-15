import styled from 'styled-components/native';
import { BACKGROUND } from '~colors';
import LinearGradient from 'react-native-linear-gradient';
import { Row, Text } from '~components/';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  background: ${BACKGROUND};
  flex: 1;
  padding: 25px 15px;
`;

export const Title = styled(Text).attrs({
  bigger: true,
  primary: true,
  bold: true,
})`
  margin: 0 0 10px 10px;
`;

export const Overlay = styled(LinearGradient).attrs({
  colors: ['#0000', 'rgba(0,0,0,0.6)'],
})`
  flex: 1;
`;

export const StopTitle = styled(Text).attrs({
  medium: true,
  bold: true,
  background: true,
})`
  margin: auto 15px 15px 15px;
  flex-shrink: 0;
`;

export const StopTitleContainer = styled(Row).attrs({
  center: true,
})``;

export const StopContainer = styled(FastImage)`
  height: 150px;
  background-color: #e9e9e9;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
`;
