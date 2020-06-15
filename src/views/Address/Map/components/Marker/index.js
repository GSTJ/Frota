import React from 'react';
import { PRIMARY } from '~colors';
import { interpolateColor, useTimingTransition } from 'react-native-redash';
import Animated, {
  interpolate,
  Extrapolate,
  Easing,
  add,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import Bubble from '../Bubble';
import { Shadow, Container, Content } from './styles';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Marker = props => (
  <Svg
    width={props.width || '30.821'}
    height={props.height || '36.55'}
    viewBox="0 0 30.821 36.55"
  >
    <AnimatedPath
      d="M85.983,6a15.428,15.428,0,0,0-15.41,15.41c0,10.545,13.791,20.026,14.378,20.68a1.388,1.388,0,0,0,2.065,0c.587-.654,14.378-10.135,14.378-20.68A15.428,15.428,0,0,0,85.983,6Zm0,23.164a7.753,7.753,0,1,1,7.753-7.753A7.753,7.753,0,0,1,85.983,29.164Z"
      x={-70.573}
      y={-6}
      {...props}
    />
  </Svg>
);

// TODO: transition opacity + pop effect
// translate(-50%, calc(-50% - 80px)) scale(1);

export const MarkerIcon = () => (
  <Marker width={24} height={24} fill={PRIMARY} />
);

export default function Component({ notDragging }) {
  const transition = useTimingTransition(notDragging, {
    duration: 150,
    easing: Easing.in,
  });
  const top = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [-15, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const fill = interpolateColor(transition, {
    inputRange: [0, 1],
    outputRange: ['#303030', PRIMARY],
  });
  const opacity = useTimingTransition(notDragging, {
    duration: 100,
    easing: Easing.in,
  });

  return (
    <Container>
      <Content>
        <Shadow />
        <Animated.View style={{ top }}>
          <Marker fill={fill} />
        </Animated.View>
        <Bubble style={{ opacity, top: add(top, -60) }} />
      </Content>
    </Container>
  );
}

Component.propTypes = {
  notDragging: PropTypes.any,
};

Marker.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
