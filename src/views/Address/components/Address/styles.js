import styled from 'styled-components/native';
import { PRIMARY, SUBTITLE } from '~colors';
import Location from '~images/location.svg';
import { Text } from '~components';

export const Icon = styled(Location).attrs({
  width: 15,
  height: 15,
  fill: PRIMARY,
})``;

export const Container = styled.TouchableOpacity`
  margin: 20px 0;
  flex-direction: row;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled(Text).attrs({
  bold: true,
})`
  color: #090909;
`;

export const Circle = styled.View`
  border-radius: 25px;
  width: 25px;
  height: 25px;
  background: ${SUBTITLE};
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
