import styled from 'styled-components/native';
import button from '~components/Button';
import text from '~components/Text';

export const CancelTouchArea = styled.TouchableOpacity.attrs({
  hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
})``;

export const CancelSpacing = styled.View`
  height: 30px;
  flex-shrink: 1;
`;

export const CancelText = styled(text).attrs({
  medium: true,
  primary: true,
  underline: true,
  center: true,
})``;

export const Button = styled(button)`
  flex: 1;
  margin-right: ${props => (props.last ? 0 : 25)}px;
`;
