import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {VenueType} from 'types/AppTypes';
import {s} from 'react-native-size-matters';

interface SmallVenueCardProps {
  venue: VenueType;
}

const SmallVenueCard: FC<SmallVenueCardProps> = ({venue}) => {
  return (
    <View style={{flexDirection: 'row', gap: s(10), overflow: 'hidden'}}>
      <CustomImage source={venue.pic.url} width={s(120)} height={s(100)} />

      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <CustomText variant="h4">{venue.title}</CustomText>
          <CustomText
            numberOfLines={2}
            style={{flexWrap: 'wrap', width: '100%'}}
            variant="body2">
            {venue.description}
          </CustomText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            icon="map-marker"
            iconType="MaterialCommunityIcons"
            color={AppConstants.redColor}
            size={s(16)}
          />
          <CustomText variant="body1">{`${venue.address.area}, ${venue.address.city}, ${venue.address.state}`}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default SmallVenueCard;

const styles = StyleSheet.create({});
