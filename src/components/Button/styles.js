import styled from 'styled-components/native';
import { BACKGROUND, SECONDARY, SUBTITLE } from '~colors';

export const Container = styled.TouchableOpacity.attrs(props => {
  const enabled = !props.loading && !props.disabled;
  return {
    activeOpacity: enabled ? 0.7 : 1,
    disabled: !enabled,
    onPress: enabled ? props.onPress : null,
  };
})`
  height: 55px;
  background-color: ${props => {
    if (props.disabled && !props.loading) return SUBTITLE;
    if (props.inverted) return BACKGROUND;
    return SECONDARY;
  }};
  border-radius: ${props => (props.rect ? 0 : 8)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
