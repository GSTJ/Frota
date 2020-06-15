import React from 'react';
import { Container, Rect, Swipe } from './styles';
import { Text, Row } from '~components';
import { View } from 'react-native';

export default function Component(props) {
  return (
    <Container {...props}>
      <Row center>
        <View style={{ alignItems: 'center' }}>
          <Text bold small>
            Você está aqui?
          </Text>
          <Text small>Ajuste sua localização</Text>
        </View>
        <Swipe />
      </Row>
      <Rect />
    </Container>
  );
}
