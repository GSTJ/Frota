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
import { useSelector } from 'react-redux';
import moment from 'moment';
import format from '~services/formatter';
import Geocoder from '~services/geocoder';

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

const fuelKmPerLiter = 10;
const fuelPrice = 2;

export default function Component() {
  useStatusbar('light');

  const route = useSelector(store => store.route);
  const navigation = useNavigation();

  const summary = route.data?.rota?.trip?.summary;
  const pedagios = route.data?.pedagios?.pracas;

  const precoPedagio = pedagios.reduce(
    (acc, pedagio) => pedagio.tarifa + acc,
    0
  );

  const fuelTotal = (summary.length / fuelKmPerLiter) * fuelPrice;

  const total = precoPedagio + fuelTotal;

  return (
    <Container>
      <Title>Resumo da viagem</Title>
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
