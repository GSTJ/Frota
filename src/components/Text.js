import styled, { css } from 'styled-components/native';
import * as colors from '~colors';

const fontSizeStyle = size => {
  const multiplier = size > 14 ? 1.4 : 1.25;
  return css`
    font-size: ${size}px;
    line-height: ${Math.ceil(size * multiplier)}px;
  `;
};

export default styled.Text`

${props =>
  !props.nowrap &&
  css`
    flex: 0 1 auto;
    flex-wrap: wrap;
  `}


  ${props =>
    props.center &&
    css`
      text-align: center;
    `}

  color: ${props => {
    if (props.textDisabled || props.theme.disabled) {
      return colors.DISABLED;
    }
    if (props.disabled) {
      return colors.DISABLED_SECONDARY;
    }
    if (props.primary) {
      return colors.PRIMARY;
    }
    if (props.subtitle) {
      return colors.SUBTITLE;
    }
    if (props.background) {
      return colors.BACKGROUND;
    }
    if (props.secondary) {
      return colors.SECONDARY;
    }
    return colors.TITLE;
  }};

  ${props =>
    props.bold &&
    css`
      font-family: 'CeraPro-Bold';
    `}

  ${props => {
    if (props.bigger) {
      return css`
        font-size: 36px;
        line-height: 37px;
      `;
    }
    if (props.big) {
      return fontSizeStyle(19);
    }
    if (props.medium) {
      return fontSizeStyle(16);
    }
    if (props.small) {
      return fontSizeStyle(12);
    }
    if (props.smaller) {
      return fontSizeStyle(11);
    }
    return fontSizeStyle(14);
  }}

  text-decoration-line: ${props => {
    if (props.underline) {
      return 'underline';
    }
    if (props.crossed) {
      return 'line-through';
    }
    return 'none';
  }};


  ${props =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `};
`;
