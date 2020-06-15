import Geocoder, { GeocodingObject } from 'react-native-geocoder-reborn';

const DELTA_DEFAULT = {
  longitudeDelta: 0.0025,
  latitudeDelta: 0.0025,
};

export interface Location {
  id?: string;
  label?: string;
  formattedAddress?: string;
  country?: string;
  state?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  postalCode?: string | null;
  number?: string | null;
  latitude?: number;
  longitude?: number;
  longitudeDelta?: number;
  latitudeDelta?: number;
  description?: string;
  title?: string;
}

interface GeocoderInterface {
  latitude: number;
  longitude: number;
}

function FormatAddress(address: GeocodingObject): Location | Error {
  if (!address) return new Error('Location not found');

  // By replacing, I can keep the original state format (SP instead of São Paulo, for example)
  const label = address.formattedAddress
    .replace(', Brazil', '')
    .replace(`, ${address?.postalCode}`, '')
    .replace(` - ${address?.subLocality}`, `\n${address?.subLocality}`);

  const title = label
    .replace(`\n${address?.subLocality}`, '')
    .replace(new RegExp(`, ${address?.subAdminArea}.*`), '');

  const description = address.formattedAddress
    .replace(`${title} - `, '')
    .replace(`${title}, `, '')
    .replace(`, ${address?.postalCode}`, '');

  return {
    label,
    title: title.replace('Unnamed Road', 'Rua sem nome'),
    description,
    formattedAddress: address.formattedAddress,
    country: address.country,
    state: address.adminArea,
    city: address.subAdminArea,
    neighborhood: address.subLocality,
    street: address.streetName,
    postalCode: address.postalCode,
    number: address.streetNumber,
    latitude: address.position.lat,
    longitude: address.position.lng,
    ...DELTA_DEFAULT,
  };
}

export async function GeocodeAddress(address: string) {
  const [response] = await Geocoder.geocodeAddress(address);
  return FormatAddress(response);
}

export default async (position: GeocoderInterface) => {
  const [address] = await Geocoder.geocodePosition({
    lat: position.latitude,
    lng: position.longitude,
  });
  console.log(address);

  return FormatAddress(address);
};
