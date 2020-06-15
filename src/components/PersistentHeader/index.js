import React, { forwardRef, useMemo, useState } from 'react';
import {
  Container,
  Content,
  PADDING_TOP,
  BackTouchArea,
  HEADER_HEIGHT,
  ScrollView,
} from './styles';
import Separator from '~components/Separator';
import { TITLE, PRIMARY, BACKGROUND } from '~colors';
import PropTypes from 'prop-types';
import { onScrollEvent, useValue, interpolateColor } from 'react-native-redash';
import {
  Extrapolate,
  interpolate,
  useCode,
  diff,
  cond,
  call,
  greaterOrEq,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { View, RefreshControl } from 'react-native';
import useStatusBar from '~services/statusbar';
import Back from '~images/animatedBack';

export const TOTAL_HEIGHT = HEADER_HEIGHT - PADDING_TOP;

const IconSize = {
  width: 20,
  height: 20,
};

const BackButton = ({ y, noPadding, onBackPress }) => {
  const navigation = useNavigation();
  const fill = noPadding
    ? interpolateColor(y, {
        inputRange: [0, PADDING_TOP],
        outputRange: [BACKGROUND, TITLE],
      })
    : TITLE;

  return (
    <BackTouchArea onPress={onBackPress || navigation.goBack}>
      <Back fill={fill} {...IconSize} />
    </BackTouchArea>
  );
};

const PersistentHeader = forwardRef(
  ({ children, component, style, ...props }, ref) => {
    const defaultTheme = useMemo(() => (props.noPadding ? 'dark' : 'light'), [
      props.noPadding,
    ]);

    const y = useValue(0);
    const [theme, setTheme] = useState(defaultTheme);

    const Y = props.y || y;

    const translateY = interpolate(Y, {
      inputRange: [0, PADDING_TOP],
      outputRange: [PADDING_TOP, 0],
      extrapolateRight: Extrapolate.CLAMP,
    });

    const opacity = interpolate(Y, {
      inputRange: [0, PADDING_TOP],
      outputRange: [0, 1],
      extrapolateRight: Extrapolate.CLAMP,
    });

    // Changes statusbar theme
    useCode(
      () =>
        cond(
          diff(greaterOrEq(Y, PADDING_TOP)),
          call([Y], ([i]) =>
            setTheme(i >= PADDING_TOP ? 'light' : defaultTheme)
          )
        ),
      []
    );

    useStatusBar(theme);

    return (
      <View style={{ flex: 1 }}>
        {!props.noPadding && <Separator height={TOTAL_HEIGHT} />}
        <ScrollView
          ref={ref}
          style={style}
          as={component}
          onScroll={onScrollEvent({ y })}
          refreshControl={
            props.refresh && (
              <RefreshControl
                colors={[PRIMARY]}
                tintColor={PRIMARY}
                refreshing={props.request?.loading}
                onRefresh={props.refresh}
              />
            )
          }
          {...props}
        >
          {children}
        </ScrollView>
        <Container
          style={{ transform: [{ translateY }] }}
          light={props.noPadding}
        >
          <Content {...props} active style={{ opacity }} pointerEvents="none" />
          <Content {...props} noBorder>
            <BackButton {...props} y={Y} {...IconSize} />
          </Content>
        </Container>
      </View>
    );
  }
);

export default PersistentHeader;

PersistentHeader.displayName = 'PersistentHeader';

PersistentHeader.propTypes = {
  children: PropTypes.element,
  light: PropTypes.bool,
  noBorder: PropTypes.bool,
  noDrawer: PropTypes.bool,
  noPadding: PropTypes.bool,
  onTextPress: PropTypes.string,
  refresh: PropTypes.func,
  request: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  text: PropTypes.string,
  component: PropTypes.any,
  y: PropTypes.any,
};

BackButton.propTypes = {
  noPadding: PropTypes.bool,
  onBackPress: PropTypes.func,
  y: PropTypes.any,
};
