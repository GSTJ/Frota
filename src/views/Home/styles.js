import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BACKGROUND } from '~colors';
import { Row, Text } from '~components/';

export const Container = styled.View`
  background: ${BACKGROUND};
  flex: 1;
  padding: ${getStatusBarHeight() + 35}px 15px 25px 15px;
`;

export const Card = styled.View`
  background-color: white;
  padding: 15px 25px 10px 25px;
  border-radius: 10px;
  elevation: 20;
  margin-top: 20px;
`;

export const IconText = styled(Row).attrs({ center: true })`
  height: 40px;
`;

export const InfoText = styled(Text).attrs({
  big: true,
  primary: true,
  bold: true,
})`
  margin-left: 8px;
`;

export const PriceDescription = styled(Text).attrs({
  big: true,
  subtitle: true,
})`
  margin-left: 10px;
`;

export const PriceText = styled(Text).attrs({
  big: true,
  bold: true,
})`
  color: #000;
`;

export const EqualsSeparator = styled.View`
  padding-top: 10px;
  margin-top: 10px;
  border-top-width: 1px;
  border-top-color: #e9e9e9;
`;

export const Info = styled(Row).attrs({ center: true, split: true })`
  margin: 10px 10px 0 10px;
`;

export const Title = styled(Text).attrs({
  bigger: true,
  primary: true,
  bold: true,
})`
  margin: 0 10px;
`;
