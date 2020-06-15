import styled from 'styled-components/native';
import background from '~images/background.png';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import { BACKGROUND } from '~colors';

export const Container = styled.ImageBackground.attrs({
  source: background,
  resizeMode: 'cover',
})`
  flex: 1;
`;

export const Overlay = styled(LinearGradient).attrs({
  colors: ['#0000', BACKGROUND],
})`
  flex: 1;
  padding: ${getStatusBarHeight() + 35}px 25px 25px 25px;
`;
