// services/deepLinkService.ts
import {AppConstants} from '@constants/AppConstants';
import {setPendingDeepLink} from '@store/reducers/userSlice';
import {Linking, Share} from 'react-native';
import {
  notificationFeatureType,
  openingFromType,
  RootStackParamList,
} from 'types/AppTypes';

const parseDeepLinkUrl = (
  shareUrl: string,
): {feature: string; action: string; docId: string} => {
  const urlObj = new URL(shareUrl);
  const segments = urlObj.pathname.split('/').filter(Boolean);
  const feature = segments[0];
  const action = segments[1];
  const docId = segments[2];
  // const name = urlObj.searchParams.get('name');
  return {feature, action, docId};
};

const navigateDeepLink = ({
  screen,
  params,
  openingFrom,
  navigation,
}: {
  screen: keyof RootStackParamList;
  params: any;
  openingFrom: openingFromType;
  navigation: any;
}) => {
  openingFrom === 'pending' || openingFrom === 'cold'
    ? navigation.reset({
        index: 1, // points to the active screen
        routes: [
          {name: 'Main'}, // root screen
          {
            name: screen,
            params: params,
          },
        ],
      })
    : navigation.navigate(screen, params);
};

export const createShareLink = async ({
  feature,
  action,
  docId,
  query = null,
}: {
  feature: notificationFeatureType;
  action: string;
  docId: string;
  query?: any;
}) => {
  try {
    const urlQuery = query ? `?${query}` : '';
    const shareUrl = `${AppConstants.appUniversalLink}/${feature}/${action}/${docId}${urlQuery}`;

    await Share.share({
      message: shareUrl,
    });
  } catch (error) {
    console.error('Error sharing link:', error);
  }
};

// deepLinkResolver.ts
export function resolveDeepLink({
  url,
  navigation,
  dispatch,
  openingFrom,
}: {
  url: any;
  navigation: any;
  dispatch: any;
  openingFrom: openingFromType;
}) {
  const {docId, action, feature} = parseDeepLinkUrl(url);
  if (openingFrom === 'cold') {
    return dispatch(setPendingDeepLink(url));
  }
  dispatch(setPendingDeepLink(null));

  if (feature === 'post') {
    navigateDeepLink({
      screen: 'SinglePostScreen',
      params: {postId: docId},
      openingFrom,
      navigation,
    });
  }

  if (feature === 'profile') {
    navigateDeepLink({
      screen: 'ProfileScreen',
      params: {userId: docId},
      openingFrom,
      navigation,
    });
  }

  if (feature === 'event') {
    navigateDeepLink({
      screen: 'EventDetailScreen',
      params: {eventId: docId},
      openingFrom,
      navigation,
    });
  }

  if (feature === 'venue') {
    navigateDeepLink({
      screen: 'VenueDetailScreen',
      params: {venueId: docId},
      openingFrom,
      navigation,
    });
  }
}

export function initDeepLinks({
  navigation,
  dispatch,
}: {
  navigation: any;
  dispatch: any;
}) {
  // Cold start
  Linking.getInitialURL().then(url => {
    if (url) {
      resolveDeepLink({
        url: url,
        navigation: navigation,
        dispatch: dispatch,
        openingFrom: 'cold',
      });
    }
  });

  // Background / foreground
  const subscription = Linking.addEventListener('url', ({url}) => {
    resolveDeepLink({
      url: url,
      navigation: navigation,
      dispatch: dispatch,
      openingFrom: 'background',
    });
  });

  return () => subscription.remove();
}
