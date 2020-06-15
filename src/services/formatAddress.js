export default raw => {
  const address = {
    feature: '',
    number: '',
    street: '',
    postalCode: '',
    locality: '',
    country: '',
    countryCode: '',
    state: '',
    city: '',
    neighborhood: '',
    latitude: 0,
    longitude: 0,
  };

  if (raw.location) {
    const { latitude, longitude } = raw.location;
    address.latitude = latitude;
    address.longitude = longitude;
  }

  const addressComponents = raw.address_components || raw.addressComponents;

  addressComponents.forEach(component => {
    const shortName = component.short_name || component.shortName;
    const longName = component.long_name || component.name;

    if (component.types.includes('route')) {
      address.street = shortName;
    } else if (component.types.includes('street_number')) {
      address.number = shortName;
    } else if (component.types.includes('country')) {
      address.country = longName;
      address.countryCode = shortName;
    } else if (component.types.includes('locality')) {
      address.locality = shortName;
    } else if (component.types.includes('postal_code')) {
      // Incomplete postal codes
      address.postalCode = shortName.length === 5 ? `${shortName}-` : shortName;
    } else if (component.types.includes('administrative_area_level_1')) {
      address.state = shortName;
    } else if (component.types.includes('administrative_area_level_2')) {
      address.city = shortName;
    } else if (
      component.types.includes('sublocality') ||
      component.types.includes('sublocality_level_1')
    ) {
      address.neighborhood = shortName;
    } else if (
      component.types.includes('point_of_interest') ||
      component.types.includes('colloquial_area')
    ) {
      address.feature = shortName;
    }
  });

  return address;
};
