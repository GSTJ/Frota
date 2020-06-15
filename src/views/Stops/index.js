import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Container,
  Title,
  Overlay,
  StopTitle,
  StopContainer,
  StopTitleContainer,
} from './styles';
import { TouchableOpacity, FlatList } from 'react-native';
import { Row, PersistentHeader, Separator, Text } from '~components/';
import useStatusbar from '~services/statusbar';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import random from 'random';
import seedrandom from 'seedrandom';
import Animated from 'react-native-reanimated';
import { BACKGROUND } from '~colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Component() {
  useStatusbar('light');

  const route = useSelector(store => store.route);
  const navigation = useNavigation();

  const stops = route.data?.postosCCR;

  const renderItem = useCallback(
    ({ item, index }) => {
      const randomWidth = random.clone(seedrandom(item.id)).float(0.7, 1.3);
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Stop', { stop: item })}
          style={{
            flex: index % 2 ? randomWidth : 1,
            paddingRight: index % 2 || index === stops.length - 1 ? 0 : 10,
          }}
        >
          <StopContainer
            // Only to test
            source={{
              uri: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${item.latitude},${item.longitude}&fov=30&heading=270&pitch=0&key=AIzaSyA6UspQCGWrvKUPyCtIx49YeH5wyS1keF4`,
            }}
          >
            <Overlay>
              <StopTitle numberOfLines={1}>{item.nome}</StopTitle>
            </Overlay>
          </StopContainer>
        </TouchableOpacity>
      );
    },
    [stops, navigation]
  );

  return (
    <PersistentHeader
      component={AnimatedFlatList}
      contentContainerStyle={{
        backgroundColor: BACKGROUND,
        flexGrow: 1,
        paddingVertical: 25,
        paddingHorizontal: 15,
      }}
      data={stops}
      numColumns={2}
      ListHeaderComponent={
        <>
          <Title>Lugares para{'\n'}parar</Title>
          <Separator height={15} />
        </>
      }
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      light
    />
  );
}
