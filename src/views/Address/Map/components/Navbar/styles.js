import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const ARROW_SIZE = 50;
const MAX_WIDTH = Math.floor(Dimensions.get('window').width) - ARROW_SIZE * 2;
const STATUSBAR_HEIGHT = getStatusBarHeight();

export const Container = styled(LinearGradient).attrs({
  colors: ['white', 'white', '#0000'],
  pointerEvents: 'none',
})`
  height: ${115 + STATUSBAR_HEIGHT}px;
  width: 100%;
  padding-top: ${10 + STATUSBAR_HEIGHT}px;
  align-items: center;
`;

export const Content = styled.View`
  align-items: center;
  max-width: ${MAX_WIDTH}px;
`;

export const ArrowTouchArea = styled.TouchableOpacity`
  top: 0;
  left: 0;
  position: absolute;
  justify-content: center;
  width: ${ARROW_SIZE}px;
  height: ${ARROW_SIZE}px;
  padding-top: ${20 + STATUSBAR_HEIGHT}px;
  padding-left: 20px;
`;
