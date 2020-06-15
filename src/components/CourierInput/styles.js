import styled, { css } from 'styled-components';
import Text from '../Text';
import { PRIMARY } from '~colors';

export const Error = styled(Text).attrs({ small: true, primary: true })`
  margin-top: 5px;
`;

export const TextInput = styled.TextInput`
  padding: 10px;
  color: ${PRIMARY};
  background: #e9e9e9;
  border-color: transparent;
  border-radius: 5px;
  border-width: 1px;
  font-family: 'CeraPro-Regular';
  ${props =>
    props.disabled &&
    css`
      background: #f9f9f9
      border-style: dotted;
      border-color: #a9a9a9;
      color: #a9a9a9;
      overflow: hidden;
  `};
`;
