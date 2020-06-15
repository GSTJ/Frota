import styled from 'styled-components/native';

export default styled.View`
  width: ${props => props.width || 0}px;
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
`;
