import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Container, Content, ArrowTouchArea } from './styles';
import { Text, Loading } from '~components';
import Back from '~images/back.svg';
import { useNavigation } from '@react-navigation/native';
import { useTimingTransition } from 'react-native-redash';
import Animated, { Easing } from 'react-native-reanimated';

const IconSize = {
  width: 20,
  height: 20,
};

export default function Component(props) {
  const navigation = useNavigation();

  const opacity = useTimingTransition(props.notDragging, {
    duration: 100,
    easing: Easing.in,
  });

  return (
    <Animated.View style={{ opacity, position: 'absolute', width: '100%' }}>
      <Container>
        <Content>
          {props.loading && <Loading style={{ marginTop: 3 }} />}
          {!props.loading && (
            <>
              <Text bold numberOfLines={1}>
                {props.title || 'Local desconhecido'}
              </Text>
              <Text small subtitle numberOfLines={1}>
                {props.description}
              </Text>
            </>
          )}
        </Content>
      </Container>
      <ArrowTouchArea onPress={navigation.goBack}>
        <Back {...IconSize} />
      </ArrowTouchArea>
    </Animated.View>
  );
}

Component.propTypes = {
  city: PropTypes.string,
  description: PropTypes.string,
  loading: PropTypes.bool,
  neighborhood: PropTypes.string,
  state: PropTypes.string,
  street: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  notDragging: PropTypes.any,
};
