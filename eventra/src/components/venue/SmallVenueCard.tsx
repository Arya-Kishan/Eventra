import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {VenueType} from 'types/AppTypes';

interface SmallVenueCardProps {
  venue: VenueType;
}

const SmallVenueCard: FC<SmallVenueCardProps> = ({venue}) => {
  return (
    <View style={styles.main}>
      <CustomImage source={venue.pic.url} width={s(120)} height={s(100)} />

      <View style={styles.parent}>
        <View>
          <CustomText variant="h4">{venue.title}</CustomText>
          <CustomText numberOfLines={2} style={styles.desc} variant="body2">
            {venue.description}
          </CustomText>
        </View>
        <View style={styles.row}>
          <Icon
            icon="map-marker"
            iconType="MaterialCommunityIcons"
            color={AppConstants.redColor}
            size={s(16)}
          />
          <CustomText
            variant="body1"
            ellipsizeMode="tail">{`${venue?.address?.area}`}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default SmallVenueCard;

const styles = StyleSheet.create({
  main: {flexDirection: 'row', gap: s(10), overflow: 'hidden'},
  parent: {flex: 1, justifyContent: 'space-between'},
  desc: {flexWrap: 'wrap', width: '100%'},
  row: {flexDirection: 'row'},
});
