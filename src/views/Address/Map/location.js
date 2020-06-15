import RNGooglePlaces from 'react-native-google-places';
import RNLocation from 'react-native-location';
import FormatAddress from '~services/formatAddress';
import reverseCep from 'cep-promise';
import Toast from 'react-native-toast-message';
import Geocoder from 'react-native-geocoding';

const permissions = {
  ios: 'whenInUse',
  android: {
    detail: 'fine',
    rationale: {
      title: 'Autorizar uso da localização',
      message: 'Usamos isso para te ajudar a preencher o endereço',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
  },
};

const AddressNotFound = () => {
  Toast.show({
    text1: 'Não conseguimos te achar 😲',
    text2:
      'Verifique se você não negou o acesso, ou se sua localização está desativada',
    type: 'error',
    autoHide: true,
    visibilityTime: 2500,
  });
};

const getPermission = async () => {
  const granted = await RNLocation.checkPermission(permissions);
  if (granted) return true;

  const accepted = await RNLocation.requestPermission(permissions);
  if (accepted) return true;

  return false;
};

export const GetLastLocation = async () => {
  try {
    const permission = await getPermission();
    if (!permission) throw new Error('Permission denied');

    const latestLocation = await RNLocation.getLatestLocation({
      timeout: 1000,
    });

    if (!latestLocation) AddressNotFound();

    return latestLocation;
  } catch (err) {
    if (err.message === 'Permission denied') return { error: true };
    AddressNotFound();
  }
};

export const Geocode = async props => {
  try {
    const location = await Geocoder.from(props);

    if (!location.results[0]) {
      return Toast.show({
        text1: 'Não conseguimos te achar 😲',
        text2: 'Tente digitar a rua ou o CEP!',
        type: 'error',
        autoHide: true,
        visibilityTime: 2500,
      });
    }

    return FormatAddress(location.results[0]);
  } catch (err) {
    AddressNotFound();
  }
};
export const Geolocation = async () => {
  try {
    const latestLocation = await GetLastLocation();
    if (latestLocation.error) return latestLocation;
    if (!latestLocation) return;

    return Geocode(latestLocation);
  } catch (err) {
    AddressNotFound();
  }
};

const SEARCH_CANCELLED_ERROR = 'Search cancelled';
export const Autocomplete = async () => {
  try {
    const place = await RNGooglePlaces.openAutocompleteModal({
      country: 'br',
      types: ['geocode', 'establishment'],
      useOverlay: true,
    });

    return FormatAddress(place);
  } catch (err) {
    // Ignore search canceled errors
    if (err.message === SEARCH_CANCELLED_ERROR) return;
    Toast.show({
      text1: 'Oops 😲',
      text2: 'Alguma coisa deu errado, tente novamente mais tarde. 2',
      type: 'error',
      autoHide: true,
      visibilityTime: 2500,
    });
  }
};

export const ReverseCep = async postalCode => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { cep, ...address } = await reverseCep(postalCode);
    return { postalCode, ...address };
  } catch (err) {
    Toast.show({
      text1: 'Oops 😲',
      text2: 'Alguma coisa deu errado, tente novamente mais tarde. 1',
      type: 'error',
      autoHide: true,
      visibilityTime: 2500,
    });
  }
};
