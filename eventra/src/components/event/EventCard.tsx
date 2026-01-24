import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {formatISODate} from '@utils/Helper';
import React, {FC} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {s} from 'react-native-size-matters';
import {EventType, NavigationProps} from 'types/AppTypes';

interface EventCardProps {
  item: EventType;
  index: number;
}

const EventCard: FC<EventCardProps> = ({item, index}) => {
  const navigation = useNavigation<NavigationProps<'Main'>>();

  const getTiming = (): string => {
    const {date, day, month} = formatISODate(item.date);
    return `${day}, ${date} ${month}`;
  };
  return (
    <Animated.View entering={FadeInDown.duration(index * 1000)}>
      <Pressable
        onPress={() => {
          navigation.navigate('EventDetailScreen', {eventId: item._id});
        }}
        key={index}
        style={styles.main}>
        <Image source={{uri: item.pic.url}} style={styles.image} />

        <View style={{gap: s(6), padding: s(8)}}>
          <View>
            <CustomText style={styles.title}>{item.title}</CustomText>
            <CustomText style={styles.time}>{getTiming()}</CustomText>
          </View>

          <View style={styles.locationParent}>
            <View style={styles.address}>
              <Icon
                icon="map-marker"
                iconType="MaterialCommunityIcons"
                color={AppConstants.redColor}
                size={s(16)}
              />
              <CustomText
                style={styles.city}
                numberOfLines={1}
                ellipsizeMode="tail">
                {typeof item.venue !== 'string'
                  ? `${item.venue.address?.area}`
                  : ''}
              </CustomText>
            </View>
            <Icon
              icon="bookmark"
              iconType="Feather"
              color={AppConstants.black}
              size={s(15)}
            />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  main: {
    width: (AppConstants.screenWidth - AppConstants.screenPadding * 3) / 2,
    backgroundColor: AppConstants.whiteColor,
    elevation: 2,
    borderRadius: s(10),
    overflow: 'hidden',
  },
  image: {width: '100%', height: s(150), objectFit: 'cover'},
  title: {fontSize: s(14), flexWrap: 'wrap', fontWeight: '500'},
  addressContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  address: {
    flexDirection: 'row',
    gap: s(2),
    alignItems: 'center',
    width: '70%',
  },
  time: {
    fontSize: s(12),
    flexWrap: 'wrap',
    fontWeight: '500',
    color: AppConstants.redColor,
  },
  locationParent: {flexDirection: 'row', justifyContent: 'space-between'},
  city: {
    fontSize: s(10),
    flexWrap: 'wrap',
    fontWeight: '400',
    color: AppConstants.grayColor,
  },
  btn: {paddingVertical: 2, paddingHorizontal: 8, borderRadius: s(8)},
});
