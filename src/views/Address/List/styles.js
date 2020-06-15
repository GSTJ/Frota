import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BACKGROUND } from '~colors';

export const Container = styled.View`
  flex: 1;
  background: ${BACKGROUND};
`;

export const Stops = styled.View`
  background: #fff;
  padding: ${getStatusBarHeight() + 10}px 20px 20px 20px;
`;
