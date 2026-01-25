import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {NavigationProps, RootStackParamList, VenueType} from 'types/AppTypes';

interface HomeVenueCardProps {
  item: VenueType;
  index: number;
  navigationScreen: keyof RootStackParamList;
}

const HomeVenueCard: FC<HomeVenueCardProps> = ({
  item,
  index,
  navigationScreen,
}) => {
  const navigation = useNavigation<NavigationProps<typeof navigationScreen>>();

  return (
    <View key={item._id} style={styles.main}>
      <Image source={{uri: item.pic.url}} style={styles.image} />

      <View style={styles.rightContainer}>
        <CustomText style={styles.subTitle}>{item.title}</CustomText>

        <View style={styles.addressContainer}>
          <View style={styles.address}>
            <Icon
              icon="map-marker"
              iconType="MaterialCommunityIcons"
              color={AppConstants.redColor}
              size={s(16)}
            />
            <CustomText style={styles.city}>{item.address?.state}</CustomText>
          </View>

          <RoundedButton
            onPress={() => {
              navigation.navigate('VenueDetailScreen', {venueId: item._id});
            }}
            title="Check"
            style={styles.btn}
            textStyle={{fontSize: s(11)}}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeVenueCard;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    minWidth: AppConstants.screenWidth * 0.6,
    flexDirection: 'row',
    gap: s(5),
    borderRadius: s(10),
    overflow: 'hidden',
  },
  image: {objectFit: 'cover', width: s(60), height: s(60)},
  rightContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 4,
    paddingRight: 8,
  },
  subTitle: {fontSize: s(14), flexWrap: 'wrap', fontWeight: '500'},
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(20),
  },
  address: {flexDirection: 'row', gap: s(2), alignItems: 'center'},
  city: {fontSize: s(11), flexWrap: 'wrap', fontWeight: '400'},
  btn: {paddingVertical: 2, paddingHorizontal: 8, borderRadius: s(8)},
});
