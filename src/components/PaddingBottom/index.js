import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { BACKGROUND, PRIMARY, SUBTITLE } from '~colors';

const bottomPadding = getBottomSpace();

export default styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: ${Math.max(bottomPadding - 10, 0)}px;
  background-color: ${props => {
    if (props.disabled && !props.loading) return SUBTITLE;
    if (props.inverted) return BACKGROUND;
    return PRIMARY;
  }};
  width: 100%;
`;
