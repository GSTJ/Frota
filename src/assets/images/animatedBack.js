// The only way I found to animate the svg properties
import PropTypes from 'prop-types';
import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';
import Animated from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
function SvgComponent({ fill, ...props }) {
  return (
    <Svg
      width={16.146}
      height={13.903}
      viewBox="0 0 462 398"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <AnimatedRect
        className="prefix__fil0"
        transform="rotate(-45 301.057 85.633) scale(.38227 -.40266)"
        width={778}
        height={137}
        rx={69}
        ry={69}
        fill={fill}
      />
      <AnimatedRect
        className="prefix__fil0"
        transform="rotate(45 -179.066 113.235) scale(.38227 .40266)"
        width={778}
        height={137}
        rx={69}
        ry={69}
        fill={fill}
      />
      <AnimatedRect
        className="prefix__fil0"
        x={3}
        y={171}
        width={459.094}
        height={55.293}
        rx={41}
        ry={28}
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;

SvgComponent.propTypes = {
  fill: PropTypes.any,
};
