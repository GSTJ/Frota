import styled from 'styled-components/native';
import { TITLE } from '~colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

const STATUSBAR_PADDING = Platform.select({
  ios: getStatusBarHeight() + 10,
  android: getStatusBarHeight(),
});

export const Container = styled.View`
  padding-top: ${props => (props.topPadding ? STATUSBAR_PADDING : 0)}px;
  height: ${props => (props.topPadding ? STATUSBAR_PADDING + 55 : 55)}px;
  flex-direction: row;
  align-items: center;
  padding-left: 25px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: ${props => props.fontSize ?? 16}px;
  font-family: 'CeraPro-Regular';
  color: ${TITLE};
`;

export const CancelTouchArea = styled.TouchableOpacity`
  padding-right: 25px;
  justify-content: center;
`;
