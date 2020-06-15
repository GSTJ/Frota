import PropTypes from 'prop-types';
import React from 'react';
import { CancelTouchArea, Container, Input } from './styles';
import { PRIMARY, TITLE } from '~colors';

import Search from '~images/search.svg';
import Separator from '~components/Separator';
import Text from '~components/Text';

export default function Component({
  cancel,
  onCancel,
  style,
  onPress,
  fontSize,
  pointerEvents,
  ...rest
}) {
  return (
    <Container
      style={style}
      onPress={onPress}
      topPadding={rest.topPadding}
      pointerEvents={pointerEvents}
    >
      <Search fill={PRIMARY} width={20} height={20} />
      <Separator width={10} />
      <Input
        editable={!onPress}
        placeholderTextColor={TITLE}
        returnKeyType="search"
        fontSize={fontSize}
        {...rest}
      />
      {cancel && (
        <CancelTouchArea onPress={onCancel}>
          <Text small primary>
            Cancelar
          </Text>
        </CancelTouchArea>
      )}
    </Container>
  );
}

Component.propTypes = {
  cancel: PropTypes.bool,
  pointerEvents: PropTypes.string,
  fontSize: PropTypes.number,
  onCancel: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};
