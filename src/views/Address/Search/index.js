import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Search } from '~components';
import { Button, Container } from './styles';
import Address from '../components/Address';
import useStatusbar from '~services/statusbar';
import useAxios from 'axios-hooks';
import Config from 'react-native-config';
import { SafeComponent, Divider, Text } from '~components/';
import { Location } from '~services/geocoder';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Creators } from '~reducers';
import { useDispatch } from 'react-redux';

interface RenderItem {
  item: Location;
}

function AddressNotFound({ waypoint }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 25, marginTop: 10 }}>
      <Text subtitle center>
        Não achou o endereço?
      </Text>
      <Button
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate('AddressMap', { waypoint })}
      >
        Buscar no Mapa
      </Button>
    </View>
  );
}

export default function NewAddress() {
  useStatusbar('light');
  const navigation = useNavigation();
  const { params } = useRoute();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const [request, refetch] = useAxios(
    {
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      params: {
        input: query,
        key: Config.GOOGLE_API_KEY,
        language: 'pt-BR',
        components: 'country:bra',
      },
    },
    { manual: true }
  );

  return (
    <>
      <Search
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={refetch}
        topPadding
        autoFocus
        cancel
        onCancel={navigation.goBack}
      />
      <SafeComponent request={request}>
        <Container
          data={request.data?.predictions}
          keyExtractor={item => item.id}
          renderItem={({ item }: RenderItem) => (
            <Address
              onPress={() => {
                dispatch(
                  Creators.modifyWaypoint({
                    ...params.waypoint,
                    address: item.description,
                  })
                );
                navigation.navigate('AddressList');
              }}
              title={item.description}
            />
          )}
          ItemSeparatorComponent={() => <Divider style={{ height: 1 }} />}
          ListEmptyComponent={
            <Text medium subtitle center style={{ marginTop: 15 }}>
              {request.data?.predictions
                ? 'Sem resultados para a pesquisa.'
                : 'Digite algum endereço para pesquisar!'}
            </Text>
          }
          ListFooterComponent={
            request.data?.predictions && (
              <AddressNotFound waypoint={params.waypoint} />
            )
          }
        />
      </SafeComponent>
    </>
  );
}

AddressNotFound.propTypes = {
  waypoint: PropTypes.any,
};
