import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {NavigationProps, RootStackParamList, userType} from 'types/AppTypes';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {s, vs} from 'react-native-size-matters';
import {BlurView} from '@react-native-community/blur';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {createShareLink} from '@utils/DeepLinkService';
import {useAppSelector} from '@store/hooks';

interface dataProps {
  type: 'event' | 'venue' | 'post' | 'edit' | 'share';
  title: string;
  description: string;
}

interface SettingModalProps {
  setShowSettings: (val: boolean) => void;
  user: userType;
}

const SettingModal: FC<SettingModalProps> = ({setShowSettings, user}) => {
  const data: dataProps[] = [
    {
      type: 'event',
      title: 'Create Event',
      description:
        'Make an event so that other user can participate in events and enjoy',
    },
    {
      type: 'post',
      title: 'Create Post',
      description: 'Create a Venue for the event people to enjoy their day',
    },
    {
      type: 'venue',
      title: 'Create Venue',
      description: 'Create a Post',
    },
    {
      type: 'edit',
      title: 'Edit Profile',
      description: 'Edit your profile',
    },
    {
      type: 'share',
      title: 'Share Profile',
      description: 'Share your profile',
    },
  ];

  const {navigate} = useNavigation<NavigationProps<'ProfileScreen'>>();
  const {loggedInUser} = useAppSelector(store => store.user);

  const handleNavigation = (screen: string) => {
    if (screen === 'event') {
      navigate('CreateEventScreen', {event: null, method: 'create'});
    }

    if (screen === 'post') {
      navigate('CreatePostScreen', {post: null, method: 'create'});
    }
    if (screen === 'venue') {
      navigate('CreateVenueScreen', {venue: null, method: 'create'});
    }
    if (screen === 'edit') {
      // navigate("CreateVenueScreen", { venue: null, method: "create" });
    }

    if (screen === 'share') {
      // navigate("CreateVenueScreen", { venue: null, method: "create" });
      createShareLink({
        action: 'share',
        docId: user?._id!,
        feature: 'profile',
      });
    }

    setShowSettings(false);
  };

  return (
    <BlurView
      style={styles.main}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white">
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setShowSettings(false)}>
        <Icon
          icon="x-octagon"
          iconType="Feather"
          color={AppConstants.redColor}
          size={s(30)}
        />
      </TouchableOpacity>

      <View style={styles.main2}>
        {data.map(item => (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.5}
            onPress={() => handleNavigation(item.type)}
            style={styles.optionBox}>
            <View style={{width: '90%'}}>
              <CustomText variant="h4">{item.title}</CustomText>
              <CustomText numberOfLines={2}>{item.description}</CustomText>
            </View>

            <Icon
              icon="plus"
              iconType="Feather"
              color={AppConstants.redColor}
            />
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
};

export default SettingModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: s(10),
  },
  main2: {
    backgroundColor: AppConstants.whiteColor,
    padding: AppConstants.screenPadding,
  },
  optionBox: {
    padding: s(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  justifyBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
