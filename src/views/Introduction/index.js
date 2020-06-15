import React from 'react';
import { Container, Overlay } from './styles';
import { Text, Button, Separator } from '~components/';
import useStatusbar from '~services/statusbar';
import { Creators } from '~store/reducers';
import { useDispatch } from 'react-redux';

export default function Component() {
  useStatusbar('light');

  const dispatch = useDispatch();

  return (
    <Container>
      <Overlay>
        <Text bigger primary bold>
          Planeje suas rotas.
        </Text>
        <Separator height={10} />
        <Text big primary>
          Descanse com segurança. Faça uma estimativa dos custos da viagem e
          saiba os melhores lugares para descansar...
        </Text>
        <Button
          onPress={() => dispatch(Creators.finishIntroduction())}
          style={{ marginTop: 'auto' }}
        >
          Definir trajeto
        </Button>
      </Overlay>
    </Container>
  );
}
