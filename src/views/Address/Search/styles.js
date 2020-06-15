import styled from 'styled-components/native';
import { Button as button } from '~components';

export const Container = styled.FlatList`
  background-color: #fff;
  padding: 10px 25px 25px 25px;
`;

export const Button = styled(button)`
  margin: auto auto 15px auto;
  width: 50%;
  min-width: 200px;
`;
