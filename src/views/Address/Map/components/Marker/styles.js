import shadow from './assets/shadow.svg';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({ pointerEvents: 'none' })`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
export const Content = styled.View`
  top: -60px;
  align-items: center;
`;

export const Shadow = styled(shadow)`
  bottom: -38px;
  left: 0;
  right: 0;
  align-self: center;
`;
