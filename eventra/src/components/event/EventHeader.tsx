import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '@store/hooks';
import React, {FC} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

interface EventHeaderProps {}

const EventHeader: FC<EventHeaderProps> = () => {
  const navigation = useNavigation<NavigationProps<'Main'>>();
  const dispatch = useAppDispatch();

  return (
    <Animated.View style={[styles.main]}>
      <Animated.View style={[styles.container1]}>
        <CustomText
          style={{
            fontWeight: '800',
            fontSize: s(24),
            color: AppConstants.whiteColor,
            width: '80%',
          }}
          numberOfLines={2}>
          Explore the amazing Events near you
        </CustomText>

        <TouchableOpacity onPress={() => navigation.navigate('VenueScreen')}>
          <Icon
            icon="fireplace-off"
            iconType="MaterialCommunityIcons"
            size={s(30)}
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.container2}>
        <View style={styles.inputContainer}>
          <TextInput
            value=""
            onChangeText={() => {}}
            placeholder="Filter Event"
            style={{flex: 1}}
          />

          <TouchableOpacity activeOpacity={0.5}>
            <Icon
              iconType="Feather"
              icon="layers"
              color={'black'}
              size={s(18)}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.5}>
          <Icon iconType="Feather" icon="search" color={'white'} size={s(20)} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default EventHeader;

const styles = StyleSheet.create({
  main: {
    gap: vs(30),
    backgroundColor: AppConstants.redColor,
    padding: AppConstants.screenPadding,
    borderBottomLeftRadius: s(30),
    borderBottomRightRadius: s(30),
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    alignItems: 'center',
  },
  container2: {
    flexDirection: 'row',
    gap: s(10),
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: s(20),
    paddingHorizontal: s(10),
    paddingVertical: s(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(5),
    flex: 1,
  },
});
