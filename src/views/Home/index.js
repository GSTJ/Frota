import PropTypes from 'prop-types';
import React from 'react';
import {
  Container,
  Card,
  IconText,
  InfoText,
  PriceDescription,
  PriceText,
  EqualsSeparator,
  Info,
  Title,
} from './styles';

import { Text, Button, Row } from '~components/';
import useStatusbar from '~services/statusbar';
import { useNavigation } from '@react-navigation/native';
import Clock from '~images/clock.svg';
import Fuel from '~images/fuel.svg';
import Distance from '~images/distance.svg';
import Equals from '~images/equals.svg';
import Barrier from '~images/barrier.svg';
import Settings from '~images/settings.svg';
import { useSelector } from 'react-redux';
import moment from 'moment';
import format from '~services/formatter';
import { TouchableOpacity } from 'react-native';

const ItemPrice = ({ description, price, Icon }) => (
  <Row center split>
    <IconText>
      <Icon width={25} height={25} />
      <PriceDescription>{description}</PriceDescription>
    </IconText>
    <PriceText>~ {format(price)}</PriceText>
  </Row>
);

const ItemInfo = ({ description, Icon }) => (
  <IconText>
    <Icon width={25} height={25} />
    <InfoText>{description}</InfoText>
  </IconText>
);

export default function Component() {
  useStatusbar('light');

  const route = useSelector(store => store.route);
  const fuelPrice = useSelector(store => store.settings.fuelPrice);
  const fuelConsumption = useSelector(store => store.settings.fuelConsumption);
  const navigation = useNavigation();

  const summary = route.data?.rota?.trip?.summary;
  const pedagios = route.data?.pedagios?.pracas;

  const precoPedagio = pedagios.reduce(
    (acc, pedagio) => pedagio.tarifa + acc,
    0
  );

  const fuelTotal =
    (summary.length / Number(fuelConsumption)) * Number(fuelPrice);

  const total = precoPedagio + fuelTotal;

  return (
    <Container>
      <Row center>
        <Title>Resumo da viagem</Title>
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => navigation.navigate('Settings')}
        >
          <Settings width={25} height={25}>
            Configurações
          </Settings>
        </TouchableOpacity>
      </Row>
      <Info>
        <ItemInfo
          description={moment()
            .add(summary.time, 'seconds')
            .fromNow(true)}
          Icon={Clock}
        />
        <ItemInfo
          description={`${Math.round(summary.length)} km`}
          Icon={Distance}
        />
      </Info>
      <Card>
        <ItemPrice description="Combustível" price={fuelTotal} Icon={Fuel} />
        <ItemPrice description="Pedágio" price={precoPedagio} Icon={Barrier} />
        <EqualsSeparator>
          <ItemPrice description="Total" price={total} Icon={Equals} />
        </EqualsSeparator>
      </Card>
      <Button
        onPress={() => navigation.navigate('Stops')}
        style={{ marginTop: 25, marginHorizontal: 10, width: 'auto' }}
      >
        Paradas
      </Button>
      <Button
        onPress={() => navigation.navigate('AddressList')}
        style={{
          marginTop: 25,
          marginHorizontal: 10,
          width: 'auto',
          backgroundColor: '#40B475',
        }}
      >
        Alterar trajeto
      </Button>
    </Container>
  );
}

ItemPrice.propTypes = {
  Icon: PropTypes.any,
  description: PropTypes.string,
  price: PropTypes.number,
};

ItemInfo.propTypes = {
  Icon: PropTypes.any,
  description: PropTypes.string,
};
