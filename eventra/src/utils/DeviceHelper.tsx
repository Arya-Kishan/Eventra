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

export const openLinkSafely = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.error("Can't open this URL:", url);
  }
};
