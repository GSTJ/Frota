import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { BACKGROUND, SUBTITLE } from '~colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Ripple from 'react-native-material-ripple';
import { Platform } from 'react-native';

export const PADDING_TOP = 10;

export const STATUSBAR_PADDING = Platform.select({
  ios: getStatusBarHeight() + 15,
  android: getStatusBarHeight(),
});

export const HEADER_HEIGHT = 60 + STATUSBAR_PADDING - PADDING_TOP;

export const Container = styled(Animated.View)`
  position: absolute;
  top: ${-PADDING_TOP}px;
  left: 0;
  right: 0;

  z-index: 10;

  padding-top: ${STATUSBAR_PADDING}px;
  background-color: ${props => (props.light ? 'transparent' : BACKGROUND)};
  height: ${HEADER_HEIGHT + 1}px;
`;

export const Content = styled(Animated.View)`
  position: absolute;
  top: ${-PADDING_TOP}px;
  left: 0;
  right: 0;

  background-color: ${props => (props.active ? '#fff' : 'transparent')};
  height: 100%;
  padding: ${25 + STATUSBAR_PADDING + PADDING_TOP}px 25px 25px 0;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.active ? '#e9e9e9' : 'transparent')};
`;

export const BackTouchArea = styled(Ripple).attrs({
  rippleColor: SUBTITLE,
})`
  height: 50px;
  width: 50px;

  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;

  overflow: hidden;
`;

export const ScrollView = styled(Animated.ScrollView).attrs(props => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
  scrollEventThrottle: 16,
  ...props,
}))`
  background-color: ${props => (props.noPadding ? 'transparent' : BACKGROUND)};,
`;
