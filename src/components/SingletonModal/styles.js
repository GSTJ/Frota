import styled from 'styled-components/native';
import modal from 'react-native-modal';
import { DELAY } from '~services/modalTimeout';
import { Dimensions, Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export const Modal = styled(modal).attrs({
  backdropTransitionOutTiming: 0,
  avoidKeyboard: true,
  swipeDirection: 'down',
  deviceHeight: height,
  deviceWidth: width,
  animationOutTiming: DELAY,
  statusBarTranslucent: true,
})`
  justify-content: flex-end;
  margin: 0;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  background-color: white;
  min-height: 300px;
  padding: 25px;
  padding-bottom: 0;
  justify-content: center;
  align-items: center;
`;
