import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Overlay } from './styles';
import { Text, Button, CourierInput, PersistentHeader } from '~components/';
import useStatusbar from '~services/statusbar';
import { Creators } from '~store/reducers';
import { useDispatch, useSelector } from 'react-redux';

import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

const ParseMoney = money =>
  money
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(/,/g, '.');

function Component({ obrigatory }) {
  useStatusbar('light');

  const {
    fuelConsumption: stateFuelConsumption,
    fuelPrice: stateFuelPrice,
  } = useSelector(store => store.settings);

  const dispatch = useDispatch();
  const [fuelPrice, setFuelPrice] = useState(stateFuelConsumption || 0);
  const [fuelConsumption, setFuelConsumption] = useState(stateFuelPrice || '');
  const navigation = useNavigation();

  return (
    <Container>
      <Overlay obrigatory={obrigatory}>
        <Text bigger primary bold>
          Informações
        </Text>
        <Text style={{ marginTop: 15 }} big primary bold>
          Km/L
        </Text>
        <CourierInput
          as={TextInputMask}
          type="only-numbers"
          value={fuelConsumption}
          onChangeText={setFuelConsumption}
          keyboardType="number-pad"
          placeholder="Kilometros por litro"
        />
        <Text style={{ marginTop: 15 }} big primary bold>
          Gasolina
        </Text>
        <CourierInput
          as={TextInputMask}
          type="money"
          value={fuelPrice}
          onChangeText={setFuelPrice}
          keyboardType="number-pad"
          placeholder="Preço médio da gasolina"
        />
        <Button
          disabled={!fuelPrice || !fuelConsumption}
          onPress={() => {
            dispatch(Creators.setFuelPrice(ParseMoney(fuelPrice)));
            dispatch(Creators.setFuelConsumption(fuelConsumption));
            navigation.navigate(obrigatory ? 'AddressList' : 'Home');
          }}
          style={{ marginTop: 'auto' }}
        >
          Salvar
        </Button>
      </Overlay>
    </Container>
  );
}

export default () => {
  const fuelPrice = useSelector(state => state.settings.fuelPrice);

  if (!fuelPrice) return <Component obrigatory />;
  return (
    <PersistentHeader>
      <Component />
    </PersistentHeader>
  );
};

Component.propTypes = {
  obrigatory: PropTypes.bool,
};
