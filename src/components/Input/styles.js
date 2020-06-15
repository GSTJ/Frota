import styled from 'styled-components/native';
import { TextField } from 'react-native-material-textfield';
import { PRIMARY, SUBTITLE } from '~colors';

export const InputButton = styled.TouchableOpacity.attrs({
  hitSlop: { right: 10, left: 10, top: 10, bottom: 10 },
})``;

export const TextInput = styled(TextField).attrs(props => ({
  textColor: props.color ?? PRIMARY,
  baseColor: props.color ?? SUBTITLE,
  tintColor: props.color ?? SUBTITLE,
  placeholderTextColor: props.color ?? SUBTITLE,
  lineWidth: 1,
  labelFontSize: 14,
  fontSize: 16,
  autoCompleteType: props.type,
}))`
  color: ${props => (!props.disabled ? props.color ?? PRIMARY : SUBTITLE)};
`;
