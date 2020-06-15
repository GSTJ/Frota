import styled, { css } from 'styled-components/native';

export default styled.View`
  flex-direction: row;
  align-items: ${props => {
    if (props.center) return 'center';
    if (props.bottom) return 'flex-end';
    return 'flex-start';
  }};
  justify-content: ${props => {
    if (props.split) return 'space-between';
    return 'flex-start';
  }};

  ${props =>
    props.wrap &&
    css`
      flex-wrap: wrap;
    `}
`;
