import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import SwipeAnimation from '~animations/swipe.json';

export const Swipe = styled(LottieView).attrs({
  resizeMode: 'cover',
  autoPlay: true,
  source: SwipeAnimation,
})`
  width: 25px;
  right: -3px;
`;

export const Container = styled(Animated.View)`
  position: absolute;
  padding: 10px 15px;
  background: white;
  border: 1px #e9e9e9;
  align-items: center;
  border-radius: 5px;
`;

export const Rect = styled.View`
  position: absolute;
  bottom: -6px;
  width: 10px;
  height: 10px;
  background: white;

  border-left-width: 1px;
  border-bottom-width: 1px;
  border-left-color: #e9e9e9;
  border-bottom-color: #e9e9e9;
  transform: rotate(-45deg);
`;
