import * as colors from '~colors';

import styled from 'styled-components/native';

export default styled.View`
  width: 4px;
  height: 4px;
  margin-top: 3px;
  border-radius: 5px;
  background-color: ${props => {
    if (props.textDisabled) {
      return colors.DISABLED;
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
`;
