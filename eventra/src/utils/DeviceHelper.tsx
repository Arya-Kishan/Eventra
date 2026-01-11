import {Linking, Platform} from 'react-native';

export const openLocationInMaps = (latitude: number, longitude: number) => {
  const latLng = `${latitude},${longitude}`;
  const label = 'Custom Location';

  const url = Platform.select({
    ios: `http://maps.apple.com/?ll=${latLng}&q=${label}`,
    android: `geo:${latLng}?q=${latLng}(${label})`,
  });

  Linking.openURL(url || '');
};
