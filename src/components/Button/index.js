import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styles';
import Text from '~components/Text';
import Loading from '~components/Loading';

export default function Component(props) {
  return (
    <Container disabled={props.disabled} loading={props.loading} {...props}>
      {props.loading && <Loading light={!props.inverted} />}
      {!props.loading && (
        <Text
          uppercase={props.uppercase}
          primary={props.inverted}
          background={!props.inverted}
          bold
          big
        >
          {props.children}
        </Text>
      )}
    </Container>
  );
}

Component.propTypes = {
  children: PropTypes.string,
  inverted: PropTypes.bool,
  uppercase: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};
